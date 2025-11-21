const express = require('express');
const { fetchFeatures, loginUser, registerUser } = require('../controller/SessionController');
const { authenticateToken } = require("../middleware/middleware");

const router = express.Router();

router.get('/features', fetchFeatures);
router.post('/register', registerUser)
router.post('/login', loginUser);

export default router;