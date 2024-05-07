import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(grade, condition, remaining, description) {
  return { grade, condition, remaining, description };
}

const rows = [
  createData('A', "Excellent", "12+ Years", "Roof appears relatively new. Roof requires only simple debris removal, flashing inspection, and touch up. Qualifies for a TotalRoof Maintenance Agreement"),
  createData('B', "Good", "7-11 Years", "Roof is not in an aged condition.All flashings, membrane or shingle, parapet wall coverings, penetrations and equipment / skylight flashings are in good condition, require minor repair work, and coating of flashings. Debris is not excessive. After recommended repair(s) are completed, roof qualifies for the Total Roof Maintenance Agreement."),
  createData('C', "Fair", "3-6 Year", "Roof is showing normal signs of age - wear and / or may have foot traffic wear. Some flashings have leaked but are repairable. Roof membrane is showing signs of aging and excessive debris. Roof  membrane is showing signs of aging and excessive debris. After recommended repair(s) are completed, roof qualifies for the Total Roof Maintenance Agreement."),
  createData('D', "Poor", "0-2 Years", "Roof is showing many areas of wear and has seam / lap problems. Previous repairs are evident and flashing problems have occurred. Extensive work is needed. Once repaired, this roof may be maintained for a short time. This is typically the last opportunity to consider recovery or restoration. May only qualify for a Total Roof Maintenance Plan if recommended repairs are completed. Budgeting for replacement is encouraged. Moisture Survey is mandatory if warranty is desired"),
  createData('F', "Bad", "Reroof", "Roof is showing excessive wear or problems and leaking may be occurring. Life extension of the roof system is difficult. There are system-wide seam, lap, and flashing failures. Inner-ply asphalt in built up roof systems may be completely lifeless and crumbling. Does not qualify for the Total Roof Maintenance Agreement."),
];

export default function GradeViewTable() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Grade</b></TableCell>
              <TableCell align="right"><b>Condition</b></TableCell>
              <TableCell style={{ width: "200x" }} align="right"><b>Remaining Life</b></TableCell>
              <TableCell align="right"><b>Description&nbsp;(g)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.grade}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.grade}
                </TableCell>
                <TableCell align="right">{row.condition}</TableCell>
                <TableCell align="right">{row.remaining}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}