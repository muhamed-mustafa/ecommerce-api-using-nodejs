import { check } from 'express-validator';
import { validatiorMiddleware } from '../../middlewares/validatorMiddleware.js';
import { Review } from '../../models/reviewModel.js';

const createReviewValidator = [
  check('title').optional(),

  check('ratings')
    .notEmpty()
    .withMessage('ratings value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),

  check('user').isMongoId().withMessage('Invalid Review id format'),

  check('product')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new Error('You already created a review before')
            );
          }
        }
      )
    ),

  validatiorMiddleware,
];

const getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review id format'),
  validatiorMiddleware,
];

const updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error('Your are not allowed to perform this action')
          );
        }
      })
    ),

  validatiorMiddleware,
];

const deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) => {
      if (req.user.role === 'user') {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }

          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error('Your are not allowed to perform this action')
            );
          }
        });
      }

      return true;
    }),

  validatiorMiddleware,
];
export {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
};
