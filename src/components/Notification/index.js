import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ notification, setNotification }) => {
  const { message, type, open } = notification
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({
      ...notification,
      open: false
    });
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={type}
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Notification;
