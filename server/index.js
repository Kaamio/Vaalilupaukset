const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vaalilupaukset API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/overview', (req, res) => {
  res.json({
    app: 'Vaalilupaukset',
    description: 'Finnish election promises tracker',
    focus: ['Parliamentary elections', 'Parties', 'Candidates', 'Economic indicators'],
    dataSources: ['FSD', 'Yle'],
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
