import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { validations } from '../../utils';
import { AuthLayout } from '../../components/layouts';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3500);
      return;
    }

    // TODO: navegar a la pantalla que el usuario estaba
    router.replace('/');
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
              <NextLink href='/auth/register' passHref>
                <Link underline='always'>Not a member yet?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
