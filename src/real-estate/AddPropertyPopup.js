import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import NativeSelect from '@material-ui/core/NativeSelect';
import MuiAlert from '@material-ui/lab/Alert';
import '../css/RealEstate.css'

class AddPropertyPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            address: '',
            price: '',
            downPayment: '',
            closingCosts: '',
            rehabCosts: '',
            principle: '',
            rent: '',
            mortgage: '',
            taxes: '',
            insurance: '',
            miscExpenses: '',
            showErrorAllFields: false
        }
    }

    handleSave = event => {
        if(this.state.address !== '' && this.state.type !== '' && this.state.price !== '' && this.state.downPayment !== '' && this.state.closingCosts !== '' && this.state.rehabCosts !== '' && this.state.principle !== '' && this.state.rent !== '' && this.state.mortgage !== '' && this.state.taxes !== '' && this.state.insurance !== '' && this.state.miscExpenses !== '') {
            var actionType = "save"
            var type = this.state.type
            var address = this.state.address
            var price = this.state.price
            var investment = parseInt(this.state.downPayment, 10) + parseInt(this.state.closingCosts, 10) + parseInt(this.state.rehabCosts, 10)
            console.log(investment)
            var totalExpenses = parseInt(this.state.mortgage, 10) + parseInt(this.state.taxes, 10) + parseInt(this.state.insurance, 10) + parseInt(this.state.miscExpenses, 10)
            console.log(totalExpenses)
            var totalRevenue = parseInt(this.state.rent, 10) + parseInt(this.state.principle, 10)
            var cashflow = parseInt(this.state.rent, 10) - totalExpenses
            var cashOnCash = ((cashflow * 12) / investment) * 100
            var internalRate = (((totalRevenue - totalExpenses) * 12) / investment) * 100
            this.props.closePopup(actionType, type, address, price, investment, cashflow, cashOnCash.toFixed(1), internalRate.toFixed(1))
        } else {
            this.setState({ showErrorAllFields : true })
        }
    }

    handleCancel = event => {
        var actionType = "cancel"
        this.props.closePopup(actionType)
    }

    handlePropertyChange = event => {
        this.setState({ type : event.target.value })
    }

    render(){
        const buttonStyle = {
            backgroundColor: '#364059',
            color : 'white',
            width : 200,
            height : 50
        }
        const rightFormStyle = {
            width : 140,
            marginLeft: 15
        }
        const selectionStyle = {
            display: 'flex',
            alignItems: 'center',
            margin: 10
        }
        const typographyStyleLeft = {
            width: 125,
            display: 'flex',
            alignItems: 'center'
        }
        const typographyStyleRight = {
            width: 150,
            display: 'flex',
            alignItems: 'center'
        }
        const upperContentStyle = {
            display: 'flex',
            justifyContent: 'space-between'
        }
        const buttonContainerStyle = {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 5
        }
        const alertStyle = {
            width: '45%',
            height: '15%'
        }
        const alertPosition = {
            display: 'flex',
            justifyContent: 'center',
            margin: 15
        }

        return(
            <div className='popupRoot'>  
                <div className='popupInner'>
                    <div id="UpperContent" style={upperContentStyle}>
                    <div id="leftSideContent">
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Address: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.address}
                                onChange = {(event) => { this.setState({ address : event.target.value }) }}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Property Type: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                                <NativeSelect value={this.state.propertyType} onChange={this.handlePropertyChange} >
                                <option aria-label="None" value="" />
                                <option value={'Single House'}>Single House</option>
                                <option value={'Duplex'}>Duplex</option>
                                <option value={'Triplex'}>Triplex</option>
                                <option value={'Quadruplex'}>Quadruplex</option>
                                <option value={'Quintuplex'}>Quintuplex</option>
                                <option value={'Apartment Complex'}>Apartment Complex</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Price: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.price}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ price : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Down Payment: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.downPayment}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ downPayment : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Closing Costs: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.closingCosts}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ closingCosts : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleLeft}>
                                <Typography color="inherit" variant="subtitle1">
                                    Rehab Costs: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.rehabCosts}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ rehabCosts : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                    </div>
                    <div id="leftSideContent">
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Principle (Monthly): 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.principle}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ principle : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Rent: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.rent}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ rent : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Mortgage: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.mortgage}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ mortgage : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Taxes: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.taxes}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ taxes : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Insurance: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.insurance}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ insurance : event.target.value })
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div style={selectionStyle}>
                            <div style={typographyStyleRight}>
                                <Typography color="inherit" variant="subtitle1">
                                    Misc. Expenses: 
                                </Typography>
                            </div>
                            <FormControl style={rightFormStyle}>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.miscExpenses}
                                onChange = {(event) => { 
                                    if(!isNaN(event.target.value)) {
                                        this.setState({ miscExpenses : event.target.value }) 
                                    }
                                }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                    </div>
                    </div>
                    <div style={buttonContainerStyle}>
                        <Button variant="outlined" style={buttonStyle} onClick={this.handleSave}>
                            <Typography color="inherit" variant="h5">
                                Save
                            </Typography>
                        </Button>
                        <Button variant="outlined" style={buttonStyle} onClick={this.handleCancel}>
                            <Typography color="inherit" variant="h5">
                                Cancel
                            </Typography>
                        </Button>
                    </div>
                    {this.state.showErrorAllFields ? 
                        <div style={alertPosition}>
                            <MuiAlert style={alertStyle} severity="error">Please fill in all fields</MuiAlert>
                        </div>
                    : null
                    }
                </div>  
            </div> 
        )
    }
}

export default AddPropertyPopup;