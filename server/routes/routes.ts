import express from 'express';
// FIX: Change 'require' to 'import' statements
import { fetchFeatures, loginUser, registerUser } from '../controller/SessionController.ts'; 
// import { authenticateToken } from "../middleware/middleware.js";

const router = express.Router();

router.get('/features', fetchFeatures);
router.post('/register', registerUser)
router.post('/login', loginUser);

export default router;