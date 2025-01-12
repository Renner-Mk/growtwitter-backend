export class Follower {
    constructor(
        private _userId: string,
        private _following: string

    ){}

    get userId(): string{
        return this._userId
    }

    get following(): string{
        return this._following
    }

    
}