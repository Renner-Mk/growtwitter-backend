import express from 'express'
import { validateToken } from '../middleware/auth.middleware'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

const userController = new UserController()



router.post('/user', userController.create)
router.get('/user', userController.index)
router.get('/user/:id', userController.show)
router.put('/user/:id', validateToken, userController.update)
router.delete('/user/:id', validateToken, userController.delete)

export default router