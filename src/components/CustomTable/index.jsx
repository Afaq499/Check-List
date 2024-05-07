import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uniq } from 'lodash';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { SetRoofTopState } from '../../redux/slices/rooftop-slice';
import { SetRoofDataSlice } from '../../redux/slices/roof-data-slice';


function CustomTable({ tableInfo, TableNo, label }) {
  const dispatch = useDispatch();

  const { formData } = useSelector((store) => store.rooftop);
  const { imagesData } = useSelector((store) => store.roofData);

  const [data, setData] = useState(
    formData && formData[label] ? formData[label]?.data :
      tableInfo.map((row) => ({
        ...row
      }))
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const tobase64Handler = async (evt) => {
    const filePathsPromises = [];
    const imagesNames = [];
    Object.values(evt.target.files).forEach(file => {
      imagesNames.push(file?.name);
      filePathsPromises.push(toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    return {
      images: mappedFiles,
      imagesNames
    };
  }


  const handleDataChange = async (index, field, value) => {
    setIsFormSubmitted(false);
    let updatedData = JSON.parse(JSON.stringify(data));
    // let updatedData = [...data];
    if (field === 'images') {
      const { images, imagesNames } = await tobase64Handler(value);
      updatedData[index] = {
        ...updatedData[index],
        images: uniq([...(updatedData[index]?.images || []), ...images]),
        imagesNames: uniq([...(updatedData[index]?.imagesNames || []), ...imagesNames]),
      };
      setData(JSON.parse(JSON.stringify(updatedData)));
    }
    else {
      if (field === 'status' && !value && updatedData[index]?.images) {
        updatedData[index] = {
          ...updatedData[index],
          [field]: value,
          images: [],
          imagesNames: []
        };
      } else {
        updatedData[index] = {
          ...updatedData[index],
          [field]: value
        };
      }
    }
    setData(updatedData);
    if (formData && formData[label]) {
      const newObject = JSON.parse(JSON.stringify(formData));
      delete newObject[label];
      dispatch(SetRoofTopState({
        field: 'formData', value: newObject
      }));
    }
  };

  const onSubmitForm = () => {
    setIsFormSubmitted(true);
    const isAnyError = data?.filter(({ status, location, correctiveAction, actualStatus }) => {
      return status !== actualStatus && (!location || !correctiveAction);
    }) || '';
    if (isAnyError?.length) return;

    dispatch(SetRoofDataSlice({
      field: 'imagesData', value: {
        ...imagesData,
        [label]: { data }
      }
    }));
    const labelsData = data?.map(({ images, imagesNames, ...rest }) => {
      return { ...rest }
    });
    dispatch(SetRoofTopState({
      field: 'formData', value: {
        ...formData,
        [label]: { data: labelsData }
      }
    }));
  }

  return (
    <div key={TableNo}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{TableNo}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell>Status (YES/NO)</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Corrective Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return <TableRow key={index}>
                <TableCell>{row.itemNo}</TableCell>
                <TableCell style={{ width: '400px' }}>
                  <TextField value={row?.customText} disabled fullWidth InputProps={{ style: { width: '100%' } }}
                  />
                </TableCell>
                <TableCell>
                  <RadioGroup
                    aria-label="status"
                    name={`data[${index}].status`}
                    value={row.status.toString()}
                    onChange={(event) => {
                      handleDataChange(
                        index,
                        'status',
                        event.target.value === 'true'
                      )
                    }
                    }
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
                  {(row.status !== row.actualStatus) ? (
                    <div>
                      {/* Conditionally render the Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Upload
                        <input multiple type="file" accept="image/*" style={{ display: 'none' }}
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              handleDataChange(
                                index,
                                'images',
                                event
                              )
                            }
                          }}
                        />
                      </Button>
                    </div>
                  ) : null}
                  {
                    (row.status !== row.actualStatus && row?.images?.length) ? row?.imagesNames?.map((imageName) => {
                      return <div>{imageName}</div>
                    }) : ""
                  }
                </TableCell>

                <TableCell>
                  <TextField
                    type="text"
                    value={row.location.toString()}
                    onChange={(event) => {
                      handleDataChange(
                        index,
                        'location',
                        event.target.value
                      )
                    }
                    }
                    name={`data[${index}].location`}
                  /> <br />
                  {isFormSubmitted && row.status !== row.actualStatus && !row.location.toString() &&
                  <span style={{ color: 'red' }}>Location is required</span>}
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    name={`data[${index}].correctiveAction`}
                    value={row.correctiveAction.toString()}
                    onChange={(event) => {
                      handleDataChange(
                        index,
                        'correctiveAction',
                        event.target.value
                      )
                    }
                    }
                  /> <br />
                  {isFormSubmitted && row.status !== row.actualStatus && !row.correctiveAction.toString() &&
                  <span style={{ color: 'red' }}>Corrective Action is required</span>}
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={onSubmitForm}
        style={{ marginBottom: '20px', marginLeft: '45%' }}
      >
        Submit
      </Button>
    </div>
  );
}

export default CustomTable;
