import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarAlert(props) {
  const [open, setOpen] = React.useState(true);
  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => {setOpen(false); props.setAlert([])}} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
        <SnackAlert onClose={() => {setOpen(false); props.setAlert([])}} severity={props.severity} sx={{ width: '100%' }}>{props.message || "Success"}</SnackAlert>
      </Snackbar>
    </Stack>
  );
}
