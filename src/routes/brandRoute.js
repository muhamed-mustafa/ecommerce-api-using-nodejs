import express from 'express';
import {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from '../utils/validators/brandValidator.js';
import {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  deleteAllBrands,
} from '../services/brandService.js';

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(createBrandValidator, createBrand)
  .delete(deleteAllBrands);

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export { router as BrandRoute };
