import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 275,
        marginTop: theme.spacing.unit * 3
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    price : {
        fontSize: 26,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 120
    }
});

function ListDiscs(props) {
    const {classes} = props;

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Seller
                    </Typography>
                    <Typography className={classes.price} gutterBottom>Price</Typography>
                    <Typography variant="h5" component="h2">
                        Title
                    </Typography>
                    <CardMedia className={classes.media} image="./MusicDisc.png" title="Disc"/>
                    <Typography component="p">
                        well meaning and kindly.
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </CardActionArea>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>


        </Card>
);
}

ListDiscs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDiscs);
