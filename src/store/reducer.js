import {ADD_TOKEN} from './actions'
import {DEL_TOKEN} from './actions'

const initialState = {
    token: "test"
};

export default function  (state = initialState, action){

    switch(action.type){
        case ADD_TOKEN:
            state.token = action.value;
            return state;

        case DEL_TOKEN:
            state.token = "";
            return state;

        default:
            return state;
    }
}
