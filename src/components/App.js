import React, {Component} from 'react';
//components
import Header from './menu/Header';
import View from './View';
//REDUX
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {store}from '../store/index';
import { withRouter } from 'react-router-dom'

class App extends Component {
    render() {
        console.log(this.props);
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
