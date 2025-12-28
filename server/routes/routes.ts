import express from 'express';
// FIX: Change 'require' to 'import' statements
import { fetchFeatures, loginUser, registerUser } from '../controller/SessionController.js'; 
import { getStudent } from '../controller/UserController.js'
import { getCourse, getCourses, getStudentEnrolments, createEnrolment, deleteEnrolment } from '../controller/RegistrationController.js';
import { authenticateToken, mysqlTimeHandler } from '../middleware/middleware.js';
import { getOffers } from '../controller/TimetableController.js';

const router = express.Router();

router.get('/features', fetchFeatures);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/students/:id', authenticateToken, getStudent);

router.get('/courses', getCourses);
router.get('/courses/:code', getCourse);

router.post('/enrolment', authenticateToken, createEnrolment);
router.delete('/enrolment/:id/:code', authenticateToken, deleteEnrolment);
router.get('/students/:id/enrolment', authenticateToken, getStudentEnrolments);

router.get('/offers', mysqlTimeHandler, getOffers);

export default router;