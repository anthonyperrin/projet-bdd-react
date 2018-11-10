import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit,
        flexGrow: 1,
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
    row: {
        flexGrow: 1
    },
    bullet: {
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    input: {
        margin: theme.spacing.unit,
    },
    title1: {
        marginTop: theme.spacing.unit
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    displayCard: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 300,
        margin: theme.spacing.unit,
    }
});


class ListeOffres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGenre: [],
            listGenreSorted: []
        };
    }

    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/genre')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listGenre: json.result
                }
            ))
    }

    render() {

        const {classes} = this.props;

        return (
            <Grid container justify={"center"}>
                <Grid xs={8} className={classes.root}>
                    <Typography className={classes.title1} variant="h2" component="h3">
                        Offers
                    </Typography>
                </Grid>
                <Grid item xs={10} className={classes.root}>
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
                                className={classes.selectEmpty}>
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
                <Grid container className={classes.root} spacing={20} xs={10} direction="row"
                      alignItems="center">
                    {
                        this.state.listGenre.map(genre => {
                            return (
                                <Grid item xs={6} md={4} lg={3}>
                                    <Card className={classes.displayCard}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {genre.Name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>);
    }
}
ListeOffres.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListeOffres);
