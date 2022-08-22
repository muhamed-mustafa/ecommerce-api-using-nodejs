import express from 'express';
import {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from '../utils/validators/categoryValidator.js';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from '../services/categoryService.js';

import { subCategoryRoute } from './subCategoryRoute.js';

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRoute);

router
  .route('/')
  .get(getCategories)
  .post(createCategoryValidator, createCategory)
  .delete(deleteAllCategories);

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export { router as CategoryRoute };
