import express from 'express';
import {
  signupValidator,
  loginValidator,
} from '../utils/validators/authValidator.js';

import {
  signUp,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} from '../services/authService.js';

const router = express.Router();

router.post('/signup', signupValidator, signUp);
router.post('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

export { router as AuthRoute };
