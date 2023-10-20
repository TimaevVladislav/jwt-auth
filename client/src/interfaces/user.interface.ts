
export interface IUser {
    id: string
    email: string
    isActivated: boolean
}

export interface IUsers {
    _id: string
    email: string
    password: string
    isActivated: boolean
    activation: string
    __v: number
}
