import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  showError: boolean;
  message: string;
}

const ErrorBoundry = ({ children, showError, message }: Props): JSX.Element => {
  const [open, setOpen] = useState(showError);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default ErrorBoundry;
