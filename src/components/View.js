import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import Login from './Login';
import ListeOffres from './ListeOffres';

class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListeOffres}/>
                <Route path={"/login"} component={Login} />
                <Route path={"/offres"} component={ListeOffres}/>

            </Switch>
        );
    }
}

export default View;
