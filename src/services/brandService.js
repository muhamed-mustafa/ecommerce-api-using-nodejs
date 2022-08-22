import { Brand } from '../models/brandModel.js';
import {
  getOne,
  createOne,
  deleteAll,
  deleteOne,
  updateOne,
  getAll,
} from './handlersFactory.js';

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
// @route  DELETE /api/v1/brands/:id
// @access Private

const deleteAllBrands = deleteAll(Brand);

export {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  deleteAllBrands,
};
