import express from 'express';
import {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getProductValidator,
} from '../utils/validators/productValidator.js';
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  uploadProductImages,
  resizeProductImages,
} from '../services/productService.js';
import { ReviewRoute } from './reviewRoute.js';

const router = express.Router();

router.use('/:productId/reviews', ReviewRoute);

router
  .route('/')
  .get(getProducts)
  .post(
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  )
  .delete(deleteAllProducts);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

export { router as ProductRoute };
