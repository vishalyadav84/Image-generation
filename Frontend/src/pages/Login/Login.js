import React, { useState, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import PointsContext from '../../context/pointsContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
require('dotenv').config();


const Login = () => {
    const ctx = useContext(PointsContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        try {
            const BACKEND_URL = process.env.BACKEND_URL
            const response = await fetch(`${BACKEND_URL}/api/v1/auth/${email}&${password}`);
            const data = await response.json();
            if (response.status === 200) {
                ctx.setIsLoggedIn(true);
                localStorage.setItem('authToken', data.token);
                navigate('/image-generator');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (e) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Navbar page='login' />
            <div className='login-container'>
                <h2>Login</h2>
                {error && <p className='error-message'>{error}</p>}
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
