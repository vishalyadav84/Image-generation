const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const imageRouter = require('./routes/imageRouter');
const authRouter = require('./routes/authRouter');
const contactRouter = require('./routes/contactRoutes');
require('dotenv').config();


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        console.log('Received token:', token);

        try {
            const SECRET = process.env.SECRET
            jwt.verify(token, SECRET);
            next();
        } catch (e) {
            console.log('JWT verification error:', e);
            return res.status(401).json({
                message: 'Unauthorized',
                error: e.message
            });
        }
    } else {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
});

app.use('/api/v1/images', imageRouter);
app.use('/api/v1/contact', contactRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Please try again.' });
});

module.exports = app;