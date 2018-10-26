import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import ListeOffres from './ListeOffres';

class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListeOffres}/>
                <Route path={"/offres"} component={ListeOffres}/>
                <Route path={"/mes_disques"} component={ListeOffres}/>

            </Switch>
        );
    }
}

export default View;
