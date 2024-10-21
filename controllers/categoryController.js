import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'

export const createCategoryController  = async(req,res) =>{
    try{
        const {name} = req.body

        if(!name){
            return res.status(401).send({message:'Name is required'});
        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:'Category Already exists'
            })
        }

        const category = await new categoryModel({name, slug:slugify(name),}).save();
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Category Not Created'
        })
    }
}

export const updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            message: "Error while updating category",
            error,
        })
    }
}

    //  for getting all the categories
export const categoryController = async(req,res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category,
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Unable to get all The categories",
            error,
        })
    }
}

export const singleCategoryController = async(req,res) =>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Single Category",
            category,
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error while fetching category",
            error,
        })
    }
}

export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category deleted successfully',
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: " Unable to delete Category",
            error
        })
    }

}