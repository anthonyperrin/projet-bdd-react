import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Link, Redirect} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import {store} from "../store";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Album from "@material-ui/core/SvgIcon/SvgIcon";


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


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            token: store.getState().state.token,
            redirect:false,
        };
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    };

    componentWillMount() {
        let header =new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://127.0.0.1:8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json))
    }


    confUser = (json) => {
        this.setState(
            {
                user: json.result,
            }
        );

        this.verifyAuth();
    };

    verifyAuth = () => {
        if(this.state.user.auth === false){
            this.setRedirect();
        }
    };

    render() {
        const {classes} = this.props;
        return(
            <React.Fragment>
                <Typography>
                    {this.renderRedirect()}
                </Typography>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title1} variant="h2" component="h3">
                            {this.state.user.FirstName + ' ' + this.state.user.Lastname}
                        </Typography>
                        
                    </Paper>
                </main>
            </React.Fragment>
        );


    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
