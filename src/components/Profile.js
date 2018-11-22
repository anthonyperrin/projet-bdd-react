import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link, Redirect} from 'react-router-dom';
import {store} from "../store";
import {modCoins} from "../store/actions";
import {modCoinsLocked} from "../store/actions";


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit,
        flexGrow: 1,
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
        margin: theme.spacing.unit
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
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit}px`,
    },
    button: {
        padding: `${theme.spacing.unit}px`,
        margin: `${theme.spacing.unit}px`,
    }
});


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            token: store.getState().state.token,
            redirect: false,
            isUser: false,
            idUser: 0,
        };
    }

    handleAddCoins = () => {
        this.state.user.Coins += 500;
        let user = {
            Id: this.state.user.Id,
            FirstName: this.state.user.FirstName,
            Lastname: this.state.user.Lastname,
            Rank: this.state.user.Rank,
            Address1: this.state.user.Address1,
            Address2: this.state.user.Address2,
            Pseudo: this.state.user.Pseudo,
            Mobile: this.state.user.Mobile,
            Email: this.state.user.Email,
            City: this.state.user.City,
            Zipcode: this.state.user.Zipcode,
            Password: this.state.user.Password,
            Coins: this.state.user.Coins
        };

        fetch('http://127.0.0.1:8081/api/user/update', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(mss => mss.json())
            .then(mss => this.majCoins(mss));


    };

    majCoins = (data) => {
        store.dispatch(modCoins(data.result.Coins));
    };

    majCoinLocked = (data) => {
        store.dispatch(modCoinsLocked(parseInt(data.result.CoinLocked)))
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
    };

    componentWillMount() {
        let header = new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://127.0.0.1:8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json));





    }



    confUser = (json) => {
        this.setState(
            {
                user: json.result,
                isUser: true
            }
        );

        this.verifyAuth();
    };

    rendercoinlocked =() => {
        if(this.state.isUser){
            fetch('http://127.0.0.1:8081/api/coin/' + this.state.user.Id, {
                method: 'GET',
                headers: {"Content-Type": "application/json"}
            })
                .then(res => res.json())
                .then( json => this.majCoinLocked(json))
        }
    }
    verifyAuth = () => {
        if (this.state.user.auth === false) {
            this.setRedirect();
        }else{
            store.dispatch(modCoins(this.state.user.Coins));
            fetch('http://127.0.0.1:8081/api/coin/' + this.state.user.Id, {
                method: 'GET',
                headers: {"Content-Type": "application/json"}
            })
                .then(res => res.json())
                .then( json => this.majCoinLocked(json))
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Typography>
                    {this.renderRedirect()}
                    {this.rendercoinlocked()}
                </Typography>
                <main className={classes.layout}>
                    <Grid container xs={12}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.title1} variant="h2" component="h3">
                                {this.state.user.FirstName + ' ' + this.state.user.LastName}
                            </Typography>
                            <Typography className={classes.title1} style={{marginTop: '26px'}} variant="display1"
                                        component="h3">
                                {this.state.user.Pseudo}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                className={classes.button}
                                component={Link} to={"/my_discs"}
                                variant="contained"
                                color="primary">
                                My discs
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                component={Link} to={"/myOffer"}
                                >
                                My offers
                        </Button>
                            <Button
                                type="submit"
                                fullWidth
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={this.handleAddCoins}>
                                Add coins

                            </Button>

                        </Paper>
                    </Grid>
                </main>
            </React.Fragment>
        );


    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
