import type { NextPage, GetServerSideProps } from 'next';

import { Box, Typography } from '@mui/material';

import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title={'My Ecommerce - Search'} pageDescription={'Find the best products here'}>
      <Typography variant='h1' component='h1'>
        Search product
      </Typography>

      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
          Search Term: {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>
            We did not find any product related to
          </Typography>
          <Typography variant='h2' sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  // Maybe there are any products in the Search by the User
  let products = await dbProducts.getProductsByTerm(query);

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
