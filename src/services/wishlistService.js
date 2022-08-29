import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
const addProductToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: 'Product added successfully to your wishlist.',
    data: user.wishlist,
    success: true,
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Protected/User
const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: 'Product removed successfully from your wishlist.',
    data: user.wishlist,
    success: true,
  });
});

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
const getLoggedUserWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  res.status(200).json({
    status: 200,
    results: user.wishlist.length,
    data: user.wishlist,
    success: true,
  });
});

export {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
};
