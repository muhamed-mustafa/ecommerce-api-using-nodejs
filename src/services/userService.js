import { uploadSingleImage } from '../middlewares/uploadImageMiddleware.js';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { getOne, createOne, deleteOne, getAll } from './handlersFactory.js';
import { User } from '../models/userModel.js';
import { createToken } from '../utils/createToken.js';
import { ApiError } from '../utils/apiError.js';

const uploadUserImage = uploadSingleImage('profileImg');

const resizeImage = asyncHandler(async (req, _res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 800)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${fileName}`);

    req.body.profileImg = fileName;
  }

  next();
});

// @desc   Get List of users
// @route  GET /api/v1/users
// @access Private/Admin

const getUsers = getAll(User);

// @desc   Get specific user by id
// @route  GET /api/v1/users/:id
// @access Private/Admin

const getUser = getOne(User);

// @desc   Create User
// @route  Post /api/v1/users
// @access Private/Admin

const createUser = createOne(User);

// @desc   Update specific user
// @route  PUT /api/v1/users
// @access Private/Admin

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!user) {
    throw next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }

  res.json({ status: 200, data: user, success: true });
});

const changeUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );

  if (!user) {
    throw next(new ApiError(`No user for this id ${req.params.id}`, 404));
  }

  res.json({ status: 200, data: user, success: true });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
const deleteUser = deleteOne(User);

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect

const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect

const updateLoggedUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );

  const token = createToken(user._id);

  res.json({ status: 200, data: user, token, success: true });
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect

const updateLoggedUserData = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ status: 200, data: updatedUser, success: true });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect

const deleteLoggedUserData = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});

export {
  getUsers,
  getUser,
  createUser,
  resizeImage,
  uploadUserImage,
  updateUser,
  changeUserPassword,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
};
