const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token')

class TokenService {

    validateAccessToken(token) {
        try {
            const validated = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return validated
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const validated = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return validated
        } catch (e) {
            return null
        }
    }

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId, refreshToken})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async deleteToken(refreshToken) {
        const token = await tokenModel.deleteOne({refreshToken})
        return token
    }

    async findToken(refreshToken) {
        const token = await tokenModel.findOne({refreshToken})
        return token
    }
}

module.exports = new TokenService()