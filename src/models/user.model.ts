import { randomUUID } from "crypto"

export class User {
    private _id: string
    constructor(
        private _nome: string,
        private _email: string,
        private _password: string,
        private _username: string
    ){
        this._id = randomUUID()
    }

    get id(): string{
        return this._id
    }

    get name(): string{
        return this._nome
    }

    get email(): string{
        return this._email
    }

    get password(): string{
        return this._password
    }

    get username(): string{
        return this._username
    }
}