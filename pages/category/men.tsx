import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title={'My Ecommerce - Men'} pageDescription={'Find the best men products here'}>
      <Typography variant='h1' component='h1'>
        Men
      </Typography>

      <Typography variant='h2' sx={{ mb: 1 }}>
        Men Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
