import { randomUUID } from "crypto"

export enum TweetType{
    Tweet = "Tweet",
    ReTweet = "ReTweet"
}

export class Tweet {
    private _id: string
    constructor(
        private _content: string,
        private _type: TweetType,
        private _userId: string,
        private _tweetOriginalId?: string
    ){
        this._id = randomUUID()
        
        if(_type === TweetType.ReTweet && !this.tweetOriginalId){
            throw new Error("ReTweet deve ter um tweetOriginalId.")
        }
        
        if(_type === TweetType.Tweet && _tweetOriginalId) {
            throw new Error("Tweets normais não podem ter tweetOriginalId.");
        }
    }

    get id(): string{
        return this._id
    }

    get content(): string{
        return this._content
    }

    get type(): TweetType{
        return this._type
    }

    get userId(): string{
        return this._userId
    }

    get tweetOriginalId(): string | undefined{
        return this._tweetOriginalId
    }
}