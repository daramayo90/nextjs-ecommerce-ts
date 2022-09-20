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

const WomenPage: NextPage<Props> = ({ products }) => {
   return (
      <ShopLayout
         title={'My Ecommerce - Women'}
         pageDescription={'Find the best women products here'}>
         <Typography variant='h1' component='h1'>
            Women
         </Typography>

         <Typography variant='h2' sx={{ mb: 1 }}>
            Women Products
         </Typography>

         <ProductList products={products} />
      </ShopLayout>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const products = await dbProducts.getProductsByGender('women');

   return {
      props: { products },
   };
};

export default WomenPage;
