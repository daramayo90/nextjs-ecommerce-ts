import type { NextPage } from 'next';

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'My Ecommerce - Home'} pageDescription={'Find the best products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>{' '}
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
    </ShopLayout>
  );
};

export default Home;
