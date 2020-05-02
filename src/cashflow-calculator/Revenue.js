import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

class Revenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            principleAmount: 0,
            rentAmount: 0,
            totalRevenue: 0,
        }
    }

    handleChangeRent = event => {
        this.setState({ rentAmount : event.target.value })
        var principleAmount = 0
        var rentAmount = 0
        if(event.target.value === '') {
            rentAmount = 0
        } else {
            rentAmount = parseInt(event.target.value, 10)
        }    
        if(this.state.principleAmount === '') {
            principleAmount = 0
        } else {
            principleAmount = parseInt(this.state.principleAmount, 10)
        }
        var totalRevenue = rentAmount + principleAmount
        this.setState({ totalRevenue : totalRevenue })
        this.props.onUpdateRevenue(rentAmount, totalRevenue)
    }

    handleChangePrinciple = event => {
        this.setState({ principleAmount : event.target.value })
        var principleAmount = 0
        var rentAmount = 0
        if(event.target.value === '') {
            principleAmount = 0
        } else {
            principleAmount = parseInt(event.target.value, 10)
        }    
        if(this.state.rentAmount === '') {
            rentAmount = 0
        } else {
            rentAmount = parseInt(this.state.rentAmount, 10)
        }
        var totalRevenue = principleAmount + rentAmount
        this.setState({ totalRevenue : totalRevenue })
        this.props.onUpdateRevenue(rentAmount, totalRevenue)
    }

    render() {
        return(
            <div id="Revenue" className='CashflowCategories'>
                <Card className='rootCardRevenue' >
                    <CardContent>
                        <Typography component="h6" variant="subtitle2" color="inherit" noWrap className='header'>
                            Revenue
                        </Typography>
                        <Divider />
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Principle (Monthly)
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.principleAmount}
                                onChange={this.handleChangePrinciple}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Rent
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.rentAmount}
                                onChange={this.handleChangeRent}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='BottomDivider' >
                            <Divider />
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                    <b>Total Revenue</b>
                            </Typography>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                <b>$ </b><b>{this.state.totalRevenue}</b>
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateRevenue : (argTotalRevenueCashOnCash, argTotalRevenueInternalRate) => dispatch({
            type: "UPDATE_REVENUE",
            totalRevenueCashOnCash : argTotalRevenueCashOnCash,
            totalRevenueInternalRate : argTotalRevenueInternalRate
        })
    };
}

export default connect(null, mapDispatchToProps)(Revenue);