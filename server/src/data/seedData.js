module.exports = {
  elections: [
    {
      id: 1,
      year: 2023,
      name: 'Eduskuntavaalit 2023',
      summary: 'Parliamentary election overview',
    },
  ],
  parties: [
    { id: 1, election_id: 1, name: 'Kokoomus', vote_share: 20.8, in_government: true },
    { id: 2, election_id: 1, name: 'SDP', vote_share: 19.9, in_government: true },
    { id: 3, election_id: 1, name: 'Perussuomalaiset', vote_share: 20.1, in_government: false },
    { id: 4, election_id: 1, name: 'Vihreät', vote_share: 7.3, in_government: true },
    { id: 5, election_id: 1, name: 'RKP', vote_share: 4.3, in_government: true },
  ],
  candidates: [
    { id: 1, party_id: 1, name: 'Candidate One', elected: true },
    { id: 2, party_id: 2, name: 'Candidate Two', elected: true },
    { id: 3, party_id: 3, name: 'Candidate Three', elected: true },
  ],
  promises: [
    {
      id: 1,
      candidate_id: 1,
      party_id: 1,
      title: 'Economic growth program',
      description: 'Support business investment and reduce bureaucracy.',
      completion_score: 65,
      status: 'in_progress',
    },
    {
      id: 2,
      candidate_id: 2,
      title: 'Social welfare expansion',
      description: 'Increase support for families and public services.',
      completion_score: 72,
      status: 'in_progress',
      party_id: 2,
    },
  ],
  source_links: [
    { id: 1, promise_id: 1, url: 'https://yle.fi', source_name: 'YLE' },
    { id: 2, promise_id: 2, url: 'https://www.fsd.tuni.fi/pohtiva/', source_name: 'FSD' },
  ],
  economic_indicators: [
    { id: 1, election_id: 1, name: 'Employment rate', value: 73.4, unit: '%' },
    { id: 2, election_id: 1, name: 'GDP growth', value: 1.9, unit: '%' },
    { id: 3, election_id: 1, name: 'Inflation', value: 1.7, unit: '%' },
  ],
};
