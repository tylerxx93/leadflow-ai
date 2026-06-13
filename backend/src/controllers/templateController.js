const db = require('../config/db');

const getTemplates = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let query = 'SELECT * FROM templates';
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

const createTemplate = async (req, res, next) => {
  try {
    const { user_id, name, subject, body_template } = req.body;
    
    const result = await db.query(
      'INSERT INTO templates (user_id, name, subject, body_template) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, subject, body_template]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, subject, body_template } = req.body;
    
    const result = await db.query(
      'UPDATE templates SET name = COALESCE($1, name), subject = COALESCE($2, subject), body_template = COALESCE($3, body_template) WHERE id = $4 RETURNING *',
      [name, subject, body_template, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM templates WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate
};
