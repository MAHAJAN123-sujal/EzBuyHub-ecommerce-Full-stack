import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} from '../controllers/categoryController.js';

const router = express.Router();

// routes
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
    );

    // for updating category => we use put() funtion
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
    
    // for getting all the categories
router.get('/all-category',categoryController);

    // for getting a single category
router.get('/single-category/:slug',singleCategoryController)

    // for deleting category
router.delete('/delete/:id',requireSignIn,isAdmin,deleteCategoryController)
export default router;