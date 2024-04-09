## Krikey Code Challenge

### Part 1

* First 10 authors ordered by `date_of_birth`
```
SELECT *
FROM authors
ORDER BY date_of_birth
LIMIT 10;
```

* Sales total for author: Lorelai Gilmore

```
SELECT SUM(si.item_price * si.quantity) AS total_sales
FROM authors a
JOIN books b ON a.id = b.author_id
JOIN sale_items si ON b.id = si.book_id
WHERE a.name = 'Lorelai Gilmore';
```

* Top 10 performing authors, ranked by sales revenue
```
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
```

### Part 2A

* Implemented the API endpoint as mentioned. Code for it is present in the `backend` directory.
```
http:localhost:3000/authors/top-authors?author_name=[author_name]
```
* The endpoint optionally takes in a query param `author_name`
* If author name is specified, it returns the name and email of that author.
* If author name is not specifie, it return the list of top 10 authors ranked in descending order of revenue.
* If a non-existent author name is provided, it returns a `404` response and an error message corresponding to it.

### Part 2B
On the API side, to optimize performance I did following things:
* <strong>Query Optimization:</strong> 
    1. Optimized the query as much as possible by avoiding unnecessary joins and keeping indexing in mind.
    2. We first join the `books` and `sale_items` tables and group by `author_id`, and order as necessary.
    3. This gives us the top 10 author ids. Now we just have to join these 10 to `authors` which is very optimized.
    4. Thus performing minimal joins and indexing in ids optimized this query.

* <strong>Caching:</strong> 
    1. Implemented Redis caching to serve data quicker to 1000 simultaneous users.
    2. Caching could be done on both server-side and client-side. I have implemented server-side caching.
    3. NOTE: It is assumed here that cache will be invalidated whenever the sales data is changed.

There are other things on the deployment side that can further optimize this for large traffics. For instance, we could implement load balancing algorithms to distribute load, horizontal scaling, etc.

### Part 3
* Implemented the React webpage


#### Steps to test locally
1. Clone the repo, navigate to the backend directory and install dependencies
```
cd krikey/backend
npm install
```
2. Install redis (if not already installed) and start redis server using this command:
```
redis-server
```

3. Make sure you have PostgreSQL installed and configured. Enter you details in the `src/db/db.js` file. This is the default:
```
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_password',
    port: 5432,
});
```
4. In the backend directory run:
```
node index.js
```
This should start the server with message `Server running on port 3000`

5. To setup the databse, I have made an endpoint. Make request to:

```
http://localhost:3000/setup
```
If everything is successful so far, you should recieve a message `Setup completed successfully.`

6. Now to test the API simple make requests to `http://localhost:3000/authors/top-authors?author_name=[author_name]`

7. For the frontend, navigate to frontend directory and install dependencies
```
cd ../frontend
npm install
```

8. Start the frontend on another port
```
npm start
```
This will by default take you to the top authors page. You can modify the URL and test as you want.

### Demo:

[video](krikey-demo.mov)

#### Deployment steps
I saw the team uses AWS and wanted to deploy on AWS. But this is my first time working with AWS and I was not able to complete deployment in the given time. Here are the steps I took:
    1. Create EC2 instance for Node.js server
    2. Create ElastiCache for Redis
    3. Create RDS instance for deploying PostgreSQL

For Configuring EC2, after launching it used:
```
ssh -i /path/to/your-key.pem ec2-user@your-public-ip

```

After this, installed dependencies and started the server but unable to access it using public IP. So working on that right now.
