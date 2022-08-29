import express from 'express';
import {
  getReviews,
  createFilterObj,
  getReview,
  setProductIdAndUserIdToBody,
  createReview,
  updateReview,
  deleteReview,
  deleteAllReviews,
} from '../services/reviewService.js';

import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from '../utils/validators/reviewValidator.js';
import { protect, allowedTo } from '../services/authService.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, allowedTo('admin', 'manager'), createFilterObj, getReviews)
  .post(
    protect,
    allowedTo('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  )
  .delete(protect, allowedTo('admin', 'manager'), deleteAllReviews);

router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(protect, allowedTo('user'), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowedTo('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

export { router as ReviewRoute };
