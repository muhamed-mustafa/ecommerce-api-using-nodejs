import { Coupon } from '../models/couponModel.js';
import {
  createOne,
  getOne,
  deleteAll,
  deleteOne,
  updateOne,
  getAll,
} from './handlersFactory.js';

// @desc    Get list of coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin-Manager
const getCoupons = getAll(Coupon);

// @desc    Get specific coupon by id
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin-Manager
const getCoupon = getOne(Coupon);

// @desc    Create coupon
// @route   POST  /api/v1/coupons
// @access  Private/Admin-Manager
const createCoupon = createOne(Coupon);

// @desc    Update specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
const updateCoupon = updateOne(Coupon);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin-Manager
const deleteCoupon = deleteOne(Coupon);

// @desc    Delete All Coupons
// @route   DELETE /api/v1/coupons
// @access  Private/Admin-Manager

const deleteAllCoupons = deleteAll(Coupon);

export {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  deleteAllCoupons,
};
