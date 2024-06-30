const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;