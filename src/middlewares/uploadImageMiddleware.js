import multer from 'multer';
import { ApiError } from '../utils/apiError.js';

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (_req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

const uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

const uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

export { multerOptions, uploadSingleImage, uploadMixOfImages };
