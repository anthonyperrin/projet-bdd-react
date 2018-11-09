import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from "@material-ui/core/Paper/Paper";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit
    },
    input: {
        margin: theme.spacing.unit,
    },
    title: {
        marginTop: theme.spacing.unit * 3
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
});

class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
            listArtistsFiltered: [],
        };
    };

    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/artist')
            .then(res => res.json())
            .then(json => this.setState({
                listArtists: json.result,
                listArtistsFiltered: json.result
            }))
    };

    doFilter = (e) => {
        this.setState({
            listArtistsFiltered: this.state.listArtists.filter(a =>
                a.FirstName.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
                || a.LastName.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
            )
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={8}>
                    <Typography className={classes.title} variant="h2" component="h3">
                        Artists
                    </Typography>
                    <Paper className={classes.root}>
                        <Input
                            onChange={this.doFilter}
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
                <Grid xs={8} item>
                    {
                        this.state.listArtistsFiltered.map(artist => {
                            return (
                                <Card item className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h5" component="h3">
                                            {artist.FirstName + ' ' + artist.LastName}
                                        </Typography>
                                        <Typography component="p">
                                            Paper can be used to build surface or other elements for your
                                            application.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Artists);