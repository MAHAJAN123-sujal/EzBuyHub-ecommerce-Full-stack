import express from 'express';
import {registerController,loginController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authoriseController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// routing
//REGISTER || METHOD POST
router.post("/register",registerController);

// login => POST request
router.post("/login", loginController);

// test routes
router.get('/test',requireSignIn,isAdmin,testController);

// forgot password => POST request
router.post('/forgot-password',forgotPasswordController);

// creating protected route auth for User
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

// creating protected route auth for Admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// to update user profile
router.put('/profile',requireSignIn,updateProfileController)

// to get users orders
router.get('/orders',requireSignIn,getOrdersController)

// to get admin all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

// to update order status
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)
export default router;