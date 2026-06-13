const db = require('../config/db');

const getLeads = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let query = 'SELECT * FROM leads';
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

const createLead = async (req, res, next) => {
  try {
    const { user_id, first_name, last_name, company, role, email, website, intro_snippet } = req.body;
    
    const result = await db.query(
      'INSERT INTO leads (user_id, first_name, last_name, company, role, email, website, intro_snippet) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, first_name, last_name, company, role, email, website, intro_snippet]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, company, role, email, website, intro_snippet, status } = req.body;
    
    const result = await db.query(
      'UPDATE leads SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), company = COALESCE($3, company), role = COALESCE($4, role), email = COALESCE($5, email), website = COALESCE($6, website), intro_snippet = COALESCE($7, intro_snippet), status = COALESCE($8, status) WHERE id = $9 RETURNING *',
      [first_name, last_name, company, role, email, website, intro_snippet, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM leads WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead
};
