import { useContext } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';

import { CartContext } from '../../context';
import { countries } from '../../utils';
import { ShopLayout } from '../../components/layouts';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: string;
   country: string;
   phone: string;
};

//TODO: Tomar la información de la base de datos
const getAddressFromCookies = (): FormData => {
   return {
      firstName: Cookies.get('firstName') || '',
      lastName: Cookies.get('lastName') || '',
      address: Cookies.get('address') || '',
      address2: Cookies.get('address2') || '',
      zipcode: Cookies.get('zipcode') || '',
      city: Cookies.get('city') || '',
      country: Cookies.get('country') || '',
      phone: Cookies.get('phone') || '', // TODO: Transformar el numero a string
   };
};

const AddressPage = () => {
   const router = useRouter();
   const { updateAddress } = useContext(CartContext);

   // TODO: Tomar la información de la base de datos en vez de las Cookies
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: getAddressFromCookies(),
   });

   // TODO: Grabar la información en la base de datos en vez de Cookies
   const onSubmitAddress = (data: FormData) => {
      updateAddress(data);
      router.push('/checkout/summary');
   };

   return (
      <ShopLayout title={'Address'} pageDescription={'Confirm delivery address'}>
         <Typography variant='h1' component='h1'>
            Address
         </Typography>

         <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
            <Grid container spacing={2} sx={{ mt: 2 }}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Name'
                     variant='filled'
                     fullWidth
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                     {...register('firstName', {
                        required: 'Required field',
                     })}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Surname'
                     variant='filled'
                     fullWidth
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                     {...register('lastName', {
                        required: 'Required field',
                     })}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Address'
                     variant='filled'
                     fullWidth
                     error={!!errors.address}
                     helperText={errors.address?.message}
                     {...register('address', {
                        required: 'Required field',
                     })}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Address 2'
                     variant='filled'
                     fullWidth
                     error={!!errors.address2}
                     helperText={errors.address2?.message}
                     {...register('address2')}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Zip Code'
                     variant='filled'
                     fullWidth
                     error={!!errors.zipcode}
                     helperText={errors.zipcode?.message}
                     {...register('zipcode', {
                        required: 'Required field',
                     })}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='City'
                     variant='filled'
                     fullWidth
                     error={!!errors.city}
                     helperText={errors.city?.message}
                     {...register('city', {
                        required: 'Required field',
                     })}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     key={Cookies.get('country') || countries[0].code}
                     select
                     label='Country'
                     variant='filled'
                     defaultValue={Cookies.get('country') || countries[1].code} //TODO: Leer de la bd
                     fullWidth
                     error={!!errors.country}
                     helperText={errors.country?.message}
                     {...register('country', {
                        required: 'Required field',
                     })}>
                     {countries.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                           {country.name}
                        </MenuItem>
                     ))}
                  </TextField>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label='Phone number'
                     variant='filled'
                     fullWidth
                     error={!!errors.phone}
                     helperText={errors.phone?.message}
                     {...register('phone', {
                        required: 'Required field',
                        // valueAsNumber: true, TODO: Poner que solo sea numero
                     })}
                  />
               </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
               <Button type='submit' color='secondary' className='circular-btn' size='large'>
                  Finish order
               </Button>
            </Box>
         </form>
      </ShopLayout>
   );
};

/** NOT IN USED ANYMORE => MIDDLEWARES
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const { token = '' } = req.cookies;
   let isValidToken = false;

   try {
      await jwt.isValidToken(token);
      isValidToken = true;
   } catch (error) {
      isValidToken = false;
   }

   if (!isValidToken) {
      return {
         redirect: {
            destination: '/auth/login?page=/checkout/address',
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};
 */

export default AddressPage;
