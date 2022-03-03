import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Container, Grid, Paper, Typography,
  TableHead, Table, TableRow, TableCell, TableBody,
  Box, Modal, Button, TextField, Divider
} from "@mui/material";
import { getMesures } from "../../store/actions/data";
import SnackBarAlert from "../Utility/SnackBarAlert";
import dataService from "../../store/services/data.service";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 4,
  mt: 2,
  '& .MuiTextField-root': { m: 1, width: '25ch' },
};

const Mesures = (props) => {
  const [open, setOpen] = React.useState(false);
  const [mesure, setMesure] = React.useState('');
  const [error, setError] = React.useState(false);
  const [alert, setAlert] = React.useState([]);
  const [helperText, setHelperText] = React.useState('');
  const mesures = useSelector((state) => state.data.mesures || []);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setMesure(event.target.value);
    setHelperText('');
    setError(false);
  };

  const handleNewMeasure = (event) => {
    event.preventDefault();
    if (mesures.filter(o => o.name.toUpperCase() === mesure.toUpperCase()).length > 0) {
      setHelperText('Measure Already exists!')
      setError(true);
    } 
    else {
      dataService.postMeasure({ name: mesure }).then((res) => {
        res.status === 200 && res.data && res.data._id && setAlert(["success", "Mesure added successfully!"]);
        dispatch(getMesures());
        setMesure('');
        setOpen(!open);
        setHelperText('');
        setError(false);
      }).catch((error) => {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error, message);
        setAlert(["error", message]);
      })
    }
  };

  const handleDeleteMesure = (id) => {
    dataService.deleteMeasure({id}).then((res) => {
      res.status === 200 && res.data && res.data._id && setAlert(["success", `Mesure : ${res.data.name} deleted successfully!`]);
      dispatch(getMesures());
    }).catch((error) => {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
      console.log(error, message);
      setAlert(["error", message]);
    })
  };

  useEffect(() => {
    dispatch(getMesures());
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5">
            Data Entry - Mesures
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={() => setOpen(!open)}>{"Add Mesure"}</Button>
        </Grid>
      </Grid>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Mesure</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Updated at</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mesures.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{moment(row.createdAt).format("MMMM Do YYYY, hh:mm")}</TableCell>
                      <TableCell>{moment(row.updatedAt).format("MMMM Do YYYY, hh:mm")}</TableCell>
                      <TableCell>
                        <Button color="error" onClick={() => handleDeleteMesure(row._id)}><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={handleNewMeasure} component="form">
          {/* <div> */}
          <Grid container spacing={2}>
            <Typography component="h1" variant="h5">
              New Mesure
            </Typography>
            <Divider />
            <Grid item xs={8}>
              <TextField
                required
                id="outlined-name"
                label="New Mesure"
                value={mesure}
                onChange={handleChange}
                error={error}
                helperText={helperText}
              />
              {/* </div> */}
              {/* <div> */}
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>{"Add"}</Button>
            </Grid>
            {/* </div> */}
          </Grid>
        </Box>
      </Modal>
      {alert.length ? <SnackBarAlert severity={alert[0]} message={alert[1]} setAlert={setAlert} /> : null}
    </React.Fragment>
  )
}

export default Mesures;