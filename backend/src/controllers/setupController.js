const setupService = require('../services/setupService');

// Handle the /setup endpoint
async function setupDatabase(req, res) {
  try {
    await setupService.setupDatabase();
    res.status(200).send('Database setup completed successfully.');
  } catch (err) {
    console.error('Error during setup:', err);
    res.status(500).send('Error during setup.');
  }
}

module.exports = {
  setupDatabase,
};
