import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from "@material-ui/core/Paper/Paper";
import Input from "@material-ui/core/Input/Input";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit
    },
    input: {
        margin: theme.spacing.unit,
        fullWidth:'100%'
    },
    title: {
        marginTop: theme.spacing.unit * 3
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
                (a.FirstName.toLowerCase() + ' ' + a.LastName.toLowerCase()).indexOf(e.target.value.toLowerCase()) >= 0
            )
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid xs={8}>
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