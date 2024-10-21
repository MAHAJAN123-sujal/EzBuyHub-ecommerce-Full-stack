import { comparePassword,hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"; // for creating more secure

export const registerController = async (req, res) => {
    try{
        const {name, email, password, phone, address, question } = req.body;

        // for the validation of the data in the userModel
        if(!name){
            return res.send({error:'Name is required'});
        }
        if(!email){
            return res.send({message:'Email is required'});
        }
        if(!password){
            return res.send({message:'Password is required'});
        }
        if(!phone){
            return res.send({message:'Phone Number is required'});
        }
        if(!address){
            return res.send({message:'Address is required'});
        }
        if(!question){
            return res.send({message:'Answer is required'});
        }

        // checking user
        const existing_user = await userModel.findOne({email});

        // checking existing user
        if(existing_user){
            return res.status(200).send({
                success:false,
                message:'User Already exists..! Please login'
            });
        }

        // register user
        const hashed_password = await hashPassword(password);

        // save user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashed_password,
            question,
        }).save();
        
        res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Username or Password",
            })
        }
        // checking user if exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not Registered'
            });
        }

        // matching password if correct or not
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Password is incorrect'
            });
        }

        // adding token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_secret, {
            expiresIn:"7d",
        });
        
        res.status(200).send({
            success: true,
            message:'Login Successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error faced during Login",
            error,
        });
    }
};

// forgot Password
export const forgotPasswordController = async(req,res)=>{
    try{
        const{email,question,newPassword} = req.body;
        if(!email){
            res.status(400).send({
                message:"Email is required"
            })
        }
        if(!question){
            res.status(400).send({
                message:"Question is required"
            })
        }
        if(!newPassword){
            res.status(400).send({
                message:"Password is required"
            })
        }
        // check
        const user= await userModel.findOne({email,question})
        if(!user){
            res.status(404).send({
                success:false,
                message:"Invalid User",
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password reset Successfully",
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Unable to Change password",
            error
        })
    }
}

// test Controller
export const testController = (req,res) =>{
    try{
        res.send("Protected route");
    }
    catch(error){
        console.log(error);
        res.send({error});
    }
}

// to update user profile
export const updateProfileController = async(req,res) =>{
    try{
        const {name,email,password,phone,address}  = req.body;
        const user = await userModel.findById(req.user._id)
            // for password validating
        if(password && password.length<6){
            return res.json({error : 'Password required of minimium 6 characters'});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            password : hashedPassword || user.password,
            phone : phone || user.phone,
            address : address ||  user.address
        },{new:true})
        res.status(201).send({
            success:true,
            message:'Profile Updated Successfully',
            updatedUser,
        })
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            message:'Unable to update user profile',
            error
        })
    }
}

export const getOrdersController = async(req,res) => {
    try{
        const orders = await orderModel.find({buyer:req.user._id}).populate('products','-photo').populate('buyer','name');
        res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            meassge:'unable to fetch Past Orders',
            error
        })
    }
}

export const getAllOrdersController = async(req,res) => {
    try{
        const orders = await orderModel.find({}).populate('products','-photo').populate('buyer','name');
        res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to fetch all orders',
            error
        })
    }
}

export const orderStatusController = async(req,res) => {
    try{
      const {orderId} = req.params;
      const {status} = req.body;
      const orders = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true});
      res.json(orders);
    }
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to change status of order',
            error
        })
    }
}