import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';

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
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline='always'>Go to Order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Damian Aramayo' },
  { id: 2, paid: false, fullname: 'Melissa Flores' },
  { id: 3, paid: true, fullname: 'Hernando Vallejo' },
  { id: 4, paid: true, fullname: 'Natalia Herrera' },
  { id: 5, paid: false, fullname: 'Emin Reyes' },
  { id: 6, paid: true, fullname: 'Daniela Pidskalny' },
  { id: 7, paid: false, fullname: 'Norma Henscheid' },
  { id: 8, paid: true, fullname: 'Nicolas Sosa' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title={'Orders history'} pageDescription={"Client's orders history"}>
      <Typography variant='h1' component='h1'>
        Orders history
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
