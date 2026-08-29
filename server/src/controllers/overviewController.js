const { getOverview } = require('../services/databaseService');

async function getOverviewData(req, res) {
  try {
    const overview = await getOverview();
    res.json({
      app: 'Vaalilupaukset',
      description: 'Finnish election promises tracker',
      dbStatus: overview ? 'connected' : 'not_connected',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to load overview.',
      details: error.message,
    });
  }
}

module.exports = {
  getOverviewData,
};
