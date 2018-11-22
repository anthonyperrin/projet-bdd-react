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
import {Link} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import PlusOne from '@material-ui/icons/PlusOne';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import {store}from '../store/index';
import {Redirect} from "react-router-dom";


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


class ListeOffres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBuy: [],
            listBuyFiltered: [],
            token: store.getState().state.token,
            user: {},
            redirectLogin: false,
        };
    }


    componentDidMount() {
        let header =new Headers({
            'x-access-token': store.getState().state.token
        });
        fetch('http://127.0.0.1:8081/api/auth/current', {
            headers: header
        })
            .then(res => res.json())
            .then(json => this.confUser(json) );
        fetch('http://127.0.0.1:8081/api/buy')
            .then(res => res.json())
            .then(json => this.setState({listBuy: json.result,listBuyFiltered: json.result}))
    }

    confListeDisc = () => {
        this.setState({
            listBuy: this.state.listBuy(a =>
                (a.Id_User === this.state.user.Id)
            ),
            listBuyFiltered: this.state.listBuy.filter(a =>
                (a.Id_User === this.state.user.Id)
            )
        });

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
        if(this.state.user.auth === false){
            this.setRedirectLogin();
        }
        this.confListeDisc();
    };

    setRedirectLogin = () => {
        this.setState({
            redirectLogin: true
        })
    };

    renderRedirectLogin = () => {
        if (this.state.redirectLogin) {
            return <Redirect to='/login' />
        }
    };

    doFilter = (e) => {
        this.setState({
            listBuyFiltered: this.state.listBuy.filter(a =>
                (a.Name.toLowerCase()).indexOf(e.target.value.toLowerCase()) >= 0
            )
        });
    };


    render() {

        const {classes} = this.props;
        return (
            <Grid container justify={"center"}>
                <Grid xs={10} className={classes.root}>
                    <Typography className={classes.title1} variant="h2" component="h3">
                        Offers
                        {this.renderRedirectLogin()}
                    </Typography>
                </Grid>
                <Grid item xs={10} className={classes.root}>
                    <Paper>
                        <Input
                            placeholder="Search"
                            onChange={this.doFilter}
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                name="age"
                                className={classes.selectEmpty}>
                                <MenuItem value="" disabled>
                                    Sort by
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <List>
                            <ListItem button key="AddDisc" component={Link} to={"/AddDisc"}>
                                <ListItemIcon><PlusOne/></ListItemIcon>
                                <ListItemText primary="Add Disc"/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid container className={classes.root} spacing={20} xs={10} direction="row"
                      alignItems="center">
                    {
                        this.state.listBuyFiltered.map(buy => {
                            return (
                                <Grid item xs={12} md={4} lg={3}>
                                    <Card className={classes.displayCard}>
                                        <CardActionArea>

                                            <CardContent style={{ justifyContent:'left' }}>
                                                <Grid item container xs={12}>
                                                    <Typography gutterBottom variant="h5" component="h3">
                                                        {buy.disc.Name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container xs={12}>
                                                    <Typography gutterBottom variant="h7" component="h4">
                                                    </Typography>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                        <div className={classes.align}>
                                            <Grid xs={12} md={6} item>
                                                <Typography style={{marginTop: 20}} variant="h6">
                                                    You want : {buy.disc.Price + '.00 $'}
                                                </Typography>

                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Typography style={{marginTop: 20}} variant="h6">
                                                    He offer : {buy.CoinLocked + '.00 $'}
                                                </Typography>
                                            </Grid>
                                        </div>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>);
    }
}

ListeOffres.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListeOffres);
