import React, { Component } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import '../css/Dashboard.css'

class SideStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            netWorth: '845000',
            totalAssets: '1845000',
            totalLiabilities: '1000000',
        }
    }

    componentWillMount() {
        console.log(this.props.netWorth, this.props.totalAssets, this.props.totalLiabilities)
        this.setState({ netWorth : this.props.netWorth })
        this.setState({ totalAssets : this.props.totalAssets })
        this.setState({ totalLiabilities : this.props.totalLiabilities })
    }

    componentDidUpdate() {
        if(this.state.netWorth !== this.props.netWorth || this.state.totalAssets !== this.props.totalAssets || this.state.totalLiabilities !== this.props.totalLiabilities) {
            console.log(this.props.netWorth, this.props.totalAssets, this.props.totalLiabilities)
            this.setState({ netWorth : this.props.netWorth })
            this.setState({ totalAssets : this.props.totalAssets })
            this.setState({ totalLiabilities : this.props.totalLiabilities })
        }
    }

    render() {
        const cardStyle = {
            backgroundColor: '#f0f0f0',
            color : '#364059',
            marginBottom: 25
        }
        const cardStyleMain = {
            backgroundColor: '#364059',
            color : 'white',
            marginBottom: 25
        }

        return(
            <div className='rootStatsStyle'>
                <Card style={cardStyleMain} id='stockCardSideStats'>
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography
                                className='AnalysisTitle'
                                color="inherit"
                                gutterBottom
                                variant="body2"
                                >
                                NET WORTH
                                </Typography>
                                <Typography
                                color="inherit"
                                variant="h3"
                                >
                                    $ {this.state.netWorth}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card style={cardStyle} id='stockCardSideStats'>
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography
                                className='AnalysisTitle'
                                color="inherit"
                                gutterBottom
                                variant="body2"
                                >
                                TOTAL ASSETS
                                </Typography>
                                <Typography
                                color="inherit"
                                variant="h3"
                                >
                                    $ {this.state.totalAssets}    
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card style={cardStyle} id='stockCardSideStats'>
                    <CardContent>
                        <Grid
                        container
                        justify="space-between"
                        >
                            <Grid item>
                                <Typography
                                className='AnalysisTitle'
                                color="inherit"
                                gutterBottom
                                variant="body2"
                                >
                                TOTAL LIABILITIES
                                </Typography>
                                <Typography
                                color="inherit"
                                variant="h3"
                                >
                                    $ {this.state.totalLiabilities}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default SideStats;