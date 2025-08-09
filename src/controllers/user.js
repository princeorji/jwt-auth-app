const User = require('../models/user')
const bcrypt = require('bcrypt')
const { signAccessToken } = require('../utils/jwt')

const getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'created_at']
        }) 
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const accessToken = signAccessToken({ id: user.id })
        res.status(200).json({ message: 'Login successful', accessToken })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    signup,
    login,
    getAuthenticatedUser
}