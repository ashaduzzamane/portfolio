import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Card, CardContent, Grid, Typography, Avatar, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import '../css/Stock.css'

class StockQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevOpen: 0,
            hundredDayHigh: 0,
            hundredDayLow: 0,
            pastSeven: 0,
            pastThirty: 0,
            pastHundred: 0,
            symbol: 'Stock',
            date: [],
            marketValue: [],
            values: {
                labels: [],
                datasets: [
                    {
                        label: 'Stock',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: '#364059',
                        borderColor: '#364059',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#364059',
                        pointBackgroundColor: '#ffff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#364059',
                        pointHoverBorderColor: '#364059',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Market Value'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }]
                }
            }
        }
    }

    handleClick = event => {
        var stockSymbol = document.getElementById("stock-symbol").value
        // axios({
        //     "method":"GET",
        //     "url":"http://autoc.finance.yahoo.com/autoc?query=google&callback=YAHOO.Finance.SymbolSuggest.ssCallback&lang=en&region=1",
        //     "header":{
        //         // 'X-Requested-With': 'XMLHttpRequest',
        //         "Access-Control-Allow-Origin": "http://localhost:3000"
        //     },
        //     "params":{
        //         "query": stockSymbol,
        //     }
        // })
        // .then((response)=>{
        //     console.log(response)
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })

        axios({
          "method":"GET",
          "url":"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=value&outputsize=compact&apikey=value",
          "params":{
            "apikey": "V7JOOUFM53910Y4Y",
            "symbol": stockSymbol
          }
        })
        .then((response)=>{
            console.log(response)
            var symbol = stockSymbol
            var date = []
            var marketValue = []
            var hundredDayHigh = -1
            var hundredDayLow = 100000000
            for (var key in response.data['Time Series (Daily)']) {
                date.unshift(key)
                marketValue.unshift(response.data['Time Series (Daily)'][key]['1. open'])
                if(parseFloat(response.data['Time Series (Daily)'][key]['1. open']) > hundredDayHigh ) {
                    hundredDayHigh = parseFloat(response.data['Time Series (Daily)'][key]['1. open'])
                } else if(parseFloat(response.data['Time Series (Daily)'][key]['1. open']) < hundredDayLow) {
                    hundredDayLow = parseFloat(response.data['Time Series (Daily)'][key]['1. open'])
                }
            }
            var pastSeven = 0
            var pastSevenStr = ''
            var pastThirty = 0
            var pastThirtyStr = ''
            var pastHundred = 0
            var pastHundredStr = ''
            if(marketValue[marketValue.length - 1] > marketValue[marketValue.length - 7]) {
                pastSeven = (marketValue[marketValue.length - 1] / marketValue[marketValue.length - 7]).toFixed(2)
                pastSevenStr = '+' + pastSeven
            } else {
                pastSeven = (marketValue[marketValue.length - 7] / marketValue[marketValue.length - 1]).toFixed(2)
                pastSevenStr = '-' + pastSeven
            }
            if(marketValue[marketValue.length - 1] > marketValue[marketValue.length - 14]) {
                pastThirty = (marketValue[marketValue.length - 1] / marketValue[marketValue.length - 14]).toFixed(2)
                pastThirtyStr = '+' + pastThirty
            } else {
                pastThirty = (marketValue[marketValue.length - 14] / marketValue[marketValue.length - 1]).toFixed(2)
                pastThirtyStr = '-' + pastThirty
            }
            if(marketValue[marketValue.length - 1] > marketValue[marketValue.length - 14]) {
                pastHundred = (marketValue[marketValue.length - 1] / marketValue[0]).toFixed(2)
                pastHundredStr = '+' + pastHundred
            } else {
                pastHundred = (marketValue[0] / marketValue[marketValue.length - 1]).toFixed(2)
                pastHundredStr = '-' + pastHundred
            }
            this.setState({ prevOpen : parseFloat(marketValue[marketValue.length - 1]).toFixed(2) })
            this.setState({ hundredDayHigh : hundredDayHigh.toFixed(2) })
            this.setState({ hundredDayLow : hundredDayLow.toFixed(2) })
            this.setState({ pastSeven : pastSevenStr })
            this.setState({ pastThirty : pastThirtyStr })
            this.setState({ pastHundred : pastHundredStr })
            this.setState({ symbol : symbol })
            this.setState({ date : date })
            this.setState({ marketValue : marketValue })
            this.getChartData()
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    getChartData = (canvas) => {
        var data = this.state.values
        data.labels = this.state.date
        data.datasets[0].label = this.state.symbol
        data.datasets[0].data = this.state.marketValue
        return data
    }

    render() {
        const cardStyleBottom = {
            backgroundColor: '#CDCDCD',
            color : '#364059'
        }
        const cardStyleSide = {
            backgroundColor: '#364059',
            color : 'white'
        }
        const paperStyle = {
            height: 480,
            width: 800,
            padding: 20,
            marginBottom: 30
        }
        const buttonStyle = {
            backgroundColor: '#364059',
            color : 'white',
            marginLeft: 5,
            width : 120,
            height : 55,
        }
        const statsStyle = {
            display: 'flex',
            justifyContent: 'space-between'
        }
        const topContentStyle = {
            display: 'flex',
            justifyContent: 'space-between'
        }
        const sideStatsStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
        }

        return(
            <div>
                <div style={topContentStyle}>
                    <Paper style={paperStyle}>
                        <div>
                            <div>
                                <TextField id="stock-symbol" label="Stock Symbol" variant="outlined" />
                                <Button variant="outlined" onClick={this.handleClick} style={buttonStyle}>
                                    <Typography
                                        color="inherit"
                                        variant="h5"
                                    >
                                        GO
                                    </Typography>
                                </Button>
                            </div>
                            <div>
                                <Line 
                                    data={this.getChartData}
                                    id='render'
                                    options={this.state.options}
                                />
                            </div>
                        </div>
                    </Paper>
                    <div style={sideStatsStyle}>
                        <Card style={cardStyleSide} className='stockCardSideStats'>
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
                                        PREV OPEN
                                        </Typography>
                                        <Typography
                                        color="inherit"
                                        variant="h3"
                                        >
                                            $ {this.state.prevOpen}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={cardStyleSide} className='stockCardSideStats'>
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
                                        100 DAYS HIGH
                                        </Typography>
                                        <Typography
                                        color="inherit"
                                        variant="h3"
                                        >
                                            $ {this.state.hundredDayHigh}    
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={cardStyleSide} className='stockCardSideStats'>
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
                                        100 DAYS LOW
                                        </Typography>
                                        <Typography
                                        color="inherit"
                                        variant="h3"
                                        >
                                            $ {this.state.hundredDayLow}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div style={statsStyle}>
                    <Card style={cardStyleBottom} className='stockCardAnalysis'>
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
                                    PAST 7 DAYS
                                    </Typography>
                                    <Typography
                                    color="inherit"
                                    variant="h3"
                                    >
                                        {this.state.pastSeven}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card style={cardStyleBottom} className='stockCardAnalysis'>
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
                                    PAST 30 DAYS
                                    </Typography>
                                    <Typography
                                    color="inherit"
                                    variant="h3"
                                    >
                                        {this.state.pastThirty}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card style={cardStyleBottom} className='stockCardAnalysis'>
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
                                    PAST 100 DAYS
                                    </Typography>
                                    <Typography
                                    color="inherit"
                                    variant="h3"
                                    >
                                        {this.state.pastHundred}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default StockQuery;