import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    align: {
        display:'flex',
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
    displayCard: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: '100%',
        margin: theme.spacing.unit,
    },
    media: {
        height: 140,
    }
});


class ListeOffres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGenre: [],
            listGenreFiltered: [],
        };
    }


    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/genre')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listGenre: json.result,
                    listGenreFiltered: json.result,
                }
            ))
    }

    doFilter = (e) => {
        this.setState({
            listGenreFiltered: this.state.listGenre.filter(a =>
                (a.Name.toLowerCase()).indexOf(e.target.value.toLowerCase()) >= 0
            )
        });
    };

    render() {

        const {classes} = this.props;
        return (
            <Grid container justify={"center"}>
                <Grid xs={10} className={classes.root}>
                    <Typography className={classes.title1} variant="h2" component="h3">
                        Offers
                    </Typography>
                </Grid>
                <Grid item xs={10} className={classes.root}>
                    <Paper>
                        <Input
                            placeholder="Search"
                            onChange={this.doFilter}
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
                        this.state.listGenreFiltered.map(genre => {
                            return (
                                <Grid item xs={12} md={4} lg={3}>
                                    <Card className={classes.displayCard}>
                                        <CardActionArea>
                                            <Typography gutterBottom variant="">
                                                {genre.Name}
                                                {genre.colorCode}
                                            </Typography>
                                            <CardContent>
                                                <Grid item container xs={2}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        *Title*
                                                    </Typography>
                                                    <Typography gutterBottom variant="h7" component="h4">
                                                        *Artist*
                                                    </Typography>
                                                </Grid>
                                                <Typography component="p">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button variant="contained" size="small" style={{
                                                background: genre.colorCode,
                                                color: 'white'
                                            }}>
                                                *Seller*
                                            </Button>
                                        </CardActions>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <div className={classes.align}>
                                            <Grid xs={12} md={6} item>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        *Seller*
                                                    </Button>
                                                </CardActions>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Typography gutterBottom margin={100} variant="h5">
                                                    *Price*
                                                </Typography>
                                            </Grid>
                                        </div>
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
