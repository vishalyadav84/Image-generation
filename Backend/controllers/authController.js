const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.params

    const generateToken = (user) => {
        return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404)
                .json({
                    message: 'User not found'
                })
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = generateToken(user._id)

                res.status(200)
                    .json({
                        data: user,
                        token,
                        message: 'User logged in successfully'
                    })
            } else {
                res.status(401)
                    .json({
                        message: 'Invalid credentials'
                    })
            }
        }
    } catch (e) {
        res.status(400)
            .json({
                message: e.message
            })

    }
}

const signup = async (req, res) => {
    const { email, password } = req.body

    const hashPassword = async (password) => {
        return bcrypt.hash(password, 10)
    }

    if (!email || !password) {
        res.status(401)
            .json({
                message: 'Email and password are required'
            })
    }
    try {
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({ email, password: hashedPassword })

        res.status(200)
            .json({
                data: newUser,
                message: 'User signed up successfully'
            })
    } catch (e) {
        res.status(400)
            .json({
                message: e.message
            })

    }
}

module.exports = {
    login,
    signup
}