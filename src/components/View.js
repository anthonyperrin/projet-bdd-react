import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import Login from './Login';
import ListDiscs from './listDiscs';

class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListDiscs}/>
                <Route path={"/login"} component={Login} />
                <Route path={"/mes_disques"} component={ListDiscs}/>
                <Route path={"/discs"} component={ListDiscs} />

            </Switch>
        );
    }
}

export default View;
