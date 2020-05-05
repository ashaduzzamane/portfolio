import React, { Component } from 'react';
import { Line, Doughnut, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import Projection from './Projection'
import SideStats from './SideStats'
import Cashflow from './Cashflow'
import Investment from './Investment'
import '../css/Stock.css'

class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: {
                realEstate: 0,
                stocks: 0,
                cash: 0
            }
        }
    }

    render() {
        const topContentStyle = {
            display: 'flex',
            justifyContent: 'space-between'
        }

        return(
            <div>
                <div style={topContentStyle}>
                    <Projection {...this.state} />
                    <SideStats {...this.state} />
                </div>
                <div style={topContentStyle}>
                    <Cashflow {...this.state} />
                    <Investment {...this.state} />
                </div>
            </div>
        )
    }
}

export default DashboardContent;