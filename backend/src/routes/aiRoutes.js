const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/generate', aiController.generateOutreachContent);

module.exports = router;
