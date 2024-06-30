import React, { useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import PointsContext from '../../context/pointsContext';

const Navbar = (props) => {
    const navigate = useNavigate();
    const ctx = useContext(PointsContext);

    const logout = () => {
        localStorage.removeItem('authToken');
        ctx.setIsLoggedIn(false);
        navigate('/login');
    };

    const links = [
        { key: 'home', url: '/', name: 'Home' },
        { key: 'image', url: '/image-generator', name: 'Image Generator' },
        { key: 'history', url: '/history', name: 'History' },
        // { key: 'contact', url: '/contact', name: 'Contact' },
        // { key: 'login', url: '/login', name: 'Login' },
        { key: 'signup', url: '/signup', name: 'Sign Up' },
    ];

    return (
        <div className='navbar-container'>
            <div className='navbar-links'>
                {links.map(link => (
                    <Link key={link.key} className='navbar-link' to={link.url} style={props.page === link.key ? { color: 'red', textDecoration: 'underline' } : {}}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className='navbar-user'>
                {ctx.isLoggedIn ? (
                    <div>
                        <span className='navbar-points'>Points: {ctx.userPoints}</span>
                        <button className='navbar-button' onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button className='navbar-button' onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
