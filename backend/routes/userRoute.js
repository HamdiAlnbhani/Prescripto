import express from 'express'
import { registerUser } from '../controllers/userControllers.js'
import _default from 'validator'


const userRouter = express.Router()
userRouter.post('/register',registerUser)


export  default userRouter