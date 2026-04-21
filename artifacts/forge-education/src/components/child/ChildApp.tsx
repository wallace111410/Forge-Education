import { useState, useEffect, useRef } from 'react';
import './ChildApp.css';
import SessionRoom from './SessionRoom';
import { AgentAvatar } from './AgentAvatar';
import AvatarCustomizer from './AvatarCustomizer';

const DOMAIN_COLORS: Record<string, string> = {
  identity: '#7c3aed', communication: '#2563eb', building: '#d97706',
  humanFluency: '#db2777', aiSystems: '#0891b2', physical: '#16a34a'
};
const DOMAIN_LABELS: Record<string, string> = {
  identity: 'Identity & Judgment', communication: 'Communication', building: 'Building',
  humanFluency: 'Human Fluency', aiSystems: 'AI & Systems', physical: 'Physical'
};
const DOMAIN_ICONS: Record<string, string> = {
  identity: '⚖️', communication: '💬', building: '🏗️',
  humanFluency: '🤝', aiSystems: '⚡', physical: '🏆'
};

function getChildColor(childId: string) {
  const colors: Record<string, string> = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  return colors[childId] || '#f97316';
}
function getChildEmoji(childId: string) {
  const emojis: Record<string, string> = { everly: '⚡', isla: '🔥', weston: '⛳' };
  return emojis[childId] || '✨';
}

function getMissionTitle(child: any, todayContext: any) {
  const domain = todayContext?.leadDomain;
  if (!domain || !child.domains?.[domain]) return 'Your agent is ready. Begin when you are.';
  const missionId = child.domains[domain].missionsAvailable?.[0];
  if (!missionId) return 'Continue your learning journey.';
  const missionTitles: Record<string, string> = {
    'IJ-L5-001': 'The Question Behind "Is God Loving?"',
    'IJ-L5-002': 'What the Fall Actually Explains',
    'IJ-L5-003': 'The Trick in the Question',
    'CP-L5-001': "The General's First Words",
    'BE-L6-001': 'What JellyBean Is Actually Worth',
    'HF-L4-001': "What You're Good At With People",
    'AI-L5-001': 'Ask Claude Your Hardest Apologetics Question',
    'PM-L6-001': 'Your Best Day',
    'IJ-L3-001': "That's Not Fair — Or Is It?",
    'CP-L3-001': 'One Minute on Anything — Go',
    'BE-L4-001': 'Read Your Own Numbers',
    'HF-L3-001': "What Happens in Your Body When You're Frustrated",
    'AI-L3-001': 'Ask Claude Something for JellyBean',
    'PM-L4-001': 'What S2S Is Actually Doing',
    'W-001': 'Why Does the Golf Ball Have Bumps?'
  };
  return missionTitles[missionId] || `Mission: ${missionId}`;
}

function getCustomAgentName(childId: string, fallback: string): string {
  try {
    return localStorage.getItem(`forge_agent_name_${childId}`) || fallback;
  } catch { return fallback; }
}

interface ChildAppProps { child: any; onLogout: () => void; basePath: string; }

