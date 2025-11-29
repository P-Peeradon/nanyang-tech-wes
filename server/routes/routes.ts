import express from 'express';
// FIX: Change 'require' to 'import' statements
import { fetchFeatures, loginUser, registerUser } from '../controller/SessionController.js'; 
import { getUser } from '../controller/UserController.js'
import { getCourses } from '../controller/RegistrationController.js';
import { authenticateToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/features', fetchFeatures);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/user/:userId', authenticateToken, getUser);

router.get('/course', getCourses);

export default router;