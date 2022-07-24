const express = require('express');

const PORT = process.env.PORT || 3004;

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello there! Welcome to the server!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
