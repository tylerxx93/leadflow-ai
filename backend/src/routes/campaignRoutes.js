const express = require('express');
const campaignController = require('../controllers/campaignController');

const router = express.Router();

router.get('/', campaignController.getCampaigns);
router.post('/', campaignController.createCampaign);
router.put('/:id', campaignController.updateCampaign);
router.get('/:id/stats', campaignController.getCampaignStats);
router.post('/:id/run', campaignController.triggerCampaignRun);

module.exports = router;
