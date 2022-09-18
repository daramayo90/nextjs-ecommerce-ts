import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { useForm } from 'react-hook-form';

import { validations } from '../../utils';
import { AuthLayout } from '../../components/layouts';

type FormData = {
   email: string;
   password: string;
};

const LoginPage = () => {
   const router = useRouter();

   const [providers, setProviders] = useState<any>({});
   const [showError, setShowError] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   useEffect(() => {
      getProviders().then((prov) => {
         setProviders(prov);
      });
   }, []);

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);
      await signIn('credentials', { email, password });
   };

   return (
      <AuthLayout title={'Login'}>
         <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography variant='h1' component='h1'>
                        Log In
                     </Typography>
                     <Chip
                        className='fadeIn'
                        color='error'
                        icon={<ErrorOutline />}
                        label='Not valid email or password'
                        sx={{ display: showError ? 'flex' : 'none' }}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        type='email'
                        label='Mail'
                        variant='filled'
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email', {
                           required: 'Required field',
                           validate: validations.isEmail,
                        })}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        label='Password'
                        type='password'
                        variant='filled'
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password', {
                           required: 'Required field',
                           minLength: { value: 6, message: '6 characteres minimum' },
                        })}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Button
                        type='submit'
                        color='secondary'
                        className='circular-btn'
                        size='large'
                        fullWidth>
                        Log In
                     </Button>
                  </Grid>

                  <Grid item xs={12} display='flex' justifyContent='center'>
                     <NextLink
                        href={`/auth/register?page=${router.query.page?.toString()}`}
                        passHref>
                        <Link underline='always'>Not a member yet?</Link>
                     </NextLink>
                  </Grid>

                  <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                     <Divider sx={{ width: '100%', mb: 2 }} />
                     {Object.values(providers).map((provider: any) => {
                        if (provider.id === 'credentials') return <div key='credentials'></div>;

                        return (
                           <Button
                              key={provider.id}
                              variant='outlined'
                              color='primary'
                              sx={{ mb: 1 }}
                              fullWidth
                              onClick={() => signIn(provider.id)}>
                              {provider.name}
                           </Button>
                        );
                     })}
                  </Grid>
               </Grid>
            </Box>
         </form>
      </AuthLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
   const session = await getSession({ req });

   const { page = '/' } = query;

   if (session) {
      return {
         redirect: {
            destination: page.toString(),
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

export default LoginPage;
