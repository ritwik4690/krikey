const authorService = require("../services/authorService");

async function getTopAuthors(req, res) {
    try {
      const { author_name } = req.query;
  
      const authors = await authorService.getTopAuthors(author_name);
      if (authors.length === 0) {
        return res.status(404).json({ error: 'This author name does not exist' });
      }
  
      res.json(authors);
    } catch (err) {
      console.error('Error in API:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = { getTopAuthors };
  