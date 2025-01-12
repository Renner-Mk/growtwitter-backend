import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { TweetController } from '../controllers/tweet.controller'


const router = express.Router()

const tweetController = new TweetController()



router.post('/user/:userId/tweet/', validateToken,tweetController.create) // caso seja um tweet
router.post('/user/:userId/tweet/:id', validateToken,tweetController.create) //caso seja um retweet

router.get('/user/:userId/tweet', validateToken, tweetController.index)
router.get('/user/:userId/tweet/:id', validateToken, tweetController.show)

router.put('/user/:userId/tweet/:id', validateToken, tweetController.update)
router.delete('/user/:userId/tweet/:id', validateToken, tweetController.delete)

export default router