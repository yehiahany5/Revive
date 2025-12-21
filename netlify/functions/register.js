const express = require('express');
const { neon } = require('@neondatabase/serverless'); // Updated library name
const cors = require('cors');
const app = express();

// 1. SETUP: Middleware
app.use(cors()); // Critical: Allows your GitHub Pages site to talk to this server
app.use(express.json()); // Allows the server to read the JSON data from your form

// 2. CONNECTION: Initialize Neon
// We use DATABASE_URL which you will set in Render's Environment Variables
const sql = neon(process.env.DATABASE_URL);

// 3. LOGIC: The Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    // Extract data from the request body (sent by your HTML form)
    const { username, email, age, mobile, location, reason } = req.body;

    // Safety Check: Ensure required fields exist
    if (!username || !email) {
      return res.status(400).json({ status: "ERROR", message: "Missing required fields" });
    }

    // SQL Injection safe insertion
    await sql`
      INSERT INTO users (username, email, age, mobile, location, reason)
      VALUES (${username}, ${email}, ${age}, ${mobile}, ${location}, ${reason})
    `;

    // Send Success Response back to your Glitch Popup
    res.json({ 
      status: "SUCCESS", 
      message: "Operator Registered" 
    });

  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ 
      status: "ERROR", 
      message: "System Glitch: Database Rejected Entry" 
    });
  }
});

// 4. POWER UP: Listen on the port Render provides
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server activated on port ${PORT}`);
});