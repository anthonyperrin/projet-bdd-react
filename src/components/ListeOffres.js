import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
    row: {
        flexGrow: 0
    },
    bullet: {
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    input: {
        margin: theme.spacing.unit,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    display: {
        position: 'relative',
        float: 'left',
        display: 'inline-flex'
    }
});


class ListeOffres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOffers: [
                {
                    name: "oui"
                },
                {
                    name: "allo?"
                },
                {
                    name: "Pierre?"
                },
                {
                    name: "Bonjour?"
                }]
        };

    }

    render() {

        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid xs={8} className={classes.root}>
                    <Paper>
                        <Input
                            placeholder="Search"
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                name="age"
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="" disabled>
                                    Sort by
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid xs={8} className={classes.root && classes.display}>
                    {
                        this.state.listOffers.map(offer => {
                            return (
                                <Grid className={classes.root} container>
                                    <Card>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {offer.name}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                be
                                                nev
                                                lent
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                adjective
                                            </Typography>
                                            <Typography component="p">
                                                well meaning and kindly.
                                                <br/>
                                                {'"a benevolent smile"'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

ListeOffres.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListeOffres);
