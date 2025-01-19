import express from 'express'
import { authController } from './auth.controller'
const router = express.Router()


router.post("/", authController.loginAuth)
router.post("/refresh-token", authController.refreshToken)


export const authRoutes = router