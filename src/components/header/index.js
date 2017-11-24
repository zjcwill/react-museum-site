import React from 'react';
import { Link } from 'mirrorx';

const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
        </div>
    )
}

export default Header;