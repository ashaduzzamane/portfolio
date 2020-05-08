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
        const buttonStyle = {
            backgroundColor: '#364059',
            color : 'white',
            width : 140,
            height : 35,
            marginRight: 10
        }
        const rootStyle ={
            display: 'flex',
            justifyContent: 'space-between',
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
        const EditBtnContainer = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        return(
        <div>
        <Paper style={root}>
            <div style={rootStyle}>
                <Typography style={marginTypo} color="inherit" variant="h6">
                    Assets
                </Typography>
                <Button variant="outlined" style={buttonStyle}>
                    <Typography color="inherit" variant="subtitle2">
                        Add Asset
                    </Typography>
                </Button>
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
                            <div style={EditBtnContainer}> 
                                <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                    <Typography color="inherit">
                                        Edit
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    );
                  })}
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
                <Button variant="outlined" style={buttonStyle}>
                    <Typography color="inherit" variant="subtitle2">
                        Add Liability
                    </Typography>
                </Button>
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
                                <div style={EditBtnContainer}> 
                                    <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleEdit(e, row.id))}>
                                        <Typography color="inherit">
                                            Edit
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        );
                      })}
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



class EditBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <Button variant="outlined">
                <Typography color="inherit">
                    Edit
                </Typography>
            </Button>
        )
    }
}

// export default function Bank() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                   {columns.map((column) => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }