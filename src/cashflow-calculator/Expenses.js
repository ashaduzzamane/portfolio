import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mortgageAmount: 0,
            taxesAmount: 0,
            insuranceAmount: 0,
            utilitiesAmount: 0,
            vacancyAmount: 0,
            repairsAmount: 0,
            capExpendituresAmount: 0,
            totalExpenses: 0,
        }
    }

    handleChangeMortgage = event => {
        this.setState({ mortgageAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(event.target.value, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.insuranceAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeTaxes = event => {
        this.setState({ taxesAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.insuranceAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeInsurance = event => {
        this.setState({ insuranceAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeUtilities = event => {
        this.setState({ utilitiesAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeVacancy = event => {
        this.setState({ vacancyAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeRepairs = event => {
        this.setState({ repairsAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(this.state.capExpendituresAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    handleChangeCapExpenditures = event => {
        this.setState({ capExpendituresAmount : event.target.value })
        var mortgageAmount = 0
        var taxesAmount = 0
        var insuranceAmount = 0
        var utilitiesAmount = 0
        var vacancyAmount = 0
        var repairsAmount = 0
        var capExpendituresAmount = 0
        if(event.target.value === '') {
            capExpendituresAmount = 0
        } else {
            capExpendituresAmount = parseInt(event.target.value, 10)
        }
        if(this.state.mortgageAmount === '') {
            mortgageAmount = 0
        } else {
            mortgageAmount = parseInt(this.state.mortgageAmount, 10)
        }
        if(this.state.taxesAmount === '') {
            taxesAmount = 0
        } else {
            taxesAmount = parseInt(this.state.taxesAmount, 10)
        }
        if(this.state.utilitiesAmount === '') {
            insuranceAmount = 0
        } else {
            insuranceAmount = parseInt(this.state.insuranceAmount, 10)
        }
        if(this.state.vacancyAmount === '') {
            vacancyAmount = 0
        } else {
            vacancyAmount = parseInt(this.state.vacancyAmount, 10)
        }
        if(this.state.repairsAmount === '') {
            repairsAmount = 0
        } else {
            repairsAmount = parseInt(this.state.repairsAmount, 10)
        }
        if(this.state.capExpendituresAmount === '') {
            utilitiesAmount = 0
        } else {
            utilitiesAmount = parseInt(this.state.utilitiesAmount, 10)
        }
        var totalExpenses = mortgageAmount + taxesAmount + insuranceAmount + utilitiesAmount + vacancyAmount + repairsAmount + capExpendituresAmount
        this.setState({ totalExpenses : totalExpenses })
        this.props.onUpdateExpenses(totalExpenses)
    }

    render() {
        return(
            <div id="Expenses" className='CashflowCategories'>
                <Card className='rootCardExpenses' >
                    <CardContent>
                        <Typography component="h6" variant="subtitle2" color="inherit" noWrap className='header'>
                            Expenses
                        </Typography>
                        <Divider />
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Mortgage
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.mortgageAmount}
                                onChange={this.handleChangeMortgage}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Taxes
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.taxesAmount}
                                onChange={this.handleChangeTaxes}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Insurance
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.insuranceAmount}
                                onChange={this.handleChangeInsurance}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Utilities
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.utilitiesAmount}
                                onChange={this.handleChangeUtilities}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Vacancy
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.vacancyAmount}
                                onChange={this.handleChangeVacancy}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Repairs
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.repairsAmount}
                                onChange={this.handleChangeRepairs}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h1" variant="subtitle1" color="inherit" noWrap className='title'>
                                Cap. Expenditures
                            </Typography>
                            <FormControl fullWidth className='margin'>
                            <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={this.state.capExpendituresAmount}
                                onChange={this.handleChangeCapExpenditures}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </FormControl>
                        </div>
                        <div className='BottomDivider' >
                            <Divider />
                        </div>
                        <div className='AlignValues'>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                    <b>Total Expenses</b>
                            </Typography>
                            <Typography component="h2" variant="subtitle1" color="inherit" noWrap className='bottomTitle'>
                                <b>$ </b><b>{this.state.totalExpenses}</b>
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
        onUpdateExpenses : (argTotalExpenses) => dispatch({
            type: "UPDATE_EXPENSES",
            totalExpenses : argTotalExpenses
        })
    };
}

export default connect(null, mapDispatchToProps)(Expenses);