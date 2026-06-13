const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

router.get('/', leadController.getLeads);
router.post('/', leadController.createLead);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
