import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/about'>About</Link>
            <br/>
            <Link to='/todo'>Todo</Link>
            <ul className="list">
                <li className="item simple">qwerty</li>
                <li className="item simple">qwerty</li>
                <li className="item">qwerty</li>
                <li className="item simple">qwerty</li>
                <li className="item">qwerty</li>
                <li className="item green">qwerty</li>
                <li className="item green">qwerty</li>
                <li className="item green">qwerty</li>
            </ul>
        </div>
    )
}

export default {
    component: Home
}