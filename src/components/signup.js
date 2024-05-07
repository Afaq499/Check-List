import React, { useState } from "react";
import { Formik } from 'formik';
import { object, string, ref, bool } from 'yup';
import { FormControl } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Cryptr from 'cryptr';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Notification from "./Notification";
import Loader from "./loader";

import { handleSignUp } from "../helper/firebase-handler";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const schema = object().shape({
    firstName: string().required('Enter your first name!'),
    lastName: string().required('Enter your last name!'),
    email: string().email('Invalid Email').required('Enter your email!'),
    password: string()
      .required('Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/,
        "Must Contain 12 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: string()
      .required("Passwords must match")
      .oneOf([ref("password"), null], "Passwords must match")
  });

  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleUserSignUp = async (values) => {
    const { firstName, lastName, email, password } = values;
    const cryptr = new Cryptr(process.env.REACT_APP_Password_Secret_key);
    const encryptedPassword = cryptr.encrypt(password);
    const res = await handleSignUp({ firstName, lastName, email: email.toLowerCase(), password: encryptedPassword });
    setNotification({
      open: true,
      message: res?.message,
      type: res?.success ? "success" : "error",
    });
    setLoading(false);
    if (res?.success) navigate('/signin')
  }

  return (
    <>
      {
        loading && <Loader />
      }
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          setLoading(true);
          handleUserSignUp(values);
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched
        }) => (
          <FormControl style={{
            display: 'flex',
            justifyContent: 'center'
          }} onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          value={values?.firstName}
                          error={touched?.firstName && errors?.firstName}
                          helperText={touched?.firstName && errors?.firstName ? errors?.firstName : ' '}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          value={values?.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.lastName && errors?.lastName}
                          helperText={touched?.lastName && errors?.lastName ? errors?.lastName : ' '}
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          value={values?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.email && errors?.email}
                          helperText={touched?.email && errors?.email ? errors?.email : ' '}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          value={values?.password}
                          error={touched?.password && errors?.password}
                          helperText={touched?.password && errors?.password ? errors?.password : ' '}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          value={values?.confirmPassword}
                          onChange={handleChange}
                          error={touched?.confirmPassword && errors?.confirmPassword}
                          helperText={touched?.confirmPassword && errors?.confirmPassword ? errors?.confirmPassword : ' '}
                          onBlur={handleBlur}
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="new-password"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type='submit'
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={loading}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/signin" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          </FormControl>
        )}
      </Formik>
    </>
  );
}