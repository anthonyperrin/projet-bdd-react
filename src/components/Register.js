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
import { Redirect } from 'react-router-dom'


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
        marginBottom: theme.spacing.unit * 8,
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Register extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        redirect: false,
        erreurMsg : ""
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    afficherMsg = (msg) => {
        if(msg.status === "error"){
            this.setState({erreurMsg : msg.message});
            document.getElementById("erreur").innerText(msg.message);
        }else{
            this.setRedirect();
        }
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let password = data.get('password');
        let password2 = data.get('password2');
        let formData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            password: data.get('password'),
            email: data.get('email'),
            pseudo: data.get('pseudo')
        };

        if (password === password2) {
            fetch('http://127.0.0.1:8081/api/auth/register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
                .then(mss => mss.json())
                .then(mss => this.afficherMsg(mss))
                .catch(err => console.log(err));
        }

        else {
            this.setState({erreurMsg : "Erreur : Les 2 mots de passe sont différents"});
            document
                .getElementById(
                    "password"
                ).value = "";
            document
                .getElementById(
                    "password2"
                ).value = "";
        }


    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>

                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="firstName">FirstName</InputLabel>
                                <Input id="firstName" name="firstName" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="lastName">LastName</InputLabel>
                                <Input id="lastName" name="lastName"/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email"/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Verify your password</InputLabel>
                                <Input
                                    name="password2"
                                    type="password"
                                    id="password2"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="pseudo">Pseudo</InputLabel>
                                <Input id="pseudo" name="pseudo"/>
                            </FormControl>
                            <Typography margin="normal" component="p" id="erreur">
                                {this.state.erreurMsg}
                                {this.renderRedirect()}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);