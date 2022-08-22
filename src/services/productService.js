import { Product } from '../models/productModel.js';
import {
  updateOne,
  getOne,
  getAll,
  deleteAll,
  deleteOne,
  createOne,
} from './handlersFactory.js';

// @desc   Get List of products
// @route  GET /api/v1/products
// @access Public

const getProducts = getAll(Product, 'Products');

// @desc   Get specific product by id
// @route  GET /api/v1/products/:id
// @access Public

const getProduct = getOne(Product);
// @desc   Create Product
// @route  Post /api/v1/products
// @access Private

const createProduct = createOne(Product);

// @desc   Update Product
// @route  PUT /api/v1/products/:id
// @access Private

const updateProduct = updateOne(Product);

// @desc   Delete Product
// @route  DELETE /api/v1/products/:id
// @access Private

const deleteProduct = deleteOne(Product);
// @desc   Delete All Products
// @route  DELETE /api/v1/products/:id
// @access Private

const deleteAllProducts = deleteAll(Product);

export {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteAllProducts,
  deleteProduct,
};
