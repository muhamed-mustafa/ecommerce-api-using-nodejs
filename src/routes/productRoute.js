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
} from '../services/productService.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(createProductValidator, createProduct)
  .delete(deleteAllProducts);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export { router as ProductRoute };
