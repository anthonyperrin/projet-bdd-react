import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom';
//components
import ListeOffres from './ListeOffres';
import ListDiscs from './listDiscs';

class View extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={ListeOffres}/>
                <Route path={"/offres"} component={ListeOffres}/>
                <Route path={"/mes_disques"} component={ListeOffres}/>

                <Route path={"/discs"} component={ListDiscs} />
            </Switch>
        );
    }
}

export default View;
