import React from "react";
import ReactDOM from 'react-dom';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import PropTypes from "prop-types";
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Album from '@material-ui/icons/Album'


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
    selectEmpty: {

    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
});

class AddDisc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArtists : [],
            listGenre : []
        }
    }

    state = {
        artist: '',
        genre: '',
        labelWidth: 0,
    };

    componentWillMount() {
        fetch('http://127.0.0.1:8081/api/artist')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listArtists: json.result,
                }
            ))
        fetch('http://127.0.0.1:8081/api/genre')
            .then(res => res.json())
            .then(json => this.setState(
                {
                    listGenre: json.result,
                }
            ))
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        document.getElementById('titleartist').innerHTML = '';
        document.getElementById('titlegenre').innerHTML = '';

    };

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
                            Add your own disc's offer
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Input id="title" name="title" autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel id="titleartist" htmlFor="artist-id">Artist</InputLabel>
                                <Select
                                    value={this.state.artist}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'artist',
                                        id: 'artist-id',
                                    }}
                                    className={classes.selectEmpty}>
                                    {
                                        this.state.listArtists.map (a => {
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
                                    value={this.state.genre}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'genre',
                                        id: 'genre-id',
                                    }}
                                    className={classes.selectEmpty}>
                                    {
                                        this.state.listGenre.map (a => {
                                            return (
                                                <MenuItem value={a.Id}><Album style={{
                                                    color: a.colorCode,
                                                }}className={classes.icon}/>{a.Name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

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
AddDisc.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDisc);