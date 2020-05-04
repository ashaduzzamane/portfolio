import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddPropertyPopup from './AddPropertyPopup';

class RealEstateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            nextIndex: 2,
            propertiesData: [
                {
                    id: 1,
                    type: 'Duplex',
                    address: '7911 Rue Baribeau, LaSalle, QC',
                    price: '500000',
                    investment: '45000',
                    cashflow: '400',
                    cashOnCash: '10.4',
                    internalRate: '39.8'
                }
            ]
        }
    }

    togglePopup = event => {  
        this.setState({  
            showPopup: !this.state.showPopup  
        });  
    }  

    handleClose = (argActionType, argType, argAddress, argPrice, argInvestment, argCashflow, argCashOnCash, argInternalRate) => {
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
                    internalRate: argInternalRate
                }
            )
            this.setState({ propertiesData : propertiesData })
            this.setState({ nextIndex : (index + 1) })
        }
        this.togglePopup()
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
                            <Button variant="outlined" style={buttonStyleDelete}>
                                <Typography
                                    color="inherit"
                                    variant="h6"
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
                        closePopup={this.handleClose}
                    />
                    : null
                }
            </div>
        )
    }
}

export default RealEstateContent;