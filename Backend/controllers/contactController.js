const ContactMessage = require('../models/ContactMessage');

exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ status: 'error', message: 'Please fill in all fields.' });
        }

        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();

        res.status(201).json({ status: 'success', message: 'Message sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
    }
};
