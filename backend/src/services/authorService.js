const { pool } = require("../db/db");
// const {
//   redisClient,
//   redisGetAsync,
//   redisSetexAsync
// } = require("../db/redisClient");
// const redis = require('redis');


async function getTopAuthors(author_name) {
  const client = await pool.connect();
  if (author_name) {
    //return the name and sales revenue of the given author
    try {
      const query = `
        SELECT a.name AS author_name, a.email AS author_email, SUM(si.item_price * si.quantity) AS total_sales_revenue
        FROM authors a
        JOIN books b ON a.id = b.author_id
        JOIN sale_items si ON b.id = si.book_id
        WHERE a.name = $1
        GROUP BY a.id, a.name, a.email;
      `;
      const { rows } = await client.query(query, [author_name]);
      return rows;
    } catch (err) {
      console.error("Error fetching top authors:", err);
      throw err;
    }
  } else {
    try {
      const query = `
          SELECT a.name AS author_name, a.email as author_email, SUM(si.item_price * si.quantity) AS total_sales_revenue
          FROM authors a
          JOIN books b ON a.id = b.author_id
          JOIN sale_items si ON b.id = si.book_id
          GROUP BY a.name, a.email
          ORDER BY total_sales_revenue DESC
          LIMIT 10;
        `;
      const { rows } = await client.query(query);
      return rows;
    } catch (err) {
      console.error("Error fetching top authors:", err);
      throw err;
    }
  }
  client.release();

}

// async function getTopAuthors() {
//   try {
//     // Check if data is cached in Redis
//     await redisClient.connect();
//     const cachedData = await redisGetAsync("topAuthors");
//     if (cachedData) {
//       console.log("Data fetched from Redis cache");
//       return JSON.parse(cachedData);
//     }

//     console.log("Fetching data from database");
//     const client = await pool.connect();
//     try {
//       const result = await client.query(`
//         SELECT a.name AS author_name, SUM(si.item_price * si.quantity) AS total_sales_revenue
//         FROM authors a
//         JOIN books b ON a.id = b.author_id
//         JOIN sale_items si ON b.id = si.book_id
//         GROUP BY a.name
//         ORDER BY total_sales_revenue DESC
//         LIMIT 10;
//       `);
//       const topAuthors = result.rows;

//       // Cache the data in Redis
//       await redisSetexAsync("topAuthors", 3600, JSON.stringify(topAuthors)); // Cache for 1 hour

//       return topAuthors;
//     } catch (err) {
//       throw err;
//     } finally {
//       client.release();
//     }
//   } catch (err) {
//     console.error("Error fetching top authors:", err);
//     throw err;
//   }
// }

module.exports = { getTopAuthors };




