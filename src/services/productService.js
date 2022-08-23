import { Product } from '../models/productModel.js';
import {
  updateOne,
  getOne,
  getAll,
  deleteAll,
  deleteOne,
  createOne,
} from './handlersFactory.js';
import { uploadMixOfImages } from '../middlewares/uploadImageMiddleware.js';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';

const uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },

  {
    name: 'images',
    maxCount: 4,
  },
]);

const resizeProductImages = asyncHandler(async (req, _res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    console.log(req.files);
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );
  }

  next();
});

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
  uploadProductImages,
  resizeProductImages,
};
