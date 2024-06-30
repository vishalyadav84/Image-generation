import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './SignUp.css';
require('dotenv').config();

const BACKEND_URL = process.env.BACKEND_URL;

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signUp = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if (response.status === 200) {
                setSuccess('Account created successfully!');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message || 'Sign up failed. Please try again.');
            }
        } catch (e) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Navbar page='signup' />
            <div className='signup-container'>
                <h2>Sign Up</h2>
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>{success}</p>}
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
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={signUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;
