const initialState = {
    token: "test"
}

export default function addToken(state = initialState, action){
    switch(action.type){
        case 'ADD_TOKEN':
            state.token = action.value;
            return state
        default:
            return state
    }

}
