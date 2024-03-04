import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    startDate: '',
    endDate: '',
    attendance: '',
  });

  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      createData(userData.name, userData.email, userData.startDate, userData.endDate, userData.attendance)
    ]);
    setUserData({
      name: '',
      email: '',
      startDate: '',
      endDate: '',
      attendance: '',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 55, width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', gap: 5, alignSelf: 'start' }}>
        <TextField label="First Name" name="name" value={userData.name} onChange={handleChange} />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={userData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Empty content to remove default dd-mm-yyyy placeholder */}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={userData.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Empty content */}
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Attendance"
          name="attendance"
          select  // Set the select prop to true for a dropdown
          value={userData.attendance}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          SelectProps={{
            displayEmpty: true,
          }}
          sx={{minWidth:'150px'}}
        >
          <MenuItem value="" disabled>
            Select Attendance
          </MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={addRow}>
          Add
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="center">Email Address</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">Attendance marked</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.startDate}</StyledTableCell>
                <StyledTableCell align="center">{row.endDate}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.attendance === 'yes' ? <CheckIcon /> : (row.attendance === 'no' ? <ClearIcon /> : '')}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function createData(name, email, startDate, endDate, attendance) {
  return { name, email, startDate, endDate, attendance };
}
