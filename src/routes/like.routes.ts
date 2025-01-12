import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { LikeController } from '../controllers/like.controller'

const router = express.Router()

const likeController = new LikeController()

router.post('/user/:userId/like/:tweetId', validateToken, likeController.like)
router.get('/user/:userId/like/:tweetId', validateToken, likeController.show)
router.delete('/user/:userId/like/:tweetId', validateToken, likeController.dislike)

export default router