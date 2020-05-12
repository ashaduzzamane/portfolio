import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import '../css/Stock.css'

class Investment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: {},
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
        this.setState({ investment : this.props.investment })
    }

    componentDidUpdate(){
        if(this.state.investment !== this.props.investment) {
            this.setState({ investment : this.props.investment })
            this.getData()
            console.log("done")
        }
    }

    getData() {
        var chartData = this.state.chartData
        chartData.labels = Object.keys(this.props.investment)
        chartData.datasets[0].data = Object.values(this.props.investment)
        return chartData
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
                    data={this.getData()}
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