import { Review } from '../models/reviewModel.js';
import {
  createOne,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlersFactory.js';

// Nested route
// GET /api/v1/products/:productId/reviews

const createFilterObj = (req, _res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public
const getReviews = getAll(Review);

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
const getReview = getOne(Review);

// Nested route (Create)
const setProductIdAndUserIdToBody = (req, _res, next) => {
  if (!req.body.product) req.body.product = req.query.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
const createReview = createOne(Review);

// @desc    Update specific review
// @route   PUT /api/v1/reviews/:id
// @access  Private/Protect/User
const updateReview = updateOne(Review);

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/Protect/User-Admin-Manager
const deleteReview = deleteOne(Review);

// @desc   Delete All SubCategories
// @route  DELETE /api/v1/subCategories
// @access Private
const deleteAllReviews = deleteAll(Review);

export {
  getReviews,
  createFilterObj,
  getReview,
  setProductIdAndUserIdToBody,
  createReview,
  updateReview,
  deleteReview,
  deleteAllReviews,
};
