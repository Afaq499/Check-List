import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import '../pages/roof-form/style.css';

export default function BasicTable({
  rows,
  setPage,
  page,
  perPage,
  setPerPage,
  count
}) {
  return (
    <div>
      <TableContainer
      component={Paper}
      style={{
        maxHeight: '800px'
      }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Form Name</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Created Date</TableCell>
              <TableCell align="left">Download Form</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.formName}</TableCell>
                <TableCell align="left">{row.userName}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align='left'>
                  <div
                    className="download-btn"
                    onClick={() => window.open(`${process.env.REACT_APP_S3_BUCKET_BASE_URL}/${row?.formName}`, '_self')}
                  >
                    Download
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={perPage}
        page={page}
        onPageChange={(e, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(e) => setPerPage(e.target.value)}
      />

    </div >
  );
}

