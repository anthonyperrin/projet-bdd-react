import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//components

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List/List";
import Drawer from '@material-ui/core/Drawer';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import QueueMusic from '@material-ui/icons/QueueMusic';
import GroupWork from '@material-ui/icons/GroupWork';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import {store} from '../../store/index';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    buttonLogin: {
        marginRight: 15
    }
};

class Header extends React.Component {
    state = {
        left: false,
        user:{},
        token : "",
        isUser: false,
        isChecked: false,
        coins: store.getState().state.coins,
        coinsLocked: store.getState().state.coinsLocked,
        isDifferent: false
    };

    confUser = (json) => {
        this.setState(
            {
                user: json.result,
                isUser: true
            }
        );
    };

    handleTokenAndUser = (thisToken, thisCoins, thisCoinsLocked) => {
        if((thisToken !== this.state.token && !this.state.isChecked) || (this.state.isUser && this.state.coins !== thisCoins) || (this.state.isUser && this.state.coinsLocked !== thisCoinsLocked)){

            this.setState({
                isChecked: true,
                token: thisToken,
                coins: thisCoins,
                coinsLocked: thisCoinsLocked,
            });
            let header =new Headers({
                'x-access-token': thisToken
            });
            fetch('http://127.0.0.1:8081/api/auth/current', {
                headers: header
            })
                .then(res => res.json())
                .then(json => this.confUser(json))
                .then(this.setState({isDifferent: false}))
        }
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    render() {
        const {classes} = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button key="offres" component={Link} to={"/offres"}>
                        <ListItemIcon><QueueMusic/></ListItemIcon>
                        <ListItemText primary="Offres de disques"/>
                    </ListItem>
                </List>
                <List>
                    <ListItem button key="artists" component={Link} to={"/artists"}>
                        <ListItemIcon><GroupWork/></ListItemIcon>
                        <ListItemText primary="Artists"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="profile" component={Link} to={"/my_discs"}>
                        <ListItemIcon><LibraryMusic/></ListItemIcon>
                        <ListItemText primary="My items"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="AddDisc" component={Link} to={"/AddDisc"}>
                        <ListItemIcon><LibraryMusic/></ListItemIcon>
                        <ListItemText primary="Add disc"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Adminindex" component={Link} to={"/Indexadmin"}>
                        <ListItemIcon><LibraryMusic/></ListItemIcon>
                        <ListItemText primary="Admin panel"/>
                    </ListItem>
                </List>


            </div>
        );
        let rightList = "";
        this.handleTokenAndUser(store.getState().state.token, store.getState().state.coins, store.getState().state.coinsLocked);
        if(store.getState().state.token === "" ){
            rightList = (
                <div>
                    <Button color="inherit" component={Link} to={"/login"} className={classes.buttonLogin}>Login</Button>
                    <Button color="secondary" component={Link} to={"/register"} variant="contained">Register</Button>
                </div>

            );
        }else{
            rightList = (
                <div>
                    <Button color="inherit">{store.getState().state.coins} $</Button>
                    <Button color="inherit" >{store.getState().state.coinsLocked} $ Blocked</Button>
                    <Button color="inherit" component={Link} to={"/profile"} className={classes.buttonLogin}>Profile</Button>
                    <Button color="secondary" component={Link} to={"/logout"} variant="contained">Log out</Button>
                </div>

            );
        }
        return (

            <div className={classes.root}>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                                    onClick={this.toggleDrawer('left', true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            DiscoGraph'y
                        </Typography>
                        {rightList}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

