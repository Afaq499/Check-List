import React, { useEffect, useRef } from 'react';
import { Drawer, IconButton, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/KeyboardBackspace';

const PdfDrawer = ({ onClose, open, pdfUrl, onSave }) => {
  const containerRef = useRef(null);
  const screenHeight = window.screen.height;

  useEffect(() => {
    if (pdfUrl) {
      if (containerRef.current) {
        // containerRef.current.src = pdfUrl;
        // containerRef.current.style.width = `${1200}px`;
      }
    }
  }, [pdfUrl, containerRef]);

  const handleDrawerClose = () => {
    onClose(false);
  };

  const configButton = {
    variant: 'contained',
    color: 'primary',
  }

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '1250px',
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: 'rgba(21, 101, 216, 1)' }} />
            </IconButton>
            <h2>PDF View</h2>
            <Button
              {...configButton}
              style={{
                marginLeft: '67%',
                height: '30px',
                marginTop: '27px',
                width: '159px'
              }}
              onClick={onSave}
            >Save Pdf</Button>
          </div>
          <iframe
            title="PDF Preview"
            ref={containerRef}
            style={{ width: '100%', height: screenHeight - 300, border: 'none', marginLeft: '20px' }}
            src={pdfUrl}
          />
        </div>

      </Drawer>
    </div>
  );
}

export default PdfDrawer;
