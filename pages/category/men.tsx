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

const MenPage: NextPage<Props> = ({ products }) => {
   return (
      <ShopLayout title={'My Ecommerce - Men'} pageDescription={'Find the best men products here'}>
         <Typography variant='h1' component='h1'>
            Men
         </Typography>

         <Typography variant='h2' sx={{ mb: 1 }}>
            Men Products
         </Typography>

         <ProductList products={products} />
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const products = await dbProducts.getProductsByGender('men');

   return {
      props: { products },
   };
};

export default MenPage;
