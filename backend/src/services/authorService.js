const { pool } = require("../db/db");
const redis = require("ioredis");
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379, // Default Redis port
});

async function getAuthorByName(author_name) {
  const client = await pool.connect();
  try {
    const query = `
      SELECT a.name AS author_name, a.email AS author_email
      FROM authors a
      WHERE a.name = $1;
    `;
    const { rows } = await client.query(query, [author_name]);
    return rows;
  } catch (err) {
    console.error("Error fetching author by name:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function getTopAuthors() {
  const cacheKey = "topAuthors";
  const client = await pool.connect();
  return new Promise(async (resolve, reject) => {
    await redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) {
        console.error("Redis cache error:", err);
        reject(err);
      } else if (cachedData) {
        // Data found in cache, return cached data
        console.log("Data retrieved from Redis cache");
        resolve(JSON.parse(cachedData));
      } else {
        // Fetch top authors with revenue
        console.log("Fetch top authors with revenue");
        const query = `
          SELECT a.name AS author_name, a.email AS author_email 
          FROM authors a JOIN (
            SELECT b.author_id AS author_id, SUM(si.item_price * si.quantity) AS revenue 
            FROM books b JOIN sale_items si ON b.id = si.book_id 
            GROUP BY b.author_id 
            ORDER BY revenue DESC 
            LIMIT 10
          ) AS top_authors 
          ON a.id = top_authors.author_id 
          ORDER BY top_authors.revenue DESC;
        `;

        const rows = await client.query(query);
        client.release();
        console.log("Rows received");
        // Store data in Redis cache with expiration time (e.g., 1 hour)
        console.log(
          "Stored data in Redis cache with expiration time 30 seconds"
        );
        await redisClient.set(cacheKey, JSON.stringify(rows.rows), "EX", 30);
        resolve(rows.rows);
      }
    });
  });
}

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
  redisClient.quit();
});

module.exports = { getTopAuthors, getAuthorByName };
