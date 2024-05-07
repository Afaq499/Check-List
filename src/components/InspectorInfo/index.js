import React from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Button } from '@mui/material';
import Textfield from "../FormsUI/TextFields";
// import DateTimePicker from './DateTime';
import DateTimePicker from '../DateTime';
import MultilineTextField from '../MultilineTextField';

import { SetRoofTopState } from '../../redux/slices/rooftop-slice';
import { getRoodFormInitialStates, validationSchema } from '../utils/constants';

const InspectorInfo = ({ setInspectorInfo }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((store) => store.rooftop);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Formik
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setInspectorInfo(values);
              }}
              initialValues={getRoodFormInitialStates({ formData })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={2} style={{ margin: '0 auto' }}>
                    <Grid xs={12} container style={{ marginTop: '20px' }}>
                      <Grid xs={10} item>
                        <MultilineTextField name="comment" label="Enter your comment" rows={4}
                          handleBlur={handleBlur}
                          touched={touched}
                          handleChange={(e) => handleChange(e)}
                          value={values?.comment}
                          error={touched?.comment && errors?.comment}
                          helperText={touched?.comment && errors?.comment ? errors?.comment : ' '}
                        />

                        {/* Inspector name */}

                        <Grid container xs={12} spacing={2} style={{ marginTop: "20px" }}>
                          <Grid item xs={6}>
                            <Typography>Inspector Name</Typography>
                          </Grid>
                          <Grid item xs={3} >
                            <Textfield
                              name="inspectorFirstName"
                              label="First Name"
                              value={values?.inspectorFirstName}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorFirstName && errors?.inspectorFirstName}
                              helperText={touched?.inspectorFirstName && errors?.inspectorFirstName ? errors?.inspectorFirstName : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Textfield
                              name="inspectorLastName"
                              label="Last Name"
                              value={values?.inspectorLastName}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorLastName && errors?.inspectorLastName}
                              helperText={touched?.inspectorLastName && errors?.inspectorLastName ? errors?.inspectorLastName : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                        </Grid>

                        {/* Position */}
                        <Grid container xs={12}>
                          <Grid item xs={6}>
                            <Typography>Position </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Textfield
                              name="inspectorPosition"
                              label="Position"
                              value={values?.inspectorPosition}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorPosition && errors?.inspectorPosition}
                              helperText={touched?.inspectorPosition && errors?.inspectorPosition ? errors?.inspectorPosition : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                        </Grid>


                        {/* Inspector phone number and email */}
                        {/* Phone Number */}
                        <Grid container xs={12} spacing={2}>
                          <Grid item xs={6}>
                            <Typography>Phone Number</Typography>
                          </Grid>
                          <Grid item xs={3} >
                            <Textfield
                              name="inspectorAreaCode"
                              label="Area Code"
                              value={values?.inspectorAreaCode}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorAreaCode && errors?.inspectorAreaCode}
                              helperText={touched?.inspectorAreaCode && errors?.inspectorAreaCode ? errors?.inspectorAreaCode : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Textfield
                              name="inspectorPhoneNo"
                              label="Phone Number"
                              value={values?.inspectorPhoneNo}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorPhoneNo && errors?.inspectorPhoneNo}
                              helperText={touched?.inspectorPhoneNo && errors?.inspectorPhoneNo ? errors?.inspectorPhoneNo : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                        </Grid>
                        {/* Email */}
                        <Grid container xs={12}>
                          <Grid item xs={6}>
                            <Typography>Email </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Textfield
                              name="inspectorEmail"
                              label="Email"
                              value={values?.inspectorEmail}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorEmail && errors?.inspectorEmail}
                              helperText={touched?.inspectorEmail && errors?.inspectorEmail ? errors?.inspectorEmail : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                              inputProps={{ autoCorrect: "off" }}
                            />
                          </Grid>
                        </Grid>

                        <Grid container xs={12}>
                          <Grid item xs={6}>
                            <Typography>Inspection Date</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <DateTimePicker
                              name="inspectorInspectionDate"
                              label="Inspection Date"
                              value={values?.inspectorInspectionDate}
                              onChange={(e) => handleChange(e)}
                              error={touched?.inspectorInspectionDate && errors?.inspectorInspectionDate}
                              helperText={touched?.inspectorInspectionDate && errors?.inspectorInspectionDate ? errors?.inspectorInspectionDate : ' '}
                              onBlur={handleBlur}
                              style={{ marginBottom: '20px' }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button id='inspectorBtn' style={{display: 'none'}} type='submit'>submit</Button>
                </Form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>

  );
};

export default InspectorInfo;
