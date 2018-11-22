import React from "react";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import {store} from '../store/index';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {Link, Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForever from '@material-ui/icons/DeleteForever'

import LibraryMusic from '@material-ui/icons/LibraryMusic'


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit,
        flexGrow: 1,
        width: '100%',
    },
    align: {
        display: 'flex',
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
    table: {
        minWidth: 700,
        alignContent: 'center',
    },
});


class Userdiscs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            token: store.getState().state.token,
            redirect: false,
            discList: [],
        };
    }

    componentDidMount() {
        let header = new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://127.0.0.1:8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json))
        fetch('http://127.0.0.1:8081/api/disc')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    discList: json.result,
                }
            ))
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/offres'/>
        }
    };


    confUser = (json) => {
        this.setState(
            {
                user: json.result,
            }
        );

        this.verifyAuth();
    };

    verifyAuth = () => {
        // if (this.state.user.auth === false || this.state.user.Rank !== 100) {
        //     alert('Don\'t have authorization to get in');
        //     this.setRedirect();
        // }
    };

    DeleteDisc(disc) {
        const data = this.state.discList.filter(i => i.Id === disc.Id)
        fetch('http://127.0.0.1:8081/api/disc/' + data[0].Id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => this.HandleStateDelete(json, data[0].Id))
    }

    HandleStateDelete(json, id) {
        if (json.result !== null) {
            alert('Disc ' + id + ' successfully deleted.');
            this.setRedirect()
        } else {
            alert('An error happened, please check logs or retry')
        }
    }

    render() {

        const {classes} = this.props;
        return (
            <main>
                <Typography>
                    {this.renderRedirect()}
                </Typography>
                <Grid container justify={"center"}>
                    <Grid item xs={10} className={classes.root}>
                        <Typography className={classes.title1} variant="h2" component="h3">
                            Disc of user {this.props.match.params.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={10} className={classes.root}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{maxWidth: '20px'}}>Action</TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Artist</TableCell>
                                        <TableCell>Genre</TableCell>
                                        <TableCell>Release Year</TableCell>
                                        <TableCell>Date Add</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.discList.map(disc => {
                                        if (disc.user.Id === parseInt(this.props.match.params.id)) {
                                            return (
                                                <TableRow key={disc.Id}>
                                                    <TableCell style={{maxWidth: '20px'}}>
                                                        <Button onClick={this.DeleteDisc.bind(this, disc)}>
                                                            <DeleteForever style={{color: 'red'}}/>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" numeric>
                                                        {disc.Id}
                                                    </TableCell>
                                                    <TableCell>{disc.Name}</TableCell>
                                                    <TableCell>{disc.artist.FirstName + ' ' + disc.artist.LastName}</TableCell>
                                                    <TableCell>{disc.genre.Name}</TableCell>
                                                    <TableCell>{disc.ReleaseYear}</TableCell>
                                                    <TableCell>{disc.DateAdd} </TableCell>
                                                    <TableCell><Typography style={{fontWeight: 'bold'}}>{disc.Price}.00
                                                        $</Typography></TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        )
    }
}

Userdiscs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Userdiscs);
