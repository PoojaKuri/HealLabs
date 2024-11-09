// routes/newsletter.js
const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/signup', (req, res) => {
  const { email } = req.body;

  const sql = 'INSERT INTO newsletter_subscribers (email) VALUES (?)';
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error inserting into newsletter_subscribers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Successfully signed up for the newsletter!' });
  });
});

module.exports = router;
