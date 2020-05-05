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


class RealEstateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            nextIndex: 1,
            propertiesData: [
                // {
                //     id: 1,
                //     type: 'Duplex',
                //     address: '7911 Rue Baribeau, LaSalle, QC',
                //     price: '500000',
                //     investment: '45000',
                //     cashflow: '400',
                //     cashOnCash: '10.4',
                //     internalRate: '39.8'
                // }
            ]
        }
    }

    componentWillMount() {
        if(this.state.propertiesData !== this.props.RealEstateData.propertiesList) {
            this.setState({ propertiesData : this.props.RealEstateData.propertiesList })
            console.log("done")
        }
        console.log(this.state.propertiesData)
    }

    togglePopup = event => {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });  
    }  

    handleClose = (argActionType, argType, argAddress, argPrice, argInvestment, argCashflow, argCashOnCash, argInternalRate, argTotalExpenses, argTotalRevenue, argPrinciple) => {
        console.log(argActionType)
        if(argActionType === "save") {
            var propertiesData = this.state.propertiesData
            var index = this.state.nextIndex
            propertiesData.push(
                {
                    id: index,
                    type: argType,
                    address: argAddress,
                    price: argPrice,
                    investment: argInvestment,
                    cashflow: argCashflow,
                    cashOnCash: argCashOnCash,
                    internalRate: argInternalRate,
                    totalExpenses: argTotalExpenses,
                    totalRevenue: argTotalRevenue,
                    princple: argPrinciple
                }
            )
            console.log(propertiesData)
            this.setState({ propertiesData : propertiesData })
            this.props.onUpdateDashboardRealEstateInvestment(propertiesData)
            this.setState({ nextIndex : (index + 1) })
        }
        this.togglePopup()
    }

    handleDelete = (e, itemID) => {
        var propertiesData = this.state.propertiesData
        var nextIndex = propertiesData.length
        this.setState({ nextIndex : nextIndex })
        propertiesData.forEach(property => {
            if(itemID == property.id) {
                propertiesData.splice(( property.id - 1) , 1)
            }
        })
        var newIndex = 1
        propertiesData.forEach(property => {
            property.id = newIndex
            newIndex++
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
            backgroundColor: '#552020',
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
                                    {property.id}
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
                            <Button variant="outlined" style={buttonStyleEdit} onClick={this.togglePopup}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
                                >
                                    EDIT
                                </Typography>
                            </Button>
                            <Button id={property.id} variant="outlined" style={buttonStyleDelete}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
                                    onClick={((e) => this.handleDelete(e, property.id))}
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
                                {this.state.nextIndex}
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