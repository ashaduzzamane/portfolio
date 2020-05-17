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

class Investment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downPaymentAmount: 0,
            closingCostsAmount: 0,
            rehabCostsAmount: 0,
            totalInvestment: 0,
        }
    }

    handleChangeDownPayment = event => {
        this.setState({ downPaymentAmount : event.target.value })
        var downPaymentAmount = 0
        var closingCostsAmount = 0
        var rehabCostsAmount = 0
        if(event.target.value === '') {
            downPaymentAmount = 0
        } else {
            downPaymentAmount = parseInt(event.target.value, 10)
        }        
        if(this.state.closingCostsAmount === '') {
            closingCostsAmount = 0
        } else {
            closingCostsAmount = parseInt(this.state.closingCostsAmount, 10)
        }
        if(this.state.rehabCostsAmount === '') {
            rehabCostsAmount = 0
        } else {
            rehabCostsAmount = parseInt(this.state.rehabCostsAmount, 10)
        }
        var totalInvestment = downPaymentAmount + closingCostsAmount + rehabCostsAmount
        this.setState({ totalInvestment : totalInvestment })
        this.props.onUpdateInvestment(totalInvestment)
    }

    handleChangeClosingCosts = event => {
        this.setState({ closingCostsAmount : event.target.value })
        var downPaymentAmount = 0
        var closingCostsAmount = 0
        var rehabCostsAmount = 0
        if(event.target.value === '') {
            closingCostsAmount = 0
        } else {
            closingCostsAmount = parseInt(event.target.value, 10)
        }     
        if(this.state.downPaymentAmount === '') {
            downPaymentAmount = 0
        } else {
            downPaymentAmount = parseInt(this.state.downPaymentAmount, 10)
        }
        if(this.state.rehabCostsAmount === '') {
            rehabCostsAmount = 0
        } else {
            rehabCostsAmount = parseInt(this.state.rehabCostsAmount, 10)
        }
        var totalInvestment = closingCostsAmount + downPaymentAmount + rehabCostsAmount
        this.setState({ totalInvestment : totalInvestment })
        this.props.onUpdateInvestment(totalInvestment)
    }

    handleChangeRehabCosts = event => {
        this.setState({ rehabCostsAmount : event.target.value })
        var downPaymentAmount = 0
        var closingCostsAmount = 0
        var rehabCostsAmount = 0
        if(event.target.value === '') {
            rehabCostsAmount = 0
        } else {
            rehabCostsAmount = parseInt(event.target.value, 10)
        }    
        if(this.state.closingCostsAmount === '') {
            closingCostsAmount = parseInt(this.state.closingCostsAmount, 10)

        } else {
            closingCostsAmount = parseInt(this.state.closingCostsAmount, 10)
        }
        if(this.state.downPaymentAmount === '') {
            downPaymentAmount = parseInt(this.state.downPaymentAmount, 10)

        } else {
            downPaymentAmount = parseInt(this.state.downPaymentAmount, 10)
        }
        var totalInvestment = rehabCostsAmount + closingCostsAmount + downPaymentAmount
        this.setState({ totalInvestment : totalInvestment })
        this.props.onUpdateInvestment(totalInvestment)
    }

    render() {
        return(
            <div id="Investment" className='CashflowCategories'>
                <Card className='rootCardInvestment' >
                    <CardContent>
                        <Typography component="h6" variant="subtitle2" color="inherit" noWrap className='header'>
                            Investment
                        </Typography>
                        <Divider />
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Down Payment
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.downPaymentAmount}
                                onChange={this.handleChangeDownPayment}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Closing Costs
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.closingCostsAmount}
                                onChange={this.handleChangeClosingCosts}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Rehab Costs
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.rehabCostsAmount}
                                onChange={this.handleChangeRehabCosts}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='BottomDivider' >
                            <Divider />
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                    <b>Total Investment</b>
                            </Typography>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                <b>$ </b><b>{this.state.totalInvestment}</b>
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapDispathToProps = dispatch => {
    return {
        onUpdateInvestment : (argTotalInvestment) => dispatch({
            type: "UPDATE_INVESTMENT",
            totalInvestment : argTotalInvestment
        })
    };
}

export default connect(null, mapDispathToProps)(Investment);