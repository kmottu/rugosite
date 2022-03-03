import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, Grid, TextField, Select, MenuItem, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { getRugosite, getMesures } from '../../store/actions/data';
import { useDispatch, useSelector } from 'react-redux';
import dataService from "../../store/services/data.service";
import SnackBarAlert from "../Utility/SnackBarAlert";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'id',
  },
  {
    id: 'nomFichier',
    numeric: false,
    disablePadding: false,
    label: 'Nom Fichier',
  },
  {
    id: 'localisationDisk',
    numeric: false,
    disablePadding: false,
    label: 'Localisation Disk',
  },
  {
    id: 'mesure',
    numeric: false,
    disablePadding: false,
    label: 'Mesure',
  },
  {
    id: 'valeur',
    numeric: true,
    disablePadding: false,
    label: 'Valeur',
  },
  {
    id: 'nbrLine',
    numeric: false,
    disablePadding: false,
    label: 'nbrLine',
  },
  {
    id: 'nbrColonne',
    numeric: false,
    disablePadding: false,
    label: 'nbrColonne',
  },
  {
    id: 'Tags',
    numeric: false,
    disablePadding: false,
    label: 'tags',
  },
  {
    id: 'delete',
    numeric: false,
    disablePadding: false,
    label: 'Delete',
  },
];

function RugositeTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

RugositeTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const RugositeAdd = (props) => {

  const mesures = useSelector((state) => state.data.mesures || []);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({});

  console.log(formData)
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dataService.postRugosite(formData).then((res) => {
      res.status === 200 && res.data && res.data._id && props.setAlert(["success", "Rugosite added successfully!"]);
      dispatch(getRugosite());
      setFormData({});
    }).catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error, message);
      props.setAlert(["error", message]);
    })
  }

  React.useEffect(() => {
    dispatch(getMesures());
  }, []);

  return (
    <Paper sx={{ width: '100%', mb: 4, pt: 3, mt: 5 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ ml: 8, mr: 6, pb: 4, flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
            >
              Add New Rugosite
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Nom Fichier"
              name="nomFichier"
              autoComplete="nomFichier"
              onChange={handleChange}
              value={formData.nomFichier || ''}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={formData.mesure || ''}
              label="Mesure"
              name='mesure'
              fullWidth
              required
              select
              onChange={handleChange}
            >
              {mesures.map((m, idx) => {
                return <MenuItem key={idx} value={m._id}>{m.name}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Localisation Diskr"
              name="localisationDisk"
              onChange={handleChange}
              value={formData.localisationDisk || ''}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              type={"number"}
              label="Valeur"
              name="valeur"
              onChange={handleChange}
              value={formData.valeur || ''}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="nbrLine"
              name="nbrLine"
              onChange={handleChange}
              value={formData.nbrLine || ''}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="nbrColonne"
              name="nbrColonne"
              onChange={handleChange}
              value={formData.nbrColonne || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="binaryInf"
              name="binaryInf"
              onChange={handleChange}
              value={formData.binaryInf || ''}
            />
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth type='submit' variant='contained'>Submit</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth type='reset' variant='contained' onClick={() => setFormData({})}>Clear</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default function RugositeTable() {

  const rugosite = useSelector((state) => state.data.rugosite || []);
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alert, setAlert] = React.useState([]);

  React.useEffect(() => {
    dispatch(getRugosite());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rugosite.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRugosite = (id) => {
    dataService.deleteRugosite({ id }).then((res) => {
      res.status === 200 && res.data && res.data._id && setAlert(["success", `Rugosite deleted successfully!`]);
      dispatch(getRugosite());
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rugosite.length) : 0;

  return (
    <>
      <RugositeAdd setAlert={setAlert} />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, pl: 4, pt: 2 }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Rugosite
          </Typography>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='small'
            >
              <RugositeTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rugosite.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rugosite, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row._id}
                        </TableCell>
                        <TableCell>{row.nomFichier}</TableCell>
                        <TableCell>{row.localisationDisk}</TableCell>
                        <TableCell>{row.mesure.map(o => o.name).join(',')}</TableCell>
                        <TableCell align='right'>{row.valeur}</TableCell>
                        <TableCell>{row.transformation[0].nbrLine}</TableCell>
                        <TableCell>{row.transformation[0].nbrColonne}</TableCell>
                        <TableCell>{row.tags.join(',')}</TableCell>
                        <TableCell>
                          <Button color="error" onClick={() => handleDeleteRugosite(row._id)}><DeleteIcon /></Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rugosite.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {alert.length ? <SnackBarAlert severity={alert[0]} message={alert[1]} setAlert={setAlert} /> : null}
    </>
  );
}
