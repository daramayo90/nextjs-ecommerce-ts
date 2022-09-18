import { useContext, useEffect } from 'react';
import { Card, CardContent, Divider, Grid, Typography, Box, Button } from '@mui/material';

import { CartContext } from '../../context';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { useRouter } from 'next/router';

const CartPage = () => {
   const router = useRouter();
   const { isLoaded, cart } = useContext(CartContext);

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace('/cart/empty');
      }
   }, [isLoaded, cart, router]);

   // Avoid render anything in client-side
   if (!isLoaded || cart.length === 0) {
      return <></>;
   }

   return (
      <ShopLayout title={'Cart - 3'} pageDescription={'Shopping Cart'}>
         <Typography variant='h1' component='h1'>
            Cart
         </Typography>

         <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList editable />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Card className='summary-card'>
                  <CardContent>
                     <Typography variant='h2'>Order</Typography>

                     <Divider sx={{ my: 1 }} />

                     <OrderSummary />

                     <Box sx={{ mt: 3 }}>
                        <Button color='secondary' className='circular-btn' fullWidth>
                           Checkout
                        </Button>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default CartPage;
