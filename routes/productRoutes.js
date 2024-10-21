import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

router.get('/get-product',getProductController);

router.get('/get-product/:slug',getSingleProductController);

// router to get photo
router.get('/product-photo/:pid',productPhotoController);

// to delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,formidable(),deleteProductController);

// to update the product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

// filter products by prices
router.post('/products-filter',productFilterController);

//to count the number of products
router.get('/product-count',productCountController);

// to controller product lists
router.get('/product-list/:page',productListController)

// for adding searching facility of a product by keywords
router.get('/search-product/:keyword',searchProductController)

// to get similar products
router.get('/related-product/:pid/:cid',relatedProductController)

// to get products of one category
router.get('/product-category/:slug',productCategoryController)

// for payment checkout authentication
router.get('/braintree/token',braintreeTokenController)

// for payment processing
router.post('/braintree/payment',requireSignIn, braintreePaymentController)
export default router;