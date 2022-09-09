import type { NextPage } from 'next';

import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout title={'My Ecommerce - Home'} pageDescription={'Find the best products here'}>
      <Typography variant='h1' component='h1'>
        Shop
      </Typography>

      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>

      <Grid container spacing={4}>
        {initialData.products.map((product) => (
          <Grid item xs={6} sm={4} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component='img'
                  image={`/products/${product.images[0]}`}
                  alt={product.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
};

export default Home;
