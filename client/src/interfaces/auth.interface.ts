import { IUser } from "./user.interface"

export interface IAuthPayload {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}