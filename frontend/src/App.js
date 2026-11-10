import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, fetchCounter, updateCounter } from './store';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { value, loading, error, lastUpdated } = useSelector(
    (state) => state.counter
  );

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const statusLabel = loading
    ? 'Syncing...'
    : error
      ? 'Disconnected'
      : 'Connected';

  const statusClass = loading
    ? 'status-badge status-syncing'
    : error
      ? 'status-badge status-error'
      : 'status-badge status-ok';

  return (
    <div className="app-shell">
      <main className="dashboard-card">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">GCP Cloud-Native Stack</p>
            <h1>Counter Dashboard</h1>
          </div>
          <span className={statusClass} data-testid="connection-status">
            {statusLabel}
          </span>
        </header>

        <section className="counter-panel" aria-live="polite">
          <span className="counter-label">Current Value</span>
          <div className="counter-value" data-testid="counter-value">
            {value}
          </div>
          {lastUpdated && (
            <p className="timestamp">
              Last synced: {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </section>

        {error && (
          <div className="error-banner" role="alert">
            <span>Unable to reach backend: {error}</span>
            <button
              type="button"
              className="btn-link"
              onClick={() => dispatch(fetchCounter())}
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        <section className="controls-grid" aria-label="Counter controls">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(updateCounter('decrement'))}
            disabled={loading}
            aria-label="Decrement"
          >
            - Decrement
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => dispatch(updateCounter('reset'))}
            disabled={loading}
            aria-label="Reset"
          >
            Reset
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(updateCounter('increment'))}
            disabled={loading}
            aria-label="Increment"
          >
            + Increment
          </button>
        </section>

        <footer className="dashboard-footer">
          <span>
            API: <code>{API_URL}</code>
          </span>
          <button
            type="button"
            className="btn-link"
            onClick={() => dispatch(fetchCounter())}
            disabled={loading}
          >
            Refresh
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;

