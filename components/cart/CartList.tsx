import { FC, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';

import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {/* TODO: Order los productos por id */}
      {cart.map((product) => (
        <Grid key={product.slug + product.size} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
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
                Size: <strong>{product.size}</strong>
              </Typography>

              {/* Conditional */}
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10} // TODO: Poner el valor del backend
                  updatedQuantity={(newValue) => onNewCartQuantityValue(product, newValue)}
                />
              ) : (
                <Typography variant='h6'>
                  {product.quantity} {product.quantity > 1 ? 'items' : 'item'}
                </Typography>
              )}
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
