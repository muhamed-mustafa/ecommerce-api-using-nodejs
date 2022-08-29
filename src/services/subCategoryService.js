import { SubCategory } from '../models/subCategoryModel.js';
import {
  createOne,
  getOne,
  deleteAll,
  deleteOne,
  updateOne,
  getAll,
} from './handlersFactory.js';

// @desc   Get List of subCategories
// @route  GET /api/v1/subCategories
// @access Public

const getSubCategories = getAll(SubCategory);

// @desc   Get specific subCategory by id
// @route  GET /api/v1/subCategories/:id
// @access Public

const getSubCategory = getOne(SubCategory);

// @desc   Create Category
// @route  Post /api/v1/subCategories
// @access Private

const createSubCategory = createOne(SubCategory);

// @desc   Update SubCategory
// @route  PUT /api/v1/subCategories/:id
// @access Private

const updateSubCategory = updateOne(SubCategory);
// @desc   Delete Category
// @route  DELETE /api/v1/subCategories/:id
// @access Private

const deleteSubCategory = deleteOne(SubCategory);

// @desc   Delete All SubCategories
// @route  DELETE /api/v1/subCategories
// @access Private

const deleteAllSubCategories = deleteAll(SubCategory);

export {
  getSubCategories,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteAllSubCategories,
};
