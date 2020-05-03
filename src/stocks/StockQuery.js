import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2'
import axios from 'axios'

class StockQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        // display: false,
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

            for (var key in response.data['Time Series (Daily)']) {
                date.unshift(key)
                marketValue.unshift(response.data['Time Series (Daily)'][key]['1. open'])
            }
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
        const buttonStyle = {
            backgroundColor: '#364059',
            color : 'white',
            marginLeft: 5,
            width : 120,
            height : 55,
        }


        return(
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
        )
    }
}

export default StockQuery;