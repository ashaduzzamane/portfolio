import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import EditFinancialPopup from './EditFinancialPopup'
import axios from 'axios'


class BankStatement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editID: 0,
            showEdit: false,
            tempID: 0,
            tempAssetInstitution: '',
            tempAssetDescription: '',
            tempAssetValue:'',
            tempLiabilityInstitution: '',
            tempLiabilityDescription: '',
            tempLiabilityValue: '',
            page: 1,
            rowsPerPage: 10,
            totalAssets: 0,
            totalLiabilities: 0,
            tempRowsAssets: [],
            tempRowsLiabilities: [],
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

    componentWillMount() {
        axios.get('http://localhost:3000/api/v1/financials')
        .then(response => {
            var rowsAssets = []
            var totalAssets = 0
            var rowsLiabilities = []
            var totalLiabilities = 0
            response.data.data.forEach(financial => {
                if(financial.accountType === "Asset") {
                    rowsAssets.push({
                        'id' : financial.id,
                        'Institution' : financial.accountInstitution,
                        'Description' : financial.accountDescription,
                        'Value' : financial.accountValue
                    })
                    totalAssets = totalAssets + financial.accountValue
                } else if(financial.accountType === 'Liability') {
                    rowsLiabilities.push({
                        'id' : financial.id,
                        'Institution' : financial.accountInstitution,
                        'Description' : financial.accountDescription,
                        'Value' : financial.accountValue
                    })
                    totalLiabilities = totalLiabilities + financial.accountValue
                }
            })
            this.props.onUpdateRowsAssets(rowsAssets)
            this.setState({ rowsAssets : rowsAssets })
            this.setState({ totalAssets : totalAssets })
            this.props.onUpdateRowsLiabilities(rowsLiabilities)
            this.setState({ rowsLiabilities : rowsLiabilities })
            this.setState({ totalLiabilities : totalLiabilities })
        })
        .catch(error => {
            var totalAssets = 0
            var totalLiabilities = 0
            this.props.FinancialInstitutionData.rowsAssets.forEach(financial => {
                totalAssets = totalAssets + financial.accountValue
            })
            this.props.FinancialInstitutionData.rowsLiabilities.forEach(financial => {
                totalLiabilities = totalLiabilities + financial.accountValue
            })
            this.setState({ rowsAssets : this.props.FinancialInstitutionData.rowsAssets })
            this.setState({ rowsLiabilities : this.props.FinancialInstitutionData.rowsLiabilities })
        })
    }

    componentDidUpdate() {
        if(this.state.rowsAssets !== this.props.FinancialInstitutionData.rowsAssets) {
            var totalAssets = 0
            this.props.FinancialInstitutionData.rowsAssets.forEach(asset => {
                totalAssets = totalAssets + asset.Value
            })
            this.setState({ totalAssets : totalAssets })
            this.setState({ rowsAssets : this.props.FinancialInstitutionData.rowsAssets })
        }
        if(this.state.rowsLiabilities !== this.props.FinancialInstitutionData.rowsLiabilities) {
            var totalLiabilities = 0
            this.props.FinancialInstitutionData.rowsLiabilities.forEach(liability => {
                totalLiabilities = totalLiabilities + liability.Value
            })
            this.setState({ totalLiabilities : totalLiabilities })
            this.setState({ rowsLiabilities : this.props.FinancialInstitutionData.rowsLiabilities })
        }
    }

    togglePopup = event => {
        this.setState({ showEdit: !this.state.showEdit }); 
    }

    handleAssetCancel = event => {
        this.setState({ rowsAssets : this.state.tempRowsAssets })
        this.setState({ tempAssetInstitution : '' })
        this.setState({ tempAssetDescription : '' })
        this.setState({ tempAssetValue : '' })
        this.props.onUpdateRowsAssets(this.state.tempRowsAssets)
        this.togglePopup()
    }

    handleAssetSave = event => {
        var tempRowsAssets = []
        var totalAssets = 0
        var done = false
        this.state.rowsAssets.forEach(asset => {
            if(asset.id < this.state.tempID) {
                totalAssets = totalAssets + asset.Value
                tempRowsAssets.push(asset)
            } else if ((asset.id > this.state.tempID) && !done){
                totalAssets = totalAssets + asset.Value + parseInt(this.state.tempAssetValue, 10)
                tempRowsAssets.push(
                    {
                        'id' : this.state.tempID,
                        'Institution' : this.state.tempAssetInstitution,
                        'Description' : this.state.tempAssetDescription,
                        'Value' : parseInt(this.state.tempAssetValue, 10),
                    }
                )
                tempRowsAssets.push(asset)
                done = true
            } else {
                tempRowsAssets.push(asset)
            }
        })
        if(!done) {
            tempRowsAssets.push(
                {
                    'id' : this.state.tempID,
                    'Institution' : this.state.tempAssetInstitution,
                    'Description' : this.state.tempAssetDescription,
                    'Value' : parseInt(this.state.tempAssetValue, 10),
                }
            )
        }
        var putURL = 'http://localhost:3000/api/v1/financials/' + this.state.tempID.toString()
        axios.put(putURL, {
            "accountType" : "Asset",
            "accountInstitution" : this.state.tempAssetInstitution,
            "accountDescription" : this.state.tempAssetDescription,
            "accountValue" : parseInt(this.state.tempAssetValue, 10)
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({ tempAssetInstitution : '' })
        this.setState({ tempAssetDescription : '' })
        this.setState({ tempAssetValue : '' })
        this.setState({ rowsAssets : tempRowsAssets })
        this.setState({ totalAssets : totalAssets })
        this.props.onUpdateRowsAssets(tempRowsAssets)
        this.togglePopup()
    }

    handleLiabilityCancel = event => {
        this.setState({ rowsLiabilities : this.state.tempRowsLiabilities })
        this.setState({ tempLiabilityInstitution : '' })
        this.setState({ tempLiabilityDescription : '' })
        this.setState({ tempLiabilityValue : '' })
        this.props.onUpdateRowsLiabilities(this.state.tempRowsLiabilities)
        this.togglePopup()
    }

    handleLiabilitySave = event => {
        var tempRowsLiabilities = []
        var totalLiabilities = 0
        var done = false
        this.state.rowsLiabilities.forEach(liability => {
            if(liability.id < this.state.tempID) {
                totalLiabilities = totalLiabilities + liability.Value
                tempRowsLiabilities.push(liability)
            } else if((liability.id > this.state.tempID) && !done) {
                totalLiabilities = totalLiabilities + liability.Value + parseInt(this.state.tempLiabilityValue, 10)
                tempRowsLiabilities.push(
                    {
                        'id' : this.state.tempID,
                        'Institution' : this.state.tempLiabilityInstitution,
                        'Description' : this.state.tempLiabilityDescription,
                        'Value' : parseInt(this.state.tempLiabilityValue, 10),
                    }
                )
                tempRowsLiabilities.push(liability)
                done = true
            } else {
                tempRowsLiabilities.push(liability)
            }
        })
        if(!done) {
            tempRowsLiabilities.push(
                {
                    'id' : this.state.tempID,
                    'Institution' : this.state.tempLiabilityInstitution,
                    'Description' : this.state.tempLiabilityDescription,
                    'Value' : parseInt(this.state.tempLiabilityValue, 10),
                }
            )
        }
        var putURL = 'http://localhost:3000/api/v1/financials/' + this.state.tempID.toString()
        axios.put(putURL, {
            "accountType" : "Liability",
            "accountInstitution" : this.state.tempAssetInstitution,
            "accountDescription" : this.state.tempAssetDescription,
            "accountValue" : parseInt(this.state.tempAssetValue, 10)
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({ tempLiabilityInstitution : '' })
        this.setState({ tempLiabilityDescription : '' })
        this.setState({ tempLiabilityValue : '' })
        this.setState({ rowsLiabilities : tempRowsLiabilities })
        this.setState({ totalLiabilities : totalLiabilities })
        this.props.onUpdateRowsLiabilities(tempRowsLiabilities)
        this.togglePopup()
    }

    handleAssetEdit  = (e, itemID) => {
        this.setState({ tempRowsAssets : this.state.rowsAssets })
        this.setState({ editID : itemID })
        var tempRowsAssets = []
        this.state.rowsAssets.forEach(asset => {
            if(itemID === asset.id) {
                this.setState({ tempID : asset.id })
                this.setState({ tempAssetInstitution : asset.Institution })
                this.setState({ tempAssetDescription : asset.Description })
                this.setState({ tempAssetValue : asset.Value })
            } else {
                tempRowsAssets.push(asset)
            }
        })
        this.setState({ rowsAssets : tempRowsAssets })
        this.props.onUpdateRowsAssets(tempRowsAssets)
        this.setState({ showEdit: !this.state.showEdit }); 
    }

    handleAssetDelete = (e, itemID) => {
        var rowsAssets = this.state.rowsAssets
        var totalAssets = 0
        var tempRowsAssets = []
        rowsAssets.forEach(asset => {
            if(asset.id !== itemID) {
                totalAssets = totalAssets + asset.Value
                tempRowsAssets.push(asset)
            }
        })
        this.setState({ totalAssets : totalAssets })
        this.setState({ rowsAssets : tempRowsAssets })
        this.props.onUpdateRowsAssets(tempRowsAssets)
    }

    handleLiabilityEdit  = (e, itemID) => {
        this.setState({ tempRowsLiabilities : this.state.rowsLiabilities })
        this.setState({ editID : itemID })
        var tempRowsLiabilities = []
        this.state.rowsLiabilities.forEach(liability => {
            if(itemID === liability.id) {
                this.setState({ tempID : liability.id })
                this.setState({ tempLiabilityInstitution : liability.Institution })
                this.setState({ tempLiabilityDescription : liability.Description })
                this.setState({ tempLiabilityValue : liability.Value })
            } else {
                tempRowsLiabilities.push(liability)
            }
        })
        this.setState({ rowsLiabilities : tempRowsLiabilities })
        this.props.onUpdateRowsLiabilities(tempRowsLiabilities)
        this.setState({ showEdit: !this.state.showEdit }); 
    }

    handleLiabilityDelete = (e, itemID) => {
        var rowsLiabilities = this.state.rowsLiabilities
        var totalLiabilities = 0
        var tempRowsLiabilities = []
        rowsLiabilities.forEach(liability => {
            if(liability.id !== itemID) {
                totalLiabilities = totalLiabilities + liability.Value
                tempRowsLiabilities.push(liability)
            }
        })
        this.setState({ totalLiabilities : totalLiabilities })
        this.setState({ rowsLiabilities : tempRowsLiabilities })
        this.props.onUpdateRowsLiabilities(tempRowsLiabilities)
    }

    handleAddAsset = event => {
        var rowsAssets = this.state.rowsAssets
        var totalAssets = this.state.totalAssets
        var id = rowsAssets.length + this.state.rowsLiabilities.length + 1
        var value = parseInt(this.state.tempAssetValue, 10)
        totalAssets = totalAssets + value
        axios.post('http://localhost:3000/api/v1/financials', {
            "accountType" : "Asset",
            "accountInstitution" : this.state.tempAssetInstitution,
            "accountDescription" : this.state.tempAssetDescription,
            "accountValue" : value
        })
        .then(response => {
            id = response.data.data.id
            console.log('start')
            rowsAssets.push(
                {
                    'id' : id,
                    'Institution' : this.state.tempAssetInstitution,
                    'Description' : this.state.tempAssetDescription,
                    'Value' : value,
                }
            )
            this.setState({ rowsAssets : rowsAssets })
            this.props.onUpdateRowsAssets(rowsAssets)
            this.setState({ tempAssetDescription : '' })
            this.setState({ tempAssetInstitution : '' })
            this.setState({ tempAssetValue : '' })
            this.setState({ totalAssets : totalAssets })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleAddLiability = event => {
        var rowsLiabilities = this.state.rowsLiabilities
        var totalLiabilities = this.state.totalLiabilities
        var id = rowsLiabilities.length + 1
        var value = parseInt(this.state.tempLiabilityValue, 10)
        totalLiabilities = totalLiabilities + value
        axios.post('http://localhost:3000/api/v1/financials', {
            "accountType" : "Liability",
            "accountInstitution" : this.state.tempLiabilityInstitution,
            "accountDescription" : this.state.tempLiabilityDescription,
            "accountValue" : value
        })
        .then(response => {
            id = response.data.data.id
            rowsLiabilities.push(
                {
                    'id' : id,
                    'Institution' : this.state.tempLiabilityInstitution,
                    'Description' : this.state.tempLiabilityDescription,
                    'Value' : value,
                }
            )
            this.setState({ rowsLiabilities : rowsLiabilities })
            this.props.onUpdateRowsLiabilities(rowsLiabilities)
            this.setState({ totalLiabilities : totalLiabilities })
            this.setState({ tempLiabilityDescription : '' })
            this.setState({ tempLiabilityInstitution : '' })
            this.setState({ tempLiabilityValue : '' })
        })
        .catch(error => {
            console.log(error)
        })
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
                    <TableCell key='editHeaderAsset' align='left' style={{ minWidth: 170 }}></TableCell>
                    <TableCell key='deleteHeaderAsset' align='left' style={{ minWidth: 150 }}></TableCell>
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
                        <TableCell align='left' key='editAsset'>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleAssetEdit(e, row.id))}>
                                    <Typography color="inherit">
                                        Edit
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell align='left' key='deleteAsset'>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={DeleteBtnStyle} id={row.id} onClick={((e) => this.handleAssetDelete(e, row.id))}>
                                    <ClearIcon />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    );
                })}
                {this.state.showEdit ? 
                    <TableRow>
                        <TableCell rowSpan={1}>
                            <TextField 
                                    value={this.state.tempAssetInstitution}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempAssetInstitution : event.target.value })
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempAssetDescription}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempAssetDescription : event.target.value })
                                    }}
                                />    
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempAssetValue}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        if(!isNaN(event.target.value)) {
                                            this.setState({ tempAssetValue : event.target.value })
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={AddBtnStyle} onClick={this.handleAssetSave}>
                                        <Typography color="inherit">
                                            SAVE
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={DeleteBtnStyle} onClick={this.handleAssetCancel}>
                                        <Typography color="inherit">
                                            CANCEL 
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    : 
                        <TableRow>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempAssetInstitution}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempAssetInstitution : event.target.value })
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempAssetDescription}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempAssetDescription : event.target.value })
                                    }}
                                />    
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempAssetValue}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        if(!isNaN(event.target.value)) {
                                            this.setState({ tempAssetValue : event.target.value })
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={AddBtnStyle} onClick={this.handleAddAsset}>
                                        <Typography color="inherit">
                                            Add
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                }
                {/* <TableRow>
                    <TableCell rowSpan={1}>
                        <TextField 
                            value={this.state.tempAssetInstitution}
                            id="outlined-basic" 
                            variant="outlined" 
                            onChange = {(event) => { 
                                this.setState({ tempAssetInstitution : event.target.value })
                            }}
                        />
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <TextField 
                            value={this.state.tempAssetDescription}
                            id="outlined-basic" 
                            variant="outlined" 
                            onChange = {(event) => { 
                                this.setState({ tempAssetDescription : event.target.value })
                            }}
                        />    
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <TextField 
                            value={this.state.tempAssetValue}
                            id="outlined-basic" 
                            variant="outlined" 
                            onChange = {(event) => { 
                                if(!isNaN(event.target.value)) {
                                    this.setState({ tempAssetValue : event.target.value })
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell rowSpan={1}>
                        <div style={BtnContainer}> 
                            <Button variant="outlined" style={AddBtnStyle} onClick={this.handleAddAsset}>
                                <Typography color="inherit">
                                    Add
                                </Typography>
                            </Button>
                        </div>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow> */}
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
                        <TableCell key='editHeaderLiability' align='left' style={{ minWidth: 170 }}></TableCell>
                        <TableCell key='deleteHeaderLiability' align='left' style={{ minWidth: 170 }}></TableCell>
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
                            <TableCell align='left' key='editLiability'>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={EditBtnStyle} id={row.id} onClick={((e) => this.handleLiabilityEdit(e, row.id))}>
                                        <Typography color="inherit">
                                            Edit
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell align='left' key='deleteLiability'>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={DeleteBtnStyle} id={row.id} onClick={((e) => this.handleLiabilityDelete(e, row.id))}>
                                        <ClearIcon />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        );
                      })}
                {this.state.showEdit ? 
                    <TableRow>
                        <TableCell rowSpan={1}>
                            <TextField 
                                    value={this.state.tempLiabilityInstitution}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempLiabilityInstitution : event.target.value })
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempLiabilityDescription}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        this.setState({ tempLiabilityDescription : event.target.value })
                                    }}
                                />    
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <TextField 
                                    value={this.state.tempLiabilityValue}
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    onChange = {(event) => { 
                                        if(!isNaN(event.target.value)) {
                                            this.setState({ tempLiabilityValue : event.target.value })
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell rowSpan={1}>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={AddBtnStyle} onClick={this.handleLiabilitySave}>
                                        <Typography color="inherit">
                                            SAVE
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div style={BtnContainer}> 
                                    <Button variant="outlined" style={DeleteBtnStyle} onClick={this.handleLiabilityCancel}>
                                        <Typography color="inherit">
                                            CANCEL 
                                        </Typography>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    : 
                    <TableRow>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityInstitution}
                                id="outlined-basic" 
                                variant="outlined" 
                                onChange = {(event) => { 
                                    this.setState({ tempLiabilityInstitution : event.target.value })
                                }}
                            />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityDescription}
                                id="outlined-basic" 
                                variant="outlined"
                                onChange = {(event) => { 
                                    this.setState({ tempLiabilityDescription : event.target.value })
                                }} 
                            />    
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityValue}
                                id="outlined-basic" 
                                variant="outlined" 
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ tempLiabilityValue : event.target.value })
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={AddBtnStyle} onClick={this.handleAddLiability}>
                                    <Typography color="inherit">
                                        Add
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                }
                    {/* <TableRow>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityInstitution}
                                id="outlined-basic" 
                                variant="outlined" 
                                onChange = {(event) => { 
                                    this.setState({ tempLiabilityInstitution : event.target.value })
                                }}
                            />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityDescription}
                                id="outlined-basic" 
                                variant="outlined"
                                onChange = {(event) => { 
                                    this.setState({ tempLiabilityDescription : event.target.value })
                                }} 
                            />    
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <TextField 
                                value={this.state.tempLiabilityValue}
                                id="outlined-basic" 
                                variant="outlined" 
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ tempLiabilityValue : event.target.value })
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell rowSpan={1}>
                            <div style={BtnContainer}> 
                                <Button variant="outlined" style={AddBtnStyle} onClick={this.handleAddLiability}>
                                    <Typography color="inherit">
                                        Add
                                    </Typography>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow> */}
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

const mapDispatchToProps = dispatch => {
    return {
        onUpdateRowsAssets : (argRowsAssets) => dispatch({
            type: "UPDATE_ASSETS",
            rowsAssets : argRowsAssets
        }),
        onUpdateRowsLiabilities : (argRowsLiabilities) => dispatch({
            type: "UPDATE_LIABILITIES",
            rowsLiabilities : argRowsLiabilities
        })
    };
}

function mapStateToProps(state) {
    return {
        FinancialInstitutionData : state.FinancialInstitutionData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankStatement);