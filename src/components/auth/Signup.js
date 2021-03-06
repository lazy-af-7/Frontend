import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import GoogleAccount from '../layout/GoogleAccount';
import logo from '../../resources/logo.png';
import { useState } from 'react';
import MySnackbar from '../layout/MySnackbar';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [alert, setAlert] = useState({ status: false, msg: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onSubmit = () => {
    // Validations
    const { firstName, email, password, confirmPassword } = form;
    var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    if (!email || !password || !firstName) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields.',
      });
      return;
    }
    if (email && !pattern.test(email)) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Invalid Email. Please try again!',
      });
      return;
    }
    if (password && password.length < 8) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password length should be min 8 characters',
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Password does not match',
      });
      return;
    }
    console.log('SIGNUP SUCCESSFULLY');
  };

  useEffect(() => {
    document.title = 'Quizeal | Sign Up';
  }, []);

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt='logo' height='40' width='40' />

          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  variant='outlined'
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  variant='outlined'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/login' className={'styleLink'}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Divider variant='middle' className={classes.divider} />
        <GoogleAccount />
        <Box mt={5}>
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright ?? '}
            <Link to='/' className={'styleLink'}>
              Quizeal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
}
