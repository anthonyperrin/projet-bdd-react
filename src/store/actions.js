
export const ADD_TOKEN = 'ADD_TOKEN';

export const addtoken = data => ({type: ADD_TOKEN, value:data});

export const DEL_TOKEN = 'DEL_TOKEN';

export const deltoken = () => ({type:DEL_TOKEN}) ;


export const EDIT_COIN = 'EDIT_COIN';

export const modCoins = data => ({type: EDIT_COIN, value: data});