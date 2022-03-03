import * as React from 'react';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { getRugosite } from '../store/actions/data'
import ValeurComponent from './Utility/ValeurSlider';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function DataTable() {
  const rugosite = useSelector((state) => state.data.rugosite || []);
  const dispatch = useDispatch();
  const [mesure, setMesure] = React.useState('all');
  const [mesuresList, setMesureList] = React.useState(['all']);
  const [valeurFilter, setValeurFilter] = React.useState([10, 40]);
  const [rugositeFiltered, setRugositeFiltered] = React.useState(rugosite);

  const handleChange = (event) => {
    setMesure(event.target.value);
  };

  // console.log(rugosite, rugositeFiltered, mesuresList)
  React.useEffect(() => {
    dispatch(getRugosite());
  }, []);

  React.useEffect(() => {
    setRugositeFiltered(rugosite);
    let mesures = rugosite.flatMap(o => o.mesure).map(o => o.name).filter((item, pos, self) => self.indexOf(item) === pos)
    setMesureList(['all', ...mesures])
  }, [rugosite]);

  const handleSubmitFilter = () => {

    let filtered = rugosite.filter((item) => {
      if (mesure !== 'all')
        return item.mesure.filter(o => o.name === mesure).length > 0 && item.valeur >= valeurFilter[0] && item.valeur <= valeurFilter[1]
      else
        return item.valeur >= valeurFilter[0] && item.valeur <= valeurFilter[1]
    });
    setRugositeFiltered(filtered);
  };

  return (
    <React.Fragment>
      <Title>Rugosité</Title>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <InputLabel id="demo-simple-select-label">Mesure</InputLabel>
              <Select
                value={mesure}
                label="Valeur"
                onChange={handleChange}
              >
                {mesuresList.map((m, idx) => {
                  return <MenuItem key={idx} value={m}>{m}</MenuItem>
                })}
              </Select>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            {/* <Box sx={{ m: 3 }} > */}
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom>Valeur</Typography>
              <ValeurComponent max={Math.max(...rugosite.map(r => r.valeur))} setValeurFilter={setValeurFilter} />
              {/* </Box> */}
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSubmitFilter}>{"Apply Filter"}</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={() => setRugositeFiltered(rugosite)}>{"Clear Filter"}</Button>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>nomFichier</TableCell>
                    <TableCell>localisationDisk</TableCell>
                    <TableCell>mesure</TableCell>
                    <TableCell>tags</TableCell>
                    <TableCell>nbrLine</TableCell>
                    <TableCell>nbrColonne</TableCell>
                    <TableCell>Valeur</TableCell>
                    {/* <TableCell>Utilisateur</TableCell>
                    <TableCell>Organisme</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rugositeFiltered.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.nomFichier}</TableCell>
                      <TableCell>{row.localisationDisk}</TableCell>
                      <TableCell>{row.mesure[0].name}</TableCell>
                      <TableCell>{row.tags.join(',')}</TableCell>
                      <TableCell>{row.transformation[0].nbrLine}</TableCell>
                      <TableCell>{row.transformation[0].nbrColonne}</TableCell>
                      <TableCell>{row.valeur}</TableCell>
                      {/* <TableCell>{row.utilisateur[0].pseudo}</TableCell>
                      <TableCell>{row.utilisateur[0].organisme[0].nom}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
              </Link> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment >
  );
}