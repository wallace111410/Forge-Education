import React, { useState, useEffect } from 'react';
import './ParentAdmin.css';

const DOMAIN_COLORS = {
  identity: '#7c3aed',
  communication: '#2563eb',
  building: '#d97706',
  humanFluency: '#db2777',
  aiSystems: '#0891b2',
  physical: '#16a34a'
};

const DOMAIN_LABELS = {
  identity: 'Identity & Judgment',
  communication: 'Communication',
  building: 'Building',
  humanFluency: 'Human Fluency',
  aiSystems: 'AI & Systems',
  physical: 'Physical'
};

export default function ParentAdmin({ onLogout }) {
  const [view, setView] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [safetyLog, setSafetyLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await fetch('/api/admin/overview');
      const data = await res.json();
      setOverview(data);
    } catch (err) {
      console.error('Failed to fetch overview:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSafetyLog = async () => {
    try {
      const res = await fetch('/api/admin/safety');
      const data = await res.json();
      setSafetyLog(data.events || []);
    } catch (err) {
      console.error('Failed to fetch safety log:', err);
    }
  };

  const fetchChild = async (childId) => {
    try {
      const res = await fetch(`/api/admin/child/${childId}`);
      const data = await res.json();
      setSelectedChild(data);
    } catch (err) {
      console.error('Failed to fetch child:', err);
    }
  };

  const handleNavClick = (navView) => {
    setView(navView);
    if (navView === 'safety') fetchSafetyLog();
  };

  const handleChildSelect = (childId) => {
    fetchChild(childId);
    setView('child');
  };

  const confirmAdvancement = async (childId, domain) => {
    try {
      await fetch(`/api/admin/advancement/${childId}/${domain}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true })
      });
      fetchChild(childId);
      fetchOverview();
    } catch (err) {
      console.error('Advancement error:', err);
    }
  };

  if (loading) {
    return (
      <div className="parent-loading">
        <div className="forge-loading-indicator" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="parent-admin">
      <header className="admin-header">
        <div className="admin-wordmark">
          For<span>ge</span>
          <span className="admin-label">Parent Admin</span>
        </div>
        <button className="admin-logout" onClick={onLogout}>← Exit</button>
      </header>

      <nav className="admin-nav">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'safety', label: 'Safety Log' },
          { id: 'schedule', label: 'Schedule' }
        ].map(item => (
          <button
            key={item.id}
            className={`admin-nav-btn ${view === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {view === 'overview' && overview && (
          <OverviewPanel
            data={overview}
            onChildSelect={handleChildSelect}
          />
        )}
        {view === 'child' && selectedChild && (
          <ChildDetailPanel
            child={selectedChild}
            onBack={() => setView('overview')}
            onConfirmAdvancement={confirmAdvancement}
          />
        )}
        {view === 'safety' && (
          <SafetyPanel events={safetyLog} />
        )}
        {view === 'schedule' && (
          <SchedulePanel />
        )}
      </main>
    </div>
  );
}

// ─── Overview Panel ───────────────────────────────────────────────────────────

function OverviewPanel({ data, onChildSelect }) {
  const CHILD_COLORS = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  const CHILD_EMOJIS = { everly: '⚡', isla: '🔥', weston: '⛳' };

  const urgentSafety = data.recentSafetyEvents?.filter(e => e.tier >= 2) || [];

  return (
    <div className="overview-panel">
      {urgentSafety.length > 0 && (
        <div className="safety-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <div className="alert-title">Safety events need your attention</div>
            <div className="alert-sub">{urgentSafety.length} recent event{urgentSafety.length > 1 ? 's' : ''} — review Safety Log</div>
          </div>
        </div>
      )}

      <div className="panel-section-title">Children</div>
      <div className="children-list">
        {(data.children || []).map(child => (
          <button
            key={child.id}
            className="child-overview-card"
            onClick={() => onChildSelect(child.id)}
          >
            <div className="coc-left">
              <div className="coc-avatar"
                style={{ background: CHILD_COLORS[child.id] }}>
                {CHILD_EMOJIS[child.id]}
              </div>
              <div className="coc-info">
                <div className="coc-name">{child.name}</div>
                <div className="coc-details">
                  Age {child.age} · Stage {child.stage}
                  {child.streak?.current > 0 && ` · 🔥 ${child.streak.current} streak`}
                </div>
                <div className="coc-domains">
                  {child.domains?.map(d => (
                    <span key={d.name} className="coc-domain-pip"
                      style={{ background: DOMAIN_COLORS[d.name] || '#555' }}
                      title={`${DOMAIN_LABELS[d.name] || d.name}: L${d.currentLevel}${d.advancementFlagged ? ' ↑' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="coc-right">
              <div className="coc-sessions">
                {child.recentSessions?.length || 0} recent sessions
              </div>
              <div className="coc-portfolio">
                {child.portfolioCount} portfolio items
              </div>
              <div className="coc-arrow">→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Child Detail Panel ───────────────────────────────────────────────────────

function ChildDetailPanel({ child, onBack, onConfirmAdvancement }) {
  return (
    <div className="child-detail-panel">
      <button className="back-link" onClick={onBack}>← Back to Overview</button>

      <div className="child-detail-header">
        <div className="cdh-name">{child.name}</div>
        <div className="cdh-meta">Age {child.age} · Stage {child.stage} · {child.primaryAgent?.name}</div>
      </div>

      {/* S2S profile if exists */}
      {child.s2sProfile && (
        <div className="detail-section">
          <div className="detail-section-title">S2S Assessment</div>
          <div className="s2s-grid">
            {[
              { label: 'Fine Motor', value: child.s2sProfile.fineMotor, goal: 75 },
              { label: 'Eye Tracking', value: child.s2sProfile.eyeTrackingAccuracy, goal: 90 },
              { label: 'Bilateral Coord.', value: child.s2sProfile.bilateralCoordination, goal: 85 },
              { label: 'Primitive Reflexes', value: child.s2sProfile.primitiveReflexes, goal: 80 }
            ].map(metric => (
              <div key={metric.label} className="s2s-metric">
                <div className="s2s-metric-label">{metric.label}</div>
                <div className="s2s-metric-value" style={{
                  color: metric.value >= metric.goal ? '#16a34a' : '#dc2626'
                }}>
                  {metric.value}%
                </div>
                <div className="s2s-metric-goal">Goal: {metric.goal}%</div>
                <div className="s2s-bar">
                  <div className="s2s-bar-fill"
                    style={{
                      width: `${metric.value}%`,
                      background: metric.value >= metric.goal ? '#16a34a' : '#dc2626'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Domain progress */}
      <div className="detail-section">
        <div className="detail-section-title">Domain Progress</div>
        <div className="domain-detail-list">
          {Object.entries(child.domains || {}).map(([key, domain]) => (
            <div key={key} className="domain-detail-row">
              <div className="ddr-left">
                <div className="ddr-name">{DOMAIN_LABELS[key] || key}</div>
                <div className="ddr-missions">
                  {domain.missionsCompleted?.length || 0} missions completed
                </div>
              </div>
              <div className="ddr-right">
                <div className="ddr-level"
                  style={{ background: DOMAIN_COLORS[key] }}>
                  L{domain.currentLevel}
                </div>
                {domain.advancementFlagged && !domain.advancementConfirmed && (
                  <button
                    className="advance-btn"
                    onClick={() => onConfirmAdvancement(child.id, key)}
                  >
                    Advance ↑
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent sessions */}
      <div className="detail-section">
        <div className="detail-section-title">Recent Sessions</div>
        {child.sessions?.length === 0 ? (
          <div className="detail-empty">No sessions yet</div>
        ) : (
          <div className="sessions-list">
            {(child.sessions || []).slice(0, 10).map((session, i) => (
              <div key={i} className="session-row">
                <div className="sr-domain"
                  style={{ color: DOMAIN_COLORS[session.domain] || '#888' }}>
                  {DOMAIN_LABELS[session.domain] || session.domain}
                </div>
                <div className="sr-date">{session.date}</div>
                <div className="sr-duration">
                  {session.duration ? `${session.duration}m` : 'In progress'}
                </div>
                <div className={`sr-status ${session.status}`}>
                  {session.status === 'locked' ? '🔒' :
                   session.status === 'complete' ? '✓' : '→'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agent memory */}
      <div className="detail-section">
        <div className="detail-section-title">What {child.primaryAgent?.name} Knows</div>
        <div className="memory-box">
          <div className="memory-item">
            <div className="memory-label">Profile</div>
            <div className="memory-text">{child.agentMemory?.personalityProfile || '—'}</div>
          </div>
          <div className="memory-item">
            <div className="memory-label">Known Strengths</div>
            <div className="memory-text">{child.agentMemory?.knownStrengths?.join(', ') || '—'}</div>
          </div>
          <div className="memory-item">
            <div className="memory-label">Growth Areas</div>
            <div className="memory-text">{child.agentMemory?.knownChallenges?.join(', ') || '—'}</div>
          </div>
          <div className="memory-item">
            <div className="memory-label">Last Session</div>
            <div className="memory-text">{child.agentMemory?.lastSessionSummary || 'No sessions yet'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Safety Panel ─────────────────────────────────────────────────────────────

function SafetyPanel({ events }) {
  const tierColors = { 1: '#d97706', 2: '#dc2626', 3: '#7f1d1d' };
  const tierLabels = { 1: 'Soft Redirect', 2: 'Parent Notified', 3: 'URGENT — Session Locked' };

  return (
    <div className="safety-panel">
      <div className="panel-section-title">Safety Log</div>
      <div className="safety-note">
        All events are logged permanently. Tier 2 and Tier 3 events trigger parent notification.
      </div>

      {events.length === 0 ? (
        <div className="detail-empty safety-clear">
          <div>✓ No safety events recorded</div>
          <div className="safety-clear-sub">The log will appear here if any events occur</div>
        </div>
      ) : (
        <div className="safety-list">
          {events.map((event, i) => (
            <div key={i} className="safety-event"
              style={{ borderLeftColor: tierColors[event.tier] }}>
              <div className="se-header">
                <div className="se-child">{event.childName}</div>
                <div className="se-tier" style={{ color: tierColors[event.tier] }}>
                  Tier {event.tier} — {tierLabels[event.tier]}
                </div>
                <div className="se-time">{new Date(event.timestamp).toLocaleDateString()}</div>
              </div>
              <div className="se-trigger">{event.trigger}</div>
              {event.flaggedContent && (
                <div className="se-content">"{event.flaggedContent}"</div>
              )}
              <div className="se-footer">
                {event.parentNotified ? '✓ Parents notified' : 'Logged only'}
                {!event.parentReviewed && event.tier >= 2 && (
                  <span className="se-unreviewed"> · Unreviewed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Schedule Panel ───────────────────────────────────────────────────────────

function SchedulePanel() {
  const schedule = {
    monday: { window: '9am–12pm', activities: 'Tennis 1-4pm · Speech 5-7:30pm', forgeDay: true },
    tuesday: { window: '9–11:30am', activities: 'Tennis 12:30pm · Ballet · Martial Arts', forgeDay: true },
    wednesday: { window: 'PROTECTED', activities: 'Thrive Co-op 9am-2pm · Piano 2:15pm', forgeDay: false },
    thursday: { window: '10am–2:30pm ★', activities: 'JellyBean 9-10am · S2S 2:45pm · Martial Arts', forgeDay: true },
    friday: { window: '10am–1:30pm', activities: 'Horseback 9-10am · Tennis 2-5pm', forgeDay: true },
    saturday: { window: 'Flex only', activities: 'Church 2-4pm · Youth (Everly)', forgeDay: false },
    sunday: { window: 'REST', activities: 'Coach Dillon 9-11/12pm', forgeDay: false }
  };

  return (
    <div className="schedule-panel">
      <div className="panel-section-title">Weekly Schedule</div>
      <div className="schedule-list">
        {Object.entries(schedule).map(([day, info]) => (
          <div key={day} className={`schedule-day ${!info.forgeDay ? 'no-forge' : ''} ${day === 'thursday' ? 'anchor' : ''}`}>
            <div className="sd-day">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
            <div className="sd-info">
              <div className="sd-window" style={{ color: info.forgeDay ? '#f97316' : '#555' }}>
                {info.window}
              </div>
              <div className="sd-activities">{info.activities}</div>
            </div>
            {!info.forgeDay && (
              <div className="sd-badge">No Forge</div>
            )}
          </div>
        ))}
      </div>
      <div className="schedule-note">
        ★ Thursday is the anchor learning day — longest uninterrupted window
      </div>
    </div>
  );
}
