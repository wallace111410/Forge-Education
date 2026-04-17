import { useState } from 'react';
import {
  AgentAvatar,
  PRESENTATION_STYLES,
  SKIN_TONES,
  HAIR_COLORS,
  EYE_STYLES,
  EYEBROW_STYLES,
  MOUTH_STYLES,
  CLOTHING_TYPES,
  CLOTHING_COLORS,
  ACCESSORY_OPTIONS,
  FACIAL_HAIR_OPTIONS,
  DEFAULT_AVATAR
} from './AgentAvatar';
import './AvatarCustomizer.css';

function getChildColor(childId: string) {
  const colors: Record<string, string> = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  return colors[childId] || '#f97316';
}

export default function AvatarCustomizer({ child, onSaved, basePath }: { child: any; onSaved?: (config: any) => void; basePath: string }) {
  const [config, setConfig] = useState(child.avatarConfig || DEFAULT_AVATAR);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('style');

  const childColor = getChildColor(child.id);

  const handleChange = (key: string, value: string | number) => {
    setConfig((prev: any) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${basePath}/forge-api/child/${child.id}/avatar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarConfig: config })
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        onSaved && onSaved(config);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Avatar save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'style', label: 'Style' },
    { id: 'hair', label: 'Hair' },
    { id: 'face', label: 'Face' },
    { id: 'skin', label: 'Skin' },
    { id: 'outfit', label: 'Outfit' },
    { id: 'extras', label: 'Extras' },
  ];

  const currentStyle = PRESENTATION_STYLES.find(s => s.id === config.presentationStyle) || PRESENTATION_STYLES[0];

  return (
    <div className="avatar-customizer">
      <div className="ac-preview">
        <div className="ac-preview-avatar">
          <AgentAvatar config={config} size={140} stage={child.stage} />
        </div>
        <div className="ac-preview-name">{child.agentName}</div>
        {saved && (
          <div className="ac-saved-badge">Saved</div>
        )}
      </div>

      <div className="ac-section-tabs">
        {sections.map(s => (
          <button
            key={s.id}
            className={`ac-tab ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
            style={{ '--tab-color': childColor } as any}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="ac-options">
        {activeSection === 'style' && (
          <div className="ac-section">
            <div className="ac-section-label">Hair style</div>
            <div className="ac-style-grid">
              {PRESENTATION_STYLES.map(s => (
                <button
                  key={s.id}
                  className={`ac-style-card ${config.presentationStyle === s.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => {
                    handleChange('presentationStyle', s.id);
                    handleChange('topVariant', 0);
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ac-section-label" style={{ marginTop: '1.25rem' }}>Variation</div>
            <div className="ac-variant-row">
              {currentStyle.tops.map((_t, i) => (
                <button
                  key={i}
                  className={`ac-variant-btn ${(config.topVariant || 0) === i ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('topVariant', i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'hair' && (
          <div className="ac-section">
            <div className="ac-section-label">Hair color</div>
            <div className="ac-color-row">
              {HAIR_COLORS.map(h => (
                <button
                  key={h.id}
                  className={`ac-color-swatch ${config.hairColor === h.id ? 'selected' : ''}`}
                  style={{ background: h.value, '--selected-ring': childColor } as any}
                  onClick={() => handleChange('hairColor', h.id)}
                  title={h.label}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'face' && (
          <div className="ac-section">
            <div className="ac-section-label">Expression</div>
            <div className="ac-option-grid">
              {MOUTH_STYLES.map(m => (
                <button
                  key={m.id}
                  className={`ac-option-btn ${config.mouthStyle === m.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('mouthStyle', m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="ac-section-label" style={{ marginTop: '1.25rem' }}>Eyes</div>
            <div className="ac-option-grid">
              {EYE_STYLES.map(e => (
                <button
                  key={e.id}
                  className={`ac-option-btn ${config.eyeStyle === e.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('eyeStyle', e.id)}
                >
                  {e.label}
                </button>
              ))}
            </div>

            <div className="ac-section-label" style={{ marginTop: '1.25rem' }}>Eyebrows</div>
            <div className="ac-option-grid">
              {EYEBROW_STYLES.map(e => (
                <button
                  key={e.id}
                  className={`ac-option-btn ${config.eyebrowStyle === e.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('eyebrowStyle', e.id)}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skin' && (
          <div className="ac-section">
            <div className="ac-section-label">Skin tone</div>
            <div className="ac-color-row">
              {SKIN_TONES.map(s => (
                <button
                  key={s.id}
                  className={`ac-color-swatch ${config.skinColor === s.id ? 'selected' : ''}`}
                  style={{ background: s.value, '--selected-ring': childColor } as any}
                  onClick={() => handleChange('skinColor', s.id)}
                  title={s.label}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'outfit' && (
          <div className="ac-section">
            <div className="ac-section-label">Clothing</div>
            <div className="ac-option-grid">
              {CLOTHING_TYPES.map(s => (
                <button
                  key={s.id}
                  className={`ac-option-btn ${config.clothing === s.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('clothing', s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ac-section-label" style={{ marginTop: '1.25rem' }}>Color</div>
            <div className="ac-color-row">
              {CLOTHING_COLORS.map(s => (
                <button
                  key={s.id}
                  className={`ac-color-swatch ${config.clothesColor === s.id ? 'selected' : ''}`}
                  style={{ background: s.value, '--selected-ring': childColor } as any}
                  onClick={() => handleChange('clothesColor', s.id)}
                  title={s.label}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'extras' && (
          <div className="ac-section">
            <div className="ac-section-label">Accessories</div>
            <div className="ac-option-grid">
              {ACCESSORY_OPTIONS.map(a => (
                <button
                  key={a.id}
                  className={`ac-option-btn ${config.accessory === a.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('accessory', a.id)}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="ac-section-label" style={{ marginTop: '1.25rem' }}>Facial hair</div>
            <div className="ac-option-grid">
              {FACIAL_HAIR_OPTIONS.map(f => (
                <button
                  key={f.id}
                  className={`ac-option-btn ${config.facialHair === f.id ? 'selected' : ''}`}
                  style={{ '--selected-color': childColor } as any}
                  onClick={() => handleChange('facialHair', f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="ac-extras-note">Facial hair optional — all expressions are for everyone</div>
          </div>
        )}
      </div>

      <div className="ac-save-row">
        <button
          className="ac-save-btn"
          style={{ background: childColor }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save look'}
        </button>
      </div>
    </div>
  );
}
