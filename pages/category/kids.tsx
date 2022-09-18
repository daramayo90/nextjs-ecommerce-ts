import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const KidsPage = () => {
   const { products, isLoading } = useProducts('/products?gender=kid');

   return (
      <ShopLayout
         title={'My Ecommerce - Kids'}
         pageDescription={'Find the best kids products here'}>
         <Typography variant='h1' component='h1'>
            Kids
         </Typography>

         <Typography variant='h2' sx={{ mb: 1 }}>
            Kids Products
         </Typography>

         {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      </ShopLayout>
   );
};

export default KidsPage;
