const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

router.get('/overview', (req, res) => {
  res.json({
    app: 'Vaalilupaukset',
    description: 'Finnish election promises tracker',
    focus: ['Parties', 'Candidates', 'Promises', 'Economic indicators'],
  });
});

module.exports = router;
