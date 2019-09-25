import { SET_HELLO } from "../types";

const initialState = 'Ф';

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_HELLO:
            return action.payload;

        default: 
            return state;
    }
}