import express from 'express';
import { register, login, getMe, updateProfile, changePassword, deleteAccount } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { registerValidation, loginValidation } from '../middleware/validation.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginRateLimiter, loginValidation, login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/change-password', protect, changePassword);
router.delete('/delete-account', protect, deleteAccount);

export default router;