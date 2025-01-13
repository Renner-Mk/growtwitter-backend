import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { FollowerController } from '../controllers/follower.controller'
import { validateFollower } from '../middleware/follower.middleware'

const router = express.Router()

const followerController = new FollowerController()

router.post('/user/followers/:userId', validateToken, validateFollower, followerController.follow)
router.get('/user/followers/:userId', validateToken, followerController.index)
router.delete('/user/followers/:userId', validateToken, validateFollower, followerController.unfollow)

export default router