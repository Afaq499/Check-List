import React from 'react';
import { head } from 'lodash';
import { useFormik } from 'formik';
import { TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mailingAddress: Yup.string().required('Mailing Address is required'),
  phone: Yup.string().required('Phone is required'),
  jobSiteAddress: Yup.string().required('Job Site Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  numberOfRoofTypes: Yup.number()
    .min(1, 'At least one roof type is required')
    .required('Number of Roof Types is required')
});

const CustomerInformation = ({ setCustomerInfo }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.rooftop);
  const initialValues = head(formData?.customerInformation?.data) ? head(formData?.customerInformation?.data) : {
    name: '',
    mailingAddress: '',
    phone: '',
    jobSiteAddress: '',
    email: '',
    numberOfRoofTypes: '',
    mainRoofType: '',
    additionalRoofTypes: ['', '', ''],
  };

  const onSubmit = (values) => {
    setCustomerInfo(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{ marginTop: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mailing Address"
              id="mailingAddress"
              name="mailingAddress"
              variant="outlined"
              fullWidth
              value={formik.values.mailingAddress}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.mailingAddress && !!formik.errors.mailingAddress}
              helperText={formik.touched.mailingAddress && formik.errors.mailingAddress}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              id="phone"
              name="phone"
              variant="outlined"
              fullWidth
              value={formik.values.phone}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Job Site Address"
              id="jobSiteAddress"
              name="jobSiteAddress"
              variant="outlined"
              fullWidth
              value={formik.values.jobSiteAddress}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.jobSiteAddress && !!formik.errors.jobSiteAddress}
              helperText={formik.touched.jobSiteAddress && formik.errors.jobSiteAddress}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Number of Roof Types"
              id="numberOfRoofTypes"
              name="numberOfRoofTypes"
              variant="outlined"
              fullWidth
              value={formik.values.numberOfRoofTypes}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numberOfRoofTypes && !!formik.errors.numberOfRoofTypes
              }
              helperText={
                formik.touched.numberOfRoofTypes && formik.errors.numberOfRoofTypes
              }
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Box style={{ display: 'none' }}>
          <Button id="customerInfo" type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CustomerInformation;
