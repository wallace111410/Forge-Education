import { useState, useEffect, useRef, useCallback } from 'react';
import './SessionRoom.css';
import { AgentAvatar } from './AgentAvatar';

const DOMAIN_LABELS: Record<string, string> = {
  identity: 'Identity & Judgment',
  communication: 'Communication',
  building: 'Building',
  humanFluency: 'Human Fluency',
  aiSystems: 'AI & Systems',
  physical: 'Physical Mastery'
};

const SPECIALIST_NAMES: Record<string, string> = {
  identity: 'Sage',
  communication: 'Atlas',
  building: 'Flux',
  humanFluency: 'Kira',
  aiSystems: 'Nova',
  physical: 'Zion'
};

const DOMAIN_COLORS: Record<string, string> = {
  identity: '#7c3aed',
  communication: '#2563eb',
  building: '#d97706',
  humanFluency: '#db2777',
  aiSystems: '#0891b2',
  physical: '#16a34a'
};

function getChildColor(childId: string) {
  const colors: Record<string, string> = { everly: '#7c3aed', isla: '#dc2626', weston: '#16a34a' };
  return colors[childId] || '#f97316';
}

function getChildEmoji(childId: string) {
  const emojis: Record<string, string> = { everly: 'â¡', isla: 'ð¥', weston: 'â³' };
  return emojis[childId] || 'â¨';
}

function getDefaultMission(child: any, domain: string) {
  const missions = child.domains?.[domain]?.missionsAvailable;
  return missions?.[0] || 'IJ-L5-001';
}

function buildOpeningPrompt(child: any, domain: string, missionId: string | null) {
  const domainLabel = DOMAIN_LABELS[domain] || domain;
  return `[SESSION START] Open with a warm, specific greeting for ${child.name}. You are beginning a ${domainLabel} session${missionId ? ` on mission ${missionId}` : ''}. Reference what you know about them from past sessions. Frame today's work as an invitation, not an assignment. Keep it under 3 sentences.`;
}

type AvatarState = 'idle' | 'speaking' | 'listening' | 'thinking';

const SpeechRecognition = typeof window !== 'undefined'
  ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  : null;

interface SessionRoomProps {
  child: any;
  domain: string;
  missionId: string | null;
  onEnd: () => void;
  basePath: string;
  isFirstLogin?: boolean;
}

