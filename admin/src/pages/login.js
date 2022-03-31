import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';

const Login = () => {
  const {
    authState: { user, isAuthenticated },
    loginUser
  } = useContext(AuthContext)

  const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

  
  const router = useRouter();

  if(isAuthenticated) {
    router.push('/');
  }
  
  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const login = await loginUser(loginForm)
      if(login.success) router.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={e => handleSubmit(e)} onChange={(e) => handleChange(e)}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              name="username"
              type="text"
              variant="outlined"
              required
            />
            <TextField
              required
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
