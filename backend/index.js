const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('SafeHer India Backend API (from root index.js) is working!');
});

app.get('/verify', (req, res) => {
  res.json({ success: true, message: 'Antigravity verified from index.js' });
});

// Forward to src/server.js if needed
try {
  require('./src/server.js');
} catch (e) {
  console.log('src/server.js failed to load, running root index.js instead');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Fallback server running on port ${PORT}`);
});
