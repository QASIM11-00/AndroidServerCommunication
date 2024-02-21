const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

// Database (replace with your database logic)
let urls = {};

// API Endpoint for URL submission
app.post('/submit', (req, res) => {
    const { originalURL, title, description, imageURL } = req.body;
    const shortURL = generateShortURL();
    urls[shortURL] = { originalURL, title, description, imageURL };
    res.json({ shortURL });
});

// Generate short URL
function generateShortURL() {
    return shortid.generate();
}

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
