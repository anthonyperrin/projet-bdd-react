import React, {Component} from 'react';
//components
import Header from './menu/Header';
import View from './View';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <hr />
                <View/>
            </div>
        );
    }
}

export default App;
