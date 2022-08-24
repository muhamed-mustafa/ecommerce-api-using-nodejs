import slugify from 'slugify';
import { body, check } from 'express-validator';
import { User } from '../../models/userModel.js';
import { validatiorMiddleware } from '../../middlewares/validatorMiddleware.js';
import bcrypt from 'bcryptjs';

const createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .custom((val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        throw new Error('Invalid password confirmation');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation required'),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  check('profileImg').optional(),

  check('role').optional(),

  validatiorMiddleware,
];

const getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatiorMiddleware,
];

const updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),

  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty()
    .optional()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  check('profileImg').optional(),

  check('role').optional(),

  validatiorMiddleware,
];

const changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),

  body('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),

  body('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),

  body('password')
    .notEmpty()
    .withMessage('You must enter your password')
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new Error('There is no user for this id');
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error('Incorrect current password');
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }

      return true;
    }),

  validatiorMiddleware,
];

const deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatiorMiddleware,
];

const updateLoggedUserValidator = [
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .optional()
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return new Promise.reject(new Error('E-mail already is use'));
        }
      });
    }),

  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  validatiorMiddleware,
];

export {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
  deleteUserValidator,
};
