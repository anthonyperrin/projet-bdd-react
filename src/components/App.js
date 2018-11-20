import React, {Component} from 'react';
//components
import View from './View';
import Header from './menu/Header';
//REDUX
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {store}from '../store/index';
import { withRouter } from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <View/>
                </div>
            </Provider>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state
    }
};



export default withRouter(connect(mapStateToProps)(App));
