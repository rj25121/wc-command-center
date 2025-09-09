// A simple Express server to handle the API key securely.
const express = require('express');
const path = require('path');
const app = express();

// The port Render will use.
const PORT = process.env.PORT || 3000;

// Serve the static files (like your index.html) from the 'public' folder.
app.use(express.static(path.join(__dirname, 'public')));

// Create a secure endpoint for the app to fetch the API key.
app.get('/api/get-key', (req, res) => {
  // Read the key from the environment variable set in Render.
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    res.json({ apiKey: apiKey });
  } else {
    // This error will be shown if the environment variable is not set in Render.
    res.status(500).json({ error: 'API key is not configured on the server.' });
  }
});

// Add a catch-all route to serve the index.html file for any non-API request.
// This is crucial for single-page applications.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

