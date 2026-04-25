import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './ParentAdmin.css';
import ProfilesProgress from './ProfilesProgress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DOMAIN_COLORS: Record<string, string> = {
  identity: '#7c3aed', communication: '#2563eb', building: '#d97706',
  humanFluency: '#db2777', aiSystems: '#0891b2', physical: '#16a34a'
};
const DOMAIN_LABELS: Record<string, string> = {
  identity: 'Identity & Judgment', communication: 'Communication', building: 'Building',
  humanFluency: 'Human Fluency', aiSystems: 'AI & Systems', physical: 'Physical'
};

function formatMarkdown(text: string): string {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\n/g, '<br />');
  return html;
}

interface ParentAdminProps { onLogout: () => void; basePath: string; }

export default function ParentAdmin({ onLogout, basePath }: ParentAdminProps) {
  const [view, setView] = useState('overview');
  const [overview, setOverview] = useState<any>(null);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [safetyLog, setSafetyLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${basePath}/forge-api/admin/overview`).then(r => r.json()).then(setOverview).catch(console.error),
      fetch(`${basePath}/forge-api/setup-status`).then(r => r.json()).then(d => setSetupComplete(d.setupComplete)).catch(() => setSetupComplete(false))
    ]).finally(() => setLoading(false));
  }, []);

  const fetchOverview = async () => {
    try { const res = await fetch(`${basePath}/forge-api/admin/overview`); setOverview(await res.json()); }
    catch (err) { console.error('Failed to fetch overview:', err); }
  };

  const fetchSafetyLog = async () => {
    try { const res = await fetch(`${basePath}/forge-api/admin/safety`); const data = await res.json(); setSafetyLog(data.events || []); }
    catch (err) { console.error('Failed to fetch safety log:', err); }
  };

  const fetchChild = async (childId: string) => {
    try { const res = await fetch(`${basePath}/forge-api/admin/child/${childId}`); setSelectedChild(await res.json()); }
    catch (err) { console.error('Failed to fetch child:', err); }
  };

  const handleNavClick = (navView: string) => { setView(navView); if (navView === 'safety') fetchSafetyLog(); };
  const handleChildSelect = (childId: string) => { fetchChild(childId); setView('child'); };

  const confirmAdvancement = async (childId: string, domain: string) => {
    try {
      await fetch(`${basePath}/forge-api/admin/advancement/${childId}/${domain}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirmed: true }) });
      fetchChild(childId); fetchOverview();
    } catch (err) { console.error('Advancement error:', err); }
  };

  if (loading) return <div className="parent-loading"><div className="forge-loading-indicator" /><span>Loading dashboard...</span></div>;

  if (setupComplete === false) {
    return <SetupWizard basePath={basePath} onComplete={() => { setSetupComplete(true); fetchOverview(); }} onLogout={onLogout} />;
  }

  return (
    <div className="parent-admin">
      <header className="admin-header">
        <div className="admin-wordmark">For<span>ge</span><span className="admin-label">Parent Admin</span></div>
        <button className="admin-logout" onClick={onLogout}>â Exit</button>
      </header>
      <nav className="admin-nav">
        {[{ id: 'overview', label: 'Overview' }, { id: 'briefs', label: 'Briefs' }, { id: 'progress', label: 'Progress' }, { id: 'messages', label: 'Messages' }, { id: 'children', label: 'Children' }, { id: 'resources', label: 'Resources' }, { id: 'life-schedule', label: 'Life Schedule' }, { id: 'schedule', label: 'Forge Schedule' }, { id: 'safety', label: 'Safety' }, { id: 'settings', label: 'Settings' }, { id: 'transcripts', label: 'Transcripts' }, { id: 'profiles', label: 'Profiles & Progress' }].map(item => (
          <button key={item.id} className={`admin-nav-btn ${view === item.id ? 'active' : ''}`} onClick={() => handleNavClick(item.id)}>{item.label}</button>
        ))}
      </nav>
      <main className="admin-main">
        {view === 'overview' && overview && <OverviewPanel data={overview} onChildSelect={handleChildSelect} />}
        {view === 'child' && selectedChild && <ChildDetailPanel child={selectedChild} onBack={() => setView('overview')} onConfirmAdvancement={confirmAdvancement} />}
        {view === 'briefs' && <BriefsPanel basePath={basePath} />}
        {view === 'progress' && <ProgressPanel basePath={basePath} />}
        {view === 'messages' && <MessagesPanel basePath={basePath} />}
        {view === 'children' && <ChildrenEditorPanel basePath={basePath} />}
        {view === 'safety' && <SafetyPanel events={safetyLog} />}
        {view === 'resources' && <ResourcesPanel basePath={basePath} />}
        {view === 'life-schedule' && <LifeSchedulePanel basePath={basePath} />}
        {view === 'schedule' && <ScheduleEditorPanel basePath={basePath} />}
        {view === 'settings' && <SettingsPanel basePath={basePath} />}
        {view === 'transcripts' && <TranscriptsPanel basePath={basePath} />}
      {view === 'profiles' && <ProfilesProgress basePath={basePath} />}
      </main>
    </div>
  );
}

