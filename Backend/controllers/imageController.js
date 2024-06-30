const imageModel = require('../models/imageModel');
const fs = require('fs');
const path = require('path');

const generateImage = async (req, res) => {
    const { searchText } = req.body;
    let imageUrl = "";
    
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${searchText}`, {
            headers: {
                Authorization: `Client-ID ${process.env.ACCESS_TOKEN}`
            }
        });
        const data = await response.json();
        const photos = data.results;
        const randomIndex = Math.floor(Math.random() * photos.length);
        const randomPhoto = photos[randomIndex];
        imageUrl = randomPhoto.urls.regular;
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to fetch image'
        });
    }

    const image = new imageModel({
        query: searchText,
        image: imageUrl
    });

    await image.save();

    res.status(200).json({
        status: 'success',
        message: 'POST Request to /api/v1/images',
        data: {
            searchText,
            url: imageUrl
        }
    });
};

const getImages = async (req, res) => {
    const images = await imageModel.find();
    console.log(images);
    res.status(200).json({
        status: 'success',
        message: 'GET Request to /api/v1/images',
        data: images
    });
};

module.exports = { generateImage, getImages };



