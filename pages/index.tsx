import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';

import { Typography } from '@mui/material';

import { dbProducts } from '../database';
import { useProducts } from '../hooks';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { IProduct } from '../interfaces/products';

interface Props {
   products: IProduct[];
   isLoading?: boolean;
}

const HomePage: NextPage<Props> = ({ products }) => {
   //const { products, isLoading } = useProducts('/products');

   return (
      <ShopLayout title={'My Ecommerce - Home'} pageDescription={'Find the best products here'}>
         <Typography variant='h1' component='h1'>
            Shop
         </Typography>

         <Typography variant='h2' sx={{ mb: 1 }}>
            All Products
         </Typography>

         <ProductList products={products} />

         {/* {isLoading ? <FullScreenLoading /> : <ProductList products={products} />} */}
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const products = await dbProducts.getAllProducts();

   return {
      props: { products },
   };
};

export default HomePage;
