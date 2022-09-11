import NextLink from 'next/link';

import { Typography, Grid, Card, CardContent, Link, Divider, Box, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';

const OrderPage = () => {
  return (
    <ShopLayout title={'Summary of the order 1231435435'} pageDescription={'Summary order'}>
      <Typography variant='h1' component='h1'>
        Order: ABC123
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label='Pending Payment'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label='Paid out'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 products)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Shipping Address</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>

              <Typography>Damian Aramayo</Typography>
              <Typography>323 Some place</Typography>
              <Typography>Stittsvile, HYA 23S</Typography>
              <Typography>Canada</Typography>
              <Typography>+1 23123423</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* TODO */}
                <h1>Finish Order</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Paid out'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
