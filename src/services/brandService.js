import { Brand } from '../models/brandModel.js';
import {
  getOne,
  createOne,
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
const uploadBrandImage = uploadSingleImage('image');

// Image processing
const resizeImage = asyncHandler(async (req, _res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.body) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/brands/${fileName}`);

    // Save image into our db
    req.body.image = fileName;
  }

  next();
});

// @desc   Get List of brands
// @route  GET /api/v1/brands
// @access Public

const getBrands = getAll(Brand);

// @desc   Get specific brand by id
// @route  GET /api/v1/brands/:id
// @access Public

const getBrand = getOne(Brand);

// @desc   Create Brand
// @route  Post /api/v1/brands
// @access Private

const createBrand = createOne(Brand);

// @desc   Update Brand
// @route  PUT /api/v1/brands/:id
// @access Private

const updateBrand = updateOne(Brand);

// @desc   Delete Brand
// @route  DELETE /api/v1/brands/:id
// @access Private

const deleteBrand = deleteOne(Brand);

// @desc   Delete All Brands
// @route  DELETE /api/v1/brands
// @access Private

const deleteAllBrands = deleteAll(Brand);

export {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  deleteAllBrands,
  uploadBrandImage,
  resizeImage,
};
