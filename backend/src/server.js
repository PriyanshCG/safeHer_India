require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const guardianRoutes = require('./routes/guardianRoutes');
const sosRoutes = require('./routes/sosRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

// Middleware
app.use(express.json());
// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://safeher-india.netlify.app', // Adding explicit fallback for production
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Root Route
app.get('/', (req, res) => {
  res.send('SafeHer India Backend API is working!');
});

// Verification Route
app.get('/verify', (req, res) => {
  res.json({ success: true, message: 'Antigravity verified' });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/guardians', guardianRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/activities', activityRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Error handling payload
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    // Don't exit process, let the server run so we can see errors in logs
  });