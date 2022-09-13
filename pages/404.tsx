import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='There is anything to show here'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        height='calc(100vh - 200px)'>
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>
          404 |
        </Typography>

        <Typography marginLeft={2}>We do not find any page here | </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
