const authorService = require("../services/authorService");

async function getAuthors(req, res) {
  const { author_name } = req.query;

  //If given author name, fetch author by name
  if (author_name) {
    await authorService
      .getAuthorByName(author_name)
      .then((authors) => {
        if (authors.length === 0) {
          return res
            .status(404)
            .json({ error: "Author by this name does not exist" });
        }
        res.json(authors);
      })
      .catch((err) => {
        console.error("Error in API:", err);
        res.status(500).json({ error: "Error fetching author by name" });
      });
  } else { //If no author name, fetch top 10 authors by revenue
    await authorService
      .getTopAuthors()
      .then((authors) => {
        if (!authors) {
          return res.status(500).json({ error: "Error Fetching top authors" });
        }
        res.json(authors);
      })
      .catch((err) => {
        console.error("Error in API:", err);
        res.status(500).json({ error: "Error while fetching top 10 authors" });
      });
  }
}

module.exports = { getAuthors };
