const express = require("express");
const authRouter = express.Router();
const { signup, login } = require('../controllers/authController')


authRouter.route('/')
    .post(signup)

authRouter.route('/:email&:password')
    .get(login)

module.exports = authRouter