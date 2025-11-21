const express = require('express');
const { fetchFeatures } = require('../controller/SessionController');

const router = express.Router();

router.get('/features', fetchFeatures());

export default router;