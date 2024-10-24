import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protected route (token base)=> for making using access to route and services
export const requireSignIn = async (req,res,next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_secret
            );
        req.user = decode;
        next();
    }
    catch(error){
        console.log(error);
    }
};

// for admin access
export const isAdmin = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorised Access",
            });
        }
        else{
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message:"Error in Admin MiddleWare",
        });
    }
};