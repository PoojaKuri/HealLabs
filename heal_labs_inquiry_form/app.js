const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

// MySQL connection setup
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Prasadmysql@#4321",
  database: "heal_labs_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define the /submitt POST route
app.post("/submitt", (req, res) => {
  console.log(req.body); // Log the received form data to inspect it
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    console.error("Received null values for one or more fields.");
    return res.status(400).send("All fields are required.");
  }

  // Proceed to save data if all fields are present
  const sql =
    "INSERT INTO inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)";
  const values = [name, email, phone, message];

  connection.query(sql, values, (err, result) => {
    // Use connection.query instead of db.query
    if (err) {
      console.error("Error saving inquiry:", err);
      res.status(500).send("Error saving inquiry");
    } else {
      res.send("Inquiry saved successfully");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
