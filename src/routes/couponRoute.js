import express from 'express';
import {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  deleteAllCoupons,
} from '../services/couponService.js';

import { protect, allowedTo } from '../services/authService.js';

const router = express.Router();

router.use(protect, allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon).delete(deleteAllCoupons);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

export { router as CouponRoute };
