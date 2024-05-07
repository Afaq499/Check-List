import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  Button,
  Select,
  MenuItem
} from '@mui/material';

import Loader from "./loader";
import Notification from "./Notification";
import CustomTable from './CustomTable';
import CustomerInformation from './CustomerInformation';
import InspectorInfo from './InspectorInfo';
import ImageUploader from './ImageUploader';
import GradeViewTable from './GradeViewTable';
import PdfDrawer from './drawer';

import { SetRoofTopState } from '../redux/slices/rooftop-slice';
import { SetRoofDataSlice } from '../redux/slices/roof-data-slice';

import { uploadAndSaveFile } from '../helper/firebase-handler';
import { UploadMultiTableCsv, generatePDF } from '../helper/download-file';
import { accordionMapping, gratedMapping } from './utils/constants';
import roof from './utils/images/roof-images.png';
import Box from '@mui/material/Box';


const CombineForm = () => {
  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true
  }
  const dispatch = useDispatch();
  const { formData, userId, gradesMapping } = useSelector((store) => store.rooftop);
  const { imagesData } = useSelector((store) => store.roofData);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState('');
  const [inspectorInfo, setInspectorInfo] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [isViewPdf, setIsViewPdf] = useState(false);
  const [openPdfDrawer, setOpenPdfDrawer] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    console.log('formData => ', formData);
  }, [formData]);

  const handleRoofFormSubmit = async (data) => {
    const { customerInformation, comments, inspectorInformation } = data || {};
    const forInformation = {
      formData: {
        customerInformation,
        ...data,
        comments,
        inspectorInformation,
      },
      gradesMapping,
      roofImage: roof
    }

    if (isViewPdf) {
      const pdfDataURL = await generatePDF(forInformation);
      setPdfUrl(pdfDataURL);
      setOpenPdfDrawer(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleSaveFile = async () => {
    setOpenPdfDrawer(false);
    setLoading(true)
    if (pdfUrl) {
      const pdfData = pdfUrl.split(',')[1]; // Extract base64 data from data URI
      const decodedPdfData = Buffer.from(pdfData, 'base64');
      const response = await uploadAndSaveFile({ file: decodedPdfData, userId, fileName: 'RoofForms' });
      const { success, message } = response || {};
 
      setNotification({
        open: true,
        message: success ? message : 'Error in uploading file',
        type: success ? "success" : "error",
      });

      setCustomerInfo('');
      setInspectorInfo('');
      if (success) {
        dispatch(SetRoofTopState({ field: 'formData', value: {} }));
        dispatch(SetRoofTopState({ field: 'gradesMapping', value: {} }));
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (customerInfo && inspectorInfo) {
      const { comment } = inspectorInfo;
      dispatch(SetRoofTopState({
        field: 'formData', value: {
          ...formData,
          customerInformation: { data: [customerInfo] },
          inspectorInformation: { data: [inspectorInfo] },
          ...(comment ? { comments: { data: [{ comment }] } } : {})
        }
      }));
      let error = '';
      if (!customerInfo) error = 'Please Enter Customer Information'
      else if (!comment) error = 'Please Comment';
      else if (!inspectorInfo) error = 'Please Enter Inspector Information';
      else if (!formData?.Images?.data?.length) error = 'Please select at least one image';
      else if (Object.keys(formData)?.length < 20) error = 'Please Complete Form';

      if (error) {
        setNotification({
          open: true,
          message: error,
          type: "error",
        });
      } else {
        handleRoofFormSubmit({
          ...formData,
          ...imagesData,
          Images: formData?.Images,
          customerInformation: { data: [customerInfo] },
          inspectorInformation: { data: [inspectorInfo] },
          comments: { data: [{ comment }] }
        });
      }
    }
    setCustomerInfo("");
    setInspectorInfo("");
  }, [customerInfo, inspectorInfo]);

  const listWithGrade = [
    'Shingles',
    'Metal',
    'Tile',
    'Wood Shakes',
    'Stonecoated Steel',
    'Gravel / Rock',
    'Modified bitumen/ rolled roofing',
    'Single Ply / Ballast',
    'Coating',
    'Modified Bitumen / Rolled Roofing',
    'Parapet Walls'
  ]

  return (
    <>
      {
        loading && <Loader />
      }
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <div style={{ width: '80%', marginLeft: '10%', marginTop: '5px' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img src={roof} alt='Roof Inspection' />
        </div>
        {/* <GradeViewTable /> */}
        <div style={{ marginTop: '23px', width: '100%' }}>
          <ImageUploader />
        </div>
        <CustomerInformation setCustomerInfo={setCustomerInfo} />
        <br />
        {
          accordionMapping?.map(({ name, tableInfo, TableNo, grade }) => {
            return <>
              <Accordion
                key={name}
                style={formData?.[name] ? { border: '1px solid green' } : {}}
              >
                <AccordionSummary
                  onClick={() => {
                    if (openAccordions?.includes(name)) {
                      const newOpenList = [...openAccordions]?.filter(x => x !== name);
                      setOpenAccordions(newOpenList);
                    } else {
                      const newOpenList = [...openAccordions, name];
                      setOpenAccordions(newOpenList);
                    }
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '92%' }}>
                    <Typography>{name}</Typography>
                    {
                      listWithGrade?.includes(name) ? <div>
                        <span> Grade </span>
                        <Select
                          id="demo-simple-select"
                          value={gradesMapping?.[name] || ''}
                          label="Age"
                          style={{ height: '32px' }}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            dispatch(SetRoofTopState({
                              field: 'gradesMapping',
                              value: {
                                ...gradesMapping,
                                [name]: event.target.value
                              }
                            }));
                          }}
                        >
                          <MenuItem value={'A'}>A</MenuItem>
                          <MenuItem value={'B'}>B</MenuItem>
                          <MenuItem value={'C'}>C</MenuItem>
                          <MenuItem value={'D'}>D</MenuItem>
                          <MenuItem value={'F'}>F</MenuItem>
                        </Select>
                      </div> : ''
                    }
                  </div>

                </AccordionSummary>
                <CustomTable tableInfo={tableInfo} TableNo={TableNo} label={name} />
              </Accordion ><br />
              {
                openAccordions?.includes(name) && gratedMapping?.[gradesMapping[name]] && name !== "Exterior Walls" ?
                  <Box component="section" sx={{
                    p: 2,
                    border: '1px dashed grey',
                    width: '95%', // Fixed size horizontally
                    height: 'auto', // Increases vertically
                    overflowY: 'auto',
                    marginLeft: '10px',
                    backgroundColor: '#f0f0f0', // Background color
                    borderRadius: '8px', // Border radius
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  }}>
                    <div style={{ fontWeight: 'bold' }}>{gratedMapping?.[gradesMapping[name]]?.split(',')?.[0]}</div> <br />
                    <div>{gratedMapping?.[gradesMapping[name]]?.split(',')?.slice(1)?.join(', ')}</div>
                  </Box> : ''
              }
              <br />
            </>
          })
        }
        <InspectorInfo setInspectorInfo={setInspectorInfo} />
        <div style={{ display: 'flex', width: '90%' }}>
          <div style={{ marginRight: '15px', width: '70%' }}>
            <Button
              {...configButton}
              onClick={() => {
                setIsViewPdf(true);
                document.getElementById('customerInfo').click();
                document.getElementById('inspectorBtn').click();
              }}
            >View Pdf</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                dispatch(SetRoofTopState({ field: 'formData', value: {} }));
                dispatch(SetRoofTopState({ field: 'gradesMapping', value: {} }));
                window.location.reload();
              }}
              style={{ marginBottom: '20px', border: '1px solid red', color: 'red' }}
              color='secondary'
            >Clear Form</Button>
          </div>
        </div>
        {
          pdfUrl && <PdfDrawer
            open={openPdfDrawer}
            onClose={() => setOpenPdfDrawer(false)}
            pdfUrl={pdfUrl}
            onSave={handleSaveFile}
          />
        }
      </div >
    </>

  );
};

export default CombineForm;
