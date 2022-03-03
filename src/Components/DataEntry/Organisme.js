import moment from "moment";
import SnackBarAlert from "../Utility/SnackBarAlert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganismes } from "../../store/actions/data";
import dataService from "../../store/services/data.service";
import {
  Container, Grid, Paper, Typography,
  TableHead, Table, TableRow, TableCell, TableBody,
  Box, Modal, Button, TextField, Divider, Alert
} from "@mui/material";
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

const Organisme = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [orgObj, setOrgObj] = React.useState({nom:'', adresse:'', localisation:''});
  const organismes = useSelector((state) => state.data.organismes || []);

  useEffect(() => {
    dispatch(getOrganismes());
  }, []);

  const handleDeleteOrg = (id) => {
    dataService.deleteOrganisme({id}).then((res) => {
      res.status === 200 && res.data && res.data._id && setAlert(["success", `Organisme : ${res.data.nom} deleted successfully!`]);
      dispatch(getOrganismes());
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

  const handleNewOrganisme = (event) => {
    event.preventDefault();
    if (
      organismes.filter(o => (
        o.nom.toUpperCase() === orgObj.nom.toUpperCase() && 
        o.adresse.toUpperCase() === orgObj.adresse.toUpperCase() && 
        o.localisation.toUpperCase() === orgObj.localisation.toUpperCase())
      ).length > 0
    ) {
      setError(true);
    } 
    else {
      dataService.postOrganisme(orgObj).then((res) => {
        res.status === 200 && res.data && res.data._id && setAlert(["success", "Organization added successfully!"]);
        setOrgObj({nom:'', adresse:'', localisation:''});
        setOpen(!open);
        setError(false);
        dispatch(getOrganismes());
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

  const handleChange = (event) => {
    setError(false);
    setOrgObj({...orgObj, [event.target.id]: event.target.value })
  };

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Typography component="h1" variant="h5">
            Data Entry - Organization
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={() => setOpen(!open)}>{"Add Organization"}</Button>
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
                    <TableCell>Nom</TableCell>
                    <TableCell>Adresse</TableCell>
                    <TableCell>Localisation</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Updated at</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {organismes.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.nom}</TableCell>
                      <TableCell>{row.adresse}</TableCell>
                      <TableCell>{row.localisation}</TableCell>
                      <TableCell>{moment(row.createdAt).format("MMMM Do YYYY, hh:mm")}</TableCell>
                      <TableCell>{moment(row.updatedAt).format("MMMM Do YYYY, hh:mm")}</TableCell>
                      <TableCell>
                        <Button color="error" onClick={() => handleDeleteOrg(row._id)}><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {alert.length ? <SnackBarAlert severity={alert[0]} message={alert[1]} setAlert={setAlert} /> : null}
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={handleNewOrganisme} component="form">
          {/* <div> */}
          <Grid container spacing={2}>
            <Typography component="h1" variant="h5">
              New Organization
            </Typography>
            <Divider />
            {error && <Alert severity="error">This organization already exists!</Alert>}
            <Grid item xs={12}>
              <TextField
                required
                id="nom"
                label="Nom"
                value={orgObj.nom}
                onChange={handleChange}
                // error={error}
                // helperText={helperText}
              />
              <TextField
                required
                id="adresse"
                label="Adresse"
                value={orgObj.adresse}
                onChange={handleChange}
              />
              <TextField
                required
                id="localisation"
                label="Localisation"
                value={orgObj.localisation}
                onChange={handleChange}
              />
              {/* </div> */}
              {/* <div> */}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" sx={{ mt: 1 }}>{"Add"}</Button>
            </Grid>
            {/* </div> */}
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  )
};

export default Organisme;