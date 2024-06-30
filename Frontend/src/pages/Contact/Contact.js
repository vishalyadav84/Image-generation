import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Contact.css';
require('dotenv').config();


const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setFeedback('Please fill in all fields.');
            return;
        }

        try {
            const BACKEND_URL = process.env.BACKEND_URL
            const response = await fetch(`${BACKEND_URL}/api/v1/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setFeedback('Thank you for your message. We will get back to you soon.');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setFeedback(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setFeedback('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Navbar page='contact' />
            <div className='contact-container'>
                <h2>Contact Us</h2>
                {feedback && <p className='feedback-message'>{feedback}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        placeholder='Message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit'>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
