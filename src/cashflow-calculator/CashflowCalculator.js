import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Investment from './Investment';
import Revenue from './Revenue';
import Expenses from './Expenses';
import Analysis from './Analysis';
import '../css/CashflowCalculator.css';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
}))

export default function CashflowCalculator() {
    const classes = useStyles();

    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}> 
                <Grid item xs={12} md={8} lg={12}>
                    <div className={classes.root}>
                        <div id="LeftSide">
                            <Investment />
                            <Revenue />
                        </div>
                        <div id="RightSide">
                            <Expenses />
                        </div>
                        <div className='Analysis' >
                            <Analysis />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    </main>
    )
}

