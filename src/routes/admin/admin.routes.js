const express = require('express');
const { upload } = require("../../helpers/imageUpload");
const userRoutes = express.Router();
const { adminVerifyToken } = require('../../helpers/verifyToken');
const {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    updatePassword
} = require('../../controller/admin/admin.controller');

userRoutes.post('/register-Admin',
upload.single("profileImage"),
registerAdmin);

userRoutes.post('/login-Admin', loginAdmin);
userRoutes.get('/get-All-Admin', adminVerifyToken, getAllAdmin);
userRoutes.get('/get-Admin', adminVerifyToken, getAdmin);

userRoutes.put('/update-Admin',
upload.single("profileImage"),
adminVerifyToken, updateAdmin);

userRoutes.delete('/delete-Admin', adminVerifyToken, deleteAdmin);
userRoutes.put('/update-Password', adminVerifyToken, updatePassword);

module.exports = userRoutes;