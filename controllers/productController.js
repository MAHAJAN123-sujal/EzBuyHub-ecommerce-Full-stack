import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment:braintree.Environment.Sandbox,
  merchantId:process.env.BRAINTREE_MERCHANT_ID,
  publicKey:process.env.BRAINTREE_PUBLIC_KEY,
  privateKey:process.env.BRAINTREE_PRIVATE_KEY
})

export const createProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = new productModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating product",
      });
    }
  };

  // to all products
export const getProductController = async(req,res) =>{
    try{
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            ProductCount:products.length,
            mesagge:'All Products',
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Failed to get Product',
            error
        })
    }
};

export const getSingleProductController = async(req,res) =>{
    try{
    const product = await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category');
    res.status(201).send({
        success:true,
        message:'Product Details',
        product
    })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Unable to fetch the product',
            error,
        })
    }
};

// to get photo
export const productPhotoController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select('photo');
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType);
            return res.status(200).send(
                product.photo.data
            )
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            message:'Unable to fetch the photo',
            error,
        })
    }
};

export const deleteProductController = async(req,res) =>{
    try{
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success:true,
            message:'Product deleted Successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to delete product',
            error,
        })
    }
}

export const updateProductController = async(req,res) =>{
    try {
        const { name, description, price, category, quantity, shipping } =
          req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new:true}
        );
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product Updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Update product",
        });
      }
}

export const productFilterController = async(req,res) => {
  try{
    const {checked,radio} = req.body;
    let args = {}
    if(checked.length>0) args.category = checked;
    if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]}
    const products = await productModel.find(args);
    res.status(200).send({
      success:true,
      message:'Products',
      products
    })
  }
  catch(error){
    console.log(error);
    res.status(501).send({
      success:false,
      message:'Unable to filter products',
      error
    })
  }
}

export const productCountController = async(req,res) => {
  try{
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      total,
    })
  }
  catch(error){
    console.log(error);
    res.status(501).send({
      success:false,
      message:'Unable to count all products',
      error,
    })
  }
}


export const productListController = async(req,res) =>{
  try{
    const perPage =6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
    res.status(200).send({
      success:true,
      products
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      mesagge:'Unable to fetch product list',
      error
    })
  }
}

export const searchProductController = async(req,res) =>{
  try{
    const {keyword} = req.params;
    const result = await productModel.find({
      $or:[
        {name: {$regex: keyword, $options:'i'}},
        {description: {$regex: keyword, $options:'i'}}
      ],
    }).select('-photo')
    res.json(result);
  }
  catch(error){
    console.log(error);
    res.status(501).send({
      success:false,
      message:'No such Product found',
      error
    })
  }
}

// to get similar(related) products 
export const relatedProductController = async(req,res) => {
  try{
    const {pid,cid} = req.params;
    const products = await productModel.find({
      category:cid,
      _id:{$ne:pid}
    }).select('-photo').limit(5).populate('category');
    res.status(201).send({
      success:true,
      message:'Similar Products',
      products,
    })
  }
  catch(error){
    console.log(error);
    res.status(401).send({
      success:false,
      message:'Unable to fetch Similar products',
      error
    })
  }
}

// to get products from a particular category
export const productCategoryController = async(req,res) => {
  try{
    const category = await categoryModel.findOne({slug:req.params.slug});
    const products = await productModel.find({category}).populate('category');
    res.status(201).send({
      success:true,
      category,
      products
    })
  }
  catch(error){
    console.log(error);
    res.status(501).send({
      success:false,
      message:'Unable to get category products',
      error
    })
  }
}

// for token authentication for payments
export const braintreeTokenController = async(req,res) => {
  try{
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(407).send(err);
      }
      else{
        res.send(response);
      }
    })
  }
  catch(error){
    console.log(error);
    res.status(501).send({
      success:false,
      message:'Payment Authentication falied',
      error
    })
  }
}


// for payment processing
export const braintreePaymentController = async(req,res) =>{
  try{
    const {cart,nonce} = req.body;
    let total =0;
    cart?.map((item) => {
      total+=item.price
    });

    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true,
      },
    },
    
    function(error,result){
      if(result){
        const order = new orderModel({
          products:cart,
          payment:result,
          buyer: req.user._id,
        }).save()
        res.json({ok:true})
      }
      else{
        res.status(500).send(error);
      }
    }
    )

    
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Payment Processing Falied',
      error
    })
  }
}
