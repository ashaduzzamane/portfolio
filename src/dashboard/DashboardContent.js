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
        var properties = []
        var financialAssets = []
        var financialLiabilities = []
        var investment = this.state.investment
        var totalAssets = 0
        var totalLiabilities = 0
        
        axios.get("http://localhost:3000/api/v1/properties")
        .then(response => {
            response.data.data.forEach(property => {
                totalAssets = totalAssets + property.propertyPrice
                totalLiabilities = totalLiabilities + (property.propertyPrice = property.propertyDownPayment)
                investment['Real Estate'] = investment['Real Estate'] + property.investment
            })
        })
        .catch(error => {
            properties = this.props.RealEstateData.propertiesList
            properties.forEach(property => {
                totalAssets = totalAssets + property.price
                totalLiabilities = totalLiabilities + (property.price - property.downPayment)
                investment['Real Estate'] = investment['Real Estate'] + property.investment
            })
        })

        axios.get("http://localhost:3000/api/v1/financials")
        .then(response => {
            response.data.data.forEach(financial => {
                if(financial.accountType === "Asset") {
                    financialAssets.push(financial)
                } else if(financial.accountType === "Liability") {
                    financialLiabilities.push(financial)
                }
            })
            financialAssets.forEach(financial => {
                totalAssets = totalAssets + financial.accountValue
                if( !(Object.keys(investment).includes(financial.accountDescription)) ) {
                    investment[`${financial.accountDescription}`] = financial.accountValue
                } else {
                    investment[`${financial.accountDescription}`] = investment[`${financial.accountDescription}`] + financial.accountValue
                }
            })
            financialLiabilities.forEach(financial => {
                totalLiabilities = totalLiabilities + financial.accountValue
            })
            console.log(totalAssets, totalLiabilities)
            var netWorth = totalAssets - totalLiabilities
            this.setState({ netWorth : netWorth })
            this.setState({ investment : investment })
            this.setState({ totalAssets : totalAssets })
            this.setState({ totalLiabilities : totalLiabilities })
        })
        .catch(error => {
            financialAssets = this.props.FinancialInstitutionData.rowsAssets
            financialLiabilities = this.props.FinancialInstitutionData.rowsLiabilities
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