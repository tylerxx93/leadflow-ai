const db = require('../config/db');

const getCampaigns = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let query = 'SELECT * FROM campaigns';
    let params = [];

    if (user_id) {
      query += ' WHERE user_id = $1';
      params.push(user_id);
    }

    const result = await db.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createCampaign = async (req, res, next) => {
  try {
    const { user_id, name, template_id } = req.body;
    
    const result = await db.query(
      'INSERT INTO campaigns (user_id, name, template_id) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, template_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, template_id, status } = req.body;
    
    const result = await db.query(
      'UPDATE campaigns SET name = COALESCE($1, name), template_id = COALESCE($2, template_id), status = COALESCE($3, status) WHERE id = $4 RETURNING *',
      [name, template_id, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getCampaignStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT 
        COUNT(*) as total_runs,
        COUNT(CASE WHEN email_status = 'sent' THEN 1 END) as sent_count,
        COUNT(CASE WHEN open_tracked = TRUE THEN 1 END) as opened_count,
        COUNT(CASE WHEN reply_tracked = TRUE THEN 1 END) as replied_count
      FROM outreach_runs
      WHERE campaign_id = $1
    `, [id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const triggerCampaignRun = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lead_ids } = req.body;

    // Placeholder for campaign run logic
    // 1. Get campaign and template
    // 2. For each lead, generate personalized draft (AI part comes later)
    // 3. Send email
    // 4. Log in outreach_runs

    console.log(`Triggering campaign ${id} for leads: ${lead_ids}`);

    // Mock response for now
    for (const lead_id of lead_ids) {
      await db.query(
        'INSERT INTO outreach_runs (campaign_id, lead_id, email_status) VALUES ($1, $2, $3)',
        [id, lead_id, 'pending']
      );
    }

    res.status(200).json({ message: 'Campaign run triggered', leads_processed: lead_ids.length });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCampaigns,
  createCampaign,
  updateCampaign,
  getCampaignStats,
  triggerCampaignRun
};