function SetupWizard({ basePath, onComplete, onLogout }: { basePath: string; onComplete: () => void; onLogout: () => void }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_INFO: Record<string, { name: string; agent: string; emoji: string }> = {
    everly: { name: 'Everly', agent: 'Vera', emoji: 'â¡' },
    isla: { name: 'Isla', agent: 'Ren', emoji: 'ð¥' },
    weston: { name: 'Weston', agent: 'Ozzy', emoji: 'â³' }
  };
  const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const STEP_LABELS = ['Welcome', 'Child Profiles', 'Life Schedule', 'Curriculum', 'Ready'];
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [aboutTexts, setAboutTexts] = useState<Record<string, string>>({ everly: '', isla: '', weston: '' });
  const [scheduleChild, setScheduleChild] = useState('everly');
  const [scheduleData, setScheduleData] = useState<Record<string, any>>({ everly: { weeklyActivities: [], upcomingEvents: [] }, isla: { weeklyActivities: [], upcomingEvents: [] }, weston: { weeklyActivities: [], upcomingEvents: [] } });
  const [newAct, setNewAct] = useState({ day: 'Monday', activity: '', time: '' });
  const [newEvt, setNewEvt] = useState({ date: '', event: '' });
  const [currChild, setCurrChild] = useState('everly');
  const [currData, setCurrData] = useState<Record<string, any[]>>({ everly: [], isla: [], weston: [] });
  const [editingCurrId, setEditingCurrId] = useState<string | null>(null);
  const [editCurrForm, setEditCurrForm] = useState<any>({});

  useEffect(() => {
    CHILDREN.forEach(async (id) => {
      try {
        const childRes = await fetch(`${basePath}/forge-api/admin/child/${id}`);
        const childData = await childRes.json();
        setAboutTexts(prev => ({ ...prev, [id]: childData.agentMemory?.personalityProfile || '' }));
        const schedRes = await fetch(`${basePath}/forge-api/children/${id}/schedule`);
        const schedData = await schedRes.json();
        setScheduleData(prev => ({ ...prev, [id]: schedData }));
        const resRes = await fetch(`${basePath}/forge-api/children/${id}/resources`);
        const resData = await resRes.json();
        setCurrData(prev => ({ ...prev, [id]: resData.curriculum || [] }));
      } catch (err) { console.error('Setup fetch error:', err); }
    });
  }, []);

  const saveAbout = async (childId: string) => {
    try {
      await fetch(`${basePath}/forge-api/admin/child/${childId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about: aboutTexts[childId] })
      });
    } catch (err) { console.error('Save about error:', err); }
  };

  const saveAllAbouts = async () => {
    setSaving(true);
    await Promise.all(CHILDREN.map(id => saveAbout(id)));
    setSaving(false);
  };

  const fetchSchedule = async (childId: string) => {
    const res = await fetch(`${basePath}/forge-api/children/${childId}/schedule`);
    const data = await res.json();
    setScheduleData(prev => ({ ...prev, [childId]: data }));
  };

  const addActivity = async () => {
    if (!newAct.activity.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${scheduleChild}/schedule/activities`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAct)
      });
      setNewAct({ day: 'Monday', activity: '', time: '' });
      await fetchSchedule(scheduleChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const deleteActivity = async (index: number) => {
    await fetch(`${basePath}/forge-api/children/${scheduleChild}/schedule/activities/${index}`, { method: 'DELETE' });
    await fetchSchedule(scheduleChild);
  };

  const addEvent = async () => {
    if (!newEvt.date || !newEvt.event.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${scheduleChild}/schedule/events`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvt)
      });
      setNewEvt({ date: '', event: '' });
      await fetchSchedule(scheduleChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const deleteEvent = async (index: number) => {
    await fetch(`${basePath}/forge-api/children/${scheduleChild}/schedule/events/${index}`, { method: 'DELETE' });
    await fetchSchedule(scheduleChild);
  };

  const fetchCurriculum = async (childId: string) => {
    const res = await fetch(`${basePath}/forge-api/children/${childId}/resources`);
    const data = await res.json();
    setCurrData(prev => ({ ...prev, [childId]: data.curriculum || [] }));
  };

  const saveCurrEdit = async (itemId: string) => {
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${currChild}/resources/curriculum/${itemId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCurrForm)
      });
      setEditingCurrId(null);
      await fetchCurriculum(currChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const finishSetup = async () => {
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/setup-complete`, { method: 'POST' });
      onComplete();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const currentSched = scheduleData[scheduleChild] || { weeklyActivities: [], upcomingEvents: [] };
  const currentCurr = currData[currChild] || [];

  return (
    <div className="setup-wizard">
      <header className="sw-header">
        <div className="admin-wordmark">For<span>ge</span></div>
        <button className="admin-logout" onClick={onLogout}>â Exit</button>
      </header>
      <div className="sw-progress">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className={`sw-progress-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <div className="sw-step-dot">{i < step ? 'â' : i + 1}</div>
            <div className="sw-step-label">{label}</div>
          </div>
        ))}
        <div className="sw-progress-bar"><div className="sw-progress-fill" style={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }} /></div>
      </div>
      <div className="sw-content">
        {step === 0 && (
          <div className="sw-step sw-welcome">
            <div className="sw-welcome-icon">ð¥</div>
            <h1 className="sw-title">Welcome to Forge</h1>
            <p className="sw-subtitle">Before your children start, let's set up their profiles. This takes about 10 minutes and gives the agents everything they need to know your family.</p>
            <button className="sw-primary-btn" onClick={() => setStep(1)}>Let's Start</button>
          </div>
        )}

        {step === 1 && (
          <div className="sw-step sw-profiles">
            <h2 className="sw-step-title">Tell Us About Your Children</h2>
            <p className="sw-step-desc">The more the agents know, the better they can connect with each child from the very first session.</p>
            <div className="sw-child-cards">
              {CHILDREN.map(id => {
                const info = CHILD_INFO[id];
                return (
                  <div key={id} className="sw-child-card">
                    <div className="sw-child-card-header">
                      <span className="sw-child-emoji">{info.emoji}</span>
                      <div>
                        <div className="sw-child-name">{info.name}</div>
                        <div className="sw-child-agent">Agent: {info.agent}</div>
                      </div>
                    </div>
                    <label className="sw-label">About {info.name} â What should {info.agent} know?</label>
                    <textarea
                      className="sw-textarea"
                      value={aboutTexts[id]}
                      onChange={e => setAboutTexts(prev => ({ ...prev, [id]: e.target.value }))}
                      placeholder={`Tell us about ${info.name}'s personality, interests, how they communicate, what they find challenging, anything the agent should know before meeting them.`}
                      rows={5}
                    />
                  </div>
                );
              })}
            </div>
            <div className="sw-nav-buttons">
              <button className="sw-back-btn" onClick={() => setStep(0)}>â Back</button>
              <button className="sw-primary-btn" onClick={async () => { await saveAllAbouts(); setStep(2); }} disabled={saving}>{saving ? 'Saving...' : 'Next â'}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="sw-step sw-schedule">
            <h2 className="sw-step-title">Your Children's Schedule</h2>
            <p className="sw-step-desc">Add regular weekly activities and upcoming events. This helps the agents connect sessions to real life.</p>
            <div className="bp-child-tabs">
              {CHILDREN.map(id => (
                <button key={id} className={`bp-child-tab ${scheduleChild === id ? 'active' : ''}`} onClick={() => setScheduleChild(id)}>{CHILD_INFO[id].name}</button>
              ))}
            </div>
            <div className="sw-schedule-section">
              <div className="sw-mini-title">Weekly Activities</div>
              <div className="sw-inline-form">
                <select className="ls-select" value={newAct.day} onChange={e => setNewAct({ ...newAct, day: e.target.value })}>
                  {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input className="ls-input" placeholder="Activity" value={newAct.activity} onChange={e => setNewAct({ ...newAct, activity: e.target.value })} />
                <input className="ls-input ls-input-sm" placeholder="Time" value={newAct.time} onChange={e => setNewAct({ ...newAct, time: e.target.value })} />
                <button className="ls-add-btn" onClick={addActivity} disabled={saving || !newAct.activity.trim()}>Add</button>
              </div>
              {currentSched.weeklyActivities.length > 0 && (
                <div className="sw-item-list">
                  {currentSched.weeklyActivities.map((a: any, i: number) => (
                    <div key={i} className="sw-item">
                      <span className="sw-item-day">{a.day}</span>
                      <span className="sw-item-name">{a.activity}</span>
                      {a.time && <span className="sw-item-time">{a.time}</span>}
                      <button className="ls-delete-btn" onClick={() => deleteActivity(i)}>Ã</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="sw-schedule-section">
              <div className="sw-mini-title">Upcoming Events</div>
              <div className="sw-inline-form">
                <input className="ls-input ls-input-date" type="date" value={newEvt.date} onChange={e => setNewEvt({ ...newEvt, date: e.target.value })} />
                <input className="ls-input" placeholder="Event name" value={newEvt.event} onChange={e => setNewEvt({ ...newEvt, event: e.target.value })} />
                <button className="ls-add-btn" onClick={addEvent} disabled={saving || !newEvt.date || !newEvt.event.trim()}>Add</button>
              </div>
              {currentSched.upcomingEvents.length > 0 && (
                <div className="sw-item-list">
                  {currentSched.upcomingEvents.map((e: any, i: number) => (
                    <div key={i} className="sw-item">
                      <span className="sw-item-day">{e.date}</span>
                      <span className="sw-item-name">{e.event}</span>
                      <button className="ls-delete-btn" onClick={() => deleteEvent(i)}>Ã</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="sw-nav-buttons">
              <button className="sw-back-btn" onClick={() => setStep(1)}>â Back</button>
              <button className="sw-primary-btn" onClick={() => setStep(3)}>Next â</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="sw-step sw-curriculum">
            <h2 className="sw-step-title">Review Curriculum</h2>
            <p className="sw-step-desc">We've pre-loaded your family's curriculum. Update chapter/lesson info so the agents know where each child is right now.</p>
            <div className="bp-child-tabs">
              {CHILDREN.map(id => (
                <button key={id} className={`bp-child-tab ${currChild === id ? 'active' : ''}`} onClick={() => setCurrChild(id)}>{CHILD_INFO[id].name}</button>
              ))}
            </div>
            <div className="sw-curriculum-list">
              {currentCurr.map((c: any) => (
                <div key={c.id} className="sw-curr-item">
                  {editingCurrId === c.id ? (
                    <div className="sw-curr-edit">
                      <div className="sw-curr-edit-header">{c.subject}: {c.name}</div>
                      <div className="sw-inline-form">
                        <input className="ls-input" placeholder="Current chapter" value={editCurrForm.currentChapter || ''} onChange={e => setEditCurrForm({ ...editCurrForm, currentChapter: e.target.value })} />
                        <input className="ls-input" placeholder="Current lesson" value={editCurrForm.currentLesson || ''} onChange={e => setEditCurrForm({ ...editCurrForm, currentLesson: e.target.value })} />
                      </div>
                      <textarea className="rs-textarea" placeholder="Notes for agent" value={editCurrForm.notes || ''} onChange={e => setEditCurrForm({ ...editCurrForm, notes: e.target.value })} rows={2} />
                      <div className="sw-inline-form">
                        <button className="ls-add-btn" onClick={() => saveCurrEdit(c.id)} disabled={saving}>Save</button>
                        <button className="rs-cancel-btn" onClick={() => setEditingCurrId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="sw-curr-display" onClick={() => { setEditingCurrId(c.id); setEditCurrForm({ currentChapter: c.currentChapter, currentLesson: c.currentLesson, notes: c.notes }); }}>
                      <div className="sw-curr-subject">{c.subject}</div>
                      <div className="sw-curr-name">{c.name}</div>
                      {(c.currentChapter || c.currentLesson) && (
                        <div className="sw-curr-progress">{c.currentChapter && `Ch: ${c.currentChapter}`}{c.currentChapter && c.currentLesson && ' Â· '}{c.currentLesson && `Lesson: ${c.currentLesson}`}</div>
                      )}
                      {c.notes && <div className="sw-curr-notes">{c.notes}</div>}
                      <div className="sw-curr-edit-hint">tap to edit</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="sw-nav-buttons">
              <button className="sw-back-btn" onClick={() => setStep(2)}>â Back</button>
              <button className="sw-primary-btn" onClick={() => setStep(4)}>Next â</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="sw-step sw-ready">
            <div className="sw-welcome-icon">â¨</div>
            <h1 className="sw-title">You're All Set</h1>
            <p className="sw-subtitle">Your children's profiles, schedules, and curriculum are ready. When they log in for the first time, their agent will introduce themselves and get to know them in a real conversation.</p>
            <div className="sw-ready-children">
              {CHILDREN.map(id => {
                const info = CHILD_INFO[id];
                return (
                  <div key={id} className="sw-ready-child">
                    <span className="sw-child-emoji">{info.emoji}</span>
                    <div>
                      <div className="sw-child-name">{info.name}</div>
                      <div className="sw-child-agent">{info.agent} is ready to meet them</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sw-nav-buttons sw-center">
              <button className="sw-back-btn" onClick={() => setStep(3)}>â Back</button>
              <button className="sw-primary-btn sw-finish-btn" onClick={finishSetup} disabled={saving}>{saving ? 'Finishing...' : 'Open Dashboard â'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewPanel({ data, onChildSelect }: any) {
  const CHILD_COLORS: Record<string, string> = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  const CHILD_EMOJIS: Record<string, string> = { everly: 'â¡', isla: 'ð¥', weston: 'â³' };
  const urgentSafety = data.recentSafetyEvents?.filter((e: any) => e.tier >= 2) || [];
  return (
    <div className="overview-panel">
      {urgentSafety.length > 0 && (
        <div className="safety-alert">
          <div className="alert-icon">â ï¸</div>
          <div className="alert-content">
            <div className="alert-title">Safety events need your attention</div>
            <div className="alert-sub">{urgentSafety.length} recent event{urgentSafety.length > 1 ? 's' : ''} &mdash; review Safety Log</div>
          </div>
        </div>
      )}
      <div className="panel-section-title">Children</div>
      <div className="children-list">
        {(data.children || []).map((child: any) => (
          <button key={child.id} className="child-overview-card" onClick={() => onChildSelect(child.id)}>
            <div className="coc-left">
              <div className="coc-avatar" style={{ background: CHILD_COLORS[child.id] }}>{CHILD_EMOJIS[child.id]}</div>
              <div className="coc-info">
                <div className="coc-name">{child.name}</div>
                <div className="coc-details">Age {child.age} Â· Stage {child.stage}{child.streak?.current > 0 && ` Â· ð¥ ${child.streak.current} streak`}</div>
                <div className="coc-domains">
                  {child.domains?.map((d: any) => (
                    <span key={d.name} className="coc-domain-pip" style={{ background: DOMAIN_COLORS[d.name] || '#555' }} title={`${DOMAIN_LABELS[d.name] || d.name}: L${d.currentLevel}${d.advancementFlagged ? ' â' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="coc-right">
              <div className="coc-sessions">{child.recentSessions?.length || 0} recent sessions</div>
              <div className="coc-portfolio">{child.portfolioCount} portfolio items</div>
              <div className="coc-arrow">â</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChildDetailPanel({ child, onBack, onConfirmAdvancement }: any) {
  return (
    <div className="child-detail-panel">
      <button className="back-link" onClick={onBack}>â Back to Overview</button>
      <div className="child-detail-header">
        <div className="cdh-name">{child.name}</div>
        <div className="cdh-meta">Age {child.age} Â· Stage {child.stage} Â· {child.primaryAgent?.name}</div>
      </div>
      {child.s2sProfile && (
        <div className="detail-section">
          <div className="detail-section-title">S2S Assessment</div>
          <div className="s2s-grid">
            {[{ label: 'Fine Motor', value: child.s2sProfile.fineMotor, goal: 75 }, { label: 'Eye Tracking', value: child.s2sProfile.eyeTrackingAccuracy, goal: 90 }, { label: 'Bilateral Coord.', value: child.s2sProfile.bilateralCoordination, goal: 85 }, { label: 'Primitive Reflexes', value: child.s2sProfile.primitiveReflexes, goal: 80 }].map(metric => (
              <div key={metric.label} className="s2s-metric">
                <div className="s2s-metric-label">{metric.label}</div>
                <div className="s2s-metric-value" style={{ color: metric.value >= metric.goal ? '#16a34a' : '#dc2626' }}>{metric.value}%</div>
                <div className="s2s-metric-goal">Goal: {metric.goal}%</div>
                <div className="s2s-bar"><div className="s2s-bar-fill" style={{ width: `${metric.value}%`, background: metric.value >= metric.goal ? '#16a34a' : '#dc2626' }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="detail-section">
        <div className="detail-section-title">Domain Progress</div>
        <div className="domain-detail-list">
          {Object.entries(child.domains || {}).map(([key, domain]: [string, any]) => (
            <div key={key} className="domain-detail-row">
              <div className="ddr-left">
                <div className="ddr-name">{DOMAIN_LABELS[key] || key}</div>
                <div className="ddr-missions">{domain.missionsCompleted?.length || 0} missions completed</div>
              </div>
              <div className="ddr-right">
                <div className="ddr-level" style={{ background: DOMAIN_COLORS[key] }}>L{domain.currentLevel}</div>
                {domain.advancementFlagged && !domain.advancementConfirmed && (
                  <button className="advance-btn" onClick={() => onConfirmAdvancement(child.id, key)}>Advance â</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="detail-section">
        <div className="detail-section-title">Recent Sessions</div>
        {child.sessions?.length === 0 ? <div className="detail-empty">No sessions yet</div> : (
          <div className="sessions-list">
            {(child.sessions || []).slice(0, 10).map((session: any, i: number) => (
              <div key={i} className="session-row">
                <div className="sr-domain" style={{ color: DOMAIN_COLORS[session.domain] || '#888' }}>{DOMAIN_LABELS[session.domain] || session.domain}</div>
                <div className="sr-date">{session.date}</div>
                <div className="sr-duration">{session.duration ? `${session.duration}m` : 'In progress'}</div>
                <div className={`sr-status ${session.status}`}>{session.status === 'locked' ? 'ð' : session.status === 'complete' ? 'â' : 'â'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="detail-section">
        <div className="detail-section-title">What {child.primaryAgent?.name} Knows</div>
        <div className="memory-box">
          <div className="memory-item"><div className="memory-label">Profile</div><div className="memory-text">{child.agentMemory?.personalityProfile || 'â'}</div></div>
          <div className="memory-item"><div className="memory-label">Known Strengths</div><div className="memory-text">{child.agentMemory?.knownStrengths?.join(', ') || 'â'}</div></div>
          <div className="memory-item"><div className="memory-label">Growth Areas</div><div className="memory-text">{child.agentMemory?.knownChallenges?.join(', ') || 'â'}</div></div>
          <div className="memory-item"><div className="memory-label">Last Session</div><div className="memory-text">{child.agentMemory?.lastSessionSummary || 'No sessions yet'}</div></div>
        </div>
      </div>
    </div>
  );
}

function SafetyPanel({ events }: any) {
  const tierColors: Record<number, string> = { 1: '#d97706', 2: '#dc2626', 3: '#7f1d1d' };
  const tierLabels: Record<number, string> = { 1: 'Soft Redirect', 2: 'Parent Notified', 3: 'URGENT â Session Locked' };
  return (
    <div className="safety-panel">
      <div className="panel-section-title">Safety Log</div>
      <div className="safety-note">All events are logged permanently. Tier 2 and Tier 3 events trigger parent notification.</div>
      {events.length === 0 ? (
        <div className="detail-empty safety-clear">
          <div>â No safety events recorded</div>
          <div className="safety-clear-sub">The log will appear here if any events occur</div>
        </div>
      ) : (
        <div className="safety-list">
          {events.map((event: any, i: number) => (
            <div key={i} className="safety-event" style={{ borderLeftColor: tierColors[event.tier] }}>
              <div className="se-header">
                <div className="se-child">{event.childName}</div>
                <div className="se-tier" style={{ color: tierColors[event.tier] }}>Tier {event.tier} &mdash; {tierLabels[event.tier]}</div>
                <div className="se-time">{new Date(event.timestamp).toLocaleDateString()}</div>
              </div>
              <div className="se-trigger">{event.trigger}</div>
              {event.flaggedContent && <div className="se-content">"{event.flaggedContent}"</div>}
              <div className="se-footer">
                {event.parentNotified ? 'â Parents notified' : 'Logged only'}
                {!event.parentReviewed && event.tier >= 2 && <span className="se-unreviewed"> Â· Unreviewed</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BriefsPanel({ basePath }: { basePath: string }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_NAMES: Record<string, string> = { everly: 'Everly', isla: 'Isla', weston: 'Weston' };
  const [selectedChild, setSelectedChild] = useState('everly');
  const [briefs, setBriefs] = useState<any[]>([]);
  const [digests, setDigests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedBriefId, setSelectedBriefId] = useState<string>('');
  const [selectedDigestId, setSelectedDigestId] = useState<string>('');

  useEffect(() => { fetchData(selectedChild); }, [selectedChild]);

  const fetchData = async (childId: string) => {
    setLoading(true);
    try {
      const [bRes, dRes] = await Promise.all([
        fetch(`${basePath}/forge-api/admin/briefs/${childId}`),
        fetch(`${basePath}/forge-api/admin/digests/${childId}`)
      ]);
      const bData = await bRes.json();
      const dData = await dRes.json();
      setBriefs(bData.briefs || []);
      setDigests(dData.digests || []);
    } catch (err) { console.error('Briefs fetch error:', err); }
    finally { setLoading(false); }
  };

  const handleGenerateDigest = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`${basePath}/forge-api/admin/weekly-digest/${selectedChild}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) await fetchData(selectedChild);
    } catch (err) { console.error('Digest error:', err); }
    finally { setGenerating(false); }
  };

  return (
    <div className="briefs-panel">
      <div className="panel-section-title">Session Briefs & Weekly Digests</div>
      <div className="bp-child-tabs">
        {CHILDREN.map(id => (
          <button key={id} className={`bp-child-tab ${selectedChild === id ? 'active' : ''}`} onClick={() => setSelectedChild(id)}>{CHILD_NAMES[id]}</button>
        ))}
      </div>
      {loading ? <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading...</div> : (
        <>
          <div className="bp-section">
            <div className="bp-section-header">
              <div className="bp-section-title">Weekly Digest</div>
              <button className="bp-generate-btn" onClick={handleGenerateDigest} disabled={generating}>{generating ? 'Generating...' : 'Generate This Week'}</button>
            </div>
            {digests.length === 0 ? (
              <div className="bp-empty">No weekly digests yet. Click "Generate This Week" to create one.</div>
            ) : (
              <div className="bp-digest-list">
                {[...digests].sort((a: any, b: any) => (b.date || '').localeCompare(a.date || '')).map((d: any) => {
                  const isOpen = selectedDigestId === d.id;
                  return (
                    <div key={d.id} className="bp-digest-card" style={{ marginBottom: '0.4rem' }}>
                      <div
                        onClick={() => setSelectedDigestId(isOpen ? '' : d.id)}
                        style={{ cursor: 'pointer', padding: '0.6rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: isOpen ? '#1a1a1a' : 'transparent' }}
                      >
                        <div style={{ color: '#aaa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '110px' }}>{d.date}</div>
                        <div style={{ flex: 1, color: '#ccc', fontSize: '0.9rem' }}>Weekly Digest</div>
                        <div style={{ color: '#888', fontSize: '0.85rem' }}>{isOpen ? 'Hide' : 'View'}</div>
                      </div>
                      {isOpen && (
                        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #222' }}>
                          <div className="bp-digest-content" dangerouslySetInnerHTML={{ __html: formatMarkdown(d.content) }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bp-section">
            <div className="bp-section-title">Daily Session Briefs</div>
            {briefs.length === 0 ? (
              <div className="bp-empty">No session briefs yet. Briefs are generated automatically after each session.</div>
            ) : (
              <div className="bp-brief-list">
                {(() => {
                  const sorted = [...briefs].sort((a: any, b: any) => (b.date || '').localeCompare(a.date || ''));
                  const byDate: Record<string, any[]> = {};
                  for (const b of sorted) {
                    const k = b.date || 'unknown';
                    if (!byDate[k]) byDate[k] = [];
                    byDate[k].push(b);
                  }
                  const dateKeys = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
                  return dateKeys.map(dateKey => (
                    <div key={dateKey} style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{dateKey}</div>
                      {byDate[dateKey].map((b: any) => {
                        const isOpen = selectedBriefId === b.id;
                        return (
                          <div key={b.id} className="bp-brief-card" style={{ marginBottom: '0.4rem' }}>
                            <div
                              onClick={() => setSelectedBriefId(isOpen ? '' : b.id)}
                              style={{ cursor: 'pointer', padding: '0.6rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: isOpen ? '#1a1a1a' : 'transparent' }}
                            >
                              <div style={{ color: DOMAIN_COLORS[b.domain] || '#888', fontWeight: 600, minWidth: '110px' }}>{DOMAIN_LABELS[b.domain] || b.domain}</div>
                              <div style={{ flex: 1, color: '#ccc', fontSize: '0.9rem' }}>{b.duration}m session</div>
                              <div style={{ color: '#888', fontSize: '0.85rem' }}>{isOpen ? 'Hide' : 'View'}</div>
                            </div>
                            {isOpen && (
                              <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #222' }}>
                                <div className="bp-brief-content" dangerouslySetInnerHTML={{ __html: formatMarkdown(b.content) }} />
                                {b.continueAtHome && (
                                  <div className="bp-continue-home">
                                    <div className="bp-continue-home-label">How to continue this at home</div>
                                    <div className="bp-continue-home-text" dangerouslySetInnerHTML={{ __html: formatMarkdown(b.continueAtHome) }} />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ProgressPanel({ basePath }: { basePath: string }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_NAMES: Record<string, string> = { everly: 'Everly', isla: 'Isla', weston: 'Weston' };
  const [selectedChild, setSelectedChild] = useState('everly');
  const [history, setHistory] = useState<any[]>([]);
  const [currentDomains, setCurrentDomains] = useState<any>({});
  const [missionProgress, setMissionProgress] = useState<any>({});
  const [stuck, setStuck] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProgress(selectedChild); }, [selectedChild]);

  const fetchProgress = async (childId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/forge-api/admin/progress/${childId}`);
      const data = await res.json();
      setHistory(data.history || []);
      setCurrentDomains(data.currentDomains || {});
      setMissionProgress(data.missionProgress || {});
      setStuck(data.stuck || {});
    } catch (err) { console.error('Progress fetch error:', err); }
    finally { setLoading(false); }
  };

  const chartData = () => {
    if (history.length === 0) return null;
    const labels = history.map((h: any) => h.date);
    const domainKeys = Object.keys(DOMAIN_LABELS);
    const datasets = domainKeys.map(key => ({
      label: DOMAIN_LABELS[key],
      data: history.map((h: any) => h.domains?.[key] ?? null),
      borderColor: DOMAIN_COLORS[key],
      backgroundColor: DOMAIN_COLORS[key] + '33',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }));
    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#888', font: { size: 11, family: 'DM Sans' }, boxWidth: 12, padding: 12 } },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: '#555', font: { size: 10 } }, grid: { color: '#1a1a1a' } },
      y: { ticks: { color: '#555', font: { size: 10 }, stepSize: 1 }, grid: { color: '#1a1a1a' }, title: { display: true, text: 'Level', color: '#444', font: { size: 11 } } }
    }
  };

  const MASTERY_COLORS: Record<number, string> = { 0: '#555', 1: '#c9922a', 2: '#e07b20', 3: '#2a9d5c' };
  const MASTERY_LABELS: Record<number, string> = { 0: 'No signal', 1: 'L1 reached', 2: 'L2 reached', 3: 'Mastered' };
  const MASTERY_BG: Record<number, string> = { 0: '#2a2a2a', 1: '#3d2e10', 2: '#4a2e08', 3: '#0d3320' };
  const MISSION_TITLES: Record<string, string> = {
    'IJ-L5-001': 'What Do I Actually Believe?',
    'IJ-L5-002': 'When the Crowd Is Wrong',
    'IJ-L5-003': 'Hard Calls With No Right Answer',
    'IJ-L5-004': 'Building Your Own Framework',
    'IJ-L5-005': 'The Courage to Stand Alone',
    'IJ-L3-001': 'Who Am I?',
    'IJ-L3-002': 'What Makes Me Different',
    'IJ-L3-003': 'My Values Compass',
    'CP-L5-001': 'Argue Like You Mean It',
    'CP-L5-002': 'The Art of Persuasion',
    'CP-L5-003': 'Speaking Truth to Power',
    'CP-L3-001': 'Finding My Voice',
    'CP-L3-002': 'Telling a Great Story',
    'CP-L3-003': 'Listening to Understand',
    'BE-L6-001': 'From Idea to Action',
    'BE-L6-002': 'Revenue & Real Numbers',
    'BE-L6-003': 'Scaling What Works',
    'BE-L4-001': 'My First Business Idea',
    'BE-L4-002': 'Making Something People Want',
    'BE-L4-003': 'Solving Real Problems',
    'HF-L4-001': 'Reading the Room',
    'HF-L4-002': 'Conflict Without Casualties',
    'HF-L4-003': 'The Empathy Edge',
    'HF-L3-001': 'Understanding Feelings',
    'HF-L3-002': 'Making Friends',
    'HF-L3-003': 'When Things Get Hard',
    'AI-L5-001': 'How AI Actually Thinks',
    'AI-L5-002': 'Prompt Engineering Mastery',
    'AI-L5-003': 'Building With AI',
    'AI-L3-001': 'What Is AI?',
    'AI-L3-002': 'AI as a Tool',
    'PM-L6-001': 'Mind-Body Connection',
    'PM-L6-002': 'Performance Under Pressure',
    'PM-L6-003': 'Training Like a Pro',
    'PM-L4-001': 'My Body, My Tool',
    'PM-L4-002': 'Practice Makes Progress',
    'W-001': 'My Favorite Things',
    'W-002': 'Why Things Work',
    'W-003': 'Moving & Exploring',
    'W-004': 'How People Feel',
    'W-005': 'Talking to Machines',
    'W-006': 'Being a Good Friend',
    'W-008': 'Show & Tell',
    'W-009': 'Building With My Hands',
    'W-011': 'My Lemonade Stand',
    'W-012': 'Big Feelings',
    'W-014': 'Golf & Games',
    'W-015': 'Robot Friends',
  };
  const getMissionTitle = (mid: string) => MISSION_TITLES[mid] || mid;

  return (
    <div className="progress-panel">
      <div className="panel-section-title">Domain Progress</div>
      <div className="bp-child-tabs">
        {CHILDREN.map(id => (
          <button key={id} className={`bp-child-tab ${selectedChild === id ? 'active' : ''}`} onClick={() => setSelectedChild(id)}>{CHILD_NAMES[id]}</button>
        ))}
      </div>
      {loading ? <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading...</div> : (
        <>
          <div className="pp-current-levels">
            {Object.entries(currentDomains).map(([key, domain]: [string, any]) => (
              <div key={key} className="pp-level-chip" style={{ borderColor: DOMAIN_COLORS[key] || '#555' }}>
                <span className="pp-level-label">{DOMAIN_LABELS[key] || key}</span>
                <span className="pp-level-value" style={{ color: DOMAIN_COLORS[key] }}>L{domain.currentLevel}</span>
              </div>
            ))}
          </div>

          {Object.keys(stuck).length > 0 && (
            <div className="pp-stuck-alerts">
              {Object.entries(stuck).map(([domain, info]: [string, any]) => (
                <div key={domain} className="pp-stuck-alert">
                  <span className="pp-stuck-icon">â ï¸</span>
                  <span>Stuck on <strong>{getMissionTitle(info.missionId)}</strong> in {DOMAIN_LABELS[domain] || domain} â {info.attempts} attempts since {info.since}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pp-missions-section">
            <div className="detail-section-title">Mission Progress</div>
            {Object.entries(currentDomains).map(([domainKey, domain]: [string, any]) => {
              const missions = domain.missionsAvailable || [];
              const completed = domain.missionsCompleted || [];
              if (missions.length === 0) return null;
              return (
                <div key={domainKey} className="pp-domain-missions">
                  <div className="pp-domain-missions-header">
                    <span className="pp-domain-name" style={{ color: DOMAIN_COLORS[domainKey] }}>{DOMAIN_LABELS[domainKey] || domainKey}</span>
                    <span className="pp-domain-count">{completed.length}/{missions.length}</span>
                  </div>
                  <div className="pp-mission-bar">
                    <div className="pp-mission-fill" style={{ width: `${(completed.length / missions.length) * 100}%`, background: DOMAIN_COLORS[domainKey] }} />
                  </div>
                  <div className="pp-mission-list">
                    {missions.map((mid: string) => {
                      const mp = missionProgress[mid];
                      const isCompleted = completed.includes(mid) || mp?.completed;
                      const mastery = mp?.masteryLevel || 0;
                      return (
                        <div key={mid} className={`pp-mission-item ${isCompleted ? 'completed' : ''}`}>
                          <span className="pp-mission-id">{getMissionTitle(mid)}</span>
                          {mp && (
                            <span className="pp-mission-meta">
                              {mp.attempts} {mp.attempts === 1 ? 'attempt' : 'attempts'}
                              {(mastery > 0 || (mp && mp.attempts > 0)) && (
                                <span className="pp-mastery-badge" style={{ color: MASTERY_COLORS[mastery], background: MASTERY_BG[mastery], padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{MASTERY_LABELS[mastery]}</span>
                              )}
                              {mp && mp.stuckFlag && (
                                <span className="pp-stuck-badge" style={{ color: '#ff4444', background: '#2d0a0a', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>Stuck</span>
                              )}
                            </span>
                          )}
                          {isCompleted && <span className="pp-mission-check">â</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {data ? (
            <div className="pp-chart-container">
              <Line data={data} options={chartOptions} />
            </div>
          ) : (
            <div className="bp-empty">No progress history yet. Data is recorded after each session.</div>
          )}
        </>
      )}
    </div>
  );
}

function MessagesPanel({ basePath }: { basePath: string }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_NAMES: Record<string, string> = { everly: 'Everly', isla: 'Isla', weston: 'Weston' };
  const AGENT_NAMES: Record<string, string> = { everly: 'Vera', isla: 'Ren', weston: 'Ozzy' };
  const [selectedChild, setSelectedChild] = useState('everly');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchMessages(selectedChild); }, [selectedChild]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const fetchMessages = async (childId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/forge-api/admin/messages/${childId}`);
      const data = await res.json();
      setMessages(data.messages || []);
      fetch(`${basePath}/forge-api/admin/messages/${childId}/read`, { method: 'PUT' });
    } catch (err) { console.error('Messages fetch error:', err); }
    finally { setLoading(false); }
  };

  const handleSend = async () => {
    if (!newMsg.trim() || sending) return;
    setSending(true);
    try {
      await fetch(`${basePath}/forge-api/admin/messages/${selectedChild}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMsg.trim() })
      });
      setNewMsg('');
      await fetchMessages(selectedChild);
    } catch (err) { console.error('Send error:', err); }
    finally { setSending(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="messages-panel">
      <div className="panel-section-title">ParentâAgent Inbox</div>
      <div className="bp-child-tabs">
        {CHILDREN.map(id => (
          <button key={id} className={`bp-child-tab ${selectedChild === id ? 'active' : ''}`} onClick={() => setSelectedChild(id)}>
            {CHILD_NAMES[id]}
            <span className="mp-agent-tag">{AGENT_NAMES[id]}</span>
          </button>
        ))}
      </div>
      {loading ? <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading...</div> : (
        <div className="mp-chat-container">
          <div className="mp-messages" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="mp-empty">{AGENT_NAMES[selectedChild]} will send messages here after sessions. You can also message {AGENT_NAMES[selectedChild]} directly.</div>
            ) : (
              messages.map((m: any) => (
                <div key={m.id} className={`mp-bubble ${m.from === 'parent' ? 'mp-parent' : 'mp-agent'}`}>
                  <div className="mp-bubble-sender">{m.from === 'parent' ? 'You' : m.agentName || AGENT_NAMES[selectedChild]}</div>
                  <div className="mp-bubble-content">{m.content}</div>
                  <div className="mp-bubble-time">{new Date(m.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
                </div>
              ))
            )}
            {sending && <div className="mp-typing">{AGENT_NAMES[selectedChild]} is typing...</div>}
          </div>
          <div className="mp-input-bar">
            <textarea className="mp-input" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={handleKeyDown} placeholder={`Message ${AGENT_NAMES[selectedChild]}...`} rows={1} />
            <button className="mp-send-btn" onClick={handleSend} disabled={!newMsg.trim() || sending}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChildrenEditorPanel({ basePath }: { basePath: string }) {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, any>>({});
  const [pinConfirms, setPinConfirms] = useState<Record<string, string>>({});
  const [originalPins, setOriginalPins] = useState<Record<string, string>>({});

  useEffect(() => { fetchChildren(); }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch(`${basePath}/forge-api/admin/overview`);
      const data = await res.json();
      const childIds = (data.children || []).map((c: any) => c.id);
      const full = await Promise.all(childIds.map(async (id: string) => {
        const r = await fetch(`${basePath}/forge-api/admin/child/${id}`);
        return r.json();
      }));
      setChildren(full);
      const initial: Record<string, any> = {};
      const origPins: Record<string, string> = {};
      full.forEach((c: any) => {
        initial[c.id] = { name: c.name, age: c.age, pin: c.pin, about: c.agentMemory?.personalityProfile || '' };
        origPins[c.id] = c.pin;
      });
      setEdits(initial);
      setOriginalPins(origPins);
    } catch (err) { console.error('Failed to fetch children:', err); }
    finally { setLoading(false); }
  };

  const updateField = (childId: string, field: string, value: any) => {
    setEdits(prev => ({ ...prev, [childId]: { ...prev[childId], [field]: value } }));
  };

  const handleSave = async (childId: string) => {
    const edit = edits[childId];
    const pinChanged = edit.pin !== originalPins[childId];
    if (pinChanged) {
      if (!edit.pin || pinConfirms[childId] !== edit.pin) {
        alert('PIN and confirm PIN do not match.');
        return;
      }
    }
    setSaving(childId);
    setSaved(null);
    try {
      const body: any = { name: edit.name, age: edit.age, about: edit.about };
      if (pinChanged && edit.pin) body.pin = edit.pin;
      await fetch(`${basePath}/forge-api/admin/child/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setSaved(childId);
      setTimeout(() => setSaved(null), 2000);
    } catch (err) { console.error('Save error:', err); }
    finally { setSaving(null); }
  };

  if (loading) return <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading children...</div>;

  const CHILD_COLORS: Record<string, string> = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };

  return (
    <div className="children-editor-panel">
      <div className="panel-section-title">Child Profiles</div>
      <div className="ce-subtitle">Edit each child's profile. The About text is sent to the agent so Vera, Ren, and Ozzy know the child personally.</div>
      <div className="ce-cards">
        {children.map((child: any) => {
          const edit = edits[child.id] || {};
          return (
            <div key={child.id} className="ce-card" style={{ borderTopColor: CHILD_COLORS[child.id] || '#555' }}>
              <div className="ce-card-header">
                <div className="ce-card-name">{child.name}</div>
                <div className="ce-card-agent">{child.primaryAgent?.name}</div>
              </div>
              <div className="ce-field">
                <label className="ce-label">Name</label>
                <input className="ce-input" type="text" value={edit.name || ''} onChange={e => updateField(child.id, 'name', e.target.value)} />
              </div>
              <div className="ce-field">
                <label className="ce-label">Age</label>
                <input className="ce-input" type="number" min="1" max="18" value={edit.age || ''} onChange={e => updateField(child.id, 'age', e.target.value)} />
              </div>
              <div className="ce-row">
                <div className="ce-field" style={{ flex: 1 }}>
                  <label className="ce-label">PIN</label>
                  <input className="ce-input" type="text" maxLength={4} inputMode="numeric" placeholder="****" value={edit.pin || ''} onChange={e => updateField(child.id, 'pin', e.target.value.replace(/\D/g, '').slice(0, 4))} />
                </div>
                <div className="ce-field" style={{ flex: 1 }}>
                  <label className="ce-label">Confirm PIN</label>
                  <input className="ce-input" type="text" maxLength={4} inputMode="numeric" placeholder="****" value={pinConfirms[child.id] || ''} onChange={e => setPinConfirms(prev => ({ ...prev, [child.id]: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                </div>
              </div>
              <div className="ce-field">
                <label className="ce-label">About â what the agent should know</label>
                <textarea className="ce-textarea" rows={6} value={edit.about || ''} onChange={e => updateField(child.id, 'about', e.target.value)} placeholder="Personality notes, learning style, motivation, frustration triggers, S2S assessment notes, neurological context, anything the agent should know..." />
                <div className="ce-hint">This text is injected into {child.primaryAgent?.name}'s system prompt so the agent knows {child.name} personally.</div>
              </div>
              <button className="ce-save-btn" onClick={() => handleSave(child.id)} disabled={saving === child.id}>
                {saving === child.id ? 'Saving...' : saved === child.id ? 'Saved' : 'Save Changes'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResourcesPanel({ basePath }: { basePath: string }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_NAMES: Record<string, string> = { everly: 'Everly', isla: 'Isla', weston: 'Weston' };
  const [selectedChild, setSelectedChild] = useState('everly');
  const [resources, setResources] = useState<any>({ curriculum: [], agentReadingList: [], documents: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<'curriculum' | 'reading' | 'documents'>('curriculum');
  const [editingCurr, setEditingCurr] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [newCurr, setNewCurr] = useState({ subject: '', name: '' });
  const [newReading, setNewReading] = useState({ title: '', author: '', reason: '' });
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('curriculum');
  const [uploadSummary, setUploadSummary] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchResources = async (childId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/forge-api/children/${childId}/resources`);
      setResources(await res.json());
    } catch (err) { console.error('Resources fetch error:', err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchResources(selectedChild); }, [selectedChild]);

  const addCurriculumItem = async () => {
    if (!newCurr.subject.trim() || !newCurr.name.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/curriculum`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCurr)
      });
      setNewCurr({ subject: '', name: '' });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const updateCurriculumItem = async (itemId: string) => {
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/curriculum/${itemId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      setEditingCurr(null);
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const deleteCurriculumItem = async (itemId: string) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/curriculum/${itemId}`, { method: 'DELETE' });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
  };

  const toggleCurriculumActive = async (item: any) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/curriculum/${item.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !item.active })
      });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
  };

  const addReadingItem = async () => {
    if (!newReading.title.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/reading`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReading, parentAdded: true })
      });
      setNewReading({ title: '', author: '', reason: '' });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const updateReadingStatus = async (itemId: string, status: string) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/reading/${itemId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
  };

  const deleteReadingItem = async (itemId: string) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/reading/${itemId}`, { method: 'DELETE' });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
  };

  const uploadDocument = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) return;
    const file = fileInput.files[0];
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', uploadName || file.name);
      formData.append('category', uploadCategory);
      formData.append('summary', uploadSummary);
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/documents`, {
        method: 'POST',
        body: formData
      });
      setUploadName('');
      setUploadSummary('');
      setUploadCategory('curriculum');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/resources/documents/${docId}`, { method: 'DELETE' });
      await fetchResources(selectedChild);
    } catch (err) { console.error(err); }
  };

  const STATUS_LABELS: Record<string, string> = { assigned: 'Assigned', in_progress: 'In Progress', completed: 'Completed' };
  const STATUS_COLORS: Record<string, string> = { assigned: '#f97316', in_progress: '#3b82f6', completed: '#22c55e' };

  return (
    <div className="resources-panel">
      <div className="panel-section-title">Resources</div>
      <div className="rs-subtitle">Manage academic curriculum, agent-assigned reading lists, and uploaded documents. Curriculum context is automatically shared with the learning agents.</div>
      <div className="bp-child-tabs">
        {CHILDREN.map(id => (
          <button key={id} className={`bp-child-tab ${selectedChild === id ? 'active' : ''}`} onClick={() => setSelectedChild(id)}>{CHILD_NAMES[id]}</button>
        ))}
      </div>
      <div className="rs-section-tabs">
        <button className={`rs-section-tab ${section === 'curriculum' ? 'active' : ''}`} onClick={() => setSection('curriculum')}>Academic Curriculum</button>
        <button className={`rs-section-tab ${section === 'reading' ? 'active' : ''}`} onClick={() => setSection('reading')}>Reading List <span className="rs-tab-count">{resources.agentReadingList?.length || 0}</span></button>
        <button className={`rs-section-tab ${section === 'documents' ? 'active' : ''}`} onClick={() => setSection('documents')}>Documents <span className="rs-tab-count">{resources.documents?.length || 0}</span></button>
      </div>
      {loading ? <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading...</div> : (
        <>
          {section === 'curriculum' && (
            <div className="rs-section">
              <div className="rs-section-desc">These are the academic programs your family uses. Agents are aware of this curriculum and will support it â never contradict or replace it.</div>
              <div className="rs-curriculum-list">
                {resources.curriculum.map((c: any) => (
                  <div key={c.id} className={`rs-curr-item ${!c.active ? 'rs-inactive' : ''}`}>
                    {editingCurr === c.id ? (
                      <div className="rs-curr-edit">
                        <div className="rs-edit-row">
                          <input className="ls-input" placeholder="Subject" value={editForm.subject || ''} onChange={e => setEditForm({ ...editForm, subject: e.target.value })} />
                          <input className="ls-input" placeholder="Program name" value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                        </div>
                        <div className="rs-edit-row">
                          <input className="ls-input" placeholder="Current chapter" value={editForm.currentChapter || ''} onChange={e => setEditForm({ ...editForm, currentChapter: e.target.value })} />
                          <input className="ls-input" placeholder="Current lesson" value={editForm.currentLesson || ''} onChange={e => setEditForm({ ...editForm, currentLesson: e.target.value })} />
                        </div>
                        <textarea className="rs-textarea" placeholder="Notes for agent (e.g. skip chapter 5, focus on multiplication)" value={editForm.notes || ''} onChange={e => setEditForm({ ...editForm, notes: e.target.value })} />
                        <div className="rs-edit-actions">
                          <button className="ls-add-btn" onClick={() => updateCurriculumItem(c.id)} disabled={saving}>Save</button>
                          <button className="rs-cancel-btn" onClick={() => setEditingCurr(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="rs-curr-header">
                          <div className="rs-curr-subject">{c.subject}</div>
                          <div className="rs-curr-name">{c.name}</div>
                          <div className="rs-curr-actions">
                            <button className="rs-icon-btn" title={c.active ? 'Deactivate' : 'Activate'} onClick={() => toggleCurriculumActive(c)}>{c.active ? 'â' : 'â'}</button>
                            <button className="rs-icon-btn" onClick={() => { setEditingCurr(c.id); setEditForm({ subject: c.subject, name: c.name, currentChapter: c.currentChapter, currentLesson: c.currentLesson, notes: c.notes }); }}>â</button>
                            <button className="ls-delete-btn" onClick={() => deleteCurriculumItem(c.id)}>Ã</button>
                          </div>
                        </div>
                        {(c.currentChapter || c.currentLesson) && (
                          <div className="rs-curr-progress">
                            {c.currentChapter && <span>Chapter: {c.currentChapter}</span>}
                            {c.currentLesson && <span>Lesson: {c.currentLesson}</span>}
                          </div>
                        )}
                        {c.notes && <div className="rs-curr-notes">{c.notes}</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="rs-add-form">
                <input className="ls-input" placeholder="Subject (e.g. Math)" value={newCurr.subject} onChange={e => setNewCurr({ ...newCurr, subject: e.target.value })} />
                <input className="ls-input" placeholder="Program name" value={newCurr.name} onChange={e => setNewCurr({ ...newCurr, name: e.target.value })} />
                <button className="ls-add-btn" onClick={addCurriculumItem} disabled={saving || !newCurr.subject.trim() || !newCurr.name.trim()}>Add Subject</button>
              </div>
            </div>
          )}

          {section === 'reading' && (
            <div className="rs-section">
              <div className="rs-section-desc">Books and readings assigned by the learning agents based on session content, plus any you add. Agents can see this list and may reference it in sessions.</div>
              {resources.agentReadingList.length === 0 ? (
                <div className="ls-empty">No reading assignments yet. Agents will add recommendations based on sessions, or you can add books below.</div>
              ) : (
                <div className="rs-reading-list">
                  {resources.agentReadingList.map((r: any) => (
                    <div key={r.id} className={`rs-reading-item ${r.status === 'completed' ? 'rs-completed' : ''}`}>
                      <div className="rs-reading-header">
                        <div className="rs-reading-title">"{r.title}"</div>
                        {r.author && <div className="rs-reading-author">by {r.author}</div>}
                        <div className="rs-reading-badge" style={{ color: STATUS_COLORS[r.status] || '#888' }}>{STATUS_LABELS[r.status] || r.status}</div>
                      </div>
                      <div className="rs-reading-meta">
                        <span className="rs-reading-assigned">Assigned by {r.assignedBy} on {r.assignedDate}</span>
                        {r.parentAdded && <span className="rs-parent-badge">Parent Added</span>}
                      </div>
                      {r.reason && <div className="rs-reading-reason">{r.reason}</div>}
                      {r.currentChapter && <div className="rs-reading-chapter">Currently on: {r.currentChapter}</div>}
                      <div className="rs-reading-actions">
                        <select className="ls-select rs-status-select" value={r.status} onChange={e => updateReadingStatus(r.id, e.target.value)}>
                          <option value="assigned">Assigned</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="ls-delete-btn" onClick={() => deleteReadingItem(r.id)}>Ã</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="rs-add-form">
                <input className="ls-input" placeholder="Book title" value={newReading.title} onChange={e => setNewReading({ ...newReading, title: e.target.value })} />
                <input className="ls-input ls-input-sm" placeholder="Author" value={newReading.author} onChange={e => setNewReading({ ...newReading, author: e.target.value })} />
                <input className="ls-input" placeholder="Why this book? (optional)" value={newReading.reason} onChange={e => setNewReading({ ...newReading, reason: e.target.value })} />
                <button className="ls-add-btn" onClick={addReadingItem} disabled={saving || !newReading.title.trim()}>Add Book</button>
              </div>
            </div>
          )}

          {section === 'documents' && (
            <div className="rs-section">
              <div className="rs-section-desc">Upload curriculum guides, syllabi, or reference documents. Document names and summaries will be available to agents for context.</div>
              {resources.documents.length === 0 ? (
                <div className="ls-empty">No documents uploaded yet.</div>
              ) : (
                <div className="rs-doc-list">
                  {resources.documents.map((d: any) => (
                    <div key={d.id} className="rs-doc-item">
                      <div className="rs-doc-icon">ð</div>
                      <div className="rs-doc-info">
                        <div className="rs-doc-name">{d.name}</div>
                        <div className="rs-doc-meta">
                          <span className="rs-doc-category">{d.category}</span>
                          <span className="rs-doc-date">Uploaded {d.uploadDate}</span>
                        </div>
                        {d.summary && <div className="rs-doc-summary">{d.summary}</div>}
                      </div>
                      <button className="ls-delete-btn" onClick={() => deleteDocument(d.id)}>Ã</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="rs-upload-form">
                <div className="rs-upload-row">
                  <input ref={fileInputRef} type="file" className="rs-file-input" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" />
                </div>
                <div className="rs-upload-row">
                  <input className="ls-input" placeholder="Display name (optional)" value={uploadName} onChange={e => setUploadName(e.target.value)} />
                  <select className="ls-select" value={uploadCategory} onChange={e => setUploadCategory(e.target.value)}>
                    <option value="curriculum">Curriculum</option>
                    <option value="syllabus">Syllabus</option>
                    <option value="reference">Reference</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <textarea className="rs-textarea" placeholder="Brief summary of what this document contains (helps agents understand its content)" value={uploadSummary} onChange={e => setUploadSummary(e.target.value)} />
                <button className="ls-add-btn" onClick={uploadDocument} disabled={saving}>Upload Document</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function LifeSchedulePanel({ basePath }: { basePath: string }) {
  const CHILDREN = ['everly', 'isla', 'weston'];
  const CHILD_NAMES: Record<string, string> = { everly: 'Everly', isla: 'Isla', weston: 'Weston' };
  const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedChild, setSelectedChild] = useState('everly');
  const [activities, setActivities] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAct, setNewAct] = useState({ day: 'Monday', activity: '', time: '', notes: '' });
  const [newEvt, setNewEvt] = useState({ date: '', event: '', location: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const fetchSchedule = async (childId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/forge-api/children/${childId}/schedule`);
      const data = await res.json();
      setActivities(data.weeklyActivities || []);
      setEvents(data.upcomingEvents || []);
    } catch (err) { console.error('Life schedule fetch error:', err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSchedule(selectedChild); }, [selectedChild]);

  const addActivity = async () => {
    if (!newAct.activity.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/schedule/activities`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAct)
      });
      setNewAct({ day: 'Monday', activity: '', time: '', notes: '' });
      await fetchSchedule(selectedChild);
    } catch (err) { console.error('Add activity error:', err); }
    finally { setSaving(false); }
  };

  const deleteActivity = async (index: number) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/schedule/activities/${index}`, { method: 'DELETE' });
      await fetchSchedule(selectedChild);
    } catch (err) { console.error('Delete activity error:', err); }
  };

  const addEvent = async () => {
    if (!newEvt.date || !newEvt.event.trim()) return;
    setSaving(true);
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/schedule/events`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvt)
      });
      setNewEvt({ date: '', event: '', location: '', notes: '' });
      await fetchSchedule(selectedChild);
    } catch (err) { console.error('Add event error:', err); }
    finally { setSaving(false); }
  };

  const deleteEvent = async (index: number) => {
    try {
      await fetch(`${basePath}/forge-api/children/${selectedChild}/schedule/events/${index}`, { method: 'DELETE' });
      await fetchSchedule(selectedChild);
    } catch (err) { console.error('Delete event error:', err); }
  };

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Phoenix' });
  const futureEvents = events.filter(e => e.date >= today);
  const pastEvents = events.filter(e => e.date < today);

  const groupedActivities: Record<string, any[]> = {};
  DAYS_OF_WEEK.forEach(d => { groupedActivities[d] = []; });
  activities.forEach((a, i) => {
    if (groupedActivities[a.day]) groupedActivities[a.day].push({ ...a, _index: i });
  });

  return (
    <div className="life-schedule-panel">
      <div className="panel-section-title">Life Schedule</div>
      <div className="ls-subtitle">Manage each child's real-life activities and upcoming events. These are injected into agent prompts so tutors stay connected to what is happening in your child's world.</div>
      <div className="bp-child-tabs">
        {CHILDREN.map(id => (
          <button key={id} className={`bp-child-tab ${selectedChild === id ? 'active' : ''}`} onClick={() => setSelectedChild(id)}>{CHILD_NAMES[id]}</button>
        ))}
      </div>
      {loading ? <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading...</div> : (
        <>
          <div className="ls-section">
            <div className="ls-section-title">Weekly Activities</div>
            <div className="ls-add-form">
              <select className="ls-select" value={newAct.day} onChange={e => setNewAct({ ...newAct, day: e.target.value })}>
                {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input className="ls-input" type="text" placeholder="Activity name" value={newAct.activity} onChange={e => setNewAct({ ...newAct, activity: e.target.value })} />
              <input className="ls-input ls-input-sm" type="text" placeholder="Time (e.g. 4:00 PM)" value={newAct.time} onChange={e => setNewAct({ ...newAct, time: e.target.value })} />
              <input className="ls-input" type="text" placeholder="Notes (optional)" value={newAct.notes} onChange={e => setNewAct({ ...newAct, notes: e.target.value })} />
              <button className="ls-add-btn" onClick={addActivity} disabled={saving || !newAct.activity.trim()}>{saving ? 'Adding...' : 'Add'}</button>
            </div>
            {activities.length === 0 ? (
              <div className="ls-empty">No weekly activities yet. Add recurring activities like tennis, ballet, co-op, etc.</div>
            ) : (
              <div className="ls-activity-grid">
                {DAYS_OF_WEEK.map(day => {
                  const dayActs = groupedActivities[day];
                  if (dayActs.length === 0) return null;
                  return (
                    <div key={day} className="ls-day-group">
                      <div className="ls-day-label">{day}</div>
                      {dayActs.map((a: any) => (
                        <div key={a._index} className="ls-activity-item">
                          <div className="ls-activity-info">
                            <span className="ls-activity-name">{a.activity}</span>
                            {a.time && <span className="ls-activity-time">{a.time}</span>}
                            {a.notes && <span className="ls-activity-notes">{a.notes}</span>}
                          </div>
                          <button className="ls-delete-btn" onClick={() => deleteActivity(a._index)}>Ã</button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="ls-section">
            <div className="ls-section-title">Upcoming Events</div>
            <div className="ls-add-form">
              <input className="ls-input ls-input-date" type="date" value={newEvt.date} onChange={e => setNewEvt({ ...newEvt, date: e.target.value })} />
              <input className="ls-input" type="text" placeholder="Event name" value={newEvt.event} onChange={e => setNewEvt({ ...newEvt, event: e.target.value })} />
              <input className="ls-input ls-input-sm" type="text" placeholder="Location (optional)" value={newEvt.location} onChange={e => setNewEvt({ ...newEvt, location: e.target.value })} />
              <input className="ls-input" type="text" placeholder="Notes (optional)" value={newEvt.notes} onChange={e => setNewEvt({ ...newEvt, notes: e.target.value })} />
              <button className="ls-add-btn" onClick={addEvent} disabled={saving || !newEvt.date || !newEvt.event.trim()}>{saving ? 'Adding...' : 'Add'}</button>
            </div>
            {futureEvents.length === 0 && pastEvents.length === 0 ? (
              <div className="ls-empty">No upcoming events. Add tournaments, travel, special occasions, etc.</div>
            ) : (
              <div className="ls-events-list">
                {futureEvents.map((e: any, i: number) => {
                  const evtDate = new Date(e.date + 'T12:00:00');
                  const label = evtDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                  const originalIndex = events.indexOf(e);
                  return (
                    <div key={i} className="ls-event-item">
                      <div className="ls-event-date">{label}</div>
                      <div className="ls-event-info">
                        <span className="ls-event-name">{e.event}</span>
                        {e.location && <span className="ls-event-location">{e.location}</span>}
                        {e.notes && <span className="ls-event-notes">{e.notes}</span>}
                      </div>
                      <button className="ls-delete-btn" onClick={() => deleteEvent(originalIndex)}>Ã</button>
                    </div>
                  );
                })}
                {pastEvents.length > 0 && (
                  <div className="ls-past-section">
                    <div className="ls-past-label">Past events</div>
                    {pastEvents.map((e: any, i: number) => {
                      const evtDate = new Date(e.date + 'T12:00:00');
                      const label = evtDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                      return (
                        <div key={i} className="ls-event-item ls-past">
                          <div className="ls-event-date">{label}</div>
                          <div className="ls-event-info">
                            <span className="ls-event-name">{e.event}</span>
                            {e.location && <span className="ls-event-location">{e.location}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ScheduleEditorPanel({ basePath }: { basePath: string }) {
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingDay, setSavingDay] = useState<string | null>(null);
  const [savedDay, setSavedDay] = useState<string | null>(null);
  const [editState, setEditState] = useState<Record<string, any>>({});

  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const DAY_LABELS: Record<string, string> = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' };

  useEffect(() => { fetchSchedule(); }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${basePath}/forge-api/admin/schedule`);
      const data = await res.json();
      setSchedule(data);
      const raw = data.schedule || {};
      const init: Record<string, any> = {};
      DAYS.forEach(day => {
        const d = raw[day] || {};
        const hasWindow = d.forgeWindow && d.forgeWindow.start;
        init[day] = {
          enabled: !!hasWindow,
          startTime: hasWindow ? d.forgeWindow.start : '09:00',
          endTime: hasWindow ? d.forgeWindow.end : '12:00',
          isProtected: !!d.protected || !!d.isProtected,
          notes: d.notes || ''
        };
      });
      setEditState(init);
    } catch (err) { console.error('Schedule fetch error:', err); }
    finally { setLoading(false); }
  };

  const updateDay = (day: string, field: string, value: any) => {
    setEditState(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleSaveDay = async (day: string) => {
    setSavingDay(day);
    setSavedDay(null);
    const edit = editState[day];
    try {
      await fetch(`${basePath}/forge-api/admin/schedule/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          enabled: edit.enabled,
          startTime: edit.startTime,
          endTime: edit.endTime,
          isProtected: edit.isProtected,
          notes: edit.notes
        })
      });
      setSavedDay(day);
      setTimeout(() => setSavedDay(null), 2000);
    } catch (err) { console.error('Save error:', err); }
    finally { setSavingDay(null); }
  };

  if (loading) return <div className="detail-empty" style={{ padding: '2rem 1.25rem' }}>Loading schedule...</div>;

  return (
    <div className="sched-editor-panel">
      <div className="panel-section-title">Weekly Schedule Editor</div>
      <div className="se-subtitle">Edit each day's Forge learning window. Changes are saved per-day and used by the schedule lock screen.</div>
      <div className="se-grid">
        {DAYS.map(day => {
          const edit = editState[day] || {};
          const isToday = schedule?.today === day;
          return (
            <div key={day} className={`se-day-card ${isToday ? 'se-today' : ''}`}>
              <div className="se-day-header">
                <div className="se-day-label">{DAY_LABELS[day]}{isToday && <span className="today-badge">Today</span>}</div>
              </div>
              <div className="se-day-controls">
                <div className="se-toggle-row">
                  <label className="se-label">Forge enabled</label>
                  <button className={`sdr-toggle ${edit.enabled ? 'on' : 'off'}`} onClick={() => updateDay(day, 'enabled', !edit.enabled)}>{edit.enabled ? 'ON' : 'OFF'}</button>
                </div>
                {edit.enabled && (
                  <div className="se-times-row">
                    <div className="se-time-field">
                      <label className="se-label">Start</label>
                      <input className="se-time-input" type="time" value={edit.startTime || '09:00'} onChange={e => updateDay(day, 'startTime', e.target.value)} />
                    </div>
                    <div className="se-time-field">
                      <label className="se-label">End</label>
                      <input className="se-time-input" type="time" value={edit.endTime || '12:00'} onChange={e => updateDay(day, 'endTime', e.target.value)} />
                    </div>
                  </div>
                )}
                <div className="se-toggle-row">
                  <label className="se-label">Protected day</label>
                  <button className={`sdr-toggle ${edit.isProtected ? 'on' : 'off'}`} onClick={() => {
                    const newProtected = !edit.isProtected;
                    updateDay(day, 'isProtected', newProtected);
                    if (newProtected) updateDay(day, 'enabled', false);
                  }}>{edit.isProtected ? 'YES' : 'NO'}</button>
                </div>
                <div className="se-field">
                  <label className="se-label">Notes</label>
                  <input className="ce-input" type="text" value={edit.notes || ''} onChange={e => updateDay(day, 'notes', e.target.value)} placeholder="Activities, constraints..." />
                </div>
                <button className="se-save-day-btn" onClick={() => handleSaveDay(day)} disabled={savingDay === day}>
                  {savingDay === day ? 'Saving...' : savedDay === day ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SchedulePanel({ basePath }: { basePath: string }) {
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [unlockModal, setUnlockModal] = useState<any>(null);
  const [unlockNote, setUnlockNote] = useState('');
  const [unlockDomain, setUnlockDomain] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSchedule(); }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${basePath}/forge-api/admin/schedule`);
      const data = await res.json();
      setSchedule(data);
    } catch (err) { console.error('Schedule fetch error:', err); }
    finally { setLoading(false); }
  };

  const handleUnlockToday = async () => {
    setSaving(true);
    try {
      const today = schedule.today;
      const res = await fetch(`${basePath}/forge-api/admin/schedule/unlock-today`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: today,
          domain: unlockDomain || null,
          sessionNote: unlockNote || `${capitalizeDay(today)} session â not your usual day, but here we are.`
        })
      });
      const data = await res.json();
      if (data.success) {
        await fetchSchedule();
        setUnlockModal(null);
        setUnlockNote('');
        setUnlockDomain('');
      }
    } catch (err) { console.error('Unlock error:', err); }
    finally { setSaving(false); }
  };

  const handleClearUnlock = async () => {
    try {
      await fetch(`${basePath}/forge-api/admin/schedule/unlock-today`, { method: 'DELETE' });
      await fetchSchedule();
    } catch (err) { console.error('Clear unlock error:', err); }
  };

  const handlePermanentOverride = async (day: string, forgeEnabled: boolean | null) => {
    try {
      await fetch(`${basePath}/forge-api/admin/schedule/override`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, forgeEnabled })
      });
      await fetchSchedule();
    } catch (err) { console.error('Override error:', err); }
  };

  if (loading) return <div className="detail-empty">Loading schedule...</div>;

  const defaultSchedule: Record<string, any> = {
    monday: { label: 'Monday', defaultForge: true, anchor: false, activities: 'Tennis 1-4pm Â· Speech 5-7:30pm', window: '9amâ12pm' },
    tuesday: { label: 'Tuesday', defaultForge: true, anchor: false, activities: 'Tennis 12:30pm Â· Ballet Â· Martial Arts', window: '9â11:30am' },
    wednesday: { label: 'Wednesday', defaultForge: false, anchor: false, activities: 'Thrive Co-op 9am-2pm Â· Piano 2:15pm', window: 'Protected', protected: true, protectedReason: 'Thrive Co-op' },
    thursday: { label: 'Thursday', defaultForge: true, anchor: true, activities: 'JellyBean 9-10am Â· S2S 2:45pm Â· Martial Arts', window: '10amâ2:30pm' },
    friday: { label: 'Friday', defaultForge: true, anchor: false, activities: 'Horseback 9-10am Â· Tennis 2-5pm', window: '10amâ1:30pm' },
    saturday: { label: 'Saturday', defaultForge: false, anchor: false, activities: 'Church 2-4pm Â· Youth (Everly)', window: 'Protected', protected: true, protectedReason: 'Church + rest' },
    sunday: { label: 'Sunday', defaultForge: false, anchor: false, activities: 'Coach Dillon 9-11/12pm', window: 'Protected', protected: true, protectedReason: 'Coach Dillon + rest' }
  };

  const today = schedule?.today;
  const todayUnlock = schedule?.todayUnlock;
  const todayIsProtected = defaultSchedule[today]?.protected || (!defaultSchedule[today]?.defaultForge);

  const DOMAINS = [
    { value: '', label: 'Child chooses domain' },
    { value: 'identity', label: 'Identity & Judgment' },
    { value: 'communication', label: 'Communication' },
    { value: 'building', label: 'Building' },
    { value: 'humanFluency', label: 'Human Fluency' },
    { value: 'aiSystems', label: 'AI & Systems' },
    { value: 'physical', label: 'Physical Mastery' }
  ];

  return (
    <div className="schedule-panel">
      <div className="panel-section-title">Weekly Schedule</div>

      {todayIsProtected && (
        <div className="today-unlock-banner">
          <div className="tub-left">
            <div className="tub-day">Today â {capitalizeDay(today)}</div>
            <div className="tub-status">
              {todayUnlock && todayUnlock.day === today ? 'ð¢ Unlocked for today' : 'ð Protected day'}
            </div>
          </div>
          <div className="tub-right">
            {todayUnlock && todayUnlock.day === today ? (
              <button className="unlock-clear-btn" onClick={handleClearUnlock}>Lock it back</button>
            ) : (
              <button className="unlock-today-btn" onClick={() => setUnlockModal({ day: today, type: 'today' })}>Unlock today â</button>
            )}
          </div>
        </div>
      )}

      {todayUnlock && todayUnlock.day === today && (
        <div className="unlock-active-info">
          <div className="uai-label">Active unlock</div>
          <div className="uai-note">"{todayUnlock.sessionNote}"</div>
          {todayUnlock.domain && <div className="uai-domain">Domain: {todayUnlock.domain}</div>}
        </div>
      )}

      <div className="schedule-list">
        {Object.entries(defaultSchedule).map(([day, info]) => {
          const scheduleData = schedule?.schedule?.[day];
          const override = scheduleData?.override;
          const isOverridden = override && override.forgeEnabled !== undefined;
          const effectiveForge = isOverridden ? override.forgeEnabled : info.defaultForge;
          const isToday = day === today;

          return (
            <div key={day} className={`schedule-day-row ${!effectiveForge ? 'no-forge' : ''} ${info.anchor ? 'anchor' : ''} ${isToday ? 'is-today' : ''}`}>
              <div className="sdr-left">
                <div className="sdr-day">
                  {info.label}
                  {isToday && <span className="today-badge">Today</span>}
                  {info.anchor && <span className="anchor-badge">â Anchor</span>}
                </div>
                <div className="sdr-window" style={{ color: effectiveForge ? '#f97316' : '#444' }}>{info.window}</div>
                <div className="sdr-activities">{info.activities}</div>
                {isOverridden && (
                  <div className="sdr-override-note">
                    Schedule override active
                    <button className="revert-btn" onClick={() => handlePermanentOverride(day, null)}>Revert to default</button>
                  </div>
                )}
              </div>
              <div className="sdr-right">
                {info.protected && <div className="sdr-protected-label">{info.protectedReason}</div>}
                {info.protected && (
                  <button
                    className={`sdr-toggle ${effectiveForge ? 'on' : 'off'}`}
                    onClick={() => handlePermanentOverride(day, !effectiveForge)}
                    title={effectiveForge ? 'Click to protect this day' : 'Click to enable Forge on this day permanently'}
                  >
                    {effectiveForge ? 'Forge ON' : 'Forge OFF'}
                  </button>
                )}
                {!effectiveForge && !info.protected && <span className="sdr-off-badge">Disabled</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="schedule-note">
        â Thursday is the anchor learning day â longest uninterrupted window.<br />
        Toggle any day to permanently change Forge availability.<br />
        Use "Unlock today" for one-time exceptions.
      </div>

      {unlockModal && (
        <div className="modal-overlay" onClick={() => setUnlockModal(null)}>
          <div className="modal-box" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="modal-title">Unlock {capitalizeDay(unlockModal.day)} for today</div>
            <div className="modal-sub">This unlocks Forge for today only. Tomorrow resets to protected. For a permanent change, use the toggle in the schedule.</div>
            <div className="modal-field">
              <label className="modal-label">Session note for the child</label>
              <input
                className="modal-input"
                type="text"
                placeholder={`${capitalizeDay(unlockModal.day)} session â not your usual day, but here we are.`}
                value={unlockNote}
                onChange={e => setUnlockNote(e.target.value)}
              />
              <div className="modal-hint">This appears on the child's screen instead of the protected day message.</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Lead domain (optional)</label>
              <select className="modal-select" value={unlockDomain} onChange={e => setUnlockDomain(e.target.value)}>
                {DOMAINS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
              <div className="modal-hint">Leave blank to let the child choose what to work on.</div>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => { setUnlockModal(null); setUnlockNote(''); setUnlockDomain(''); }}>Cancel</button>
              <button className="modal-confirm" onClick={handleUnlockToday} disabled={saving}>{saving ? 'Unlocking...' : 'Unlock today'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TranscriptsPanel({ basePath }: { basePath: string }) {
  const [childId, setChildId] = useState<string>('everly');
  const [sessions, setSessions] = useState<any[]>([]);
  const [childName, setChildName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`${basePath}/forge-api/admin/transcripts/${childId}`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        setSessions(Array.isArray(d.sessions) ? d.sessions : []);
        setChildName(d.childName || '');
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [childId, basePath]);

  const sorted = [...sessions].sort((a, b) => (b.startTime || b.date || '').localeCompare(a.startTime || a.date || ''));
  const byDate: Record<string, any[]> = {};
  for (const s of sorted) {
    const k = s.date || 'unknown';
    if (!byDate[k]) byDate[k] = [];
    byDate[k].push(s);
  }
  const dateKeys = Object.keys(byDate).sort((a, b) => b.localeCompare(a));

  const downloadOne = (sessionId: string) => {
    window.location.href = `${basePath}/forge-api/admin/transcript/${childId}/${sessionId}`;
  };
  const downloadAll = () => {
    window.location.href = `${basePath}/forge-api/admin/transcripts-all/${childId}`;
  };

  return (
    <div className="panel">
      <div className="panel-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Transcripts</h2>
          <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>Full conversation transcripts from every session. Download for review.</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select value={childId} onChange={e => setChildId(e.target.value)} style={{ padding: '0.4rem 0.6rem', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: 4 }}>
            <option value="everly">Everly</option>
            <option value="isla">Isla</option>
            <option value="weston">Weston</option>
          </select>
          <button onClick={downloadAll} style={{ padding: '0.45rem 0.8rem', background: '#ff6b35', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Download all ({sessions.length})</button>
        </div>
      </div>
      {loading && <div style={{ color: '#888' }}>Loading sessions...</div>}
      {!loading && sessions.length === 0 && <div style={{ color: '#888', padding: '2rem', textAlign: 'center' }}>No sessions yet for {childName || childId}.</div>}
      {!loading && dateKeys.map(dateKey => (
        <div key={dateKey} style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{dateKey}</div>
          {byDate[dateKey].map(s => (
            <div key={s.id} style={{ padding: '0.75rem 1rem', background: '#111', border: '1px solid #222', borderRadius: 6, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{s.domain || 'session'} {s.missionId ? ' - ' + s.missionId : ''}</div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.15rem' }}>
                  {s.startTime ? new Date(s.startTime).toLocaleTimeString() : ''}
                  {s.duration ? '  ' + Math.round(s.duration / 60) + ' min' : ''}
                  {'  ' + (s.turnCount || 0) + ' turns'}
                  {s.safetyFlagCount > 0 ? '  FLAGS: ' + s.safetyFlagCount : ''}
                  {'  status: ' + (s.status || 'unknown')}
                </div>
              </div>
              <button onClick={() => downloadOne(s.id)} style={{ padding: '0.35rem 0.7rem', background: '#222', color: 'white', border: '1px solid #444', borderRadius: 4, cursor: 'pointer', fontSize: '0.85rem' }}>Download</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SettingsPanel({ basePath }: { basePath: string }) {
  const [timezone, setTimezone] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setExportStatus('Exporting...');
    try {
      const res = await fetch(`${basePath}/forge-api/admin/export`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forge-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportStatus('Backup downloaded');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (err) {
      setExportStatus('Export failed');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportStatus('Importing...');
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data?.forge?.children) {
        setImportStatus('Invalid backup file');
        setTimeout(() => setImportStatus(''), 3000);
        return;
      }
      const res = await fetch(`${basePath}/forge-api/admin/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        setImportStatus('Data restored successfully');
        setTimeout(() => { setImportStatus(''); window.location.reload(); }, 1500);
      } else {
        setImportStatus(result.error || 'Import failed');
        setTimeout(() => setImportStatus(''), 3000);
      }
    } catch (err) {
      setImportStatus('Invalid JSON file');
      setTimeout(() => setImportStatus(''), 3000);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const US_TIMEZONES = [
    { value: 'America/Phoenix', label: 'Arizona (MST, no DST)' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'America/Anchorage', label: 'Alaska Time' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time' }
  ];

  useEffect(() => {
    fetchTimeContext();
    const interval = setInterval(fetchTimeContext, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTimeContext = async () => {
    try {
      const res = await fetch(`${basePath}/forge-api/admin/schedule`);
      const data = await res.json();
      setTimezone(data.timezone || 'America/Phoenix');
      setCurrentTime(data.currentTime || '');
      setCurrentDay(data.today || '');
      setCurrentDate(data.todayDate || '');
      setTestingMode(data.testingMode || false);
    } catch (err) { console.error('Settings fetch error:', err); }
    finally { setLoading(false); }
  };

  const handleTimezoneChange = async (newTz: string) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`${basePath}/forge-api/admin/settings/timezone`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timezone: newTz })
      });
      const data = await res.json();
      if (data.success) {
        setTimezone(data.timezone);
        setCurrentDay(data.currentDay);
        setCurrentDate(data.currentDate);
        setCurrentTime(data.currentTime);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) { console.error('Timezone update error:', err); }
    finally { setSaving(false); }
  };

  const handleToggleTestingMode = async () => {
    const newValue = !testingMode;
    try {
      const res = await fetch(`${basePath}/forge-api/admin/settings/testing-mode`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newValue })
      });
      const data = await res.json();
      if (data.success) setTestingMode(data.testingMode);
    } catch (err) { console.error('Testing mode toggle error:', err); }
  };

  if (loading) return <div className="detail-empty">Loading settings...</div>;

  return (
    <div className="settings-panel">
      <div className="panel-section-title">Settings</div>

      <div className="settings-section">
        <div className="settings-card">
          <div className="settings-card-title">Server Time</div>
          <div className="settings-time-display">
            <div className="settings-time-big">{currentTime}</div>
            <div className="settings-time-day">{capitalizeDay(currentDay)}, {currentDate}</div>
          </div>
          <div className="settings-time-note">
            All schedule logic, session timestamps, and day boundaries use this time.
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">Family Timezone</div>
          <div className="settings-tz-current">
            Current: <strong>{timezone}</strong>
            {saved && <span className="settings-saved-badge">â Saved</span>}
          </div>
          <select
            className="settings-tz-select"
            value={timezone}
            onChange={e => handleTimezoneChange(e.target.value)}
            disabled={saving}
          >
            {US_TIMEZONES.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
          <div className="settings-tz-hint">
            Arizona does not observe daylight saving time. If you move or travel, update this so Forge knows what day it is where you are.
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">Data Backup</div>
          <div className="settings-time-note" style={{ marginBottom: '0.875rem' }}>
            Export a full backup of all Forge data, or restore from a previous backup file.
          </div>
          <div className="backup-actions">
            <button className="backup-btn export" onClick={handleExport} disabled={!!exportStatus && exportStatus === 'Exporting...'}>
              {exportStatus || 'Export Backup'}
            </button>
            <button className="backup-btn import" onClick={() => fileInputRef.current?.click()} disabled={!!importStatus && importStatus === 'Importing...'}>
              {importStatus || 'Import Backup'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">Developer Testing</div>
          <div className="settings-time-note" style={{ marginBottom: '0.875rem' }}>
            Testing mode bypasses schedule protection so you can test any day without unlocking. Turn this OFF before your kids start using Forge.
          </div>
          <div className="testing-mode-row">
            <div className="tm-info">
              <div className="tm-label">Testing mode</div>
              <div className="tm-status">
                {testingMode ? 'ð¡ ON â all days unlocked' : 'ð¢ OFF â normal schedule'}
              </div>
            </div>
            <button
              className={`tm-toggle ${testingMode ? 'active' : ''}`}
              onClick={handleToggleTestingMode}
            >
              {testingMode ? 'Turn OFF' : 'Turn ON'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function capitalizeDay(day: string) {
  if (!day) return '';
  return day.charAt(0).toUpperCase() + day.slice(1);
}
