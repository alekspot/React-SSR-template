import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHello } from '../store/actions';
const About = ({hello, setHello}) => {
    return (
        <div>
            <h1>About</h1>
            <Link to='/'>Home</Link>
            <br/>
            { hello }
            <button onClick = {()=>setHello('HELLO')}>Click</button>
        </div>
    )
}

const mapStateToProps = state => ({
    hello: state.hello
})

const mapDispathToProps ={
    setHello
}


//export default connect(mapStateToProps, mapDispathToProps)(About);

//экспортируем так для передачи роутеру
export default {
    component: connect(mapStateToProps, mapDispathToProps)(About)
}