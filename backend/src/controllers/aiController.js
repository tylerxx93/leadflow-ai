const db = require('../config/db');
const aiService = require('../services/ai');

const generateOutreachContent = async (req, res, next) => {
  try {
    const { lead_id, template_id, tone } = req.body;

    // 1. Fetch Lead Details
    const leadResult = await db.query('SELECT * FROM leads WHERE id = $1', [lead_id]);
    if (leadResult.rows.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    const lead = leadResult.rows[0];

    // 2. Fetch Template Details
    const templateResult = await db.query('SELECT * FROM templates WHERE id = $1', [template_id]);
    if (templateResult.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }
    const template = templateResult.rows[0];

    // 3. Generate AI Content
    const aiContent = await aiService.generatePersonalizedContent(lead, template, tone);

    // 4. Update Lead with intro_snippet (optional, but good for persistence)
    await db.query(
      'UPDATE leads SET intro_snippet = $1 WHERE id = $2',
      [aiContent.intro_snippet, lead_id]
    );

    res.status(200).json({
      lead_id,
      template_id,
      ...aiContent
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateOutreachContent
};
