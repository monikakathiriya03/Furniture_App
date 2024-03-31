const userServices = require('../../services/user.service');
const userService = new userServices();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        let admin = await userService.getUser({ email: req.body.email, isDelete: false });
        if(admin) {
            return res.status(400).json({ message: 'Admin is already Registerd...' });
        }
        if(req.file){
            req.body.profileImage = req.file.path.replace(/\\/g, '/')
        }
        
        let hashPassword = await bcryptjs.hash(req.body.password, 10);
        admin = await userService.addNewUser({ 
            ...req.body,
            password: hashPassword,
            isAdmin: true
      });
      res.status(200).json({ admin, message: 'Admin Registerd Successfully...✅' });
      } catch (error) {
           console.log(error);
           return res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.loginAdmin = async (req, res) => {
    try {
        let admin = await userService.getUser({ email: req.body.email,isAdmin: true, isDelete: false });
        if(!admin) {
            return res.status(404).json({message: `Admin Is Not Found...`})
        }
        let checkPassword = await bcryptjs.compare(req.body.password, admin.password);
        if(!checkPassword) {
            return res.status(400).json({message:`  InCorrect Password.Try Again..`})
        }
        let token = jwt.sign({ adminId: admin._id}, 'Admin');
        res.status(200).json({ token, message: 'Login Successful...✅'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` });
    }};

exports.getAllAdmin = async (req, res) => {
    try {
        let admin = await userService.getAllUsers({isDelete: false,isAdmin: true});
        if(!admin) {
            return res.status(404).json({ message: `Admin is Not Found...`})
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

exports.getAdmin = async (req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if(!admin){
            return res.status(404).json({ message: 'Admin is not found...' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if(!admin){
            return res.status(404).json({ message: 'Admin is not found...' });
        }
        if(req.file){
            req.body.profileImage = req.file.path.replace(/\\/g, '/')
        }
        admin = await userService.updateUser(admin._id, { ...req.body });
        res.status(200).json({ admin, message: 'Admin updated successfully...✅' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if(!admin){
            return res.status(404).json({ message: 'Admin is not found...' });
        }
        admin = await userService.updateUser(admin._id, { isDelete: true});
        res.status(200).json({ message: 'Admin deleted successfully...✅' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

exports.updatePassword = async(req, res) => {
    try {
        let admin = await userService.getUserById(req.query._id);
        if(!admin){
            return res.json({ message: `Admin is Not Found...`});
        }
        // let comparePassword = await bcryptjs.compare(req.body.oldPassword,admin.password);
        // let oldPassword = req.body.oldPassword;
        // if(!oldPassword){
        //     return res.json({ message: `Old Password is not Found.. Please Try Again.`});
        // }
        // if(!comparePassword){
        //     return res.json({ message: `Old Password is not match.. Please Try Again.`});
        // }
        // let newPassword = req.body.newPassword;
        // if(!newPassword){
        //     return res.json({ message:`New Password is Not Found.`});
        // }
        if(newPassword === oldPassword){
            return res.json({ message: `Old Password and New Password Are Same Please Enter Diffrent Password.`});
        }
        // let confirmPassword = req.body.confirmPassword;
        // if(!confirmPassword){
        //     return res.json({ message:`Confirm Password is Not Found.`});
        // }
        if(newPassword !== confirmPassword){
            return res.json({ message: `New Password and Confirm  Password are not same.` });
        }
        let hashPassword = await bcryptjs.hash(newPassword, 10);
        admin = await userService.updateUser(req.admin._id, { password: hashPassword});
        res.status(200).json({ message: 'Password changed successfully...✅' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
}