CREATE TABLE IF NOT EXISTS elections (
  id INTEGER PRIMARY KEY,
  year INTEGER NOT NULL,
  name TEXT NOT NULL,
  summary TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS parties (
  id INTEGER PRIMARY KEY,
  election_id INTEGER,
  name TEXT NOT NULL,
  vote_share REAL,
  seats INTEGER DEFAULT 0,
  in_government INTEGER DEFAULT 0 CHECK (in_government IN (0, 1)),
  main_topics TEXT DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidates (
  id INTEGER PRIMARY KEY,
  party_id INTEGER,
  name TEXT NOT NULL,
  elected INTEGER DEFAULT 0 CHECK (elected IN (0, 1)),
  bio TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS promises (
  id INTEGER PRIMARY KEY,
  candidate_id INTEGER,
  party_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  completion_score INTEGER CHECK (completion_score BETWEEN 0 AND 100),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
  FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS source_links (
  id INTEGER PRIMARY KEY,
  promise_id INTEGER,
  url TEXT NOT NULL,
  source_name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (promise_id) REFERENCES promises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS economic_indicators (
  id INTEGER PRIMARY KEY,
  election_id INTEGER,
  name TEXT NOT NULL,
  value REAL,
  unit TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promise_suggestions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  candidate_name TEXT,
  party_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TEXT DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT,
  review_notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_parties_election_id ON parties(election_id);
CREATE INDEX IF NOT EXISTS idx_candidates_party_id ON candidates(party_id);
CREATE INDEX IF NOT EXISTS idx_promises_candidate_id ON promises(candidate_id);
CREATE INDEX IF NOT EXISTS idx_promises_party_id ON promises(party_id);
CREATE INDEX IF NOT EXISTS idx_source_links_promise_id ON source_links(promise_id);
CREATE INDEX IF NOT EXISTS idx_economic_indicators_election_id ON economic_indicators(election_id);
