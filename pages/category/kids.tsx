import type { NextPage } from 'next';
import type { GetStaticProps } from 'next';

import { Typography } from '@mui/material';

import { dbProducts } from '../../database';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces/products';

interface Props {
   products: IProduct[];
}

const KidsPage: NextPage<Props> = ({ products }) => {
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

         <ProductList products={products} />
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const products = await dbProducts.getProductsByGender('kid');

   return {
      props: { products },
   };
};

export default KidsPage;
