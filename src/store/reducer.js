import {ADD_TOKEN} from './actions'
import {DEL_TOKEN} from './actions'
import {EDIT_COIN} from './actions'
import {EDIT_COINLOCKED} from './actions'

const initialState = {
    token: "",
    coins: 0,
    coinsLocked: 0,
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
            state.coins = action.value;
            return state;

        case EDIT_COINLOCKED:
            state.coinsLocked = action.value;
            console.log(state.coinsLocked, action.value);
            return state;

        default:
            return state;
    }
}
