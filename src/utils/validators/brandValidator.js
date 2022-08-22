import { body, check } from 'express-validator';
import slugify from 'slugify';
import { validatiorMiddleware } from '../../middlewares/validatorMiddleware.js';

const getBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  validatiorMiddleware,
];

const createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatiorMiddleware,
];

const updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatiorMiddleware,
];

const deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id format'),
  validatiorMiddleware,
];

export {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};
