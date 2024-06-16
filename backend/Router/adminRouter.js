import express from 'express'
import { addNewUser, adminLogout, authAdmin, deleteUser, getUers, updateUser } from '../Controller/adminController.js'
import { adminProtect } from '../MIddleware/adminAuthMiddleware.js'
import upload from '../MIddleware/multer.js'
const adminRouter = express.Router()

adminRouter.post('/', authAdmin)
adminRouter.post('/logout', adminLogout)
adminRouter
    .route('/users')
    .get(adminProtect, getUers)
    .post(adminProtect, upload.single('image'), addNewUser)
    .delete(adminProtect, deleteUser)

adminRouter.put('/profile', adminProtect, upload.single('image'), updateUser)


export default adminRouter