import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import PropTypes from "prop-types";
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Album from '@material-ui/icons/Album'
import {store}from '../store/index';
import {Redirect} from "react-router-dom";
const config = require('./config.json');

const styles = theme => ({
    typography: {
        useNextVariants: true,
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
    selectEmpty: {},
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    align: {
        display: 'flex',
    }
});

class UpdateDisc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datafetched : false,
            disc:{},
            title:'',
            year:'',
            price: '',
            labelWidth:0,
            redirectLogin:false,
            redirectOffer:false,
            erreurMsg:"",
            user: {},
            token: store.getState().state.token,
            artist: {},
            genre: {},
            ip: config.ip
        }
    }
    setRedirectLogin = () => {
        this.setState({
            redirectLogin: true
        })
    };

    setRedirectOffer = () => {
        this.setState({
            redirectOffer: true
        })
    };

    renderRedirectLogin = () => {
        if (this.state.redirectLogin) {
            return <Redirect to='/login' />
        }
    };

    renderRedirectOffer = () => {
        if (this.state.redirectOffer) {
            return <Redirect to='/my_disc' />
        }
    };

    afficherMsg = (msg) => {
        if(msg.status === "error"){
            this.setState({erreurMsg : msg.message});
        }else if(msg.status === "success"){
            this.setState(
                {
                    erreurMsg : "The disc has been updated.",
                    disc: msg.result
                });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let today = new Date();
        let formData = {
            Name: this.state.disc.Name,
            Id_User: this.state.user.Id,
            ReleaseYear: this.state.disc.ReleaseYear,
            Price: parseInt(this.state.price),
            DateAdd: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            nbViews: 0,
            Id_Artist: this.state.disc.Id_Artist,
            Id_Genre: this.state.disc.Id_Genre
        };
        fetch('http://' + this.state.ip + ':8081/api/disc/' + this.state.disc.Id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
            .then(rep => rep.json())
            .then(json => this.afficherMsg(json))

    };



    componentWillMount() {
        let header =new Headers({
            'x-access-token': this.state.token
        });
        fetch('http://' + this.state.ip + ':8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json) );
        fetch('http://' + this.state.ip + ':8081/api/disc/' + this.props.match.params.id)
            .then(res => res.json())
            .then(json => this.setState(
                {
                    disc: json.result,
                    datafetched :true
                }
            ))

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
            this.setRedirectLogin();
        }
        this.handleArtistAndGenre();
    };

    handleArtistAndGenre = () => {
        this.setState({
            artist: this.state.disc.artist,
            genre:  this.state.disc.genre
        })
    };


    handlePriceChange = event => {
        this.state.price = event.target.value;
    };



    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Album/>
                        </Avatar>
                        <Typography component="h1" variant={"display1"}>
                            Modify your own disc's offer
                            {this.renderRedirectLogin()}
                            {this.renderRedirectOffer()}
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleSubmit} >
                            <FormControl margin="normal" required fullWidth>
                                <Input value={this.state.disc.Name} id="title" name="title" disabled/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>

                                <Input value={this.state.artist.FirstName + ' ' + this.state.artist.LastName} id="artist" name="artist" disabled/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <Input value={this.state.genre.Name} id="genre" name="genre" disabled/>
                            </FormControl>
                            <FormControl required fullWidth>
                                <FormControl required fullWidth>
                                    <TextField
                                        id="standard-numberPrice"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0}}}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        placeholder={"Price : " + this.state.disc.Price + ' $'}
                                        onChange={this.handlePriceChange}
                                    />
                                </FormControl>


                            </FormControl>

                            <Typography margin="normal" component="p" id="erreur">
                                {this.state.erreurMsg}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Modify offer
                                <LibraryAdd style={{marginLeft:'20px'}}/>

                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }


}

UpdateDisc.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateDisc);