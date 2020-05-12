import React, { Component } from 'react';
import Projection from './Projection'
import SideStats from './SideStats'
import Cashflow from './Cashflow'
import Investment from './Investment'
import { connect } from 'react-redux';
import axios from 'axios'
import '../css/Stock.css'

class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAssets: 0,
            totalLiabilities: 0,
            netWorth: 0,
            properties : [],
            financialAssets : [],
            financialLiabilities : [],
            investment: {
                "Real Estate" : 0
            }
        }
    }

    componentWillMount() {
        var properties = this.props.RealEstateData.propertiesList
        var financialAssets = this.props.FinancialInstitutionData.rowsAssets
        var financialLiabilities = this.props.FinancialInstitutionData.rowsLiabilities
        var investment = this.state.investment
        var totalAssets = 0
        var totalLiabilities = 0
        properties.forEach(property => {
            totalAssets = totalAssets + property.price
            totalLiabilities = totalLiabilities + (property.price - property.downPayment)
            investment['Real Estate'] = investment['Real Estate'] + property.investment
        })
        financialAssets.forEach(financial => {
            totalAssets = totalAssets + financial.Value
            if( !(Object.keys(investment).includes(financial.Description)) ) {
                investment[`${financial.Description}`] = financial.Value
            } else {
                investment[`${financial.Description}`] = investment[`${financial.Description}`] + financial.Value
            }
        })
        financialLiabilities.forEach(financial => {
            totalLiabilities = totalLiabilities + financial.Value
        })
        var netWorth = totalAssets - totalLiabilities
        this.setState({ netWorth : netWorth })
        this.setState({ investment : investment })
        this.setState({ totalAssets : totalAssets })
        this.setState({ totalLiabilities : totalLiabilities })

        axios.get("http://localhost:3000/api/v1/properties")
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        axios.get("http://localhost:3000/api/v1/financials")
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
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
        RealEstateData : state.RealEstateData,
        FinancialInstitutionData : state.FinancialInstitutionData
    };
}

export default connect(mapStateToProps)(DashboardContent);