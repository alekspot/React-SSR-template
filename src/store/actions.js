import { SET_HELLO, FETCH_TODO } from "./types";
import axios from 'axios';
export const setHello = payload => ({
    type: SET_HELLO, 
    payload
})

export const fetchTodos = () => async dispatch => {
    const responce = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch({
        type: FETCH_TODO,
        payload: responce.data
    })
}