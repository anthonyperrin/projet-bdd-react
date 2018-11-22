import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link, Redirect} from 'react-router-dom'
import store from '../store/index'
import {deltoken} from '../store/actions'

const styles = theme => ({
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
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    registertxt: {
        marginTop : '10px'
    }
});

class Login extends React.Component {
    constructor() {
        super();

    }

    state = {
        redirect: false,
        token : store.getState().state.token,
        user: {},
    };

    setRedirect = () => {
        this.setState({
            redirect: true,
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            store.dispatch(deltoken());
            return <Redirect to='/Login' />
        }
    };

    componentWillMount(){
        let header =new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://127.0.0.1:8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json) )
    }

    confUser = (json) => {
        this.setState(
            {
                user: json.result,
            }
        );
        store.dispatch(deltoken());
        this.setRedirect();
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography>
                    {this.renderRedirect()}
                </Typography>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);