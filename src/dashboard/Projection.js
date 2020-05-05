import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import '../css/Stock.css'

class Projection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                labels: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
                datasets: [
                    {
                        label: 'Stock',
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
                        data: [80000, 85000, 91000, 98000, 108000, 118000, 129000, 140000]
                    }
                ]
            },
        }
    }

    render() {
        const paperStyle = {
            height: 440,
            width: 840,
            padding: 20,
            marginBottom: 30
        }

        return(
            <Paper style={paperStyle}>
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