import React, { Component } from 'react';
import Projection from './Projection'
import SideStats from './SideStats'
import Cashflow from './Cashflow'
import Investment from './Investment'
import { connect } from 'react-redux';
import axios from 'axios'
import '../css/Dashboard.css'

class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAssets: 0,
            totalLiabilities: 0,
            netWorth: 0,
            totalRevenue: 0,
            totalExpenses: 0,
            totalPrinciple: 0,
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
        var totalRevenue = 0
        var totalExpenses = 0
        var totalPrinciple = 0

        axios.get("http://localhost:3000/api/v1/properties")
        .then(response => {
            response.data.data.forEach(property => {
                console.log(property)
                totalAssets = totalAssets + property.propertyPrice
                totalLiabilities = totalLiabilities + (property.propertyPrice - property.propertyDownPayment)
                totalPrinciple = totalPrinciple + property.propertyPrinciple
                investment['Real Estate'] = investment['Real Estate'] + property.propertyDownPayment + property.propertyClosingCosts + property.propertyRehabCosts
                totalRevenue = totalRevenue + property.propertyRent
                totalExpenses = totalExpenses + property.propertyMortgage + property.propertyInsurance + property.propertyTaxes + property.propertyMiscExpenses
            })
            this.setState({ totalRevenue : totalRevenue })
            this.setState({ totalExpenses : totalExpenses })
        })
        .catch(error => {
            properties = this.props.RealEstateData.propertiesList
            properties.forEach(property => {
                console.log(property)
                totalAssets = totalAssets + property.price
                totalLiabilities = totalLiabilities + (property.price - property.downPayment)
                investment['Real Estate'] = investment['Real Estate'] + property.investment
                totalRevenue = totalRevenue + property.rent
                totalExpenses = totalExpenses + property.mortgage + property.insurance + property.taxes + property.miscExpenses
            })
            this.setState({ totalRevenue : totalRevenue })
            this.setState({ totalExpenses : totalExpenses })
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
        return(
            <div>
                <div className='contentStyleTop'>
                    <Projection {...this.state} />
                    <SideStats {...this.state} />
                </div>
                <div className='contentStyleBottom'>
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