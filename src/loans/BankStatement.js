import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Typography, Divider } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';

class BankStatement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            rowsPerPage: 10,
            totalAssets: 6300,
            totalLiabilities: 22400,
            columns : [
                { id: 'Institution', label: 'Institution', minWidth: 200 },
                {
                    id: 'Description',
                    label: 'Description',
                    minWidth: 170,
                    align: 'left',
                },
                {
                    id: 'Value',
                    label: 'Value',
                    minWidth: 170,
                    align: 'right',
                    format: (value) => value.toFixed(2),
                },
            ],
            rowsAssets : [
                {
                    'id' : 1,
                    'Institution' : 'CIBC',
                    'Description' : 'Checking Account',
                    'Value' : 1200,
                },
                {
                    'id' : 2,
                    'Institution' : 'Wealthsimple',
                    'Description' : 'TFSA',
                    'Value' : 3600,
                },
                {
                    'id' : 3,
                    'Institution' : 'Wealthsimple Trade',
                    'Description' : 'TFSA',
                    'Value' : 1500,
                },
            ],
            rowsLiabilities : [
                {
                    'id' : 4,
                    'Institution' : 'Desjardins',
                    'Description' : 'Student Loan',
                    'Value' : 22400,
                },
                {
                    'id' : 5,
                    'Institution' : 'CIBC',
                    'Description' : 'Credit Card',
                    'Value' : 0,
                },
            ]
        }
    }

    handleEdit  = (e, itemID) => {
        console.log(itemID)
    }

    render() {
        const root = {
            width: '100%',
            marginBottom: 35
        }
        const marginTypo = {
            marginLeft: 16,
            paddingTop: 12
        }
        const rootStyle ={
            display: 'flex',
            // justifyContent: 'space-between',
            alignItems: 'center',
            height: 70
        }
        const EditBtnStyle = {
            backgroundColor: 'white',
            color : '#364059',
            borderColor: '#364059',
            width : 100,
            height : 35,
            marginTop: 10,
            borderRadius: '20px'
        }
        const DeleteBtnStyle = {
            backgroundColor: '#999999',
            color : 'white',
            width : 100,
            height : 35,
            marginTop: 10,
            borderRadius: '20px'
        }
        const BtnContainer = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        const AddBtnStyle = {
            backgroundColor: '#364059',
            color : 'white',
            width : 100,
            height : 35,
            marginTop: 10,
            borderRadius: '20px'
        }
        return(
        <div>
        <Paper style={root}>
            <div style={rootStyle}>
                <Typography style={marginTypo} color="inherit" variant="h6">
                    Assets
                </Typography>
            </div>
            <Divider />
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {this.state.columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        <b>{column.label}</b>
                      </TableCell>
                    ))}
                    <TableCell key='edit' align='left' style={{ minWidth: 170 }}></TableCell>
                    <TableCell key='delete' align='left' style={{ minWidth: 150 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rowsAssets.map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {this.state.columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                        <TableCell align='left' key='edit'>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                    <Typography color="inherit">
                                        Edit
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell align='left' key='edit'>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={DeleteBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                    <ClearIcon />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    );
                })}
                <TableRow>
                    <TableCell rowSpan={1}>
                        <TextField id="outlined-basic" variant="outlined" />
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <TextField id="outlined-basic" variant="outlined" />    
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <TextField id="outlined-basic" variant="outlined" />
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <div style={BtnContainer}> 
                            <Button variant="outlined" style={AddBtnStyle} >
                                <Typography color="inherit">
                                    Add
                                </Typography>
                            </Button>
                        </div>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                    <TableRow>
                        <TableCell rowSpan={2} />
                        <TableCell align="left" colSpan={1}><b>Total Assets</b></TableCell>
                        <TableCell align="right"><b>$ {this.state.totalAssets.toFixed(2)}</b></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Paper>
        <Paper>
            <div style={rootStyle}>
                <Typography style={marginTypo} color="inherit" variant="h6">
                    Liabilities
                </Typography>
            </div>
            <Divider />
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {this.state.columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            <b>{column.label}</b>
                          </TableCell>
                        ))}
                        <TableCell key='edit' align='left' style={{ minWidth: 170 }}></TableCell>
                        <TableCell key='delete' align='left' style={{ minWidth: 170 }}></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rowsLiabilities.map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {this.state.columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                            <TableCell align='left' key='edit'>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                        <Typography color="inherit">
                                            Edit
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell align='left' key='edit'>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={DeleteBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                        <ClearIcon />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        );
                      })}
                    <TableRow>
                        <TableCell rowSpan={1}>
                            <TextField id="outlined-basic" variant="outlined" />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField id="outlined-basic" variant="outlined" />    
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField id="outlined-basic" variant="outlined" />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={AddBtnStyle} >
                                    <Typography color="inherit">
                                        Add
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={2} />
                        <TableCell align="left" colSpan={1}><b>Total Liabilities</b></TableCell>
                        <TableCell align="right"><b>$ {this.state.totalLiabilities.toFixed(2)}</b></TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        </div>
        )
    }
}

export default BankStatement;