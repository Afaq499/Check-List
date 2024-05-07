import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SetRoofTopState } from '../../redux/slices/rooftop-slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Box
} from '@mui/material';

const validationSchema = Yup.object().shape({
  data: Yup.array().of(
    Yup.object().shape({
      customText: Yup.string(),
      age: Yup.string().required('Grade is Required'),
      monitoringRequired: Yup.string().required('Monitoring is Required'),
      location: Yup.string().required('Loction is Required'),
      correctiveAction: Yup.string().required('Corrective Action is Required'),
    })
  ),
});

const CustomTableOne = ({ tableInfo, TableNo, label }) => {
  const dispatch = useDispatch();
  const { customFormData } = useSelector((store) => store.rooftop);
  const [initialValues, setInitialValues] = useState({
    data: (Object.keys(customFormData || {})?.length && customFormData[label]) ?
      customFormData[label]?.data : tableInfo.map((rowData, index) => ({
        id: index + 1,
        customText: rowData.customText,
        age: '',
        monitoringRequired: false,
        location: '',
        correctiveAction: '',
      })),
  });

  const handleDataChange = (index, field, value) => {
    const updatedData = [...initialValues?.data];
    updatedData[index][field] = value;
    setInitialValues({ data: updatedData });
    if (customFormData && customFormData[label]) {
      const newObject = JSON.parse(JSON.stringify(customFormData));;
      delete newObject[label];
      dispatch(SetRoofTopState({
        field: 'customFormData', value: newObject
      }));
    }
  };

  const handleSubmit = (values) => {
    dispatch(SetRoofTopState({
      field: 'customFormData', value: {
        ...customFormData,
        [label]: values
      }
    }));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values }) => (
        <Form>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{TableNo}</TableCell>
                  <TableCell>{label}</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Monitoring Required</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Corrective Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.customText}</TableCell> {/* Display customText as non-editable */}
                    <TableCell>
                      <Field name={`data[${index}].age`} as={Select}
                        onChange={(event) => {
                          console.log('sdjksjka', event.target.value)
                          handleDataChange(
                            index,
                            'age',
                            event.target.value
                          )
                        }}

                      >
                        <MenuItem value={10}>A</MenuItem>
                        <MenuItem value={20}>B</MenuItem>
                        <MenuItem value={30}>C</MenuItem>
                      </Field>
                      <ErrorMessage style={{ color: 'red' }} name={`data[${index}].age`} component="div" />
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        aria-label="monitoringRequired"
                        name={`initialValues[${index}].monitoringRequired`}
                        value={row.monitoringRequired.toString()}
                        onChange={(event) => {
                          console.log(event.target.value);

                          handleDataChange(
                            index,
                            'monitoringRequired',
                            event.target.value === 'true'
                          )
                        }}
                      >
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                      </RadioGroup>
                      <ErrorMessage style={{ color: 'red' }} name={`data[${index}].monitoringRequired`} component="div" />
                    </TableCell>
                    <TableCell>
                      <Field name={`data[${index}].location`} as={TextField}
                        onChange={(event) =>
                          handleDataChange(
                            index,
                            'location',
                            event.target.value
                          )
                        }
                      />
                      <ErrorMessage style={{ color: 'red' }} name={`data[${index}].location`} component="div" />
                    </TableCell>
                    <TableCell>
                      <Field name={`data[${index}].correctiveAction`} as={TextField}
                        onChange={(event) =>
                          handleDataChange(
                            index,
                            'correctiveAction',
                            event.target.value
                          )
                        }
                      />
                      <ErrorMessage style={{ color: 'red' }} name={`data[${index}].correctiveAction`} component="div" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={{ display: 'flex', justifyContent: 'center', }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '30px', marginBottom: '20px' }}>Submit</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CustomTableOne;
