import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StockQuery from './StockQuery'

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
        paddingLeft: theme.spacing(16)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeightTop: {
        height: 500,
    },
    fixedHeightBottom: {
        height: 480,
    },
}))

export default function Stocks() {
    const classes = useStyles();
    const fixedHeightPaperTop = clsx(classes.paper, classes.fixedHeightTop);
    const fixedHeightPaperBottom = clsx(classes.paper, classes.fixedHeightBottom);

    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={10}>
            <Paper className={fixedHeightPaperTop}>
                <StockQuery />
            </Paper>
            </Grid>

            {/* <Grid item xs={12} md={12} lg={10}>
            <Paper className={fixedHeightPaperBottom}>
                
            </Paper>
            </Grid>
             */}
            {/* <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
                
            </Paper>
            </Grid> */}
            
            {/* <Grid item xs={12}>
            <Paper className={classes.paper}>
                
            </Paper>
            </Grid> */}
        </Grid>
        {/* <Box pt={4}>
            <Copyright />
        </Box> */}
        </Container>
    </main>
    )
}