export default function ChildApp({ child: initialChild, onLogout, basePath }: ChildAppProps) {
  const [child, setChild] = useState(() => ({
    ...initialChild,
    agentName: getCustomAgentName(initialChild.id, initialChild.agentName),
  }));
  const [view, setView] = useState<'home' | 'session' | 'portfolio' | 'profile'>('home');
  const [todayContext, setTodayContext] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sessionDomain, setSessionDomain] = useState<string | null>(null);
  const [sessionMissionId, setSessionMissionId] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(!initialChild.firstLoginComplete);

  const handleAvatarUpdated = (newConfig: any) => {
    setChild((prev: any) => ({ ...prev, avatarConfig: newConfig }));
  };

  const handleAgentNameChanged = (newName: string) => {
    try { localStorage.setItem(`forge_agent_name_${child.id}`, newName); } catch {}
    setChild((prev: any) => ({ ...prev, agentName: newName }));
  };

  const [showFirstIntro, setShowFirstIntro] = useState(!initialChild.firstLoginComplete);

  useEffect(() => {
    fetch(`${basePath}/forge-api/child/${child.id}/today`).then(r => r.json()).then(data => {
      setTodayContext(data);
      if (!child.firstLoginComplete && !showFirstIntro) {
        setSessionDomain('identity');
        setSessionMissionId(null);
        setView('session');
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (showFirstIntro) {
    const childColor = getChildColor(child.id);
    return (
      <div className="first-intro" data-child={child.id}>
        <div className="first-intro-inner">
          <div className="first-intro-glow" style={{ background: childColor }} />
          <div className="first-intro-emoji">{getChildEmoji(child.id)}</div>
          <h1 className="first-intro-title">Hi, {child.name}!</h1>
          <p className="first-intro-subtitle">Welcome to Forge. I'm <strong>{child.agentName}</strong> — your personal learning agent.</p>
          <p className="first-intro-text">I've been getting ready to meet you. In our first session, we'll get to know each other and figure out how we work best together.</p>
          <p className="first-intro-text">There are no wrong answers. Just be yourself.</p>
          <button className="first-intro-btn" style={{ background: childColor }} onClick={() => {
            setShowFirstIntro(false);
            setSessionDomain('identity');
            setSessionMissionId(null);
            setView('session');
          }}>
            Meet {child.agentName} →
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="child-loading">
        <div className="loading-agent">
          <div className="loading-avatar" style={{ background: getChildColor(child.id) }}>{getChildEmoji(child.id)}</div>
          <div className="loading-text">{child.agentName} is getting ready...</div>
        </div>
      </div>
    );
  }

  const handleStartSession = (domain?: string) => {
    const d = domain || todayContext?.leadDomain || 'identity';
    setSessionDomain(d);
    const mId = child.domains?.[d]?.missionsAvailable?.[0] || null;
    setSessionMissionId(mId);
    setView('session');
  };

  const handleUnlockSession = (domain?: string) => {
    if (domain && todayContext) {
      setTodayContext({ ...todayContext, leadDomain: domain, isForgeDay: true, isProtectedDay: false });
    } else {
      setTodayContext({ ...todayContext, isForgeDay: true, isProtectedDay: false });
    }
  };

  if (view === 'session') {
    return (
      <SessionRoom
        child={child}
        domain={sessionDomain || todayContext?.leadDomain || 'identity'}
        missionId={sessionMissionId}
        onEnd={() => { setView('home'); setSessionDomain(null); setSessionMissionId(null); setIsFirstLogin(false); }}
        basePath={basePath}
        isFirstLogin={isFirstLogin}
      />
    );
  }

  if (todayContext && todayContext.isUnlockedDay) return <UnlockedDayScreen child={child} todayContext={todayContext} onStartSession={(domain?: string) => { handleUnlockSession(domain); handleStartSession(domain); }} onLogout={onLogout} />;
  if (todayContext && !todayContext.isForgeDay) return <ProtectedDayScreen child={child} todayContext={todayContext} onLogout={onLogout} onUnlockSession={handleUnlockSession} />;

  return (
    <div className="child-app" data-child={child.id} data-stage={child.stage}>
      <header className="child-header">
        <div className="child-header-left">
          {child.avatarConfig ? (
            <AgentAvatar config={child.avatarConfig} size={36} stage={child.stage} />
          ) : (
            <div className="header-avatar" style={{ background: getChildColor(child.id) }}>{getChildEmoji(child.id)}</div>
          )}
          <div className="header-info">
            <div className="header-name">{child.name}</div>
            <div className="header-agent">{child.agentName}</div>
          </div>
        </div>
        <div className="child-header-right">
          {child.streak && child.streak.current > 0 && child.stage < 4 && <div className="streak-badge">🔥 {child.streak.current}</div>}
          <button className="header-menu-btn" onClick={onLogout}>←</button>
        </div>
      </header>
      <nav className="child-nav">
        <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Home</button>
        <button className={`nav-btn ${view === 'portfolio' ? 'active' : ''}`} onClick={() => setView('portfolio')}>Portfolio</button>
        <button className={`nav-btn ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}>Profile</button>
      </nav>
      <main className="child-main">
        {view === 'home' && <HomeView child={child} todayContext={todayContext} onStartSession={handleStartSession} />}
        {view === 'portfolio' && <PortfolioView child={child} basePath={basePath} />}
        {view === 'profile' && <ProfileView child={child} onAvatarUpdated={handleAvatarUpdated} onAgentNameChanged={handleAgentNameChanged} basePath={basePath} />}
      </main>
    </div>
  );
}

function HomeView({ child, todayContext, onStartSession }: any) {
  const childColor = getChildColor(child.id);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${child.name}.`;
    if (hour < 17) return `Good afternoon, ${child.name}.`;
    return `Good evening, ${child.name}.`;
  };
  const getAgentMessage = () => {
    if (todayContext?.anchor) return `Today is your best learning day. ${child.agentName} is ready for deep work.`;
    return `${child.agentName} has something for you today.`;
  };

  return (
    <div className="home-view">
      <div className="greeting-section">
        <h1 className="greeting-text">{getGreeting()}</h1>
        <p className="agent-message">{getAgentMessage()}</p>
      </div>
      <div className="lead-task-card" style={{ '--card-accent': childColor } as any}>
        <div className="lead-task-header">
          <span className="lead-task-label">Today's Mission</span>
          {todayContext?.leadDomain && (
            <span className="lead-task-domain" style={{ color: DOMAIN_COLORS[todayContext.leadDomain] }}>
              {DOMAIN_ICONS[todayContext.leadDomain]} {DOMAIN_LABELS[todayContext.leadDomain]}
            </span>
          )}
        </div>
        <div className="lead-task-title">{getMissionTitle(child, todayContext)}</div>
        <button className="lead-task-btn" style={{ background: childColor }} onClick={() => onStartSession()}>Begin with {child.agentName} →</button>
      </div>
      <div className="domains-section">
        <div className="section-label">Your Domains</div>
        <div className="domain-grid">
          {Object.entries(child.domains || {}).map(([key, domain]: [string, any]) => (
            <div key={key} className="domain-card" onClick={() => onStartSession(key)} style={{ cursor: 'pointer' }}>
              <div className="domain-icon">{DOMAIN_ICONS[key]}</div>
              <div className="domain-name">{DOMAIN_LABELS[key]}</div>
              <div className="domain-level" style={{ background: DOMAIN_COLORS[key] }}>L{domain.currentLevel}</div>
              {domain.advancementFlagged && <div className="advancement-flag">Ready to advance ↑</div>}
            </div>
          ))}
        </div>
      </div>
      {child.portfolio && child.portfolio.itemCount > 0 && (
        <div className="portfolio-pulse"><span className="pulse-dot" /><span className="pulse-text">{child.portfolio.itemCount} items in your portfolio</span></div>
      )}
    </div>
  );
}

function PortfolioView({ child, basePath }: any) {
  const childColor = getChildColor(child.id);
  const [livePortfolio, setLivePortfolio] = useState<any>(child.portfolio || {});

  useEffect(() => {
    let cancelled = false;
    fetch(`${basePath}/forge-api/portfolio/${child.id}`)
      .then(r => r.json())
      .then(p => { if (!cancelled) setLivePortfolio(p || {}); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [child.id, basePath]);

  const portfolio = livePortfolio || {};
  const allItems = [...(portfolio.artifacts || []), ...(portfolio.conversations || [])].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
          {allItems.map((item: any, i: number) => (
            <div key={i} className="portfolio-item">
              <div className="portfolio-item-domain" style={{ color: DOMAIN_COLORS[item.domain] || childColor }}>{DOMAIN_ICONS[item.domain] || '📝'} {DOMAIN_LABELS[item.domain] || item.domain}</div>
              <div className="portfolio-item-title">{item.summary || item.missionId}</div>
              <div className="portfolio-item-date">{item.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileView({ child, onAvatarUpdated, onAgentNameChanged, basePath }: any) {
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(child.agentName);
  const childColor = getChildColor(child.id);

  const saveName = () => {
    const trimmed = nameValue.trim();
    if (trimmed && trimmed !== child.agentName) {
      onAgentNameChanged(trimmed);
    }
    setEditingName(false);
  };

  return (
    <div className="profile-view">
      <div className="profile-agent-name-section" style={{ marginBottom: '1.5rem' }}>
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>Agent Name</div>
        {editingName ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
              maxLength={20}
              autoFocus
              onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') { setNameValue(child.agentName); setEditingName(false); } }}
              style={{
                background: '#1a1a1a',
                border: `1px solid ${childColor}`,
                borderRadius: '8px',
                color: '#fff',
                padding: '0.5rem 0.75rem',
                fontSize: '1rem',
                fontFamily: 'DM Sans, sans-serif',
                outline: 'none',
                flex: 1,
              }}
            />
            <button onClick={saveName} style={{ background: childColor, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem' }}>Save</button>
            <button onClick={() => { setNameValue(child.agentName); setEditingName(false); }} style={{ background: 'transparent', color: '#666', border: '1px solid #333', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>Cancel</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.125rem', color: '#fff', fontWeight: 600 }}>{child.agentName}</span>
            <button onClick={() => setEditingName(true)} style={{ background: 'transparent', color: childColor, border: `1px solid ${childColor}33`, borderRadius: '6px', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem' }}>Rename</button>
          </div>
        )}
      </div>
      <AvatarCustomizer child={child} onSaved={onAvatarUpdated} basePath={basePath} />
    </div>
  );
}

function ProtectedDayScreen({ child, todayContext, onLogout, onUnlockSession }: any) {
  const childColor = getChildColor(child.id);

  if (todayContext?.isUnlockedDay) {
    return (
      <UnlockedDayScreen
        child={child}
        todayContext={todayContext}
        onStartSession={onUnlockSession}
        onLogout={onLogout}
      />
    );
  }

  const getProtectedContent = () => {
    const reason = todayContext?.protectedReason;
    const day = todayContext?.day;

    if (reason === 'thrive') return { icon: '🌿', headline: 'Thrive day.', sub: 'Real curriculum with real kids today. Go be present.' };
    if (day === 'sunday') return { icon: '☀️', headline: 'Rest day.', sub: 'Coach Dillon has the morning. The afternoon is yours.' };
    if (day === 'saturday') return { icon: '⛪', headline: 'Church day.', sub: 'Community and rest. Forge will be here Monday.' };
    return { icon: '🌿', headline: 'Protected day.', sub: 'Today is for living, not learning.' };
  };

  const content = getProtectedContent();

  return (
    <div className="protected-day">
      <div className="protected-content">
        <div className="protected-icon">{content.icon}</div>
        <h1 className="protected-headline">{content.headline}</h1>
        <p className="protected-sub">{content.sub}</p>
        <button
          className="forge-btn"
          onClick={onLogout}
          style={{ background: 'transparent', color: '#444', marginTop: '2rem', border: '1px solid #2a2a2a' }}
        >← Back</button>
      </div>
    </div>
  );
}

function UnlockedDayScreen({ child, todayContext, onStartSession, onLogout }: any) {
  const childColor = getChildColor(child.id);
  const agentName = child.agentName || 'Your agent';
  const sessionNote = todayContext?.sessionNote || "Not your usual day — but here you are.";

  const getUnlockedMessage = () => {
    const messages: Record<string, any> = {
      everly: { headline: 'Extra session.', agentLine: `Vera wasn't expecting you today — but she's glad you're here.`, prompt: 'What do you want to work on?' },
      isla: { headline: 'Bonus day!', agentLine: `Ren is SO excited you're here on a non-school day.`, prompt: 'What sounds good to Isla today?' },
      weston: { headline: 'Surprise visit!', agentLine: `OZZY! Weston is here! This is the BEST surprise!`, prompt: 'What adventure should Ozzy and Weston go on?' }
    };
    return messages[child.id] || messages.everly;
  };

  const msg = getUnlockedMessage();

  const DOMAIN_OPTIONS = [
    { value: 'identity', label: '⚖️ Identity & Judgment', color: '#7c3aed' },
    { value: 'communication', label: '💬 Communication', color: '#2563eb' },
    { value: 'building', label: '🏗️ Building', color: '#d97706' },
    { value: 'humanFluency', label: '🤝 Human Fluency', color: '#db2777' },
    { value: 'aiSystems', label: '⚡ AI & Systems', color: '#0891b2' },
    { value: 'physical', label: '🏆 Physical', color: '#16a34a' }
  ];

  if (todayContext?.leadDomain) {
    return (
      <div className="unlocked-day">
        <div className="unlocked-content">
          <div className="unlocked-agent-avatar" style={{ background: childColor }}>{getChildEmoji(child.id)}</div>
          <h1 className="unlocked-headline">{msg.headline}</h1>
          <p className="unlocked-note">"{sessionNote}"</p>
          <p className="unlocked-agent-line">{msg.agentLine}</p>
          <button className="unlocked-start-btn" style={{ background: childColor }} onClick={() => onStartSession()}>Begin with {agentName} →</button>
          <button className="unlocked-back" onClick={onLogout}>← Not today</button>
        </div>
      </div>
    );
  }

  return (
    <div className="unlocked-day">
      <div className="unlocked-content">
        <div className="unlocked-agent-avatar" style={{ background: childColor }}>{getChildEmoji(child.id)}</div>
        <h1 className="unlocked-headline">{msg.headline}</h1>
        <p className="unlocked-note">"{sessionNote}"</p>
        <p className="unlocked-agent-line">{msg.agentLine}</p>
        <div className="unlocked-domain-prompt">{msg.prompt}</div>
        <div className="unlocked-domain-grid">
          {DOMAIN_OPTIONS.map(domain => (
            <button
              key={domain.value}
              className="unlocked-domain-btn"
              style={{ '--domain-color': domain.color } as any}
              onClick={() => onStartSession(domain.value)}
            >
              {domain.label}
            </button>
          ))}
        </div>
        <button className="unlocked-back" onClick={onLogout}>← Not today</button>
      </div>
    </div>
  );
}
