export const CHILD_PROFILES: Record<string, any> = {
  everly: {
    identityFile: {
      age: 11,
      agentName: 'Zoe',
      developmentalStage: 3,
      stageLabel: 'Challenger',
      stageDescription: 'Names avoidance directly. Holds expectation. Never rescues. One eyebrow raised.',
      s2sFindings: 'Retained primitive reflexes at 67%. Moderate Fear Paralysis. Challenge avoidance is identity protection layered on a nervous system working harder than needed. Avoidance is not character — it is self-protection. Her profile is milder neurologically but she avoids more visibly than Isla.',
      motivations: 'History and ideas. Apologetics. Speech and debate. Being right and being able to prove it. Moments where she is genuinely challenged and wins.',
      avoidancePatterns: 'Rewrites the same sentence repeatedly instead of moving forward. Says "I don\'t know" when she does know. Rushes through hard parts to get to comfortable parts. Performs effort without committing to the actual argument.',
      connectedContext: {
        speechCaseTopic: '',
        thriveCurrentUnit: '',
        s2sFocus: '',
        coachFocus: ''
      }
    }
  },
  isla: {
    identityFile: {
      age: 8,
      agentName: 'Ren',
      developmentalStage: 2,
      stageLabel: 'Bold and Warm',
      stageDescription: 'Direct and encouraging. Never gives the easier version. Celebrates real effort specifically. Positive reinforcement is always precise — never vague praise.',
      s2sFindings: 'Fine motor at 20% (goal 75-80%). Eye tracking at 40% (goal 90%). Fear Paralysis at Significant — most flagged item in assessment. Frustration and anxiety spikes are neurological, not character. She embraces challenge — it is the emotional recovery that is hard. Her nervous system carries more load than it should, affecting attention, emotional regulation, and pressure response simultaneously.',
      motivations: 'Building and creating. Doing hard things physically. Being recognized specifically for what she made or figured out. JellyBean. Competitions she can win.',
      avoidancePatterns: 'Frustration escalates to shutdown when recovery time is insufficient. Does not avoid challenge — avoids the aftermath of getting something wrong. May disengage after a hard moment rather than before one.',
      connectedContext: {
        speechCaseTopic: '',
        thriveCurrentUnit: '',
        s2sFocus: '',
        coachFocus: ''
      }
    }
  },
  weston: {
    identityFile: {
      age: 4,
      agentName: 'Ozzy',
      developmentalStage: 1,
      stageLabel: 'Warm and Gentle',
      stageDescription: 'Warm, playful, perceptually salient feedback. Short sessions 15-20 min. Play-based. Story-driven. Physical and creative.',
      s2sFindings: 'No assessment yet.',
      motivations: 'Physical play. Play fighting. Stories — especially with big characters and action. Building things. New experiences. He is good at transitions and generally embraces new things.',
      avoidancePatterns: 'Sometimes verbalizes frustration verbally. Other times frustration comes out as a tantrum rather than words. No established avoidance patterns yet — still in observation phase.',
      connectedContext: {
        speechCaseTopic: '',
        thriveCurrentUnit: '',
        s2sFocus: '',
        coachFocus: 'Golf 2-3 hrs/week with sisters (variable schedule). Martial arts 2 hrs/week.'
      }
    }
  }
};

export const DOMAIN_PROGRESSIONS_TEMPLATE = {
  identity: {
    label: 'Identity & Judgment',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  },
  communication: {
    label: 'Communication & Persuasion',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  },
  building: {
    label: 'Building & Entrepreneurship',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  },
  humanFluency: {
    label: 'Human Fluency',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  },
  aiSystems: {
    label: 'AI & Systems Fluency',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  },
  physical: {
    label: 'Physical Mastery',
    q1Destination: '',
    currentUnit: '',
    weekInUnit: 0,
    totalWeeks: 4,
    milestones: []
  }
};
