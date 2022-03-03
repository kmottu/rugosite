import * as React from 'react';
import {
  Alert
} from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from './Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/auth';

const theme = createTheme();

export default function SignUp() {

  const [formData, setFormData] = React.useState({});
  const message = useSelector((state) => state.message.message || '');
  const [success, setSuccess] = React.useState(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(register(formData))
      .then(() => {
        setSuccess(true);
        setFormData({});
      })
      .catch(() => {
        setSuccess(false);
      });

  };

  React.useEffect(() => {
    let timer = setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 6000)
    return (() => clearTimeout(timer));
  }, [message]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {success != null && message ? <Alert severity={success ? "success" : "error"}>{message}</Alert> : null}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formData.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formData.password || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="descipline"
                  label="Descipline"
                  name="descipline"
                  onChange={handleChange}
                  value={formData.descipline || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="organization"
                  label="Organization Name"
                  name="organization"
                  onChange={handleChange}
                  value={formData.organization || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="adresse"
                  label="Organization Adresse"
                  name="adresse"
                  onChange={handleChange}
                  value={formData.adresse || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="localization"
                  label="Localization"
                  name="localization"
                  onChange={handleChange}
                  value={formData.localization || ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}