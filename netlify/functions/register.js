import { neon } from '@netlify/neon';

export const handler = async (event) => {
  // 1. Only allow POST requests (sending data)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // 2. Initialize connection to Neon
  // Make sure you have NETLIFY_DATABASE_URL set in your Netlify Environment Variables
  const sql = neon(process.env.NETLIFY_DATABASE_URL);

  try {
    // 3. Parse the data sent from your form
    const data = JSON.parse(event.body);
    const { username, email, age, mobile, location, reason } = data;

    // 4. Insert data into your PostgreSQL table
    // We use parameterized queries to stay safe from hackers
    await sql`
      INSERT INTO users (username, email, age, mobile, location, reason)
      VALUES (${username}, ${email}, ${age}, ${mobile}, ${location}, ${reason})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "SUCCESS", message: "Operator Registered" }),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "ERROR", message: "System Glitch: Database Rejected Entry" }),
    };
  }
};