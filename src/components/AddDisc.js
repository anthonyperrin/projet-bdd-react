import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
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

class AddDisc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArtists: [],
            listGenre: [],
            title:'',
            artist:'',
            genre: '',
            year:'',
            price: '',
            labelWidth:0,
            redirectLogin:false,
            redirectOffer:false,
            erreurMsg:"",
            user: {},
            token: store.getState().state.token,
        }
    }
    setRedirectLogin = () => {
        this.setState({
            redirectLogin: true
        })
    };

    setRedirectOffer = () => {
        alert('Disc has just been added');
        this.setState({
            redirectOffer: true
        });
    };

    renderRedirectLogin = () => {
        if (this.state.redirectLogin) {
            return <Redirect to='/login' />
        }
    };

    renderRedirectOffer = () => {
        if (this.state.redirectOffer) {
            return <Redirect to='/offres' />
        }
    };

    afficherMsg = (msg) => {
        if(msg.status === "error"){
            this.setState({erreurMsg : msg.message});
        }else if(msg.status === "success"){
            this.setState({erreurMsg : "The disc has been added."});
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let today = new Date();
        let formData = {
            Name: this.state.title,
            Id_User: this.state.user.Id,
            ReleaseYear: this.state.year,
            Price: parseInt(this.state.price),
            DateAdd: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            nbViews: 0,
            Id_Artist: this.state.artist,
            Id_Genre: this.state.genre
        };
        fetch('http://127.0.0.1:8081/api/disc/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
            .then(rep => rep.json())
            .then(json => this.afficherMsg(json))
            .then(this.setRedirectOffer());


    };



    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/artist')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listArtists: json.result,
                }
            ));
        fetch('http://127.0.0.1:8081/api/genre')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listGenre: json.result,
                }
            ));
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
        this.verifyAuth();
    };

    verifyAuth = () => {
        if(this.state.user.auth === false){
            this.setRedirectLogin();
        }
    };

    handleArtistSelectChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.state.artist = event.target.value;
        document.getElementById('titleartist').innerHTML = '';
    };

    handleGenreSelectChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.state.genre = event.target.value;
        document.getElementById('titlegenre').innerHTML = '';
    };

    handleTitleChange = event => {
        this.state.title = event.target.value;
    };

    handleDateChange = event => {
        this.state.year = event.target.value;
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
                            Add your own disc's offer
                            {this.renderRedirectLogin()}
                            {this.renderRedirectOffer()}
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Input onChange={this.handleTitleChange} id="title" name="title" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel id="titleartist" htmlFor="artist-id">Artist</InputLabel>
                                <Select
                                    value={this.state.artist}
                                    onChange={this.handleArtistSelectChange}
                                    inputProps={{
                                        name: 'artist',
                                        id: 'artist-id',
                                    }}
                                    className={classes.selectEmpty}>
                                    {
                                        this.state.listArtists.map(a => {
                                            return (
                                                <MenuItem value={a.Id}>{a.FirstName + ' ' + a.LastName}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel id="titlegenre" htmlFor="genre-id">Genre</InputLabel>
                                <Select
                                    label="Genre"
                                    value={this.state.genre}
                                    onChange={this.handleGenreSelectChange}
                                    inputProps={{
                                        name: 'genre',
                                        id: 'genre-id',
                                    }}
                                    className={classes.selectEmpty}>
                                    {
                                        this.state.listGenre.map(a => {
                                            return (
                                                <MenuItem value={a.Id}><Album style={{
                                                    color: a.colorCode,
                                                }} className={classes.icon}/>{a.Name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <div className={classes.align}>
                                <FormControl required fullWidth style={{marginTop:'16px'}}>
                                    <TextField
                                        id="date"
                                        label="Release Year*"
                                        type="date"
                                        defaultValue="now()"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.handleDateChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        id="standard-number"
                                        label="Price*"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0}}}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        onChange={this.handlePriceChange}
                                    />


                                </FormControl>
                            </div>
                            <Typography margin="normal" component="p" id="erreur">
                                {this.state.erreurMsg}
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Add offer
                                <LibraryAdd style={{marginLeft:'20px'}}/>
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }


}

AddDisc.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDisc);