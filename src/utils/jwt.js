const jwt = require('jsonwebtoken')

const signAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    return token
}

const verifyAccessToken = (token) => {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return payload
}

module.exports = {
    signAccessToken,
    verifyAccessToken
}