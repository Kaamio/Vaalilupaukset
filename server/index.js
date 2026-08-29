const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./src/routes/api');
const { initializeDatabase } = require('./src/config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use('/api', apiRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
