import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3
    },
    paper: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
});

class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
            listArtistsFiltered: []
        };
    }

    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/artist')
            .then(res => res.json())
            .then(json => this.setState({
                listArtists: json.result,
                listArtistsFiltered: json.result
            }))
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid xs={80} item>
                    {
                        this.state.listArtists.map(artist => {
                            return (
                                <Paper item className={classes.root}>
                                    <Typography variant="h5" component="h3">
                                        {artist.FirstName}
                                    </Typography>
                                    <Typography component="p">
                                        Paper can be used to build surface or other elements for your application.
                                    </Typography>
                                </Paper>
                            );
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Artists);