import { FC, useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Button, Grid, Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';

import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

interface Props {
   product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
   const { addProductToCart } = useContext(CartContext);

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      image: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1,
   });

   const onSelectedSize = (size: ISize) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         size,
      }));
   };

   const onUpdatedQuantity = (quantity: number) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity,
      }));
   };

   const onAddProduct = () => {
      if (!tempCartProduct.size) return;

      addProductToCart(tempCartProduct);

      // router.push('/cart');
   };

   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlideshow images={product.images} />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Box display='flex' flexDirection='column'>
                  {/* Titles */}
                  <Typography variant='h1' component='h1'>
                     {product.title}
                  </Typography>

                  <Typography variant='subtitle1' component='h2'>
                     ${product.price}
                  </Typography>

                  {/* Quantity */}
                  <Box sx={{ my: 2 }}>
                     <Typography variant='subtitle2'>Quantity</Typography>

                     <ItemCounter
                        currentValue={tempCartProduct.quantity}
                        updatedQuantity={onUpdatedQuantity}
                        maxValue={product.inStock}
                     />

                     <SizeSelector
                        selectedSize={tempCartProduct.size}
                        sizes={product.sizes}
                        // onSelectedSize={(size) => onSelectedSize(size)}
                        onSelectedSize={onSelectedSize}
                     />
                  </Box>

                  {/* Add to cart */}
                  {product.inStock > 0 ? (
                     <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                        {tempCartProduct.size ? 'Add to Cart' : 'Select a size'}
                     </Button>
                  ) : (
                     <Chip color='error' label='Out of stock' variant='outlined' />
                  )}

                  {/* Description */}
                  <Box sx={{ mt: 3 }}>
                     <Typography variant='subtitle2'>Description</Typography>
                     <Typography variant='body2'>{product.description}</Typography>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const slugs = await dbProducts.getAllProductSlug();

   return {
      paths: slugs.map(({ slug }) => ({
         params: { slug },
      })),
      fallback: 'blocking',
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };

   const product = await dbProducts.getProductBySlug(slug);

   if (!product) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   return {
      props: {
         product,
      },
      revalidate: 86400, // Incremental Static Regeneration (ISR) - 24hs
   };
};

/* Do not use ServerS ide Rendering
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};
*/

export default ProductPage;
