import {combineReducers, createStore} from 'redux';
import reducers from './../store/reducer';

export const store = createStore(
    combineReducers({
        state: reducers
    }),
);

export default store;