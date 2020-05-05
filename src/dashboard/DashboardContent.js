import React, { Component } from 'react';
import Projection from './Projection'
import SideStats from './SideStats'
import Cashflow from './Cashflow'
import Investment from './Investment'
import { connect } from 'react-redux';
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

    componentWillMount() {
        var realEstateInvestments = 0
        var realEstateAssets = 0
        this.props.RealEstateData.propertiesList.forEach(property => {
            realEstateInvestments = realEstateInvestments + parseInt(property.investment, 10)
            realEstateAssets = realEstateAssets + parseInt(property.price, 10)
        })
        var investment  = this.state.investment
        investment.realEstate = realEstateInvestments
        this.setState({ investment : investment })
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

function mapStateToProps(state) {
    return {
        RealEstateData : state.RealEstateData
    };
}

export default connect(mapStateToProps)(DashboardContent);