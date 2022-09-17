import NextLink from 'next/link';

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.log({ data });
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
