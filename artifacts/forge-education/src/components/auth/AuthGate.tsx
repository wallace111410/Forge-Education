import { useState, useEffect } from 'react';
import './AuthGate.css';

const CHILDREN = [
  { id: 'everly', name: 'Everly', age: 11, agentName: 'Vera', stage: 3, color: '#7c3aed', colorLight: '#ede9fe', emoji: '⚡', greeting: 'Vera is ready' },
  { id: 'isla', name: 'Isla', age: 8, agentName: 'Ren', stage: 2, color: '#dc2626', colorLight: '#fee2e2', emoji: '🔥', greeting: 'Ren is here' },
  { id: 'weston', name: 'Weston', age: 4, agentName: 'Ozzy', stage: 1, color: '#16a34a', colorLight: '#dcfce7', emoji: '⛳', greeting: 'Ozzy is waiting' }
];

interface AuthGateProps {
  onChildLogin: (child: any) => void;
  onParentLogin: () => void;
  basePath: string;
}

export default function AuthGate({ onChildLogin, onParentLogin, basePath }: AuthGateProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showParentPin, setShowParentPin] = useState(false);
  const [parentPin, setParentPin] = useState('');

  const child = selected ? CHILDREN.find(c => c.id === selected) : null;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleSubmitChildPin = async () => {
    if (pin.length !== 4) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${basePath}/forge-api/auth/child`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId: selected, pin })
      });
      const data = await res.json();
      if (data.success) {
        onChildLogin(data.child);
      } else {
        setError('Wrong PIN — try again');
        setPin('');
      }
    } catch {
      setError('Connection error — try again');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitParentPin = async () => {
    if (parentPin.length !== 4) return;
    setLoading(true);
    try {
      const res = await fetch(`${basePath}/forge-api/auth/parent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: parentPin })
      });
      const data = await res.json();
      if (data.success) {
        onParentLogin();
      } else {
        setError('Wrong PIN — try again');
        setParentPin('');
      }
    } catch {
      setError('Connection error');
      setParentPin('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pin.length === 4 && selected) handleSubmitChildPin();
  }, [pin]);

  useEffect(() => {
    if (parentPin.length === 4 && showParentPin) handleSubmitParentPin();
  }, [parentPin]);

  if (showParentPin) {
    return (
      <div className="auth-gate parent-auth">
        <div className="auth-header">
          <button className="back-btn" onClick={() => { setShowParentPin(false); setParentPin(''); setError(''); }}>← Back</button>
        </div>
        <div className="auth-content">
          <div className="forge-wordmark">For<span>ge</span></div>
          <div className="parent-label">Parent Admin</div>
          <div className="pin-display">
            {[0,1,2,3].map(i => (
              <div key={i} className={`pin-dot ${parentPin.length > i ? 'filled' : ''}`} />
            ))}
          </div>
          {error && <div className="pin-error">{error}</div>}
          <Keypad
            onDigit={(d: string) => setParentPin(prev => prev.length < 4 ? prev + d : prev)}
            onBackspace={() => setParentPin(prev => prev.slice(0, -1))}
            loading={loading}
            accent="#f97316"
          />
        </div>
      </div>
    );
  }

  if (selected && child) {
    return (
      <div className="auth-gate child-pin" style={{ '--child-color': child.color, '--child-light': child.colorLight } as any}>
        <div className="auth-header">
          <button className="back-btn" onClick={() => { setSelected(null); setPin(''); setError(''); }}>← Back</button>
        </div>
        <div className="auth-content">
          <div className="child-auth-avatar" style={{ background: child.color }}>
            <span className="child-emoji">{child.emoji}</span>
          </div>
          <div className="child-auth-name">{child.name}</div>
          <div className="child-auth-agent">{child.greeting}</div>
          <div className="pin-display">
            {[0,1,2,3].map(i => (
              <div key={i} className={`pin-dot ${pin.length > i ? 'filled' : ''}`} style={{ '--dot-color': child.color } as any} />
            ))}
          </div>
          {error && <div className="pin-error">{error}</div>}
          <Keypad onDigit={handleDigit} onBackspace={handleBackspace} loading={loading} accent={child.color} />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-gate selector">
      <div className="auth-wordmark">For<span>ge</span></div>
      <div className="auth-tagline">Who's learning today?</div>
      <div className="child-selector">
        {CHILDREN.map(c => (
          <button key={c.id} className="child-card" onClick={() => { setSelected(c.id); setPin(''); setError(''); }} style={{ '--card-color': c.color, '--card-light': c.colorLight } as any}>
            <div className="child-card-avatar" style={{ background: c.color }}><span>{c.emoji}</span></div>
            <div className="child-card-name">{c.name}</div>
            <div className="child-card-agent">{c.agentName} is ready</div>
          </button>
        ))}
      </div>
      <button className="parent-link" onClick={() => { setShowParentPin(true); setError(''); }}>Parent Admin</button>
    </div>
  );
}

function Keypad({ onDigit, onBackspace, loading, accent }: { onDigit: (d: string) => void; onBackspace: () => void; loading: boolean; accent: string }) {
  const keys = [['1','2','3'],['4','5','6'],['7','8','9'],[null,'0','⌫']];
  return (
    <div className="keypad">
      {keys.map((row, ri) => (
        <div key={ri} className="keypad-row">
          {row.map((key, ki) => (
            <button
              key={ki}
              className={`keypad-btn ${key === null ? 'empty' : ''} ${key === '⌫' ? 'backspace' : ''}`}
              onClick={() => { if (key === '⌫') onBackspace(); else if (key !== null) onDigit(key); }}
              disabled={loading || key === null}
              style={key && key !== '⌫' ? { '--key-accent': accent } as any : {}}
            >
              {loading && key === '0' ? '...' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