export default function SessionRoom({ child, domain, missionId, onEnd, basePath, isFirstLogin }: SessionRoomProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnding, setSessionEnding] = useState(false);
  const [sessionLocked, setSessionLocked] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(() => {
    try { return localStorage.getItem('forge-voice-muted') === 'true'; } catch { return false; }
  });

  const [visibleBubble, setVisibleBubble] = useState<{ text: string; type: 'agent' | 'user' | 'safety' | 'closing'; key: number } | null>(null);
  const [bubbleFading, setBubbleFading] = useState(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleFadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleKeyRef = useRef(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const sessionStartTime = useRef(Date.now());
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioUrl = useRef<string | null>(null);
  const voiceAbortRef = useRef<AbortController | null>(null);
  const sendMessageRef = useRef<(text?: string) => void>(() => {});

  const childColor = getChildColor(child.id);
  const childEmoji = getChildEmoji(child.id);
  const specialistName = SPECIALIST_NAMES[domain] || 'Sage';
  const domainColor = DOMAIN_COLORS[domain] || childColor;
  const domainLabel = DOMAIN_LABELS[domain] || domain;
  const hasSpeechRecognition = !!SpeechRecognition;

  const toggleMute = useCallback(() => {
    setVoiceMuted(prev => {
      const next = !prev;
      try { localStorage.setItem('forge-voice-muted', String(next)); } catch {}
      if (next) stopAudio();
      return next;
    });
  }, []);

  const stopAudio = useCallback(() => {
    if (voiceAbortRef.current) {
      voiceAbortRef.current.abort();
      voiceAbortRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (currentAudioUrl.current) {
      URL.revokeObjectURL(currentAudioUrl.current);
      currentAudioUrl.current = null;
    }
    setIsSpeaking(false);
    setAvatarState('idle');
  }, []);

  const playVoiceElevenLabs = useCallback(async (text: string) => {
    try {
      const controller = new AbortController();
      voiceAbortRef.current = controller;
      const res = await fetch(`${basePath}/forge-api/voice/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, agentSystemName: child.agentSystemName }),
        signal: controller.signal,
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      currentAudioUrl.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      setIsSpeaking(true);
      setAvatarState('speaking');

      audio.onended = () => {
        setIsSpeaking(false);
        setAvatarState('idle');
        if (currentAudioUrl.current) {
          URL.revokeObjectURL(currentAudioUrl.current);
          currentAudioUrl.current = null;
        }
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        setAvatarState('idle');
        if (currentAudioUrl.current) {
          URL.revokeObjectURL(currentAudioUrl.current);
          currentAudioUrl.current = null;
        }
        audioRef.current = null;
      };

      await audio.play();
    } catch {
      setIsSpeaking(false);
      setAvatarState('idle');
    }
  }, [basePath, child.agentSystemName]);

  const playVoice = useCallback(async (text: string) => {
    if (voiceMuted) return;
    stopAudio();
    await playVoiceElevenLabs(text);
  }, [voiceMuted, stopAudio, playVoiceElevenLabs]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    startSession();
    durationInterval.current = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime.current) / 60000));
    }, 30000);
    return () => {
      if (durationInterval.current) clearInterval(durationInterval.current);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      if (bubbleFadeTimer.current) clearTimeout(bubbleFadeTimer.current);
      stopAudio();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  const showBubble = useCallback((text: string, type: 'agent' | 'user' | 'safety' | 'closing') => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    if (bubbleFadeTimer.current) clearTimeout(bubbleFadeTimer.current);
    setBubbleFading(false);
    bubbleKeyRef.current += 1;
    const thisKey = bubbleKeyRef.current;
    setVisibleBubble({ text, type, key: thisKey });
    if (type !== 'safety') {
      bubbleTimer.current = setTimeout(() => {
        if (bubbleKeyRef.current !== thisKey) return;
        setBubbleFading(true);
        bubbleFadeTimer.current = setTimeout(() => {
          if (bubbleKeyRef.current !== thisKey) return;
          setVisibleBubble(null);
          setBubbleFading(false);
        }, 400);
      }, 8000);
    }
  }, []);

  const startSession = async () => {
    setAvatarState('thinking');
    try {
      const startRes = await fetch(`${basePath}/forge-api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: child.id,
          domain: domain || 'identity',
          missionId: missionId || getDefaultMission(child, domain),
          isOnboarding: isFirstLogin || false
        })
      });
      const startData = await startRes.json();
      setSessionId(startData.sessionId);

      const openingMessage = isFirstLogin
        ? `[ONBOARDING â FIRST EVER SESSION] Introduce yourself to ${child.name} for the very first time. This is your genuine first meeting. Use the onboarding system prompt.`
        : buildOpeningPrompt(child, domain, missionId);

      const openRes = await fetch(`${basePath}/forge-api/session/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: child.id,
          sessionId: startData.sessionId,
          message: openingMessage,
          role: 'user',
          isOpening: true
        })
      });
      const openData = await openRes.json();

      if (openData.response) {
        setMessages([{
          role: 'assistant',
          content: openData.response,
          timestamp: new Date().toISOString()
        }]);
        showBubble(openData.response, 'agent');
        setAvatarState('idle');
        playVoice(openData.response);
      } else {
        setAvatarState('idle');
      }

      setSessionStarted(true);
      setTimeout(() => inputRef.current?.focus(), 300);

    } catch (err) {
      console.error('Session start error:', err);
      const fallbackMsg = `${child.agentName} is here. What's on your mind today?`;
      setMessages([{
        role: 'assistant',
        content: fallbackMsg,
        timestamp: new Date().toISOString(),
        isError: true
      }]);
      showBubble(fallbackMsg, 'agent');
      setSessionStarted(true);
      setAvatarState('idle');
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || loading || !sessionId || sessionLocked) return;

    if (!overrideText) setInput('');

    setMessages(prev => [...prev, {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }]);
    showBubble(text, 'user');
    setLoading(true);
    setAvatarState('thinking');
    stopAudio();

    try {
      const res = await fetch(`${basePath}/forge-api/session/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: child.id,
          sessionId,
          message: text,
          role: 'user',
          isOpening: false
        })
      });
      const data = await res.json();

      if (data.sessionLocked) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          isSafetyMessage: true,
          tier: 3
        }]);
        showBubble(data.response, 'safety');
        setSessionLocked(true);
        setAvatarState('idle');
        if (durationInterval.current) clearInterval(durationInterval.current);
        return;
      }

      if (data.sessionEnding) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          isSafetyMessage: true,
          tier: 2
        }]);
        showBubble(data.response, 'safety');
        setSessionEnding(true);
        setAvatarState('idle');
        if (durationInterval.current) clearInterval(durationInterval.current);
        try {
          await fetch(`${basePath}/forge-api/session/end`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ childId: child.id, sessionId })
          });
        } catch (err) { console.error('Session end error:', err); }
    // Auto-generate session log
    (async () => {
      try {
        const conversationText = messages.map((m: any) =>
          `${m.role === 'user' ? child.name : child.agentName}: ${m.content}`
        ).join('\n');
        const logPrompt = `You just completed a Forge session with ${child.name} (agent: ${child.agentName}, stage: ${child.developmentalStage}).

Here is the full conversation:
${conversationText}

Based ONLY on what happened in this session, fill in these 6 fields as a JSON object. Be specific and behavioral, never vague. If something didn't happen, use an empty string.

{
  "workedOn": "2-3 sentences: what content or skill did we actually work on?",
  "avoided": "specific behavior observed: what did ${child.name} avoid and exactly how? Empty string if none observed.",
  "hardThing": "one specific thing ${child.name} did that was genuinely difficult. Quote their words or describe the exact action.",
  "domainStatus": {},
  "connectedToLife": "anything from the session that connected to their real life (speech case, JellyBean, Thrive, sport, family). Empty if none.",
  "nextSessionOpens": "one sentence: what specific question or task should open the NEXT session to continue this thread?"
}

Return ONLY the JSON object. No other text.`;
        const res = await fetch(`${basePath}/forge-api/session/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            childId: child.id,
            sessionId,
            message: logPrompt,
            isSystemCall: true
          })
        });
        if (res.ok) {
          const data = await res.json();
          try {
            const raw = data.response.replace(/```json|^```|```$/gm, '').trim();
            const logData = JSON.parse(raw);
            await fetch(`${basePath}/forge-api/admin/session-logs/${child.id}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...logData, autoGenerated: true })
            });
          } catch (parseErr) {
            console.warn('Session log parse error:', parseErr);
          }
        }
      } catch (logErr) {
        console.warn('Session log generation failed:', logErr);
      }
    })();
        setTimeout(() => onEnd(), 3000);
        return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        tier: data.tier
      }]);
      showBubble(data.response, 'agent');
      setAvatarState('idle');
      playVoice(data.response);

    } catch (err) {
      console.error('Message error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Something went wrong on my end. Try again?",
        timestamp: new Date().toISOString(),
        isError: true
      }]);
      showBubble("Something went wrong on my end. Try again?", 'agent');
      setAvatarState('idle');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  sendMessageRef.current = sendMessage;

  const startListening = useCallback(() => {
    if (!SpeechRecognition || isListening || loading || sessionLocked) return;

    stopAudio();
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setAvatarState('listening');
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      setInput(prev => {
        const finalText = prev.trim();
        if (finalText) {
          setTimeout(() => sendMessageRef.current(finalText), 50);
        } else {
          setAvatarState('idle');
        }
        return '';
      });
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setAvatarState('idle');
      recognitionRef.current = null;
    };

    recognition.start();
  }, [isListening, loading, sessionLocked, stopAudio]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const handleEndSession = async (forced = false) => {
    if (!forced) {
      setShowEndConfirm(true);
      return;
    }

    stopAudio();
    if (durationInterval.current) clearInterval(durationInterval.current);

    if (sessionId && !sessionLocked && messages.length > 1) {
      try {
        setLoading(true);
        setAvatarState('thinking');
        const closeRes = await fetch(`${basePath}/forge-api/session/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            childId: child.id,
            sessionId,
            message: '[SESSION CLOSING] Give a brief, warm closing message. Reference one specific thing from today\'s conversation. Send them back into their real life with one concrete thing to think about or do. Keep it under 3 sentences.',
            role: 'user',
            isClosing: true
          })
        });
        const closeData = await closeRes.json();
        if (closeData.response) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: closeData.response,
            timestamp: new Date().toISOString(),
            isClosing: true
          }]);
          showBubble(closeData.response, 'closing');
          setAvatarState('idle');
          playVoice(closeData.response);
        }
      } catch (err) {
        console.error('Close message error:', err);
      } finally {
        setLoading(false);
        setAvatarState('idle');
      }
    }

    try {
      await fetch(`${basePath}/forge-api/session/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ childId: child.id, sessionId })
      });
    } catch (err) {
      console.error('Session end error:', err);
    }

    setTimeout(() => { stopAudio(); onEnd(); }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const avatarAnimClass = `sr-avatar-anim sr-avatar-${avatarState}`;
  const avatarSize = typeof window !== 'undefined'
    ? Math.min(120, Math.floor(Math.min(window.innerWidth * 0.25, window.innerHeight * 0.15)))
    : 100;

  const bubbleClass = visibleBubble
    ? `sr-speech-bubble${visibleBubble.type === 'user' ? ' user-bubble' : ''}${visibleBubble.type === 'safety' ? ' safety-bubble' : ''}${visibleBubble.type === 'closing' ? ' closing-bubble' : ''}${bubbleFading ? ' fading' : ''}`
    : '';

  return (
    <div className="session-room" data-child={child.id}>
      <div className="sr-topbar">
        <div className="sr-topbar-left">
          <button
            className={`sr-topbar-mute ${voiceMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            title={voiceMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {voiceMuted ? 'ð' : 'ð'}
          </button>
          {isSpeaking && (
            <button
              className="sr-topbar-stop"
              onClick={stopAudio}
              title="Stop speaking"
            >
              â¹
            </button>
          )}
        </div>
        <div className="sr-topbar-right">
          {sessionDuration > 0 && (
            <div className="sr-duration">{sessionDuration}m</div>
          )}
          {!sessionLocked && (
            <button
              className="sr-end-btn"
              onClick={() => handleEndSession(false)}
              disabled={loading || sessionEnding}
            >
              End
            </button>
          )}
        </div>
      </div>

      <div className="sr-avatar-zone">
        <div className={`sr-avatar-stage ${avatarState}`}>
          <div className="sr-avatar-glow" style={{ background: childColor }} />
          <div className={avatarAnimClass}>
            {child.avatarConfig ? (
              <AgentAvatar config={child.avatarConfig} size={avatarSize} stage={child.stage} />
            ) : (
              <div style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: '50%',
                background: childColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: avatarSize * 0.4,
              }}>
                {childEmoji}
              </div>
            )}
          </div>
        </div>
        <div className="sr-agent-label">
          <div className="sr-agent-name">{child.agentName}</div>
          <div className="sr-agent-meta" style={{ color: isFirstLogin ? 'rgba(255,255,255,0.3)' : domainColor }}>
            {isFirstLogin ? 'First session' : `${specialistName} Â· ${domainLabel}`}
          </div>
        </div>
        {loading && (
          <div className="sr-thinking-indicator">
            <div className="sr-thinking-dots"><span /><span /><span /></div>
          </div>
        )}
      </div>

      <div className="sr-transcript-zone" ref={transcriptRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`sr-transcript-msg ${msg.role === 'user' ? 'sr-msg-user' : 'sr-msg-agent'}${msg.isSafetyMessage ? ' sr-msg-safety' : ''}${msg.isClosing ? ' sr-msg-closing' : ''}`}>
            <div className="sr-msg-bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="sr-transcript-msg sr-msg-agent">
            <div className="sr-msg-bubble sr-msg-typing">
              <span className="sr-typing-dot" /><span className="sr-typing-dot" /><span className="sr-typing-dot" />
            </div>
          </div>
        )}
        {sessionLocked && (
          <div className="sr-locked-banner">
            <div className="sr-locked-text">
              This session has ended. Please go find your mom or dad right now.
            </div>
          </div>
        )}
      </div>

      {!sessionLocked && !sessionEnding && (
        <div className="sr-input-zone">
          {isListening && (
            <div className="sr-listening-indicator">
              <span className="sr-listen-dot" />
              Listening...
            </div>
          )}
          <div className="sr-input-row">
            <textarea
              ref={inputRef}
              className="sr-input"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? 'Listening...' : `Talk to ${child.agentName}...`}
              rows={1}
              disabled={loading || !sessionStarted || isListening}
            />
            {hasSpeechRecognition && (
              <button
                className={`sr-mic-btn ${isListening ? 'active' : ''}`}
                onClick={isListening ? stopListening : startListening}
                disabled={loading || !sessionStarted}
                title={isListening ? 'Stop listening' : 'Use voice'}
              >
                ð¤
              </button>
            )}
            <button
              className="sr-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading || !sessionStarted || isListening}
              style={{ '--send-color': childColor } as any}
            >
              â
            </button>
          </div>
        </div>
      )}

      {showEndConfirm && (
        <div className="sr-confirm-overlay">
          <div className="sr-confirm-box">
            <div className="sr-confirm-title">End this session?</div>
            <div className="sr-confirm-sub">
              {child.agentName} will wrap up and add this to your portfolio.
            </div>
            <div className="sr-confirm-actions">
              <button
                className="sr-confirm-cancel"
                onClick={() => setShowEndConfirm(false)}
              >
                Keep going
              </button>
              <button
                className="sr-confirm-end"
                style={{ background: childColor }}
                onClick={() => { setShowEndConfirm(false); handleEndSession(true); }}
              >
                End session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
