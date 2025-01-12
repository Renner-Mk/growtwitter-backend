import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

const userController = new UserController()



router.post('/user', userController.create)
router.get('/user/:userId', validateToken, userController.index)
router.get('/user/:userId', validateToken, userController.show)
router.put('/user/:userId', validateToken, userController.update)
router.delete('/user/:userId', validateToken, userController.delete)

export default router