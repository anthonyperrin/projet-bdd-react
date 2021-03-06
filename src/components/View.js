import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import Login from './Login';
import ListeOffres from './ListeOffres';
import Artists from "./Artists";
import Register from './Register';
import AddDisc from './AddDisc';
import MyDiscs from "./MyDiscs";
import Profile from "./Profile";
import UpdateDisc from "./UpdateDisc";
import LogOut from "./LogOut";
import Indexadmin from "./Indexadmin";
import MakeOffer from "./MakeOffer";
import MyOffer from "./MyOffer";
import Userdiscs from './Userdiscs'


class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListeOffres}/>
                <Route path={"/login"} component={Login} />
                <Route path={"/offres"} component={ListeOffres}/>
                <Route path={"/artists"} component={Artists}/>
                <Route path={"/my_discs"} component={MyDiscs}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/addDisc"} component={AddDisc} />
                <Route path={"/profile"} component={Profile} />
                <Route path={"/updatedisc/:id"} component={UpdateDisc}/>
                <Route path={"/makeOffer/:id"} component={MakeOffer}/>
                <Route path={"/myOffer"} component={MyOffer}/>
                <Route path={"/logout"} component={LogOut} />
                <Route path={"/Indexadmin"} component={Indexadmin} />
                <Route path={"/userdiscs/:id"} component={Userdiscs} />
            </Switch>
        );
    }
}

export default View;
