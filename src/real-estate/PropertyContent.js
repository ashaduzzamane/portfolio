import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    rootHead: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    root: {
        width: 345,
        margin: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: '#364059',
    },
    addPropertyStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    buttonStyle: {
        backgroundColor: '#364059',
        color : 'white',
        width : 200,
        height : 50
    }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <div className={classes.rootHead}>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Property 1" className={classes.avatar}>
                    1
                    </Avatar>
                    }
                title="Duplex"
                subheader="7911 Rue Baribeau, Lasalle, Quebec"
            />
            <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                <Typography>
                    Price: $450000
                </Typography>
                <Typography>
                    Investment: $50000
                </Typography>
                <Typography>
                    Cashflow: $400
                </Typography>
                <Typography>
                    Cash-on-Cash Return: +10.2%
                </Typography>
                <Typography>
                    Internal Rate of Return: +39.4%
                </Typography>
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.addPropertyStyle}>
            <Button variant="outlined" className={classes.buttonStyle}>
                <Typography
                    color="inherit"
                    variant="h5"
                >
                    + ADD
                </Typography>
            </Button>
            </CardContent>
        </Card>
    </div>
  );
}