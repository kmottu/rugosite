import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, type) {
  return { id, date, name, shipTo, paymentMethod, amount, type };
}

const rows = [
  createData(
    0,
    'mes1.ext',
    '/root/usr/xrjs/mes1.ext',
    'methode, RA, Rs, mesure',
    55,
    255,
    "RS",
  ),
  createData(
    0,
    'mes1.ext',
    '/root/usr/xrjs/mes1.ext',
    'methode, RA, Rs, mesure',
    55,
    255,
    "RS",
  ),
  createData(
    0,
    'mes1.ext',
    '/root/usr/xrjs/mes1.ext',
    'methode, RA, Rs, mesure',
    55,
    255,
    "RS",
  ),
  createData(
    0,
    'mes1.ext',
    '/root/usr/xrjs/mes1.ext',
    'methode, RA, Rs, mesure',
    55,
    255,
    "RS",
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function DataTable() {
  return (
    <React.Fragment>
      <Title>Rugosité</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>nomFichier</TableCell>
            <TableCell>localisationDisk</TableCell>
            <TableCell>tags</TableCell>
            <TableCell>nbrLine</TableCell>
            <TableCell>nbrColonne</TableCell>
            <TableCell>measureType</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}