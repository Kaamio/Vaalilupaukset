import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [elections, setElections] = useState([])
  const [selectedElectionId, setSelectedElectionId] = useState(null)
  const [backendStatus, setBackendStatus] = useState(null)

  useEffect(() => {
    fetch('/api/elections')
      .then((response) => response.json())
      .then((data) => {
        setElections(data)
        if (data.length > 0) {
          setSelectedElectionId(data[0].id)
        }
        setBackendStatus({ app: 'Vaalilupaukset', description: 'Connected to API' })
      })
      .catch(() => {
        setBackendStatus({ app: 'Offline', description: 'Backend not running' })
      })
  }, [])

  const election = elections.find((e) => e.id === selectedElectionId) || elections[0]
  const parties = election?.parties || []
  const indicators = election?.economicIndicators || []

  return (
    <main className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Finnish election promises tracker</p>
          <h1>Vaalilupaukset</h1>
          <p className="subtitle">
            Tracking party platforms, candidate commitments, and whether promises move
            from campaign rhetoric to measurable policy action.
          </p>
        </div>

        <div className="status-card">
          <span className="status-label">Backend status</span>
          <strong>{backendStatus?.app || 'Loading...'}</strong>
          <p>{backendStatus?.description || 'Checking API connection...'}</p>
        </div>
      </header>

      {elections.length > 0 && (
        <div className="election-selector">
          <label htmlFor="election-select">Select election year:</label>
          <select
            id="election-select"
            value={selectedElectionId || ''}
            onChange={(e) => setSelectedElectionId(Number(e.target.value))}
            className="election-select"
          >
            {elections.map((e) => (
              <option key={e.id} value={e.id}>
                {e.year} — {e.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <section className="summary-grid">
        <div className="summary-card accent">
          <span>Election focus</span>
          <h2>{election ? election.name : 'Loading election...'}</h2>
          <p>{election ? election.summary : 'Fetching election data...'}</p>
        </div>
        <div className="summary-card">
          <span>Tracking layers</span>
          <h2>Parties + promises</h2>
          <p>Goal: measure policy delivery against campaign commitments.</p>
        </div>
        <div className="summary-card">
          <span>Data sources</span>
          <h2>FSD + YLE</h2>
          <p>Cross-checking official election and policy data.</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Party overview</h3>
            <span>{election ? `${election.year} election snapshot` : 'Loading...'}</span>
          </div>

          <div className="party-list">
            {parties.map((party) => (
              <div key={party.id} className="party-row">
                <div className="party-info">
                  <strong>{party.name}</strong>
                  <small>{party.seats || '—'} seats</small>
                </div>
                <div className="party-meta">
                  <span>{party.voteShare || '—'}% vote share</span>
                  <em className={party.inGovernment ? 'in-government' : 'opposition'}>
                    {party.inGovernment ? 'Government' : 'Opposition'}
                  </em>
                </div>
              </div>
            ))}
          </div>

          <div className="promise-section">
            {parties.map((party) => (
              <div key={`${party.id}-promises`} className="promise-group">
                <h4>{party.name}</h4>
                {party.promises && party.promises.length > 0 ? (
                  party.promises.map((promise) => (
                    <div key={promise.id} className="promise-card">
                      <div className="promise-header">
                        <strong>{promise.title}</strong>
                        <span className="completion-badge">{promise.completionScore || 0}%</span>
                      </div>
                      <p>{promise.description}</p>
                      <div className="promise-footer">
                        <em className={`status-${promise.status}`}>{promise.status}</em>
                        {promise.sources && promise.sources.length > 0 && (
                          <div className="sources">
                            {promise.sources.map((source, idx) => (
                              <a key={idx} href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                                {source.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-promises">No promises recorded yet</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Key indicators</h3>
            <span>Economy and society</span>
          </div>

          <div className="indicator-grid">
            {indicators.map((indicator) => (
              <div key={indicator.label} className="indicator-card">
                <span>{indicator.label}</span>
                <strong>{indicator.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
