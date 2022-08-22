import { body, check } from 'express-validator';
import { validatiorMiddleware } from '../../middlewares/validatorMiddleware.js';
import slugify from 'slugify';

const getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatiorMiddleware,
];

const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatiorMiddleware,
];

const updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatiorMiddleware,
];

const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatiorMiddleware,
];

export {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
