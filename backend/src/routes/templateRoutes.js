const express = require('express');
const templateController = require('../controllers/templateController');

const router = express.Router();

router.get('/', templateController.getTemplates);
router.post('/', templateController.createTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
