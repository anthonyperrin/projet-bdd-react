import {ADD_TOKEN} from './actions'
import {DEL_TOKEN} from './actions'
import {EDIT_COIN} from './actions'

const initialState = {
    token: "",
    coins: 0
};

export default function  (state = initialState, action){

    switch(action.type){
        case ADD_TOKEN:
            state.token = action.value;
            return state;

        case DEL_TOKEN:
            state.token = "";
            return state;

        case EDIT_COIN:
            console.log(action, state.coins);
            console.log(state.coins = action.value);
            state.coins = action.value;
            console.log(state);
            return state;

        default:
            return state;
    }
}
