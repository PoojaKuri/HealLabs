// routes/contact.js
const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql = `
    INSERT INTO contact_inquiries (name, email, phone, message)
    VALUES (?, ?, ?, ?)
  `;
  connection.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting into contact_inquiries:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Contact form submitted successfully!' });
  });
});

module.exports = router;
