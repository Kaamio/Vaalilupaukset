const express = require('express');
const { all, get } = require('../config/db');

const router = express.Router();

function parseJsonArray(value) {
  try {
    return JSON.parse(value || '[]');
  } catch (error) {
    return [];
  }
}

function toBool(value) {
  return Boolean(value);
}

async function buildElectionPayload() {
  const elections = await all('SELECT * FROM elections ORDER BY year DESC');

  const results = await Promise.all(
    elections.map(async (election) => {
      const parties = await all(
        'SELECT * FROM parties WHERE election_id = ? ORDER BY vote_share DESC, id ASC',
        [election.id],
      );

      const economicIndicators = await all(
        'SELECT * FROM economic_indicators WHERE election_id = ? ORDER BY id ASC',
        [election.id],
      );

      const partyPayload = await Promise.all(
        parties.map(async (party) => {
          const promises = await all(
            'SELECT * FROM promises WHERE party_id = ? ORDER BY completion_score DESC, id ASC',
            [party.id],
          );

          const promisePayload = await Promise.all(
            promises.map(async (promise) => {
              const sourceRows = await all('SELECT * FROM source_links WHERE promise_id = ?', [promise.id]);

              return {
                id: promise.id,
                title: promise.title,
                description: promise.description,
                completionScore: promise.completion_score,
                status: promise.status,
                sources: sourceRows.map((source) => ({
                  name: source.source_name,
                  url: source.url,
                })),
              };
            }),
          );

          return {
            id: party.id,
            name: party.name,
            voteShare: Number(party.vote_share || 0),
            seats: party.seats || 0,
            inGovernment: toBool(party.in_government),
            mainTopics: parseJsonArray(party.main_topics),
            promises: promisePayload,
          };
        }),
      );

      return {
        id: election.id,
        year: election.year,
        name: election.name,
        summary: election.summary,
        economicIndicators: economicIndicators.map((item) => ({
          label: item.name,
          value: `${item.value}${item.unit || ''}`,
        })),
        parties: partyPayload,
      };
    }),
  );

  return results;
}

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vaalilupaukset API is running',
    timestamp: new Date().toISOString(),
  });
});

router.get('/elections', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load elections', error: error.message });
  }
});

router.get('/elections/:id', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    const election = elections.find((item) => item.id === Number(req.params.id));

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    return res.json(election);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load election', error: error.message });
  }
});

router.get('/parties', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    const parties = elections.flatMap((election) => election.parties);
    res.json(parties);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load parties', error: error.message });
  }
});

router.get('/parties/:id', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    const party = elections.flatMap((election) => election.parties).find((item) => item.id === Number(req.params.id));

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    return res.json(party);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load party', error: error.message });
  }
});

router.get('/parties/:id/promises', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    const party = elections.flatMap((election) => election.parties).find((item) => item.id === Number(req.params.id));

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    return res.json(party.promises || []);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load party promises', error: error.message });
  }
});

router.get('/economic-indicators', async (req, res) => {
  try {
    const elections = await buildElectionPayload();
    const indicators = elections.flatMap((election) => election.economicIndicators || []);
    res.json(indicators);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load economic indicators', error: error.message });
  }
});

router.get('/candidates', async (req, res) => {
  try {
    const candidates = await all('SELECT c.id, c.name, c.elected, p.name AS party_name FROM candidates c JOIN parties p ON p.id = c.party_id ORDER BY c.id ASC');
    res.json(
      candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        party: candidate.party_name,
        elected: toBool(candidate.elected),
        promises: [],
      })),
    );
  } catch (error) {
    res.status(500).json({ message: 'Unable to load candidates', error: error.message });
  }
});

router.get('/candidates/:id', async (req, res) => {
  try {
    const candidate = await get(
      'SELECT c.id, c.name, c.elected, p.name AS party_name FROM candidates c JOIN parties p ON p.id = c.party_id WHERE c.id = ?',
      [Number(req.params.id)],
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const promises = await all(
      'SELECT * FROM promises WHERE candidate_id = ? ORDER BY completion_score DESC',
      [candidate.id],
    );

    const promisePayload = await Promise.all(
      promises.map(async (promise) => {
        const sourceRows = await all('SELECT * FROM source_links WHERE promise_id = ?', [promise.id]);

        return {
          id: promise.id,
          title: promise.title,
          description: promise.description,
          completionScore: promise.completion_score,
          status: promise.status,
          sources: sourceRows.map((source) => ({
            name: source.source_name,
            url: source.url,
          })),
        };
      }),
    );

    return res.json({
      id: candidate.id,
      name: candidate.name,
      party: candidate.party_name,
      elected: toBool(candidate.elected),
      promises: promisePayload,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load candidate', error: error.message });
  }
});

router.get('/promises', async (req, res) => {
  try {
    const promises = await all(
      'SELECT p.id, p.title, p.description, p.completion_score, p.status, c.name AS candidate_name, party.name AS party_name FROM promises p JOIN candidates c ON c.id = p.candidate_id JOIN parties party ON party.id = p.party_id ORDER BY p.completion_score DESC',
    );

    res.json(
      promises.map((promise) => ({
        id: promise.id,
        title: promise.title,
        description: promise.description,
        completionScore: promise.completion_score,
        status: promise.status,
        candidateName: promise.candidate_name,
        party: promise.party_name,
        sources: [],
      })),
    );
  } catch (error) {
    res.status(500).json({ message: 'Unable to load promises', error: error.message });
  }
});

router.get('/promises/:id', async (req, res) => {
  try {
    const promise = await get(
      'SELECT p.id, p.title, p.description, p.completion_score, p.status, c.name AS candidate_name, party.name AS party_name FROM promises p JOIN candidates c ON c.id = p.candidate_id JOIN parties party ON party.id = p.party_id WHERE p.id = ?',
      [Number(req.params.id)],
    );

    if (!promise) {
      return res.status(404).json({ message: 'Promise not found' });
    }

    const sources = await all('SELECT * FROM source_links WHERE promise_id = ?', [promise.id]);

    return res.json({
      id: promise.id,
      title: promise.title,
      description: promise.description,
      completionScore: promise.completion_score,
      status: promise.status,
      candidateName: promise.candidate_name,
      party: promise.party_name,
      sources: sources.map((source) => ({
        name: source.source_name,
        url: source.url,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load promise', error: error.message });
  }
});

router.get('/suggestions', (req, res) => {
  res.json([]);
});

router.post('/suggestions', (req, res) => {
  const { candidateName, partyName, title, description } = req.body;

  if (!candidateName || !partyName || !title || !description) {
    return res.status(400).json({ message: 'Missing required suggestion fields' });
  }

  const newSuggestion = {
    id: Date.now(),
    candidateName,
    partyName,
    title,
    description,
    status: 'pending',
    submittedBy: 'anonymous',
  };

  return res.status(201).json(newSuggestion);
});

module.exports = router;
