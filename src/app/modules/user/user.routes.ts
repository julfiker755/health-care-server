import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { userController } from './user.controller'
import { userValidation } from './user.validation'



const router = express.Router()


router.post("/admin-store",
validateRequest(userValidation.adminSchema),
userController.insertAdminBD)


router.post("/doctor-store",
validateRequest(userValidation.doctorSchema),
userController.insertDoctorBD
)

router.post("/patient-store",
validateRequest(userValidation.patientSchema),
userController.insertPatientBD
)



export const userRoutes = router 