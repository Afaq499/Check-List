import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Button } from '@mui/material';

import Loader from "./loader";
import Notification from "./Notification";

import { UploadMultiTableCsv } from '../helper/download-file';
import { uploadAndSaveFile } from '../helper/firebase-handler';
import { SetRoofTopState } from '../redux/slices/rooftop-slice';
import { uploadImageOnS3 } from '../helper/upload-file-on-s3';

import CustomTable from './CustomTable';

import {
  initialTableDataForTable_A,
  initialTableDataForTable_B,
  initialTableDataForTable_C,
  initialTableDataForTable_D,
  initialTableDataForTable_E,
  initialTableDataForTable_F,
  initialTableDataForTable_G,
  initialTableDataForTable_H,
  initialTableDataForTable_One_I,
  initialTableDataForTable_J,
  initialTableDataForTable_One_K,
  initialTableDataForTable_One_L,
  gutters,
  initialTableDataForTable_AA,
  initialTableDataForTable_BB,
  initialTableDataForTable_DD,
  initialTableDataForTable_EE,
  initialTableDataForTable_FF,
  initialTableDataForTable_GG,
  initialTableDataForTable_HH,
  initialTableDataForTable_II,
  initialTableDataForTable_JJ
} from './utils/constants';

export const ChecklistForm = () => {
  const dispatch = useDispatch();
  const { checkListForm, userId } = useSelector((store) => store.rooftop);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  return (
    <div style={{ width: '70%', margin: '0 auto', marginTop: '30px', marginBottom: '25px' }}>
      {
        loading && <Loader />
      }
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <div style={{
        display: 'flex',
        gap: '3%',
        marginBottom: '17px',
      }}>
        <Grid item xs={3}>
          <Typography>
            Please upload any supporting images here
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
            }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Browse File
            </Button>
          </label>
          {selectedFile && <>&nbsp; &nbsp; <span>Selected file: </span> &nbsp; <img height={50} width={70} src={preview} alt='img' /></>}
        </Grid>
      </div>
      <Accordion style={{ border: checkListForm && checkListForm['Shingles'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Shingles</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_A} TableNo="A" label="Shingles" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Metal'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Metal</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_B} TableNo="B" label="Metal" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Tile'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Tile</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_C} TableNo="C" label="Tile" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Wood Shakes'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Wood Shakes</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_D} TableNo="D" label="Wood Shakes" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Stonecoated Steel'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Stonecoated Steel</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_E} TableNo="E" label="Stonecoated Steel" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Gravel / Rock'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Gravel / Rock</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_F} TableNo="F" label="Gravel / Rock" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Modified Bitumen / Rolled Roffing'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Modified Bitumen / Rolled Roffing</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_G} TableNo="G" label="Modified Bitumen / Rolled Roffing" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Single Ply / Ballast'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Single Ply / Ballast</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_H} TableNo="H" label="Single Ply / Ballast" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Coating'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Coating</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_One_I} TableNo="I" label="Coating" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Parpet Walls'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Parapet Walls</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_J} TableNo="J" label="Parpet Walls" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Decking'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Decking</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_One_K} TableNo="K" label="Decking" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Sealants'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sealants</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_One_L} TableNo="L" label="Sealants" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Gutters'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Gutters</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={gutters} TableNo="L" label="Gutters" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Scuppers / Drains'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Scuppers / Drains</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_AA} TableNo="AA" label="Scuppers / Drains" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['A/C'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>A/C</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_BB} TableNo="BB" label="A/C" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Properly'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Properly</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_DD} TableNo="DD" label="Properly" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Top of Chimney Sealed'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Top of Chimney Sealed</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_EE} TableNo="EE" label="Top of Chimney Sealed" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Electrical Conduct'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Electrical Conduct</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_FF} TableNo="FF" label="Electrical Conduct" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Gas Line'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Gas Line</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_GG} TableNo="GG" label="Gas Line" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Satellite Dish Sealed'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Satellite Dish Sealed</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_HH} TableNo="HH" label="Satellite Dish Sealed" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Roof Clean of Debri'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Roof Clean of Debri</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_II} TableNo="II" label="Roof Clean of Debri" />
      </Accordion>
      <Accordion style={{ border: checkListForm && checkListForm['Interior Water Damage'] ? '1px solid green' : 'none', marginBottom: '5px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Interior Water Damage</Typography>
        </AccordionSummary>
        <CustomTable tableInfo={initialTableDataForTable_JJ} TableNo="JJ" label="Interior Water Damage" />
      </Accordion>
      <Grid xs={10} item style={{
        display: 'flex',
        gap: '2%'
      }}>
        <Button
          variant='contained'
          color='primary'
          onClick={async () => {
            if (!selectedFile) {
              setNotification({
                open: true,
                message: 'Please Select Image',
                type: "error",
              });
              return;
            }
            setLoading(true);
            try {
              await uploadImageOnS3(selectedFile);
            } catch (error) {
              setNotification({
                open: true,
                message: error,
                type: "error",
              });
              return;
            }
            const imageUrl = `${process.env.REACT_APP_S3_BUCKET_BASE_URL}/${selectedFile?.name}`
            const file = UploadMultiTableCsv(checkListForm, imageUrl);
            const { success, message } = await uploadAndSaveFile({ file, userId, fileName: 'CheckListForm' });
            setTimeout(() => {
              setLoading(false);
            }, 1000);

            setNotification({
              open: true,
              message,
              type: success ? "success" : "error",
            });
          }}
          disabled={Object.keys(checkListForm || {})?.length !== 22}
          fullWidth={true}
          style={{ marginBottom: '20px', marginTop: '15px', width: '80%' }}>
          Submit
        </Button>
        <Button
          style={{
            marginBottom: '20px',
            marginTop: '15px',
            width: '20%',
            border: '1px solid'
          }}
          onClick={() => {
            dispatch(SetRoofTopState({ field: 'checkListForm', value: {} }));
            setSelectedFile('');
            window.location.reload();
          }}
          color='secondary'

        >Clear Form</Button>
      </Grid>
    </div >
  );
}
