import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
   Typography,
   Grid,
   Card,
   CardContent,
   Divider,
   Box,
   Button,
   Link,
   Chip,
} from '@mui/material';
import Cookies from 'js-cookie';

import { countries } from '../../utils';
import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';

const SummaryPage = () => {
   const router = useRouter();
   // TODO: Traer la info de la base de datos en vez de Cookies
   const { numberOfItems, shippingAddress, createOrder } = useContext(CartContext);

   const [isPosting, setIsPosting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      if (!Cookies.get('firstName')) {
         router.push('/checkout/address');
      }
   }, [router]);

   const onCreateOrder = async () => {
      setIsPosting(true);
      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMessage(message);
         return;
      }

      router.replace(`/orders/${message}`);
   };

   if (!shippingAddress) {
      return <></>;
   }

   const {
      firstName,
      lastName,
      country,
      city,
      address,
      address2 = '',
      zipcode,
      phone,
   } = shippingAddress;

   return (
      <ShopLayout title={'Summary order'} pageDescription={'Summary order'}>
         <Typography variant='h1' component='h1'>
            Review and Pay
         </Typography>

         <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>
                        Summary ({numberOfItems}
                        {numberOfItems > 1 ? 'products' : 'product'})
                     </Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Shipping Address</Typography>
                        <NextLink href='/checkout/address' passHref>
                           <Link underline='always'>Edit</Link>
                        </NextLink>
                     </Box>

                     <Typography>
                        {firstName} {lastName}
                     </Typography>
                     <Typography>{countries.find((c) => c.code === country)?.name}</Typography>
                     <Typography>
                        {city}, {zipcode}
                     </Typography>
                     <Typography>
                        {address}
                        {address2 ? `, ${address2}` : ''}
                     </Typography>
                     <Typography>{phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display='flex' justifyContent='end'>
                        <NextLink href='/cart' passHref>
                           <Link underline='always'>Edit</Link>
                        </NextLink>
                     </Box>

                     <OrderSummary />

                     <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                        <Button
                           color='secondary'
                           className='circular-btn'
                           fullWidth
                           disabled={isPosting}
                           onClick={onCreateOrder}>
                           Place Order
                        </Button>
                        <Chip
                           color='error'
                           label={errorMessage}
                           sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                        />
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default SummaryPage;
