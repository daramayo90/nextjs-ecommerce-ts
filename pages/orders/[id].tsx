import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PayPalButtons } from '@paypal/react-paypal-js';

import {
   Typography,
   Grid,
   Card,
   CardContent,
   Divider,
   Box,
   Chip,
   CircularProgress,
} from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import frontApi from '../../api/frontApi';

export type OrderResponseBody = {
   id: string;
   status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED';
};

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
   const router = useRouter();
   const { shippingAddress } = order;
   const [isPaying, setIsPaying] = useState(false);

   const onOrderCompleted = async (details: OrderResponseBody) => {
      if (details.status !== 'COMPLETED') return alert('There is no payment in PayPal');

      setIsPaying(true);

      try {
         const { data } = await frontApi.post(`/orders/payment`, {
            transactionId: details.id,
            orderId: order._id,
         });

         router.reload();
      } catch (error) {
         console.log(error);
         setIsPaying(false);
         alert('Error');
      }
   };

   return (
      <ShopLayout title={'Summary of the order 1231435435'} pageDescription={'Summary order'}>
         <Typography variant='h1' component='h1'>
            Order: {order._id}
         </Typography>

         {order.isPaid ? (
            <Chip
               sx={{ my: 2 }}
               label='Paid out'
               variant='outlined'
               color='success'
               icon={<CreditScoreOutlined />}
            />
         ) : (
            <Chip
               sx={{ my: 2 }}
               label='Pending Payment'
               variant='outlined'
               color='error'
               icon={<CreditCardOffOutlined />}
            />
         )}

         <Grid container className='fadeIn'>
            <Grid item xs={12} sm={7}>
               <CartList products={order.orderItems} />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>
                        Summary ({order.numberOfItems}{' '}
                        {order.numberOfItems > 1 ? 'products' : 'product'})
                     </Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Shipping Address</Typography>
                     </Box>

                     <Typography>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                     </Typography>
                     <Typography>
                        {shippingAddress.address}
                        {shippingAddress.address2 ? ` ${shippingAddress.address2}` : ''}
                     </Typography>
                     <Typography>
                        {shippingAddress.city}, {shippingAddress.zipcode}
                     </Typography>
                     <Typography>{shippingAddress.country}</Typography>
                     {/* TODO: Poner el nombre del país */}
                     <Typography>{shippingAddress.phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <OrderSummary orderValues={order} />

                     <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                        <Box
                           display='flex'
                           justifyContent='center'
                           className='fadeIn'
                           sx={{ display: isPaying ? 'flex' : 'none' }}>
                           <CircularProgress />
                        </Box>

                        <Box
                           sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
                           flexDirection='column'>
                           {order.isPaid ? (
                              <Chip
                                 sx={{ my: 2 }}
                                 label='Paid out'
                                 variant='outlined'
                                 color='success'
                                 icon={<CreditScoreOutlined />}
                              />
                           ) : (
                              <PayPalButtons
                                 createOrder={(data, actions) => {
                                    return actions.order.create({
                                       purchase_units: [
                                          {
                                             amount: {
                                                value: order.total.toString(),
                                             },
                                          },
                                       ],
                                    });
                                 }}
                                 onApprove={(data, actions) => {
                                    return actions.order!.capture().then((details) => {
                                       onOrderCompleted(details);
                                       // console.log(details);  "44C435368Y744680S"
                                       // const name = details.payer.name!.given_name;
                                       //alert(`Transaction completed by ${name}`);
                                    });
                                 }}
                              />
                           )}
                        </Box>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const { id = '' } = query;

   const session: any = await getSession({ req });

   if (!session) {
      return {
         redirect: {
            destination: `/auth/login?page=/orders/${id}`,
            permanent: false,
         },
      };
   }

   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: '/orders/history',
            permanent: false,
         },
      };
   }

   if (order.user !== session.user._id) {
      return {
         redirect: {
            destination: '/orders/history',
            permanent: false,
         },
      };
   }

   return {
      props: {
         order,
      },
   };
};

export default OrderPage;
