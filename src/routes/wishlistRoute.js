import express from 'express';
import {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} from '../services/wishlistService.js';

import { protect, allowedTo } from '../services/authService.js';

const router = express.Router();

router.use(protect, allowedTo('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

export { router as WishListRoute };
