import { combineReducers } from 'redux';

import hello from './hello';
import todo from './todo';

export default combineReducers({
    hello,
    todo
})