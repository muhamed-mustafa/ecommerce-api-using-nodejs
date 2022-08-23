import { Category } from '../models/categoryModel.js';
import {
  createOne,
  getOne,
  deleteAll,
  deleteOne,
  updateOne,
  getAll,
} from './handlersFactory.js';
import { uploadSingleImage } from '../middlewares/uploadImageMiddleware.js';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';

// Upload a single image
const uploadCategoryImage = uploadSingleImage('image');

// Image processing
const resizeImage = asyncHandler(async (req, _res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${fileName}`);

  // Save image into our db
  req.body.image = fileName;

  next();
});

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
  uploadCategoryImage,
  resizeImage,
};
