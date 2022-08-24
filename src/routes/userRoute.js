import express from 'express';
import {
  createUserValidator,
  getUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from '../utils/validators/userValidator.js';

import {
  changeUserPassword,
  createUser,
  updateUser,
  deleteUser,
  deleteLoggedUserData,
  getLoggedUserData,
  getUser,
  getUsers,
  resizeImage,
  updateLoggedUserData,
  updateLoggedUserPassword,
  uploadUserImage,
} from '../services/userService.js';

import { protect, allowedTo } from '../services/authService.js';

const router = express.Router();

router.use(protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(allowedTo('admin', 'manager'));

router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);
router
  .route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

export { router as UserRoute };
