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
        marginTop: theme.spacing.unit ,
    },
    row: {
        flexGrow: 1
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
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
    }
});

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return {id, name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
                }]
        };

    }

    render() {

        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid item xs={8} className={classes.root}>
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
                <Grid xs={8} alignItems="center">
                    {
                        this.state.listOffers.map(offer => {
                            return (
                                <Grid item className={classes.root}>
                                    <Card className={classes.card}>
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
