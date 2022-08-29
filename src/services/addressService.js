import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

// @desc    Add address to user addresses list
// @route   POST /api/v1/addresses
// @access  Protected/User
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: 'Address added successfully.',
    data: user.addresses,
    success: true,
  });
});

// @desc    Remove address from user addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
const removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: 'Address removed successfully.',
    data: user.addresses,
    success: true,
  });
});

// @desc    Get logged user addresses list
// @route   GET /api/v1/addresses
// @access  Protected/User
const getLoggedUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('addresses');
  console.log(user.addresses[0]);
  res.status(200).json({
    status: 200,
    results: user.addresses.length,
    data: user.addresses,
    success: true,
  });
});

export { addAddress, removeAddress, getLoggedUserAddresses };
