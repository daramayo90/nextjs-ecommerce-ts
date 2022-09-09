import NextLink from 'next/link';

import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
  return (
    <ShopLayout title={'Empty cart'} pageDescription={'There is any articles in the shop cart'}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        height='calc(100vh - 200px)'>
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Your cart is empty</Typography>
          <NextLink href='/' passHref>
            <Link typography='h4' color='secondary'>
              Back
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
