const User = require("../models/user")
const UserDto = require("../dtos/user-dto")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

const emailService = require("../services/email-service")
const tokenService = require("../services/token-service")

class AuthService {
    async registration(email, password) {
        const candidate = await User.findOne({email})

        if (!password) {
            throw new Error("Password must be at least 8 characters long")
        }

        if (candidate) {
            throw new Error(`User with email ${email} already exists`)
        }

        const activation = uuid.v4()
        const hashPassword = bcrypt.hashSync(password, 3)
        const user = await User.create({email, password: hashPassword, activation})

        await emailService.authEmail(email, activation)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
            message: "User was created"
        }
    }
}

module.exports = new AuthService()