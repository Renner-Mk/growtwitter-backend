import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { FollowerController } from '../controllers/follower.controller'

const router = express.Router()

const followerController = new FollowerController()

router.post('/user/followers/:userId', validateToken, followerController.follow)
router.get('/user/followers/:userId', validateToken, followerController.index)
router.delete('/user/followers/:userId', validateToken, followerController.unfollow)

export default router