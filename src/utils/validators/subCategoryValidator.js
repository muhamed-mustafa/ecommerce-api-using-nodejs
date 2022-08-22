import { body, check } from 'express-validator';
import { validatiorMiddleware } from '../../middlewares/validatorMiddleware.js';
import slugify from 'slugify';

const getSubCategoryValidator = [
  check('id')
    .notEmpty()
    .withMessage('SubCategory id is required')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  validatiorMiddleware,
];

const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('category')
    .notEmpty()
    .withMessage('SubCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid category id format'),

  validatiorMiddleware,
];

const updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatiorMiddleware,
];

const deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validatiorMiddleware,
];

export {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};
