import { useEffect, useState } from 'react'
import './App.css'

const partyData = [
  { name: 'Kokoomus', seats: 48, share: 20.8, government: true },
  { name: 'SDP', seats: 42, share: 19.9, government: true },
  { name: 'Perussuomalaiset', seats: 46, share: 20.1, government: false },
  { name: 'Vihreät', seats: 13, share: 7.3, government: true },
  { name: 'RKP', seats: 9, share: 4.3, government: true },
]

const indicators = [
  { label: 'Employment rate', value: '73.4%' },
  { label: 'GDP growth', value: '1.9%' },
  { label: 'Consumer confidence', value: '99.7' },
  { label: 'Inflation', value: '1.7%' },
]

function App() {
  const [backendStatus, setBackendStatus] = useState(null)

  useEffect(() => {
    fetch('/api/overview')
      .then((response) => response.json())
      .then((data) => setBackendStatus(data))
      .catch(() => setBackendStatus({ app: 'Offline', description: 'Backend not running' }))
  }, [])

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

      <section className="summary-grid">
        <div className="summary-card accent">
          <span>Election focus</span>
          <h2>Parliamentary elections</h2>
          <p>Party and candidate tracking for each election cycle.</p>
        </div>
        <div className="summary-card">
          <span>Tracking layers</span>
          <h2>Parties + Candidates</h2>
          <p>Goal: measure promises against actual political action.</p>
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
            <span>2023 general election snapshot</span>
          </div>

          <div className="party-list">
            {partyData.map((party) => (
              <div key={party.name} className="party-row">
                <div>
                  <strong>{party.name}</strong>
                  <small>{party.seats} seats</small>
                </div>
                <div className="party-meta">
                  <span>{party.share}% vote share</span>
                  <em className={party.government ? 'in-government' : 'opposition'}>
                    {party.government ? 'Government' : 'Opposition'}
                  </em>
                </div>
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
