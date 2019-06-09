import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from "@material-ui/core/Paper/Paper";
import Input from "@material-ui/core/Input/Input";
const config = require('./config.json');

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit,
        flexGrow: 1
    },
    input: {
        margin: theme.spacing.unit,
        fullWidth:'100%'
    },
    title: {
        marginTop: theme.spacing.unit * 3
    },
    displayCard: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 300,
        margin: theme.spacing.unit,
    },

});

class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
            listArtistsFiltered: [],
            ip: config.ip
        };
    };

    componentWillMount() {
        fetch('http://' + this.state.ip + ':8081/api/artist')
            .then(res => res.json())
            .then(json => this.setState({
                listArtists: json.result,
                listArtistsFiltered: json.result
            }))
    };

    doFilter = (e) => {
        this.setState({
            listArtistsFiltered: this.state.listArtists.filter(a =>
                (a.FirstName.toLowerCase() + ' ' + a.LastName.toLowerCase()).indexOf(e.target.value.toLowerCase()) >= 0
            )
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid xs={8} className={classes.root}>
                    <Typography className={classes.title} variant="h2" component="h3">
                        Artists
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.root}>
                    <Paper>
                        <Input
                            onChange={this.doFilter}
                            placeholder="Search"
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid container className={classes.root} spacing={20} xs={8}>
                    {
                        this.state.listArtistsFiltered.map(artist => {
                            return (
                                <Grid item xs={12} md={6} lg={4}>
                                    <Card item className={classes.displayCard}>
                                        <CardContent>
                                            <Typography variant="h5" component="h3">
                                                {artist.FirstName + ' ' + artist.LastName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Artists);
