const express = require('express');
const cors = require('cors');

const setupRouter = require('./src/routes/setupRoute');
const authorRoutes = require('./src/routes/authorRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// routes
app.use('/setup', setupRouter);
app.use('/authors', authorRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
