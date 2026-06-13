const db = require('../config/db');

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, subscription_status } = req.body;
    
    const result = await db.query(
      'UPDATE users SET email = COALESCE($1, email), subscription_status = COALESCE($2, subscription_status) WHERE id = $3 RETURNING *',
      [email, subscription_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
