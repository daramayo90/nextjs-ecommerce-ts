import { useState } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { useForm } from 'react-hook-form';

import { frontApi } from '../../api';
import { validations } from '../../utils';
import { AuthLayout } from '../../components/layouts';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onRegisterForm = async ({ email, name, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await frontApi.post('/user/register', { email, name, password });
      const { token, user } = data;
      console.log(token, user);
    } catch (error) {
      console.log('Invalid credentials');
      setShowError(true);
      setTimeout(() => setShowError(false), 3500);
    }
  };

  return (
    <AuthLayout title={'Register'}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Create new account
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
                label='Full Name'
                variant='filled'
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', {
                  required: 'Required field',
                  minLength: { value: 2, message: '2 characteres minimum' },
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='E-Mail'
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
                Sign in
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>Do you already have an account??</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
