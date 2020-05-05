import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import '../css/Stock.css'

class Investment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{
                labels: [
                    'Real Estate', 
                    'Stocks', 
                    'Cash'
                ],
                datasets:[
                  {
                    data:[
                        50000,
                        15000,
                        4000,
                    ],
                    backgroundColor:[
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
            },
        }
    }

    componentWillMount() {
        console.log(this.props.investment.cash)
    }

    render() {
        const paperStylePie = {
            height: 340,
            width: 580,
            padding: 20,
            marginBottom: 30
        }

        return(
            <Paper style={paperStylePie}>
                <Pie
                    data={this.state.chartData}
                    options={{
                        title:{
                            display:true,
                            text:'Investment',
                            fontSize:25
                        },
                        legend:{
                            display:true,
                            position: "right"
                        }
                    }}
                />
            </Paper>
        )
    }


}

export default Investment;