import type { NextPage } from 'next';

import { Typography } from '@mui/material';

import { useProducts } from '../hooks';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'My Ecommerce - Home'} pageDescription={'Find the best products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>

      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
