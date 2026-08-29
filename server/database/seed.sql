INSERT INTO elections (id, year, name, summary)
VALUES (1, 2023, 'Eduskuntavaalit 2023', 'Parliamentary election overview')
ON CONFLICT(id) DO NOTHING;

INSERT INTO parties (id, election_id, name, vote_share, seats, in_government, main_topics)
VALUES
  (1, 1, 'Kokoomus', 20.8, 48, 1, '["talous","koulutus","investoinnit"]'),
  (2, 1, 'SDP', 19.9, 42, 1, '["sosiaali- ja terveyspolitiikka","työ","tasa-arvo"]'),
  (3, 1, 'Perussuomalaiset', 20.1, 46, 0, '["verot","maahanmuutto","turvallisuus"]'),
  (4, 1, 'Vihreät', 7.3, 20, 1, '["ilmasto","ympäristö","koulutus"]'),
  (5, 1, 'RKP', 4.3, 10, 1, '["kulttuuri","saamelaiset","aluepolitiikka"]')
ON CONFLICT(id) DO NOTHING;

INSERT INTO candidates (id, party_id, name, elected)
VALUES
  (1, 1, 'Candidate One', 1),
  (2, 2, 'Candidate Two', 1),
  (3, 3, 'Candidate Three', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO promises (id, candidate_id, party_id, title, description, completion_score, status)
VALUES
  (1, 1, 1, 'Economic growth program', 'Support business investment and reduce bureaucracy.', 65, 'in_progress'),
  (2, 2, 2, 'Social welfare expansion', 'Increase support for families and public services.', 72, 'in_progress'),
  (3, 3, 3, 'Tax and migration policy reform', 'Rework migration flows and simplify tax burden for families.', 41, 'pending')
ON CONFLICT(id) DO NOTHING;

INSERT INTO source_links (id, promise_id, url, source_name)
VALUES
  (1, 1, 'https://yle.fi', 'YLE'),
  (2, 2, 'https://www.fsd.tuni.fi/pohtiva/', 'FSD'),
  (3, 3, 'https://yle.fi', 'Yle')
ON CONFLICT(id) DO NOTHING;

INSERT INTO economic_indicators (id, election_id, name, value, unit)
VALUES
  (1, 1, 'Employment rate', 73.4, '%'),
  (2, 1, 'GDP growth', 1.9, '%'),
  (3, 1, 'Consumer confidence', 99.7, ''),
  (4, 1, 'Inflation', 1.7, '%')
ON CONFLICT(id) DO NOTHING;
