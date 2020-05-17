import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { connect } from 'react-redux';
import trade from 'wstrade-api';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashflow: 0,
      cashOnCashReturn: 0,
      internalRateOfReturn: 0,
    }
  }

  // componentWillMount() {
  //   var email = 
  //   var password = 
  //   trade.login(email, password).then(token => { console.log(token) })
  // }

  handleClick = event => {
    var totalInvestment = this.props.CashflowCalculatorData.totalInvestment
    console.log(totalInvestment)
    var totalExpenses = this.props.CashflowCalculatorData.totalExpenses
    var totalRevenueCashOnCash = this.props.CashflowCalculatorData.totalRevenueCashOnCash
    var totalRevenueInternalRate = this.props.CashflowCalculatorData.totalRevenueInternalRate
    var cashflow = 0
    var cashOnCashReturn = 0
    var internalRateOfReturn = 0
    cashflow = totalRevenueCashOnCash - totalExpenses
    this.setState({ cashflow : cashflow })
    if(totalInvestment !== 0) {
      cashOnCashReturn = ((cashflow * 12) / totalInvestment) * 100
      internalRateOfReturn = (((totalRevenueInternalRate - totalExpenses) * 12) / totalInvestment) * 100
      this.setState({ cashOnCashReturn : cashOnCashReturn.toFixed(1) })
      this.setState({ internalRateOfReturn : internalRateOfReturn.toFixed(1) })

    }
  }

  render() {
    const cardStyle = {
      backgroundColor: '#364059',
      color : 'white'
    }
    const avatarStyle = {
      backgroundColor: '#364059',
      height: 56,
      width: 56
    }
    const iconStyle = {
      height: 36,
      width: 36
    }
    const buttonStyle = {
      backgroundColor: '#364059',
      color : 'white',
      width : 120,
      height : 80
    }

    return(
      <div className='head'>
        <Button variant="outlined" onClick={this.handleClick} style={buttonStyle}>
          <Typography
            color="inherit"
            variant="h5"
          >
            GO
          </Typography>
        </Button>
        <Card style={cardStyle} className='rootCardAnalysis'>
          <CardContent>
              <Grid
              container
              justify="space-between"
              >
                <Grid item>
                    <Typography
                    className='AnalysisTitle'
                    color="inherit"
                    gutterBottom
                    variant="body2"
                    >
                    CASHFLOW
                    </Typography>
                    <Typography
                    color="inherit"
                    variant="h3"
                    >
                    ${this.state.cashflow}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar style={avatarStyle}>
                    <AttachMoneyIcon style={iconStyle}/>
                    </Avatar>
                </Grid>
              </Grid>
          </CardContent>
        </Card>
        <Card style={cardStyle} className='rootCardAnalysis'>
          <CardContent>
              <Grid
              container
              justify="space-between"
              >
                <Grid item>
                    <Typography
                    className='AnalysisTitle'
                    color="inherit"
                    gutterBottom
                    variant="body2"
                    >
                    CASH-ON-CASH RETURN
                    </Typography>
                    <Typography
                    color="inherit"
                    variant="h3"
                    >
                    {this.state.cashOnCashReturn}%
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar style={avatarStyle}>
                    <AttachMoneyIcon style={iconStyle}/>
                    </Avatar>
                </Grid>
              </Grid>
          </CardContent>
        </Card>
        <Card style={cardStyle} className='rootCardAnalysis'>
          <CardContent>
              <Grid
              container
              justify="space-between"
              >
                <Grid item>
                    <Typography
                    className='AnalysisTitle'
                    color="inherit"
                    gutterBottom
                    variant="body2"
                    >
                    INTERNAL RATE OF RETURN
                    </Typography>
                    <Typography
                    color="inherit"
                    variant="h3"
                    >
                    {this.state.internalRateOfReturn}%
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar style={avatarStyle}>
                    <AttachMoneyIcon style={iconStyle}/>
                    </Avatar>
                </Grid>
              </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    CashflowCalculatorData : state.CashflowCalculatorData
  };
}

export default connect(mapStateToProps, null)(Analysis);