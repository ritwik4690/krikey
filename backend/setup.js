const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'krikeydb',
  password: '1234',
  port: 5432, // PostgreSQL default port
});

async function setupDatabase() {
  try {
    // Connect to the database
    const client = await pool.connect();

    try {
      // Drop existing tables if they exist
			await client.query('DROP TABLE IF EXISTS sale_items;');
			await client.query('DROP TABLE IF EXISTS books;');
      await client.query('DROP TABLE IF EXISTS authors;');

      // Create the tables
      await client.query(`
        CREATE TABLE IF NOT EXISTS authors (
					id serial PRIMARY KEY,
					name text,
					email text,
					date_of_birth timestamp
        );
      `);
      await client.query(`
        CREATE TABLE IF NOT EXISTS books (
					id serial PRIMARY KEY,
					author_id integer REFERENCES authors(id),
					isbn text
        );
      `);
			await client.query(`
				CREATE TABLE IF NOT EXISTS sale_items (
					id serial PRIMARY KEY,
					book_id integer REFERENCES books(id),
					customer_name text,
					item_price money,
					quantity integer
				);
			`);


      // Insert test data into the tables
      await client.query(`
        INSERT INTO authors (id, name, email, date_of_birth)
        VALUES 
          (1001, 'Alex', 'alex.a@ncsu.edu', '2000-01-01'),
          (1002, 'John', 'john.j@ncsu.edu', '2000-01-02'),
          (1003, 'Lorelai Gilmore', 'lorelai.gilmore@ncsu.edu', '2000-01-03'),
          (1004, 'Rob', 'rob.user2@ncsu.edu', '2000-01-04'),
          (1005, 'Ritwik', 'ritwik.user3@ncsu.edu', '2000-01-05'),
          (1006, 'Rishi', 'rishi.user4@ncsu.edu', '2000-01-06'),
					(1007, 'Kunal', 'kunal.user5@ncsu.edu', '2000-01-07'),
					(1008, 'Neha', 'neha.user6@ncsu.edu', '2000-01-08'),
					(1009, 'Saloni', 'saloni.user7@ncsu.edu', '2000-01-09'),
					(1010, 'Soham', 'soham.user8@ncsu.edu', '2000-01-10'),
					(1011, 'Sameer', 'sameer.user9@ncsu.edu', '2000-01-11'),
					(1012, 'Vansh', 'vansh.user10@ncsu.edu', '2000-01-12'),
					(1013, 'Yashvi', 'yashvi.user11@ncsu.edu', '2000-01-13'),
					(1014, 'Kartik', 'kartil.user12@ncsu.edu', '2000-01-14'),
					(1015, 'Mithil', 'mithil.user13@ncsu.edu', '2000-01-15');
      `);

			await client.query(`
				INSERT INTO books (id, author_id, isbn)
				VALUES
					(2001, 1001, '1234567890'),
					(2002, 1002, '1234567891'),
					(2003, 1003, '1234567892'),
					(2004, 1004, '1234567893'),
					(2005, 1005, '1234567894'),
					(2006, 1006, '1234567895'),
					(2007, 1007, '1234567896'),
					(2008, 1008, '1234567897'),
					(2009, 1009, '1234567898'),
					(2010, 1010, '1234567899'),
					(2011, 1011, '1234567900'),
					(2012, 1012, '1234567901'),
					(2013, 1013, '1234567902'),
					(2014, 1014, '1234567903'),
					(2015, 1015, '1234567904');
			`);

			await client.query(`
				INSERT INTO sale_items (id, book_id, customer_name, item_price, quantity)
				VALUES
					(3001, 2001, 'Alex', 100.00, 1),
					(3002, 2002, 'John', 200.00, 2),
					(3003, 2003, 'James', 300.00, 3),
					(3004, 2004, 'Rob', 400.00, 4),
					(3005, 2005, 'Ritwik', 500.00, 5),
					(3006, 2006, 'Rishi', 600.00, 6),
					(3007, 2007, 'Kunal', 700.00, 7),
					(3008, 2008, 'Neha', 800.00, 8),
					(3009, 2009, 'Saloni', 900.00, 9),
					(3010, 2010, 'Soham', 1000.00, 10),
					(3011, 2011, 'Sameer', 1100.00, 11),
					(3012, 2012, 'Vansh', 1200.00, 12),
					(3013, 2013, 'Yashvi', 1300.00, 13),
					(3014, 2014, 'Kartik', 1400.00, 14),
					(3015, 2015, 'Mithil', 1500.00, 15);
			`);

      console.log('Setup completed successfully.');
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (err) {
    console.error('Error during setup:', err);
  } finally {
    // Close the pool to end the script
    pool.end();
  }
}

// Call the setup function to execute the setup process
setupDatabase();
