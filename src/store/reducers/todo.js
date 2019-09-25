import { FETCH_TODO } from "../types";

const initialState = {
    todos: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TODO:
            return {
                ...state,
                todos: [...state.todos, ...action.payload]
            }
            ;

        default: 
            return state;
    }
}