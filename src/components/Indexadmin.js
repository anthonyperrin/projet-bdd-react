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
import Gavel from '@material-ui/icons/Gavel'
import LibraryMusic from '@material-ui/icons/LibraryMusic'
const config = require('./config.json');

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


class Indexadmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            token: store.getState().state.token,
            redirect: false,
            usersList : [],
            discList : [],
            ip: config.ip
        };
    }

    componentDidMount() {
        let header = new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://' + this.state.ip + ':8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json))
        fetch('http://' + this.state.ip + ':8081/api/user')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    usersList: json.result,
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
        if (this.state.user.auth === false || this.state.user.Rank !== 100) {
            alert('Don\'t have authorization to get in');
            this.setRedirect();
        }
    };

    TransformToLevel(rank) {
        switch (rank) {
            case 100:
                rank = 'ADMIN';
                break;
            case 0:
                rank = 'USER';
                break;
        }
        return rank
    }

    DeleteUser(user) {
        const data = this.state.usersList.filter(i=> i.Id === user.Id)
        fetch('http://' + this.state.ip + ':8081/api/user/' + data[0].Id, {
            method :'DELETE'
        })
            .then(res => res.json())
            .then(json => this.HandleStateDelete(json, data[0].Id))
    }

     HandleStateDelete(json, id) {
        if (json.result !== null) {
            alert('User '+ id+' successfully deleted.');
            this.setRedirect()
        } else {
            alert('An error happened, please check logs or retry')
        }
    }

    ChangeRankUser(user) {
        let newRank;
        const data = this.state.usersList.filter(i=> i.Id === user.Id)
        user.Rank === 0 ? user.Rank = 100 : user.Rank = 0
        fetch('http://' + this.state.ip + ':8081/api/user/' + data[0].Id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => this.HandleStateUpdate(json, data[0].Id, user.Rank))
    }

    HandleStateUpdate(json, id, rank) {
        if (json.result !== null) {
            alert('User '+ id +' successfully updated to rank ' + rank +'.');
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
                    { this.renderRedirect() }
                </Typography>
                <Grid container justify={"center"}>
                    <Grid item xs={10} className={classes.root}>
                        <Typography className={classes.title1} variant="h2" component="h3">
                            Admin
                        </Typography>
                    </Grid>
                    <Grid item xs={10} className={classes.root}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Action</TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>FirstName</TableCell>
                                        <TableCell>NickName</TableCell>
                                        <TableCell>Level</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Coins</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.usersList.map(user => {
                                        if (this.state.user.Rank === 100)
                                        return (
                                            <TableRow key={user.Id}>
                                                <TableCell>
                                                    <Button disabled={(this.state.user.Id === user.Id)} onClick={this.DeleteUser.bind(this, user)} >
                                                        <DeleteForever style={{ color : 'red'}}/>
                                                    </Button>
                                                    <Button disabled={(this.state.user.Id === user.Id)} onClick={this.ChangeRankUser.bind(this, user)} >
                                                        <Gavel/> Rank
                                                    </Button>
                                                    <Button disabled={(this.state.user.Id === user.Id)} component={Link} to={`/userdiscs/${user.Id}`}>
                                                        <LibraryMusic style={{color:'blue'}}/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell component="th" scope="row" numeric>
                                                    {user.Id}
                                                </TableCell>
                                                <TableCell>{user.LastName}</TableCell>
                                                <TableCell>{user.FirstName}</TableCell>
                                                <TableCell>{user.Pseudo}</TableCell>
                                                <TableCell>{this.TransformToLevel(user.Rank)}</TableCell>
                                                <TableCell>{user.Email}</TableCell>
                                                <TableCell>{user.Coins} </TableCell>
                                            </TableRow>
                                        );
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

Indexadmin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Indexadmin);
