import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import '../css/Stock.css'

class Cashflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{
                labels: [
                    'Revenue', 
                    'Expenses', 
                ],
                datasets:[
                  {
                    label:'Population',
                    data:[
                      7500,
                      4900,
                    ],
                    backgroundColor:[
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                    ]
                  }
                ]
            },
        }
    }

    render() {
        const paperStyleBar = {
            height: 340,
            width: 540,
            padding: 20,
            marginBottom: 30
        }

        return(
            <Paper style={paperStyleBar}>
                <div>
                    <HorizontalBar
                        data={this.state.chartData}
                        options={{
                            title:{
                                display:true,
                                text:'Cashflow',
                                fontSize:25
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            legend:{
                                display:false,
                            }
                        }}
                    />
                </div>
            </Paper>
        )
    }
}

export default Cashflow;