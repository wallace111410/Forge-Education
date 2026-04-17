import React, { useState, useEffect } from 'react';
import './ChildApp.css';

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

const DOMAIN_ICONS = {
  identity: '⚖️',
  communication: '💬',
  building: '🏗️',
  humanFluency: '🤝',
  aiSystems: '⚡',
  physical: '🏆'
};

export default function ChildApp({ child, onLogout }) {
  const [view, setView] = useState('home'); // 'home' | 'session' | 'portfolio'
  const [todayContext, setTodayContext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayContext();
  }, []);

  const fetchTodayContext = async () => {
    try {
      const res = await fetch(`/api/child/${child.id}/today`);
      const data = await res.json();
      setTodayContext(data);
    } catch (err) {
      console.error('Failed to fetch today context:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="child-loading">
        <div className="loading-agent">
          <div className="loading-avatar" style={{ background: getChildColor(child.id) }}>
            {getChildEmoji(child.id)}
          </div>
          <div className="loading-text">{child.agentName} is getting ready...</div>
        </div>
      </div>
    );
  }

  if (todayContext && !todayContext.isForgeDay) {
    return <ProtectedDayScreen child={child} todayContext={todayContext} onLogout={onLogout} />;
  }

  return (
    <div className="child-app" data-child={child.id} data-stage={child.stage}>
      <header className="child-header">
        <div className="child-header-left">
          <div className="header-avatar" style={{ background: getChildColor(child.id) }}>
            {getChildEmoji(child.id)}
          </div>
          <div className="header-info">
            <div className="header-name">{child.name}</div>
            <div className="header-agent">{child.agentName}</div>
          </div>
        </div>
        <div className="child-header-right">
          {child.streak && child.streak.current > 0 && child.stage < 4 && (
            <div className="streak-badge">
              🔥 {child.streak.current}
            </div>
          )}
          <button className="header-menu-btn" onClick={onLogout}>
            ←
          </button>
        </div>
      </header>

      <nav className="child-nav">
        <button
          className={`nav-btn ${view === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          Home
        </button>
        <button
          className={`nav-btn ${view === 'portfolio' ? 'active' : ''}`}
          onClick={() => setView('portfolio')}
        >
          Portfolio
        </button>
      </nav>

      <main className="child-main">
        {view === 'home' && (
          <HomeView
            child={child}
            todayContext={todayContext}
            onStartSession={() => setView('session')}
          />
        )}
        {view === 'session' && (
          <SessionView
            child={child}
            todayContext={todayContext}
            onEnd={() => setView('home')}
          />
        )}
        {view === 'portfolio' && (
          <PortfolioView child={child} />
        )}
      </main>
    </div>
  );
}

// ─── Home View ────────────────────────────────────────────────────────────────

function HomeView({ child, todayContext, onStartSession }) {
  const childColor = getChildColor(child.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = child.name;
    const agent = child.agentName;

    if (hour < 12) return `Good morning, ${name}.`;
    if (hour < 17) return `Good afternoon, ${name}.`;
    return `Good evening, ${name}.`;
  };

  const getAgentMessage = () => {
    if (todayContext?.anchorDay) {
      return `Today is your best learning day. ${child.agentName} is ready for deep work.`;
    }
    if (todayContext?.speechClubEvening) {
      return `Speech club tonight. Let's prepare your apologetics before you go.`;
    }
    return `${child.agentName} has something for you today.`;
  };

  return (
    <div className="home-view">
      <div className="greeting-section">
        <h1 className="greeting-text">{getGreeting()}</h1>
        <p className="agent-message">{getAgentMessage()}</p>
      </div>

      {/* Lead task card */}
      <div className="lead-task-card" style={{ '--card-accent': childColor }}>
        <div className="lead-task-header">
          <span className="lead-task-label">Today's Mission</span>
          {todayContext?.leadDomain && (
            <span className="lead-task-domain" style={{ color: DOMAIN_COLORS[todayContext.leadDomain] }}>
              {DOMAIN_ICONS[todayContext.leadDomain]} {DOMAIN_LABELS[todayContext.leadDomain]}
            </span>
          )}
        </div>
        <div className="lead-task-title">
          {getMissionTitle(child, todayContext)}
        </div>
        <button
          className="lead-task-btn"
          style={{ background: childColor }}
          onClick={onStartSession}
        >
          Begin with {child.agentName} →
        </button>
      </div>

      {/* Domain levels */}
      <div className="domains-section">
        <div className="section-label">Your Domains</div>
        <div className="domain-grid">
          {Object.entries(child.domains || {}).map(([key, domain]) => (
            <div key={key} className="domain-card">
              <div className="domain-icon">{DOMAIN_ICONS[key]}</div>
              <div className="domain-name">{DOMAIN_LABELS[key]}</div>
              <div
                className="domain-level"
                style={{ background: DOMAIN_COLORS[key] }}
              >
                L{domain.currentLevel}
              </div>
              {domain.advancementFlagged && (
                <div className="advancement-flag">Ready to advance ↑</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio pulse */}
      {child.portfolio && child.portfolio.itemCount > 0 && (
        <div className="portfolio-pulse">
          <span className="pulse-dot" />
          <span className="pulse-text">
            {child.portfolio.itemCount} items in your portfolio
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Session View ─────────────────────────────────────────────────────────────

function SessionView({ child, todayContext, onEnd }) {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = React.useRef(null);
  const childColor = getChildColor(child.id);

  useEffect(() => {
    startSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSession = async () => {
    try {
      const domain = todayContext?.leadDomain || 'identity';
      const missionId = child.domains?.[domain]?.missionsAvailable?.[0] || 'IJ-L5-001';

      const res = await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId: child.id, domain, missionId })
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setSessionStarted(true);

      // Opening message from agent
      const openingRes = await fetch('/api/session/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: child.id,
          sessionId: data.sessionId,
          message: `[SESSION START] Open with a warm, specific greeting for ${child.name}. Reference what you know about them. Frame today's mission as an invitation. Keep it under 3 sentences.`,
          role: 'user'
        })
      });
      const openingData = await openingRes.json();
      if (openingData.response) {
        setMessages([{ role: 'assistant', content: openingData.response }]);
      }
    } catch (err) {
      console.error('Session start error:', err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !sessionId) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/session/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: child.id,
          sessionId,
          message: userMessage,
          role: 'user'
        })
      });
      const data = await res.json();

      if (data.sessionLocked) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          isSystemMessage: true
        }]);
        setTimeout(() => onEnd(), 3000);
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      console.error('Message error:', err);
    } finally {
      setLoading(false);
    }
  };

  const endSession = async () => {
    if (sessionId) {
      await fetch('/api/session/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId: child.id, sessionId })
      });
    }
    onEnd();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="session-view">
      <div className="session-header">
        <div className="session-agent-info">
          <div className="session-avatar" style={{ background: childColor }}>
            {getChildEmoji(child.id)}
          </div>
          <div className="session-agent-name">{child.agentName}</div>
        </div>
        <button className="session-end-btn" onClick={endSession}>
          End Session
        </button>
      </div>

      <div className="messages-container">
        {!sessionStarted && (
          <div className="session-loading">
            <div className="forge-loading" />
            <span>{child.agentName} is preparing...</span>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role} ${msg.isSystemMessage ? 'system' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="message-avatar" style={{ background: childColor }}>
                {getChildEmoji(child.id)}
              </div>
            )}
            <div className="message-bubble">
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-avatar" style={{ background: childColor }}>
              {getChildEmoji(child.id)}
            </div>
            <div className="message-bubble thinking">
              <span className="thinking-dot" />
              <span className="thinking-dot" />
              <span className="thinking-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <textarea
          className="message-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Talk to ${child.agentName}...`}
          rows={1}
          disabled={loading}
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          style={{ '--send-color': childColor }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// ─── Portfolio View ───────────────────────────────────────────────────────────

function PortfolioView({ child }) {
  const childColor = getChildColor(child.id);
  const portfolio = child.portfolio || {};
  const allItems = [
    ...(portfolio.artifacts || []),
    ...(portfolio.conversations || [])
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="portfolio-view">
      <div className="portfolio-header">
        <h2 className="portfolio-title">{child.name}'s Portfolio</h2>
        <div className="portfolio-count">{allItems.length} entries</div>
      </div>

      {allItems.length === 0 ? (
        <div className="portfolio-empty">
          <div className="empty-icon">📚</div>
          <div className="empty-text">Your portfolio grows as you learn.</div>
          <div className="empty-subtext">Complete your first session to add something here.</div>
        </div>
      ) : (
        <div className="portfolio-list">
          {allItems.map((item, i) => (
            <div key={i} className="portfolio-item">
              <div className="portfolio-item-domain"
                style={{ color: DOMAIN_COLORS[item.domain] || childColor }}>
                {DOMAIN_ICONS[item.domain] || '📝'} {DOMAIN_LABELS[item.domain] || item.domain}
              </div>
              <div className="portfolio-item-title">{item.summary || item.missionId}</div>
              <div className="portfolio-item-date">{item.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Protected Day Screen ─────────────────────────────────────────────────────

function ProtectedDayScreen({ child, todayContext, onLogout }) {
  const childColor = getChildColor(child.id);

  const getProtectedMessage = () => {
    const day = todayContext?.day;
    if (day === 'wednesday') {
      return {
        headline: 'Thrive day.',
        sub: 'No Forge today — go learn with real humans.',
        icon: '🌿'
      };
    }
    if (day === 'sunday') {
      return {
        headline: 'Rest day.',
        sub: 'Coach Dillon has the morning. The afternoon is yours.',
        icon: '☀️'
      };
    }
    return {
      headline: 'Protected day.',
      sub: 'Today is for living, not learning.',
      icon: '🌿'
    };
  };

  const msg = getProtectedMessage();

  return (
    <div className="protected-day">
      <div className="protected-content">
        <div className="protected-icon">{msg.icon}</div>
        <h1 className="protected-headline">{msg.headline}</h1>
        <p className="protected-sub">{msg.sub}</p>
        <button
          className="forge-btn"
          onClick={onLogout}
          style={{ background: 'transparent', color: '#555', marginTop: '2rem' }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getChildColor(childId) {
  const colors = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  return colors[childId] || '#f97316';
}

function getChildEmoji(childId) {
  const emojis = { everly: '⚡', isla: '🔥', weston: '⛳' };
  return emojis[childId] || '✨';
}

function getMissionTitle(child, todayContext) {
  const domain = todayContext?.leadDomain;
  if (!domain || !child.domains?.[domain]) {
    return 'Your agent is ready. Begin when you are.';
  }

  const missionId = child.domains[domain].missionsAvailable?.[0];
  if (!missionId) return 'Continue your learning journey.';

  // Mission titles — in production these come from curriculum.json
  const missionTitles = {
    'IJ-L5-001': 'The Question Behind "Is God Loving?"',
    'IJ-L5-002': 'What the Fall Actually Explains',
    'IJ-L5-003': 'The Trick in the Question',
    'CP-L5-001': 'The General\'s First Words',
    'BE-L6-001': 'What JellyBean Is Actually Worth',
    'HF-L4-001': 'What You\'re Good At With People',
    'AI-L5-001': 'Ask Claude Your Hardest Apologetics Question',
    'PM-L6-001': 'Your Best Day',
    'IJ-L3-001': 'That\'s Not Fair — Or Is It?',
    'CP-L3-001': 'One Minute on Anything — Go',
    'BE-L4-001': 'Read Your Own Numbers',
    'HF-L3-001': 'What Happens in Your Body When You\'re Frustrated',
    'AI-L3-001': 'Ask Claude Something for JellyBean',
    'PM-L4-001': 'What S2S Is Actually Doing',
    'W-001': 'Why Does the Golf Ball Have Bumps?'
  };

  return missionTitles[missionId] || `Mission: ${missionId}`;
}
