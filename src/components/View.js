import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import Login from './Login';
import ListeOffres from './ListeOffres';
import Artists from "./Artists";
import Register from './Register';
import AddDisc from './AddDisc';

class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListeOffres}/>
                <Route path={"/login"} component={Login} />
                <Route path={"/offres"} component={ListeOffres}/>
                <Route path={"/artists"} component={Artists}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/addDisc"} component={AddDisc} />
            </Switch>
        );
    }
}

export default View;
