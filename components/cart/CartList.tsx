import NextLink from 'next/link';

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
import { FC } from 'react';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: Llevar a la página del producto */}
            <NextLink href='/product/slug' passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>M</strong>
              </Typography>

              {/* Conditional */}
              {editable ? <ItemCounter /> : <Typography variant='h6'>3 items</Typography>}
            </Box>
          </Grid>

          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>

            {/* Conditional */}
            {editable && (
              <Button variant='text' color='secondary'>
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
