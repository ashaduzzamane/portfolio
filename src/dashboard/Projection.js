import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
// import '../css/Stock.css'
import '../css/Dashboard.css'

class Projection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                labels: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2029],
                datasets: [
                    {
                        label: 'Net Worth',
                        fill: true,
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
                        data: [80000, 85000, 91000, 98000, 108000, 118000, 129000, 140000, 118000, 129000, 140000]
                    }
                ]
            },
        }
    }

    componentDidUpdate() {
        this.getData()
    }

    getData() {
        var values = this.state.values
        var currentYear = (new Date()).getFullYear()
        var labels = []
        for (var i=0; i<10; i++) {
            labels.push(currentYear)
            currentYear++
        }
        var totalPrinciple = this.props.totalPrinciple
        var currentNetWorth = this.props.netWorth
        var cashflow = this.props.totalRevenue - this.props.totalExpenses
        var data = []
        for (var j=0; j<10; j++) {
            data.push(currentNetWorth)
            currentNetWorth = currentNetWorth + cashflow + totalPrinciple 
        }
        values.labels = labels
        values.datasets[0].data = data
        return values
    }

    render() {
        const paperStyle = {
            height: 440,
            width: 840,
            padding: 20,
            marginBottom: 30
        }

        return(
            <Paper 
                // style={paperStyle}
                className='paperStyleLine'
            >
                <div>
                    <Line 
                        data={this.state.values}
                        id='render'
                        options={{
                            title:{
                                display:true,
                                text:'Net Worth Projection',
                                fontSize:25
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            legend:{
                                display: false,
                            }
                        }}
                    />
                </div>
            </Paper>
        )
    }
}

export default Projection;