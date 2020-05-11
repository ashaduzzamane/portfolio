import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddPropertyPopup from './AddPropertyPopup';
import { connect } from 'react-redux';
import axios from 'axios';


class RealEstateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupType: '',
            editID: 0,
            showPopup: false,
            sqlIndex: 1,
            propertyCount: 1,
            propertiesData: [
                // {
                //     id: 1,
                //     propertyCount: 2,
                //     type: 'Duplex',
                //     address: '7911 Rue Baribeau, LaSalle, QC',
                //     price: '500000',
                //     
                //     investment: '45000',
                //     cashflow: '400',
                //     cashOnCash: '10.4',
                //     internalRate: '39.8',
                //     principle: 1300
                // }
            ]
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3000/api/v1/properties')
        .then(response => {
            console.log(response)
            var propertyCount = 0
            var sqlIndex = 0
            var propertiesData = []
            for (var i=0; i<response.data.data.length; i++) {
                var property = response.data.data[i]
                var investment = property.propertyDownPayment + property.propertyClosingCosts + property.propertyRehabCosts
                propertiesData.push(
                    {
                        id: property.id,
                        propertyCount: i+1,
                        type: property.propertyType,
                        address: property.propertyAddress,
                        price: property.propertyPrice,
                        downPayment: property.propertyDownPayment,
                        closingCosts: property.propertyClosingCosts,
                        rehabCosts: property.propertyRehabCosts,
                        investment: investment,
                        principle: property.propertyPrinciple,
                        rent: property.propertyRent,
                        mortgage: property.propertyMortgage,
                        taxes: property.propertyTaxes,
                        insurance: property.propertyInsurance,
                        miscExpenses: property.propertyMiscExpenses,
                        cashflow: property.propertyCashflow,
                        cashOnCash: property.propertyCashOnCash,
                        internalRate: property.propertyInternalRate
                    }
                )
                sqlIndex = property.id
                propertyCount++
            }
            this.setState({ sqlIndex : (parseInt(sqlIndex, 10) + 1) })
            this.setState({ propertyCount : (propertyCount + 1) })
            this.setState({ propertiesData : propertiesData })
            this.props.onUpdateDashboardRealEstateInvestment(propertiesData)
        })
        .catch(error => {
            console.log(error)
            if(this.state.propertiesData !== this.props.RealEstateData.propertiesList) {
                this.setState({ propertiesData : this.props.RealEstateData.propertiesList })
                console.log("done")
            }
        })
    }

    togglePopup = event => {  
        this.setState({ popupType : 'ADD' })
        this.setState({ showPopup: !this.state.showPopup }); 
    } 

    toggleEdit = (e, id) => {  
        this.setState({ editID : id })
        this.setState({ popupType : 'EDIT' })
        this.setState({ showPopup: !this.state.showPopup }); 
    }  

    handleClose = (
        argActionType, argType, argAddress, argPrice, 
        argDownPayment, argClosingCosts, argRehabCosts, 
        argPrinciple, argRent, 
        argMortgage, argTaxes, argInsurance, argMiscExpenses, 
        argInvestment, argCashflow, argCashOnCash, argInternalRate
        ) => {
        if(argActionType === "ADD") {
            var propertiesData = this.state.propertiesData
            var index = this.state.propertyCount
            var sqlIndex = this.state.sqlIndex
            propertiesData.push(
                {
                    id: sqlIndex,
                    propertyCount: index,
                    type: argType,
                    address: argAddress,
                    price: argPrice,
                    downPayment: argDownPayment,
                    closingCosts: argClosingCosts,
                    rehabCosts: argRehabCosts,
                    investment: argInvestment,
                    principle: argPrinciple,
                    rent: argRent,
                    mortgage: argMortgage,
                    taxes: argTaxes,
                    insurance: argInsurance,
                    miscExpenses: argMiscExpenses,
                    cashflow: argCashflow,
                    cashOnCash: argCashOnCash,
                    internalRate: argInternalRate
                }
            )
            this.setState({ propertiesData : propertiesData })
            this.props.onUpdateDashboardRealEstateInvestment(propertiesData)
            this.setState({ propertyCount : (index + 1) })
            this.setState({ sqlIndex : (sqlIndex + 1) })

            axios.post('http://localhost:3000/api/v1/properties', {
                "propertyAddress" : argAddress,
                "propertyType" : argType,
                "propertyPrice" : argPrice,
                "propertyDownPayment" : argDownPayment,
                "propertyClosingCosts" : argClosingCosts,
                "propertyRehabCosts" : argRehabCosts,
                "propertyPrinciple" : argPrinciple,
                "propertyRent" : argRent,
                "propertyTotalRevenue" : argRent,
                "propertyMortgage" : argMortgage,
                "propertyTaxes" : argTaxes,
                "propertyInsurance" : argInsurance,
                "propertyMiscExpenses" : argMiscExpenses,
                "propertyCashflow" : argCashflow,
                "propertyCashOnCash" : argCashOnCash,
                "propertyInternalRate" : argInternalRate
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        } else if(argActionType === "EDIT") {
            console.log("edit")
            var propertiesData = this.state.propertiesData
            for (var i=0; i<propertiesData.length; i++) {
                var property = propertiesData[i]
                if(property.id === this.state.editID) {
                    propertiesData[i].type = argType
                    propertiesData[i].address = argAddress
                    propertiesData[i].price = argPrice
                    propertiesData[i].downPayment = argDownPayment
                    propertiesData[i].closingCosts = argClosingCosts
                    propertiesData[i].rehabCosts = argRehabCosts
                    propertiesData[i].investment = argInvestment
                    propertiesData[i].principle = argPrinciple
                    propertiesData[i].rent = argRent
                    propertiesData[i].mortgage = argMortgage
                    propertiesData[i].taxes = argTaxes
                    propertiesData[i].insurance = argInsurance
                    propertiesData[i].miscExpenses = argMiscExpenses
                    propertiesData[i].cashflow = argCashflow
                    propertiesData[i].cashOnCash = argCashOnCash
                    propertiesData[i].internalRate = argInternalRate
                }
            }

            this.setState({ propertiesData : propertiesData })
            this.props.onUpdateDashboardRealEstateInvestment(propertiesData)

            var putURL = 'http://localhost:3000/api/v1/properties/' + this.state.editID
            axios.put(putURL, {
                "propertyAddress" : argAddress,
                "propertyType" : argType,
                "propertyPrice" : argPrice,
                "propertyDownPayment" : argDownPayment,
                "propertyClosingCosts" : argClosingCosts,
                "propertyRehabCosts" : argRehabCosts,
                "propertyPrinciple" : argPrinciple,
                "propertyRent" : argRent,
                "propertyTotalRevenue" : argRent,
                "propertyMortgage" : argMortgage,
                "propertyTaxes" : argTaxes,
                "propertyInsurance" : argInsurance,
                "propertyMiscExpenses" : argMiscExpenses,
                "propertyCashflow" : argCashflow,
                "propertyCashOnCash" : argCashOnCash,
                "propertyInternalRate" : argInternalRate
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
        this.togglePopup()
    }

    handleDelete = (e, itemID) => {
        console.log(itemID)
        var propertiesData = this.state.propertiesData
        var propertyCount = propertiesData.length
        this.setState({ propertyCount : propertyCount })
        propertiesData.forEach(property => {
            if(itemID == property.propertyCount) {
                var deleteURL = 'http://localhost:3000/api/v1/properties/'+property.id.toString()
                axios.delete(deleteURL)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
                propertiesData.splice(( property.propertyCount - 1) , 1)
            }
        })
        var newPropertyCount = 1
        propertiesData.forEach(property => {
            property.propertyCount = newPropertyCount
            newPropertyCount++
        })
        this.props.onUpdateDashboardRealEstateInvestment(propertiesData)
        this.setState({ propertiesData : propertiesData })
    }

    render() {
        const headStyle = {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
        }
        const rootStyle = {
            width: 345,
            height: 500,
            margin: 10
        }
        const avatarStyle = {
            backgroundColor: '#364059',
        }
        const mediaStyle = {
            height: 0,
            paddingTop: '56.25%', // 16:9
        }
        const buttonStyle = {
            backgroundColor: '#364059',
            color : 'white',
            width : 200,
            height : 50
        }
        const buttonSpace = {
            display: 'flex',
            justifyContent: 'space-around'
        }
        const buttonStyleEdit = {
            backgroundColor: '#364059',
            color : 'white',
            width : 130,
            height : 40,
            margin : 10
        }
        const buttonStyleDelete = {
            backgroundColor: '#999999',
            color : 'white',
            width : 130,
            height : 40,
            margin : 10
        }
        const addPropertyStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '75%'
        }

        return(
            <div style={headStyle}>
                {this.state.propertiesData.map(property => {
                    return(
                        <Card style={rootStyle}>
                        <CardHeader 
                            avatar={
                                <Avatar aria-label="Property 1" style={avatarStyle}>
                                    {property.propertyCount}
                                </Avatar>
                            }
                            title={property.type}
                            subheader={property.address}
                        />
                        <CardMedia 
                            style={mediaStyle}
                            image="/static/images/cards/paella.jpg"
                            title={property.type}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            <Typography>
                                <b>Price: ${property.price}</b>
                            </Typography>
                            <Typography>
                                <b>Investment: ${property.investment}</b>
                            </Typography>
                            <Typography>
                                <b>Cashflow: ${property.cashflow}</b>
                            </Typography>
                            <Typography>
                                <b>Cash-on-Cash Return: {property.cashOnCash}%</b>
                            </Typography>
                            <Typography>
                                <b>Internal Rate of Return: {property.internalRate}%</b>
                            </Typography>
                            </Typography>
                        </CardContent>
                        <div style={buttonSpace}>
                            <Button variant="outlined" style={buttonStyleEdit} onClick={((e) => this.toggleEdit(e, property.id))}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
                                >
                                    EDIT
                                </Typography>
                            </Button>
                            <Button id={property.propertyCount} variant="outlined" style={buttonStyleDelete}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
                                    onClick={((e) => this.handleDelete(e, property.propertyCount))}
                                >
                                    DELETE
                                </Typography>
                            </Button>
                        </div>
                    </Card>
                    )
                })}
                <Card style={rootStyle}>
                    <CardHeader 
                        avatar={
                            <Avatar aria-label="Property 1" style={avatarStyle}>
                                {this.state.propertyCount}
                            </Avatar>
                        }
                        title="Property Type"
                        subheader="Address"
                    />
                    <CardContent style={addPropertyStyle}>
                        <Button variant="outlined" style={buttonStyle} onClick={this.togglePopup}>
                            <Typography
                                color="inherit"
                                variant="h5"
                            >
                                + ADD
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
                {this.state.showPopup ? 
                    <AddPropertyPopup 
                        {...this.state}
                        closePopup={this.handleClose}
                    />
                    : null
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateDashboardRealEstateInvestment : (argPropertiesData) => dispatch({
            type: "UPDATE_DASHBOARD_REAL_ESTATE_INVESTMENT",
            propertiesData : argPropertiesData
        })
    };
}

function mapStateToProps(state) {
    return {
        RealEstateData : state.RealEstateData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealEstateContent);