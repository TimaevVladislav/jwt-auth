const User = require("../models/user")
const UserDto = require("../dtos/user-dto")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

const ExceptionApi = require("../exceptions/api.error")

const emailService = require("../services/email-service")
const tokenService = require("../services/token-service")

class AuthService {
    async registration(email, password) {
        const candidate = await User.findOne({email})

        if (!password) {
            throw ExceptionApi.BadRequest("Password must be at least 8 characters long")
        }

        if (candidate) {
            throw ExceptionApi.BadRequest(`User with email ${email} already exists`)
        }

        const activation = uuid.v4()
        const hashPassword = bcrypt.hashSync(password, 3)
        const user = await User.create({email, password: hashPassword, activation})

        await emailService.authEmail(email, `${process.env.API_URL}/api/activate/${activation}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
            message: "User was created"
        }
    }

    async login(email, password) {
        const user = await User.findOne({email})

        if (!user) {
            throw ExceptionApi.BadRequest(`User with email ${email} not found`)
        }

        const isPassEquals = bcrypt.compareSync(password, user.password)

        if (!isPassEquals) {
            throw ExceptionApi.BadRequest("Invalid password")
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
            message: "User was logged in"
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.deleteToken(refreshToken)
        return token
    }

    async activate(activation) {
        const user = await User.findOne({activation})

        if (!user) {
            throw new Error("Incorrect activation link")
        }

        user.isActivated = true
        await user.save()
    }
}

module.exports = new AuthService()