import express from 'express';
import {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToDelivered,
  updateOrderToPaid,
  checkoutSession,
} from '../services/orderService.js';

import { protect, allowedTo } from '../services/authService.js';

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:cartId', allowedTo('user'), checkoutSession);

router.route('/:cartId').post(allowedTo('user'), createCashOrder);

router.get(
  '/',
  allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);

router.get('/:id', findSpecificOrder);

router.put('/:id/pay', allowedTo('admin', 'manager'), updateOrderToPaid);

router.put(
  '/:id/deliver',
  allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

export { router as OrderRoute };
