import { Category } from '../models/categoryModel.js';
import {
  createOne,
  getOne,
  deleteAll,
  deleteOne,
  updateOne,
  getAll,
} from './handlersFactory.js';

// @desc   Get List of categories
// @route  GET /api/v1/categories
// @access Public

const getCategories = getAll(Category);

// @desc   Get specific category by id
// @route  GET /api/v1/categories/:id
// @access Public

const getCategory = getOne(Category);

// @desc   Create Category
// @route  Post /api/v1/categories
// @access Private

const createCategory = createOne(Category);

// @desc   Update Category
// @route  PUT /api/v1/categories/:id
// @access Private

const updateCategory = updateOne(Category);
// @desc   Delete Category
// @route  DELETE /api/v1/categories/:id
// @access Private

const deleteCategory = deleteOne(Category);

// @desc   Delete All Categories
// @route  DELETE /api/v1/categories/:id
// @access Private

const deleteAllCategories = deleteAll(Category);

export {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
