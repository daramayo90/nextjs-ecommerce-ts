import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 100 },
   { field: 'fullname', headerName: 'Full Name', width: 300 },

   {
      field: 'paid',
      headerName: 'Paid out',
      description: 'Show information if the order is paid or not',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
         return params.row.paid ? (
            <Chip color='success' label='Paid out' variant='outlined' />
         ) : (
            <Chip color='error' label='Pending payment' variant='outlined' />
         );
      },
   },

   {
      field: 'order',
      headerName: 'See Order',
      description: 'Link to order',
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
         return (
            <NextLink href={`/orders/${params.row.orderId}`} passHref>
               <Link underline='always'>Go to Order</Link>
            </NextLink>
         );
      },
   },
];

interface Props {
   orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
   const rows = orders.map((order, index) => ({
      id: index + 1,
      paid: order.isPaid,
      fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      orderId: order._id,
   }));

   return (
      <ShopLayout title={'Orders history'} pageDescription={"Client's orders history"}>
         <Typography variant='h1' component='h1'>
            Orders history
         </Typography>

         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session: any = await getSession({ req });

   if (!session) {
      return {
         redirect: {
            destination: '/auth/login?page/orders/history',
            permanent: false,
         },
      };
   }

   const orders = await dbOrders.getOrdersByUser(session.user._id);

   return {
      props: {
         orders,
      },
   };
};

export default HistoryPage;
