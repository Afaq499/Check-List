import React, { useState } from "react";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { FormControl } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

import { SetRoofTopState } from "../redux/slices/rooftop-slice";
import { signInUser } from "../helper/firebase-handler";
import Loader from "./loader";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = object().shape({
    email: string().email('Invalid Email').required('Enter your email!')
  });
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values) => {
    const {email, password } = values;
    const res = await signInUser({ email: email.toLowerCase(), password });
    setNotification({
      open: true,
      message: res?.message,
      type: res?.success ? "success" : "error",
    });
    setLoading(false);
    if (res?.success) {
      dispatch(SetRoofTopState({ field: 'userId', value: res?.userId }));
      navigate('/');
    }
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
          handleSignIn(values);
        }}
        initialValues={{
          email: '',
          password: ''
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
                    Sign In
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
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
                      Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          Not have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </FormControl>
        )}
      </Formik>
    </>
  );
}