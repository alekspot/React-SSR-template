import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodos } from '../store/actions';
const Todo = ({todos, fetchTodos}) => {
    useEffect(()=> {
        fetchTodos();
    }, todos);
    let list = todos.map(item => (<li>{ item.title }</li>));
    return (
        <div>
            <h1>Todo</h1>
            <Link to='/'>Home</Link>
            <br/>  
            <Link to='/about'>About</Link>
            <br/>
            <button onClick={() => {fetchTodos()}}>GET TODOS</button>
            <ul>
                {list}
            </ul>
        </div>
    )
}
const loadData = (store, param) => {
    return store.dispatch(fetchTodos(param))
}
const mapStateToProps = state => ({
    todos: state.todo.todos
})

const mapDispathToProps ={
    fetchTodos
}

//export default connect(mapStateToProps, mapDispathToProps)(Todo)
//экспортируем так для передачи роутеру
export default {
    component: connect(mapStateToProps, mapDispathToProps)(Todo),
    loadData
}
