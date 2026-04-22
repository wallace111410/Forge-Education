// Forge Education mission catalog
// 83 missions — Everly (all 6 domains) + Isla (partial: IJ, CP, BE, HF, AI, PM sparse)
// Weston (25 missions) + remaining Isla missions to be added in Push B phase 2
// Each mission is keyed by mission ID (e.g. "CP-L5-001") matching child.domains[domain].missionsAvailable IDs
// Schema: see https://github.com/wallace111410/Forge-Education/blob/main/README.md

const MISSION_CATALOG = {
  "CP-L5-001": {
    "id": "CP-L5-001",
    "title": "The General's First Words",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Analysis + Application",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Atlas has been reading about Julius Caesar — specifically how he opened his speeches to his soldiers before battle. Caesar knew something most speakers don't: the first sentence isn't about information. It's about permission. Permission for the audience to keep listening. Atlas wants to know: what did Caesar's opening lines do that yours don't yet? And what would your apologetics opening look like if you used his approach?",
    "offScreenPrep": "Review one of your current apologetics cards — specifically the opening line.",
    "conversationFramework": [
      "Tell me what you think an opening line is supposed to do. Not what you've been told — what you actually think.",
      "Now tell me what your current opening line on [specific card] actually does. Are those the same thing?",
      "Caesar's opening to his troops before Alesia wasn't informational. It was emotional. What emotion did he need to create in 30 seconds? What emotion do you need to create in your first sentence?",
      "Rewrite your opening line right now using what we just figured out. Say it out loud. What changed?"
    ],
    "topicBank": null,
    "masterySignal": "Child can articulate the difference between informational and emotional openings. Produces a revised opening line that demonstrates the principle, not just describes it.",
    "portfolioCapture": "Original opening line vs revised opening line + child's explanation of what changed and why.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Direct LA opportunity: sentence craft, rhetorical purpose, precise word choice. Name it out loud when Everly revises.",
    "connectiveHooks": [
      "apologetics prep",
      "Roman history",
      "Julius Caesar",
      "NCFCA tournament"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "CP-L5-002": {
    "id": "CP-L5-002",
    "title": "The Argument Inside the Story",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Analysis",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Every good story contains a hidden argument. The story of Rome's fall isn't just history — it's an argument about what happens when a civilization loses its moral center. Atlas wants you to find the hidden argument inside the last thing you read for Veritas. Not the plot. The argument. The thing the author is actually trying to make you believe.",
    "offScreenPrep": "Have your most recent Veritas reading notes nearby.",
    "conversationFramework": [
      "Tell me what happened in what you read. Two sentences maximum.",
      "Now tell me what the author wants you to believe as a result of reading that. That's the argument.",
      "Is the argument explicitly stated or is it embedded in the events? How do you know?",
      "If you were making that same argument without the story — just stating it directly — what would you say?",
      "Which version is more persuasive? Why?"
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish narrative from argument. Can extract the implicit claim from a historical narrative and articulate it directly.",
    "portfolioCapture": "Reading note + identified hidden argument + explanation of why narrative version is more or less persuasive than direct statement.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Reading comprehension at a higher level — distinguishing argument from narrative is an advanced LA skill. Name it.",
    "connectiveHooks": [
      "Veritas reading",
      "Roman history"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "CP-L5-003": {
    "id": "CP-L5-003",
    "title": "Two Minutes on Anything",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Impromptu practice",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "every 2 weeks",
    "tournamentRelevance": "Indirect — builds impromptu capacity",
    "brief": "Atlas has a topic for you. No preparation. Two minutes. The only rule: your first sentence cannot start with 'I think' or 'I believe.' He wants you to start with something that makes the listener need to hear what comes next. Ready?",
    "offScreenPrep": null,
    "conversationFramework": [
      "[Serve one topic from topicBank, calibrated to her current interests and recent Veritas content.]",
      "[After the 2 minutes] What was your strongest sentence? Not your favorite — your strongest. The one that did the most work.",
      "What was the moment you felt least certain? I could hear it.",
      "Your opening sentence — did it make me need to hear what came next? Be honest.",
      "One thing to change. Just one. What is it?"
    ],
    "topicBank": [
      "Why powerful empires always seem to destroy themselves from the inside.",
      "Whether it's more important to be right or to be persuasive.",
      "What Julius Caesar and a modern CEO have in common.",
      "Why some ideas survive for thousands of years and others disappear in a generation.",
      "Whether it's ever right to lie to protect someone.",
      "What the Roman Republic got right that we've forgotten."
    ],
    "masterySignal": "Child can self-identify the strongest and weakest moments in their own delivery. Beginning to self-correct without prompting.",
    "portfolioCapture": "Each run: topic served + strongest sentence + one change. Accumulates into longitudinal impromptu log.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Word choice and sentence opening are live LA skills. Atlas names the connection after delivery.",
    "connectiveHooks": [
      "Roman history",
      "business thinking"
    ],
    "recommendedOrder": 3,
    "prerequisites": [
      "CP-L5-001"
    ]
  },
  "CP-L5-004": {
    "id": "CP-L5-004",
    "title": "What Cleopatra Knew",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Analysis + Rhetoric",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Cleopatra met Julius Caesar and within days had him completely on her side. She wasn't more powerful. She wasn't smarter. She understood something about persuasion that Atlas wants you to figure out. He's not going to tell you what it is — he wants you to reason it out from what you know about her and what you know about Caesar.",
    "offScreenPrep": "Optional — any prior Veritas knowledge about Cleopatra or Caesar.",
    "conversationFramework": [
      "What did Cleopatra want from Caesar? What did Caesar want from his time in Egypt?",
      "If you were trying to persuade someone powerful, what's the first thing you'd need to understand about them?",
      "Cleopatra didn't try to impress Caesar with Egypt's power. She tried to interest him. What's the difference between impressing someone and interesting someone?",
      "How does this apply to apologetics? When someone asks 'Is God all-powerful?' — are they asking because they want information or because they want something else?",
      "What does understanding what someone actually wants change about how you answer them?"
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish between impressing and interesting an audience. Connects persuasion principle to her actual apologetics prep. Begins thinking about audience desire not just argument structure.",
    "portfolioCapture": "Key insight statement — 'What Cleopatra knew was...'",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Roman history",
      "apologetics audience awareness"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "CP-L5-005": {
    "id": "CP-L5-005",
    "title": "The One Thing Atlas Noticed",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Delivery feedback",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Atlas watched your last practice session. He noticed one thing — not something bad, something specific — that if you changed it would make everything else better. He's going to tell you what it is and then he wants to know if you agree with his diagnosis. You're allowed to push back.",
    "offScreenPrep": null,
    "conversationFramework": [
      "[Atlas surfaces a specific, data-driven observation based on Vera's session memory — e.g.: 'You have a habit of slowing down right before your most important point, as if you're giving the audience permission to stop listening.']",
      "Do you agree with that observation?",
      "When does it happen most?",
      "What would you need to change to fix it? Not the technique — what would you need to believe or think differently?"
    ],
    "topicBank": null,
    "masterySignal": "Accepts specific critical feedback without deflecting. Can engage analytically with their own delivery patterns.",
    "portfolioCapture": "The specific observation + her response + her planned change.",
    "crossDomains": [
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "speech practice",
      "self-assessment"
    ],
    "recommendedOrder": 5,
    "prerequisites": []
  },
  "CP-L5-006": {
    "id": "CP-L5-006",
    "title": "The Strongest Counter",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Argumentation",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — steelmanning builds tournament resilience",
    "brief": "Atlas has a challenge. He wants you to take one of your apologetics answers — the one you're most confident about — and argue against it. Not weakly. As hard as you can. Find the strongest possible objection to your own position. He thinks this will make your answer 20 times better. He might be right.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Which apologetics card are you most confident about? That's the one we're working with.",
      "State your answer. One clear sentence.",
      "Now forget you believe it. You're the smartest skeptic who has ever heard this argument. What's the most devastating thing you could say against it?",
      "Harder. That objection was too easy. What would a philosopher say? What would someone who has genuinely wrestled with this say?",
      "[After a strong counter is found] Now — how does knowing that objection exist change how you deliver your original answer? What do you add? What do you remove?"
    ],
    "topicBank": null,
    "masterySignal": "Can steelman an opposing view on a position she holds. Understanding that anticipating the counter makes the original argument stronger.",
    "portfolioCapture": "Original claim + strongest counter + revised delivery.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Argument structure: claim-evidence-warrant + anticipated objection. Atlas names this as a reusable LA structure.",
    "connectiveHooks": [
      "apologetics prep"
    ],
    "recommendedOrder": 6,
    "prerequisites": []
  },
  "CP-L5-007": {
    "id": "CP-L5-007",
    "title": "Write the Opening. Write It Again.",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Writing — rhetoric",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Atlas has one task. Write the opening paragraph of your informative speech. Not the whole thing — just the opening. Then write it a completely different way. Then a third way. Three openings, three approaches, one topic. He wants to see which Everly shows up in each version.",
    "offScreenPrep": "Write three opening paragraphs on paper first. Bring them to the Forge session.",
    "conversationFramework": [
      "Read me all three. Don't editorialize — just read them.",
      "Which one sounds most like you? Not most polished — most like you.",
      "Which one would make me need to keep listening? Those aren't always the same answer.",
      "What did you try in version two that you hadn't tried in version one?",
      "If you had to combine the best sentence from each version into one opening — what would that opening be?"
    ],
    "topicBank": null,
    "masterySignal": "Can produce multiple variations on the same content. Can distinguish between voice-authentic and rhetorically effective writing. Beginning to understand these can be the same.",
    "portfolioCapture": "All three opening paragraphs + the combined version + her reflection on which felt most like her.",
    "crossDomains": [],
    "laWeavingHook": "Core LA moment — real writing craft. Atlas explicitly names this as LA practice that replaces a separate LA assignment.",
    "connectiveHooks": [
      "fall informative speech"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "CP-L5-008": {
    "id": "CP-L5-008",
    "title": "The Lincoln Problem",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Historical rhetoric analysis",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Lincoln's Gettysburg Address is 272 words. It took less than three minutes to deliver. The speech that came before it — by a professional orator named Edward Everett — lasted two hours. Atlas wants to know: why does everyone remember Lincoln's speech and almost no one remembers Everett's? He thinks the answer is more interesting than 'Lincoln was better.' He wants your theory.",
    "offScreenPrep": "Read the Gettysburg Address once before the session (2 min). Optional: read the first two paragraphs of Everett's speech.",
    "conversationFramework": [
      "What is Lincoln's speech actually doing? What is its purpose — not what it says, what it does to the person listening?",
      "Everett was considered the greatest orator in America at the time. He prepared for six months. Lincoln wrote his speech in days. What does that tell you about the relationship between preparation and greatness in communication?",
      "Lincoln uses 'we' and 'our' constantly. Everett uses 'they' and 'the fallen.' What does that choice do to the listener?",
      "If you had to name the one principle from Lincoln's speech that you want to steal for your informative speech — what is it?"
    ],
    "topicBank": null,
    "masterySignal": "Can analyze a historical speech for rhetorical technique. Can extract a transferable principle and articulate how to apply it to her own work.",
    "portfolioCapture": "'The Lincoln principle I'm stealing for my informative speech is...'",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Rhetorical analysis of a primary-source text — direct LA work on voice, pronoun choice, and structural concision.",
    "connectiveHooks": [
      "Lincoln reading list",
      "informative speech prep"
    ],
    "recommendedOrder": 8,
    "prerequisites": []
  },
  "CP-L5-009": {
    "id": "CP-L5-009",
    "title": "Your Informative Topic — The Case For It",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Topic development",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Your fall informative speech is going to require a topic you care about deeply enough to spend three months with. Atlas wants you to make the case for your top two candidates. Not describe them — argue for them. Why does this topic deserve to exist as a speech? What does an audience gain that they couldn't get from reading a Wikipedia article?",
    "offScreenPrep": null,
    "conversationFramework": [
      "What are your two candidates? State each in one sentence — not the topic, what the speech argues about the topic.",
      "For candidate one: what is the most surprising thing someone would learn? What would genuinely shift their understanding?",
      "For candidate two: same question.",
      "Which one has more of you in it? Not more research potential — more of your actual perspective and voice?",
      "Which one connects to something you already know from your other reading or work? That connection is a structural advantage — you bring something to it that a generic speaker couldn't."
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish between a topic and an argument about a topic. Can identify where her existing knowledge gives her a structural advantage.",
    "portfolioCapture": "Two candidate one-sentence arguments + reasoning for which has more structural advantage.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Thesis development — the difference between a topic and an argument about a topic is core LA.",
    "connectiveHooks": [
      "fall informative speech",
      "Veritas knowledge base"
    ],
    "recommendedOrder": 9,
    "prerequisites": []
  },
  "CP-L5-010": {
    "id": "CP-L5-010",
    "title": "What Good Listening Looks Like",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Human communication — often missed",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Every lesson about communication focuses on speaking. Atlas thinks this is backwards. He believes the best communicators are first extraordinary listeners. Today he wants to talk about what you actually pay attention to when someone is speaking to you — and what that means for how people hear you.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think of the last time someone said something that made you genuinely change your mind about something. What did they do that made you actually hear it?",
      "Think of the last time someone was technically right but completely failed to persuade you. What went wrong?",
      "When you're delivering a speech, who is the most important person in the room to pay attention to? The judge? The audience?",
      "What would it look like to listen while you're speaking? Is that even possible?",
      "How does knowing your audience's actual state — not your assumed state — change what you do in the first 30 seconds?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the relationship between listening and persuasion. Understands audience awareness as an active not passive skill.",
    "portfolioCapture": "Her articulation of what good listening looks like in a speaking context.",
    "crossDomains": [
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "apologetics audience awareness"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "CP-L5-011": {
    "id": "CP-L5-011",
    "title": "Dissect a Bad Argument",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Critical analysis",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Atlas found an argument. It sounds convincing. It's actually deeply flawed. He wants you to find the flaw — not because bad arguments are common, but because understanding exactly how they fail makes your own arguments much stronger.",
    "offScreenPrep": null,
    "conversationFramework": [
      "[Agent serves one of: 'Rome fell because it got too big to govern. Therefore no civilization should expand beyond a certain size.' / 'The most successful leaders in history were all great speakers. Therefore if you become a great speaker you will be a successful leader.' / 'The Bible has survived for 2000 years without changing. Therefore everything in it must be true.']",
      "State the argument in your own words.",
      "On first read — does it sound convincing? Why?",
      "What is the argument assuming that it hasn't proven?",
      "Can you find a case where the logic holds but leads to an obviously wrong conclusion?",
      "What would the argument need to add to actually be sound?",
      "This kind of flaw has a name — do you know it? If not, let's figure out what to call it."
    ],
    "topicBank": null,
    "masterySignal": "Can identify the unstated assumption in a flawed argument. Can construct a counter-example. Beginning to name specific logical fallacies spontaneously.",
    "portfolioCapture": "The argument she dissected + the flaw named + her counter-example.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Fallacy Detective reading",
      "apologetics"
    ],
    "recommendedOrder": 11,
    "prerequisites": []
  },
  "CP-L5-012": {
    "id": "CP-L5-012",
    "title": "The Speech That Changed Something",
    "domain": "communication",
    "level": 5,
    "stage": 3,
    "specialist": "atlas",
    "childIds": [
      "everly"
    ],
    "type": "Inspiration + Analysis",
    "timeMinutes": 20,
    "standingPractice": true,
    "runFrequency": "monthly",
    "tournamentRelevance": null,
    "brief": "Every month Atlas wants you to study one great speech — not to copy it but to understand exactly what it did and how. This month: Churchill's 'We Shall Fight on the Beaches,' June 1940. Britain had just lost most of its army at Dunkirk. Churchill had to turn catastrophic defeat into defiant resolve in one speech. Atlas wants to know how.",
    "offScreenPrep": "Read or listen to the speech before the session (5 min).",
    "conversationFramework": [
      "What was Britain's actual situation when Churchill gave this speech? Why was it nearly hopeless?",
      "Churchill doesn't mention the word 'defeat' once. He doesn't deny what happened. What does he do instead?",
      "Count how many times he uses the word 'shall.' What does repetition do here that variation wouldn't?",
      "The last line is the most famous: 'We shall never surrender.' Why does it land so hard after everything that came before it?",
      "What is the single technique from this speech you most want to understand how to use yourself?"
    ],
    "topicBank": null,
    "masterySignal": "Can analyze a great speech for specific rhetorical choices. Can name the technique (repetition, reframing, building to a single climactic line) and explain why it works.",
    "portfolioCapture": "'The technique Churchill uses that I want to steal is [X] because [Y].'",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Rhetorical device identification at an advanced LA level — repetition, anaphora, building structure.",
    "connectiveHooks": [
      "WWII history",
      "rhetorical devices"
    ],
    "recommendedOrder": 12,
    "prerequisites": []
  },
  "IJ-L5-001": {
    "id": "IJ-L5-001",
    "title": "The Question Behind 'Is God Loving?'",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Apologetics depth + philosophical inquiry",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — 'Is God loving?' is one of her 12 bank questions",
    "brief": "Sage has been thinking about one of your apologetics questions — 'Is God loving?' — and he noticed something. The standard answer — yes, because the Bible says so — is true. But it doesn't actually address what the person asking is really wondering about. Sage thinks there's a deeper question hiding underneath the surface question. He wants you to find it.",
    "offScreenPrep": "Have her current 'Is God loving?' apologetics card on hand.",
    "conversationFramework": [
      "When someone asks 'Is God loving?' at a tournament — what do you think they're actually worried about? What's the real question underneath?",
      "Can you think of a situation where someone would ask that question not because they don't know the answer but because the answer isn't satisfying them? What situation would that be?",
      "The problem of evil is the oldest objection to a loving God — bad things happen to good people. Your current card doesn't address this. Should it? Why or why not?",
      "If you had 30 extra seconds in your answer to address the real question underneath — not just the surface question — what would you say?",
      "Here's what Sage thinks: the best apologists don't just answer the question asked. They answer the question meant. What's the difference?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify the deeper question beneath a surface apologetics question. Can articulate why answering only the surface question is incomplete.",
    "portfolioCapture": "'The real question underneath Is God loving? is...' — one paragraph in her own words.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Question analysis and audience awareness are rhetorical LA skills. Name it.",
    "connectiveHooks": [
      "NCFCA apologetics bank",
      "problem of evil",
      "May 9 tournament"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "IJ-L5-002": {
    "id": "IJ-L5-002",
    "title": "What the Fall Actually Explains",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Apologetics depth + worldview",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — 'Does the Fall still affect us today?'",
    "brief": "Sage thinks 'Does the Fall still affect us today?' is one of the most interesting questions in your bank — not because it's hard to answer yes, but because most people answer it without actually thinking about what it would mean if the answer were no. He wants to explore that with you.",
    "offScreenPrep": null,
    "conversationFramework": [
      "If the Fall didn't still affect us today — what would the world look like? Be specific.",
      "The doctrine of original sin is one of the most contested ideas in Christian theology. Why do you think some people resist it so strongly?",
      "Here's a harder question: is there evidence for the Fall that doesn't come from the Bible? What would you point to in human history or human nature?",
      "You've studied Rome. Sage wants to know: is the fall of Rome an example of the Fall still affecting us? How would you argue that?",
      "What does your answer become if you add the historical evidence to the biblical evidence? Is it stronger? Does it change anything?"
    ],
    "topicBank": null,
    "masterySignal": "Can argue for a theological position using both biblical and historical evidence. Can engage with why someone would resist the position, not just assert it.",
    "portfolioCapture": "One example from Veritas or history that Everly identifies as evidence for the Fall still affecting humanity today.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Roman history",
      "Veritas",
      "apologetics"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "IJ-L5-003": {
    "id": "IJ-L5-003",
    "title": "The Trick in the Question",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Logic + apologetics",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — prepares her for hostile cross-examination",
    "brief": "Sage wants to prepare you for something that happens at tournaments. Sometimes a question sounds like it's asking one thing but is actually designed to trap the answerer. He wants you to learn to see the trap before you step in it. Today's example: 'Can God make a rock so heavy He can't lift it?'",
    "offScreenPrep": null,
    "conversationFramework": [
      "What does this question assume about what 'all-powerful' means?",
      "If you accept the question's premise — that 'all-powerful' means God can do literally anything including logical contradictions — where does that lead?",
      "Does the question make sense? What would it mean for a question to not make sense?",
      "Can you think of another question that has the same structure — that sounds meaningful but contains a hidden assumption that makes it unanswerable?",
      "How do you respond to a trick question without sounding defensive or evasive? What's the move?",
      "Sage's suggestion: name the assumption, then answer the real question underneath. Try that with this one right now."
    ],
    "topicBank": null,
    "masterySignal": "Can identify the unstated assumption in a loaded question. Can respond to it without defensiveness — naming the assumption and redirecting to the real question.",
    "portfolioCapture": "Her response to the rock question + one other loaded-question she identifies with the same structure.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Identifying unstated premises is core logical analysis and LA reading comprehension.",
    "connectiveHooks": [
      "cross-examination prep",
      "Fallacy Detective"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "IJ-L5-004": {
    "id": "IJ-L5-004",
    "title": "Is Hell Consistent With a Loving God?",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Apologetics depth — hardest question in the bank",
    "timeMinutes": 25,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — 'Is Hell real?' is in her bank",
    "brief": "Sage thinks 'Is Hell real?' is the hardest question in your bank. Not because it's hard to say yes — but because saying yes raises an immediate objection that most apologetics cards don't address: how is eternal punishment consistent with a loving God? He wants to work through this with you — not to give you a canned answer, but to make sure you've actually thought it through.",
    "offScreenPrep": "Have her current 'Is Hell real?' apologetics card on hand.",
    "conversationFramework": [
      "State your current answer to 'Is Hell real?' as clearly as you can.",
      "Now: someone says 'But if God is loving, how could He send anyone to Hell forever?' What do you say?",
      "Is Hell a punishment God gives or a consequence people choose? Does that distinction matter? Why?",
      "C.S. Lewis wrote that the door of Hell is locked from the inside. What did he mean by that? Do you agree?",
      "How does free will connect to Hell? What would it mean for God to force everyone into Heaven?",
      "After thinking through all of this — has your answer to 'Is Hell real?' changed? What would you add to your card now?"
    ],
    "topicBank": null,
    "masterySignal": "Can engage with the most serious objection to her position without deflecting. Has thought through the logical relationship between divine love, justice, human freedom, and Hell. Answer is deeper than her current card.",
    "portfolioCapture": "Revised version of the Hell apologetics card after this session. Side-by-side with original.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Argument structure: claim → objection → response → refined claim.",
    "connectiveHooks": [
      "apologetics bank",
      "C.S. Lewis reading",
      "IJ-L5-009 free will"
    ],
    "recommendedOrder": 4,
    "prerequisites": [
      "IJ-L5-001"
    ]
  },
  "IJ-L5-005": {
    "id": "IJ-L5-005",
    "title": "The Arc of Your Twelve Questions",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Integration — connecting the full apologetics bank",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — builds confidence through coherence before May 9",
    "brief": "Sage noticed something about your 12 apologetics questions. They're not random. They follow a logical order — almost like an argument. He wants you to see the arc. When you understand how the questions connect, drawing a random question at tournament won't feel like pulling a card out of nowhere. It'll feel like opening a door into a room you already know.",
    "offScreenPrep": "Have her full 12-question bank laid out.",
    "conversationFramework": [
      "Look at your four categories: God, Revelation, Humanity, Jesus. Why do you think they're in that order?",
      "If someone knew nothing about Christianity and you had to introduce it through these 12 questions — what order would you put them in and why?",
      "How does 'Is God triune?' connect to 'Is Jesus both God and man?' What would fall apart if the answer to the first was no?",
      "How does 'Are all people made in the image of God?' change how you think about 'Does the Fall still affect us today?'",
      "If you had to choose the single most foundational question in your bank — the one all the others depend on — which would it be? Defend your choice.",
      "Now: does knowing this arc change how you'll feel when you draw a question at random on May 9th?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the logical relationship between questions in her bank. Understands the bank as a coherent theology not a list of isolated facts. Confidence grounded in understanding not memorization.",
    "portfolioCapture": "'The arc of my 12 questions is...' — Everly's own map of how the questions connect.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Structural argument analysis — how separate claims compose into a coherent whole. Advanced LA.",
    "connectiveHooks": [
      "NCFCA apologetics bank",
      "May 9 tournament"
    ],
    "recommendedOrder": 5,
    "prerequisites": [
      "IJ-L5-001",
      "IJ-L5-002",
      "IJ-L5-003",
      "IJ-L5-004"
    ]
  },
  "IJ-L5-006": {
    "id": "IJ-L5-006",
    "title": "The Night Before May 9th",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Confidence consolidation",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — run the evening before tournament",
    "brief": "Sage has one question for you tonight. Not about your answers. About you.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What do you know now that you didn't know four weeks ago? Not about the content — about how you think.",
      "Which question in your bank do you now understand most deeply? Not most confidently — most deeply. What's the difference?",
      "Sage wants to tell you something: you have not been preparing answers. You have been becoming someone who has genuinely thought about these things. That person walks into tomorrow differently than someone who memorized cards. Do you feel that difference?",
      "One question: if you draw the hardest one tomorrow — the one that genuinely challenges you — what do you do in the first five seconds?",
      "Good. Now close Forge and go to sleep. You're ready.",
      "[Vera closes: 'I'll be here when you get back tomorrow. Tell me everything.']"
    ],
    "topicBank": null,
    "masterySignal": "Confidence is grounded in her actual growth, not performance prep. Can articulate her first-five-seconds protocol for a hard question.",
    "portfolioCapture": "Her answer to 'what do I know about how I think now.' A keepsake entry.",
    "crossDomains": [
      "humanFluency",
      "physical"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "May 9 tournament",
      "Coach Dillon composure work"
    ],
    "recommendedOrder": 6,
    "prerequisites": [
      "IJ-L5-005"
    ]
  },
  "IJ-L5-007": {
    "id": "IJ-L5-007",
    "title": "What Rome Got Wrong About Power",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Historical judgment",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Sage has been thinking about the Roman Republic and how it became the Roman Empire. He thinks this is one of the most important questions in all of history: how does a civilization that prizes virtue and law gradually give up both in exchange for power? And he thinks you, of all people, might have a genuine answer.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What made the Roman Republic great? Not militarily — what values held it together?",
      "What was the first thing that had to die for Caesar to become possible?",
      "Is what happened to Rome inevitable? Could it have gone differently? What would have needed to be true?",
      "Sage's harder question: are the same forces that destroyed Rome visible in any civilization today? You're allowed to disagree with him.",
      "What does a person need — in their own identity and judgment — to resist the pull toward power that destroyed Rome? What's the internal equivalent of the Republic's external values?"
    ],
    "topicBank": null,
    "masterySignal": "Can analyze historical events for the internal values and identity failures that produced external outcomes. Can connect historical judgment to personal character formation.",
    "portfolioCapture": "Her one-paragraph theory of what destroyed the Republic + what internal virtue resists it.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Historical analysis as argument construction — live LA work.",
    "connectiveHooks": [
      "Veritas Roman history",
      "Caesar"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "IJ-L5-008": {
    "id": "IJ-L5-008",
    "title": "First Principles",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Thinking methodology",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Sage wants to teach you a thinking tool that Aristotle invented and Elon Musk accidentally rediscovered. It's called first principles reasoning. Most people think by analogy — 'this is like that, so it probably works the same way.' First principles thinkers tear everything down to the most basic truths and rebuild from there. Sage thinks this tool will change how you do apologetics.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Let's start with an example. Most people assume apologetics means defending Christianity. What's the first principle underneath that? What are you actually trying to do when you give an apologetics answer?",
      "If you stripped away everything you've been taught about how to answer 'Is God all-powerful?' — what would you be left with? What do you actually know to be true at the most basic level?",
      "Now rebuild your answer from that foundation. Does it look different from your current card? How?",
      "Sage's challenge: pick the apologetics question you find hardest and apply first principles to it. Start from zero. What do you actually know? What follows from that?",
      "What's the difference between an answer you've been given and an answer you've built yourself? Which one do you trust more under pressure?"
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish received answers from built answers. Can apply first principles thinking to at least one apologetics question and produce an answer that is genuinely her own construction.",
    "portfolioCapture": "One apologetics answer rebuilt from first principles + her reflection on what changed.",
    "crossDomains": [
      "aiSystems",
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "apologetics",
      "AoPS mathematical reasoning",
      "business reasoning"
    ],
    "recommendedOrder": 8,
    "prerequisites": []
  },
  "IJ-L5-009": {
    "id": "IJ-L5-009",
    "title": "What You Actually Believe About Free Will",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Philosophical inquiry",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Sage wants to explore something that connects to several of your apologetics questions but that nobody at the tournament will ask directly: do you actually believe in free will? And why does your answer matter more than you might think?",
    "offScreenPrep": null,
    "conversationFramework": [
      "When you make a decision — right now, something small — did you choose it freely? How do you know?",
      "If God knows everything that will happen, including every choice you will ever make — are those choices still free? This is called the foreknowledge problem. What's your instinct?",
      "Your apologetics answers about humanity, Hell, and salvation all assume free will. What happens to those answers if free will isn't real?",
      "Sage isn't asking you to solve this — philosophers have been arguing about it for 2,500 years. He's asking you to sit with it. What does it feel like to hold a question that doesn't have a clean answer?",
      "Can you believe something firmly and still hold open questions about the foundations of that belief? What does that kind of intellectual honesty look like?"
    ],
    "topicBank": null,
    "masterySignal": "Can sit with genuine philosophical uncertainty without anxiety or deflection. Understands that holding open questions is a sign of intellectual maturity not weakness. This is a critical milestone for Stage 3 → Stage 4 transition.",
    "portfolioCapture": "Her reflection on what it feels like to hold an unresolved foundational question.",
    "crossDomains": [
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Hell apologetics IJ-L5-004",
      "philosophical maturity"
    ],
    "recommendedOrder": 9,
    "prerequisites": []
  },
  "IJ-L5-010": {
    "id": "IJ-L5-010",
    "title": "The Fallacy in the Wild",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Logic — real world application",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "weekly",
    "tournamentRelevance": null,
    "brief": "Sage has a standing challenge that runs every week: find a real fallacy in the real world. Not from Fallacy Detective — from something you actually read, heard, or saw this week. Bring it to the session and take it apart.",
    "offScreenPrep": "Bring one real example of a fallacy she noticed this week.",
    "conversationFramework": [
      "Tell me where you found it. What was the context?",
      "State the argument as fairly as you can — steelman it before you critique it.",
      "Now: what's the flaw? Name it specifically.",
      "Could the person making this argument have made a sound version of the same point? What would that look like?",
      "Why do you think this fallacy is so common? What makes it feel convincing even when it isn't?"
    ],
    "topicBank": null,
    "masterySignal": "Over time, speed and accuracy of fallacy identification increases. More importantly — she begins noticing fallacies spontaneously without prompting.",
    "portfolioCapture": "Her growing fallacy library — one entry per week. Becomes a personal reference document.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Weekly LA work on argument analysis — substitutes for separate logic curriculum.",
    "connectiveHooks": [
      "Fallacy Detective reading",
      "current events"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "IJ-L5-011": {
    "id": "IJ-L5-011",
    "title": "Marcus Aurelius Had a Bad Week",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Historical + character formation",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Marcus Aurelius was the most powerful man in the world and he spent his private journal writing about how hard it was to be a good person. Sage thinks the Meditations are one of the most important books ever written — not because they solved anything, but because they show what genuine moral effort looks like from the inside. He wants to introduce you to them.",
    "offScreenPrep": "Read three short passages from Meditations assigned by Sage (printed out, 10 min).",
    "conversationFramework": [
      "Marcus Aurelius was writing to himself — he never intended anyone else to read this. What does that change about how you read it?",
      "He keeps returning to the same struggles — anger, distraction, the opinions of others. Why do you think the most powerful man in the world struggled with the same things everyone else does?",
      "He was a Stoic philosopher. Stoics believed you couldn't control external events — only your response to them. Do you agree with that? Where does it fit or not fit with your own worldview?",
      "Sage wants to know: is there something in what you read that you recognize in yourself? Something you also struggle with?",
      "What would it look like to keep a private journal like Marcus Aurelius — writing honestly to yourself about where your character is falling short? Would that be useful? Frightening? Both?"
    ],
    "topicBank": null,
    "masterySignal": "Can engage with primary source philosophy. Can identify points of agreement and disagreement with a non-Christian thinker without feeling threatened by the engagement. Can connect philosophical reading to self-knowledge.",
    "portfolioCapture": "One thing she recognized in herself from the Meditations passages.",
    "crossDomains": [
      "humanFluency"
    ],
    "laWeavingHook": "Primary source reading at sophisticated level — dense LA work disguised as philosophical reading.",
    "connectiveHooks": [
      "Meditations reading list",
      "self-knowledge work with Kira"
    ],
    "recommendedOrder": 11,
    "prerequisites": []
  },
  "IJ-L5-012": {
    "id": "IJ-L5-012",
    "title": "Second Order Consequences",
    "domain": "identity",
    "level": 5,
    "stage": 3,
    "specialist": "sage",
    "childIds": [
      "everly"
    ],
    "type": "Systems thinking + judgment",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Sage thinks most people only think one step ahead. They ask 'what happens next?' But the best thinkers ask 'and then what? And then what after that?' This is called second-order thinking and Sage believes it's one of the most important judgment skills you can build. Today he wants to practice it with a question from Roman history.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Julius Caesar crossed the Rubicon — brought his army into Rome, which was illegal and started a civil war. What happened immediately after? That's first-order.",
      "Now: what happened because of what happened? What were the consequences of the consequences? That's second-order.",
      "And then what? Keep going. Where does the chain end up — not just historically, but in terms of what it meant for Western civilization?",
      "Now apply this to a decision in your own life. Something you're facing or have recently made. Walk through the second and third order consequences.",
      "Here's Sage's question: is there a decision your family is making right now — about your business, your education, anything — where you could apply this kind of thinking? What do you see when you go two or three steps out?"
    ],
    "topicBank": null,
    "masterySignal": "Can trace causal chains 3+ steps. Can apply second-order thinking to both historical analysis and personal decisions. Can identify unintended consequences.",
    "portfolioCapture": "Her three-step chain on a personal or family decision.",
    "crossDomains": [
      "aiSystems",
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Roman history",
      "JellyBean strategic decisions",
      "Nova systems thinking"
    ],
    "recommendedOrder": 12,
    "prerequisites": []
  },
  "BE-L6-001": {
    "id": "BE-L6-001",
    "title": "What JellyBean Is Actually Worth",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Valuation — core financial reasoning",
    "timeMinutes": 25,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux has a question that nobody has asked you yet: if someone wanted to buy JellyBean Vending from you and Isla right now — what is it actually worth? Not what you've put into it. What it's worth to a buyer. He wants you to figure out how to think about that before he tells you anything.",
    "offScreenPrep": "Have current JellyBean monthly profit figures ready.",
    "conversationFramework": [
      "First — what do you think it's worth? Give me a number. Don't hedge.",
      "Why that number? What did you base it on?",
      "Here's what a buyer actually cares about: not what you paid, not what you've earned so far — what will it earn in the future? Why would someone pay today for tomorrow's profits?",
      "Your machine generates roughly $[X] per month in net profit. If you wanted to sell it, a buyer would probably pay somewhere between 12 and 36 times monthly profit. Why do you think the range is so wide? What would put you at the high end vs the low end?",
      "What would make JellyBean more valuable? Not just bigger — specifically more valuable to a potential buyer.",
      "You're not selling. But knowing what your business is worth changes how you make decisions about it. How?"
    ],
    "topicBank": null,
    "masterySignal": "Can construct a basic valuation argument. Understands that valuation is about future cash flows not past investment. Can identify specific actions that would increase business value.",
    "portfolioCapture": "'JellyBean Vending is currently worth approximately $[X] because...' — her own reasoning.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean P&L",
      "Thursday meeting"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "BE-L6-002": {
    "id": "BE-L6-002",
    "title": "The Loan Is a Teacher",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Financial philosophy + debt mechanics",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants to talk about your loan — not the math, you know the math — but what borrowing money actually means and what it's teaching you. He thinks most people in the world have never understood the relationship between debt and discipline. He wants to know if you do.",
    "offScreenPrep": "Review loan balance in business block.",
    "conversationFramework": [
      "What does it feel like to owe money? Be specific — not the concept, the actual feeling.",
      "Every month you pay back 50% of profit. That means the business can't keep all its earnings. What does that constraint force you to do that you wouldn't have to do if you had no debt?",
      "There's a principle Flux wants to introduce: leverage. Borrowing money to build something that earns more than the cost of the debt is one of the oldest wealth-building tools in existence. Is your loan leverage? How do you know?",
      "Here's the harder question: your parents lent you the money at 2% APR. That's extremely favorable. What if it had been 10%? 20%? How would that have changed your decisions?",
      "What is debt for? When is borrowing the right decision and when is it not?",
      "You are 11 years old and you have borrowed money, operated a business, and are paying it back from real earnings. What does that mean for how you think about debt for the rest of your life?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the concept of leverage in her own words using her own business as the example. Understands debt as a tool with real costs and real benefits — not inherently good or bad.",
    "portfolioCapture": "Her definition of leverage using JellyBean as the example.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean loan",
      "family financial philosophy"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "BE-L6-003": {
    "id": "BE-L6-003",
    "title": "Your Unit Economics",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Financial analysis — precision",
    "timeMinutes": 25,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants to know exactly how much money JellyBean makes on each drink sold. Not revenue — profit. Every single cost accounted for. He thinks most business owners have a vague idea of this number. He wants yours to be exact.",
    "offScreenPrep": "Have actual QuickBooks data open — product costs, lease, fees.",
    "conversationFramework": [
      "Pick one product — let's start with Green Monster. What does it sell for?",
      "What does it cost you? Include the product cost AND a proportional share of the machine lease, any fees, any losses from damaged or expired product.",
      "So your gross margin on that item is what? Calculate it.",
      "Now: which product has the highest margin? Which has the lowest? Do you know? If not — how would you find out?",
      "Here's the business question: if you could only sell 5 products instead of 8, which 5 would you keep and why? Show your work.",
      "This kind of analysis is called unit economics. Every investor who ever looks at a business asks for this first. Why do you think that is?",
      "What does knowing your unit economics change about how you'd run a restock?"
    ],
    "topicBank": null,
    "masterySignal": "Can calculate gross margin per product. Can rank products by margin and make a reasoned decision about product mix based on financial data.",
    "portfolioCapture": "JellyBean product margin analysis — her own calculation, her own ranking, her own recommendation.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "QuickBooks",
      "product mix decisions"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "BE-L6-004": {
    "id": "BE-L6-004",
    "title": "The Second Machine — Should You?",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Strategic expansion thinking",
    "timeMinutes": 25,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "The second machine is on your JellyBean HQ ideas list. Flux wants to have the real conversation about it — not whether it's a good idea, but how you'd think through whether it's a good idea. Because the process of deciding matters more than the decision.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What would a second machine add to the business? Be specific — not 'more revenue,' how much more revenue based on what assumptions?",
      "What would it cost? Not just the machine — everything. List every cost you can think of.",
      "You currently pay back your loan from 50% of profit. If you take on a second machine with another loan, what happens to your cash flow? Model it out.",
      "What's your current capacity to manage the business? How much of your time does one machine take per week? What does two machines take?",
      "Here's the strategic question: is JellyBean ready to grow or does it need to get stronger first? What's the difference between a business that's ready to scale and one that isn't?",
      "What would need to be true for a second machine to be the right call? Make a list of conditions.",
      "Flux's honest take: he doesn't know if you should get a second machine. But he knows exactly what questions you'd need to answer first. Did you ask all of them?"
    ],
    "topicBank": null,
    "masterySignal": "Can think through a strategic expansion decision systematically. Does not jump to conclusion before working through the analysis. Can identify the conditions under which a decision is right.",
    "portfolioCapture": "Her full decision framework for the second machine + list of conditions that must be true.",
    "crossDomains": [
      "identity",
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean HQ",
      "strategic decision making"
    ],
    "recommendedOrder": 4,
    "prerequisites": [
      "BE-L6-001"
    ]
  },
  "BE-L6-005": {
    "id": "BE-L6-005",
    "title": "What Is JellyBean Actually For?",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Business philosophy — the hardest question",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux has one question today. It sounds simple. It isn't. What is JellyBean Vending actually for?",
    "offScreenPrep": null,
    "conversationFramework": [
      "Tell me what you think the answer is.",
      "Is it to make money? That's not wrong — but it's not complete. If the only goal was money you could find easier ways to make it.",
      "Who does JellyBean serve? Who benefits from it existing?",
      "The people buying drinks from your machine — what are they getting besides a drink? Is there any way they're better off because your machine is there rather than not?",
      "Here's the bigger question: should a business be judged only by whether it's profitable? What else matters?",
      "Peter Drucker — one of the greatest business thinkers of the 20th century — said 'the purpose of a business is to create a customer.' What do you think he meant? Do you agree?",
      "So: what is JellyBean actually for? Does your answer now sound different than it did when we started?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate a business purpose that goes beyond profit generation. Understands that genuine businesses create value for customers not just revenue for owners.",
    "portfolioCapture": "'JellyBean Vending exists to...' — Everly's own mission statement for her business.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Mission statement writing — live LA work on clarity and conviction.",
    "connectiveHooks": [
      "business philosophy",
      "Drucker"
    ],
    "recommendedOrder": 5,
    "prerequisites": []
  },
  "BE-L6-006": {
    "id": "BE-L6-006",
    "title": "Read Your Own P&L",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Financial literacy — operational",
    "timeMinutes": 20,
    "standingPractice": true,
    "runFrequency": "monthly",
    "tournamentRelevance": null,
    "brief": "Flux wants to go through last month's P&L line by line. Not to check your work — he assumes you've done it. He wants to know what story the numbers are telling you. Because numbers always tell a story. Most people read numbers. Flux wants you to hear them.",
    "offScreenPrep": "Have current QuickBooks P&L open.",
    "conversationFramework": [
      "Show me the three most important numbers from last month. Not revenue, not expenses — the three numbers that tell you most about the health of the business.",
      "Revenue was $[X]. Is that good? Compared to what?",
      "Your margin was [Y]%. What would a 5% improvement in margin require? Is that achievable?",
      "What surprised you in this month's numbers? Something that was different from what you expected.",
      "If you were presenting this P&L to an investor — your dad, or someone outside the family — what would you say first? What are you proud of? What are you working on?",
      "What does this month's P&L tell you about what to do differently next month?"
    ],
    "topicBank": null,
    "masterySignal": "Can analyze a real P&L for business health signals — not just read numbers but interpret them. Can identify variance from expectation and connect it to operational decisions.",
    "portfolioCapture": "Monthly P&L commentary — three numbers, the surprise, the action item.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "QuickBooks",
      "Thursday meeting"
    ],
    "recommendedOrder": 6,
    "prerequisites": []
  },
  "BE-L6-007": {
    "id": "BE-L6-007",
    "title": "The Real Estate Fund — What It's Actually Doing",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Investment literacy — long-term thinking",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Every week a portion of your Denovo salary flows into a real estate fund. You know the numbers. What Flux wants to know is whether you understand what's actually happening — and what it means for who you will be at 25, 35, 45.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Your fund earns approximately 7% per year. What does that mean in real terms — where does that 7% come from? Who pays it and why?",
      "If you invest $13,500 per year starting now at 7%, what do you have at age 25? At 35? At 45? Calculate it — or estimate it using the Rule of 72.",
      "Your fund at age 45 — what could you do with that money? What options does it give you that you wouldn't have without it?",
      "Here's the deeper question: why does starting at 11 instead of starting at 25 matter so much? What is the actual difference in outcome?",
      "Flux wants to know what you think about wealth. Not how to make it — what it's for. What would you do with real financial freedom? What does that phrase even mean to you?",
      "Your tithe comes first. Why does that matter? What does giving first rather than last say about your relationship with money?"
    ],
    "topicBank": null,
    "masterySignal": "Can model compound growth using Rule of 72. Understands the time value of money viscerally not just conceptually. Can articulate a personal philosophy of wealth that includes both accumulation and generosity.",
    "portfolioCapture": "Her projected fund balances at 25, 35, 45 + her own answer to 'what is wealth for.'",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Denovo contract",
      "tithing practice",
      "compound interest"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "BE-L6-008": {
    "id": "BE-L6-008",
    "title": "The Thursday Meeting — How Good Is It?",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Operations + leadership",
    "timeMinutes": 20,
    "standingPractice": true,
    "runFrequency": "monthly",
    "tournamentRelevance": null,
    "brief": "Flux wants to debrief your L10 meeting from today. Not what you covered — how well you ran it. Because running a meeting well is a leadership skill most adults never develop. He wants to know if you're developing it.",
    "offScreenPrep": "Run after L10 meeting, same day.",
    "conversationFramework": [
      "Walk me through today's meeting. What happened in each section?",
      "Where did it go well? Be specific — not 'it was fine,' what specifically worked?",
      "Where did it stall or go sideways? What caused that?",
      "The L10 format has a section for IDS — Identify, Discuss, Solve. Did you actually solve anything or did you just discuss?",
      "Who ran the meeting — you, Isla, or your dad? Who should be running it? What would need to be true for you to run it fully?",
      "Six months from now — what does a great JellyBean L10 meeting look like? How is it different from today's?"
    ],
    "topicBank": null,
    "masterySignal": "Can evaluate a meeting's effectiveness with specificity. Can identify what produces a good meeting vs a mediocre one. Beginning to take ownership of meeting leadership rather than just participating.",
    "portfolioCapture": "Monthly meeting debrief — what worked, what stalled, her ownership plan.",
    "crossDomains": [
      "communication",
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Thursday L10 meeting",
      "leadership development"
    ],
    "recommendedOrder": 8,
    "prerequisites": []
  },
  "BE-L6-009": {
    "id": "BE-L6-009",
    "title": "Pricing Power",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Strategic business thinking",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants to talk about one of the most important concepts in business that most people never think about: pricing power. Why can some businesses charge more than others for essentially the same thing? And does JellyBean have any?",
    "offScreenPrep": null,
    "conversationFramework": [
      "Your machine charges $[price] for a Monster Energy. What would happen if you raised the price by 25 cents? Would you sell fewer drinks?",
      "What determines whether customers accept a price increase or walk away?",
      "Apple charges $1,000+ for a phone. Generic phones do the same things for $200. Why do people pay the difference?",
      "Your machine is in one specific location. Are you the only option there? What does that mean for your pricing power?",
      "Here's the concept: pricing power comes from either differentiation (being different in a way that matters) or captive market (being the only option). Which does JellyBean have? Is it enough?",
      "If you wanted to increase your pricing power — what would you do?"
    ],
    "topicBank": null,
    "masterySignal": "Can define pricing power and identify the two primary sources of it. Can evaluate her own business's pricing power honestly. Can suggest specific actions to increase it.",
    "portfolioCapture": "Her assessment of JellyBean's pricing power + three actions to increase it.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "pricing strategy",
      "competitive analysis"
    ],
    "recommendedOrder": 9,
    "prerequisites": []
  },
  "BE-L6-010": {
    "id": "BE-L6-010",
    "title": "What Would You Tell a 9-Year-Old Starting a Business?",
    "domain": "building",
    "level": 6,
    "stage": 3,
    "specialist": "flux",
    "childIds": [
      "everly"
    ],
    "type": "Integration + teaching as mastery",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux has an unusual request. Isla is 8. In a year she'll be old enough to think about starting her own business — separate from JellyBean. Flux wants you to think about what you would tell her. Not advice from a book. Advice from someone who has actually done it.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What are the three most important things you've learned from running JellyBean that you couldn't have learned any other way?",
      "What was the biggest mistake you made in the first six months? What would you do differently?",
      "What did you think running a business would be like before you started? What's the reality?",
      "What's the hardest part that nobody told you about?",
      "If Isla asked you 'should I start a business?' what would you actually say? Not encouragement — the real answer.",
      "Flux's observation: the fact that you can answer these questions means something. You have real knowledge from real experience. That is worth more than any class about entrepreneurship."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate genuine experiential learning — specific, honest, personal. Knowledge has moved from information to wisdom because it came from real experience.",
    "portfolioCapture": "'What I know about business that I couldn't have read in a book...' — Everly's own business wisdom document.",
    "crossDomains": [
      "humanFluency",
      "communication"
    ],
    "laWeavingHook": "Expository writing from lived experience — one of the highest forms of LA work.",
    "connectiveHooks": [
      "Isla sibling relationship",
      "JellyBean history"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "HF-L4-001": {
    "id": "HF-L4-001",
    "title": "What You're Good At With People",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Self-knowledge — strengths",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to start somewhere that might surprise you. Not what's hard about relationships. What you're actually good at. She thinks most people have no idea what their genuine relational strengths are — and that not knowing makes everything harder.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about a time when you made someone feel genuinely good — not by doing something impressive, but just by how you were with them. What happened?",
      "What did you do in that moment that you do naturally — that didn't require effort?",
      "Is there someone in your life who specifically seems to feel better after spending time with you? What do you think you give them?",
      "Kira's observation: the things we do naturally with people are usually invisible to us. We don't see them as skills because they don't feel like work. Can you name one thing you do with people that you don't think of as a skill but might actually be?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify at least one genuine relational strength with specificity — not 'I'm nice' but something observable and particular.",
    "portfolioCapture": "'Something I'm actually good at with people is...' — one honest paragraph.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Isla partnership",
      "friendships"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "HF-L4-002": {
    "id": "HF-L4-002",
    "title": "The Business Partnership",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Relationship reflection — Isla",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to think about one specific relationship: you and Isla as business partners. Not as sisters — as partners. She's curious what that relationship is like from the inside.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What is it like to be in business with your little sister? Not the logistics — what's it actually like?",
      "Is there anything about the business partnership that is different from your relationship as sisters? What changes?",
      "When you and Isla disagree about something in the business — what happens? Walk Kira through the last time that happened.",
      "What does Isla bring to JellyBean that you don't? Be honest.",
      "What do you bring that she doesn't?",
      "Kira wants to ask something harder: is there anything about the partnership that frustrates you that you haven't said out loud to anyone?"
    ],
    "topicBank": null,
    "masterySignal": "Can reflect on a close relationship with honesty and specificity — including what's genuinely hard about it. Can identify complementary strengths without diminishing either person.",
    "portfolioCapture": "Her honest reflection on the partnership — complementary strengths + one hard thing.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean",
      "Isla relationship"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "HF-L4-003": {
    "id": "HF-L4-003",
    "title": "When You Go Quiet",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Self-awareness — avoidance pattern",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira has noticed something — not something bad, something interesting. She thinks there are moments when Everly goes quiet in a conversation. Not because she has nothing to say. Because something is happening that makes speaking feel harder than staying silent. She wants to understand that.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Can you think of a situation recently where you had something to say but didn't say it? What was the situation?",
      "What stopped you? Not the reason you'd give someone else — what actually stopped you?",
      "Is there a type of situation where this happens more often? What do they have in common?",
      "When you stay quiet — what happens to the thing you didn't say? Does it go away or does it stay?",
      "Kira isn't saying going quiet is wrong. Sometimes it's exactly right. But she wants to know: are there times you stay quiet that you later wish you hadn't?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify a pattern in her own social behavior — specifically a trigger for silence — and describe it with honesty. Not solving it. Naming it.",
    "portfolioCapture": "Her pattern description — what situations trigger silence and what happens to what goes unsaid.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "challenge avoidance pattern",
      "self-awareness"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "HF-L4-004": {
    "id": "HF-L4-004",
    "title": "After Something Hard",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Emotional regulation — recovery",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to talk about what happens after something hard. Not during — after. Because how you recover from hard things is one of the most important things about you as a person, and most people have never thought carefully about it.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think of the last time something genuinely hard happened — something that upset you or knocked you off balance. You don't have to say what it was if you don't want to.",
      "How long did it take you to feel like yourself again? Hours? Days?",
      "What helped? Not what you think should help — what actually helped, even if it sounds small or strange.",
      "Is there anything that made recovery harder or slower?",
      "Here's what Kira is curious about: is your recovery time getting shorter as you get older? Or is it about the same?",
      "What do you wish you could do better in those moments — not during the hard thing, but in the recovery?"
    ],
    "topicBank": null,
    "masterySignal": "Can describe her recovery process with specificity. Can identify what helps and what doesn't. Beginning to treat recovery as something she can understand and influence rather than just wait out.",
    "portfolioCapture": "Her recovery map — what helps, what hinders, what's changing over time.",
    "crossDomains": [
      "physical"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "S2S Fear Paralysis integration",
      "Coach Dillon composure work"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "HF-L4-005": {
    "id": "HF-L4-005",
    "title": "What Courage Looks Like Up Close",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Character formation — courage in relationships",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira thinks courage in relationships looks completely different from courage in competitions or performances. She wants to explore what it actually takes to be brave with people — not in front of audiences, but one on one.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What's the hardest thing you've ever said to someone — not in an argument, but something you said because it needed to be said?",
      "What made it hard to say?",
      "Have you ever not said something important because it felt too risky? What was the risk you were protecting yourself from?",
      "Kira thinks there are two kinds of relational courage: saying hard things and hearing hard things. Which is harder for you?",
      "When someone tells you something difficult about yourself — even gently — what happens in your body? What do you do with it?",
      "Is there something right now that you know you should say to someone but haven't? You don't have to say what it is. Just notice if there is one."
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish between relational courage and performance courage. Can identify a specific instance of relational bravery or avoidance. Can sit with the question 'is there something I should say?' without deflecting.",
    "portfolioCapture": "Her reflection on which is harder — saying hard things or hearing them — and why.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "relational bravery"
    ],
    "recommendedOrder": 5,
    "prerequisites": []
  },
  "HF-L4-006": {
    "id": "HF-L4-006",
    "title": "Who You Are With Different People",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Self-knowledge — social identity",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to explore something that's true about everyone and that most people find surprising when they first notice it: we're slightly different people with different people in our lives. She thinks that's not a flaw — it's actually interesting. She wants to understand how Everly shows up differently in different relationships.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Who are you with your dad? Describe it — not your relationship, who you are.",
      "Who are you with Isla?",
      "Who are you at Speech club?",
      "Who are you with your closest friend?",
      "Are any of these versions of you more real than the others? Or are they all real?",
      "Kira's question: is there a version of you that you show almost no one? Not a secret — just a part of you that doesn't come out often. What's it like?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate how she shows up differently in different relationships without anxiety about the inconsistency. Begins to understand that different relational contexts draw out different genuine parts of a person.",
    "portfolioCapture": "Her self-portrait across five relational contexts.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "identity across contexts"
    ],
    "recommendedOrder": 6,
    "prerequisites": []
  },
  "HF-L4-007": {
    "id": "HF-L4-007",
    "title": "The Apology",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Repair — conflict resolution",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira thinks apologizing is one of the most underrated skills in the world. Not saying sorry to end an argument — genuine repair after something went wrong. She wants to talk about what a real apology actually requires.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think of the last time you apologized to someone. What did you say?",
      "Did it work? How do you know?",
      "Kira thinks a real apology has three parts: naming what happened, acknowledging the impact, and not making excuses. Most apologies only do one of the three. Which part is hardest for you?",
      "What about receiving an apology — what do you need from someone who has hurt you for the apology to actually land?",
      "Have you ever gotten an apology that didn't work even though the person meant it? What was missing?",
      "Is there anyone in your life right now that you owe a real apology to? You don't have to say who."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate what makes an apology genuine versus performative. Can identify the specific component of apology that is hardest for her.",
    "portfolioCapture": "Her three-part apology framework and which part she finds hardest.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "repair in relationships"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "HF-L4-008": {
    "id": "HF-L4-008",
    "title": "What You Notice About People",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Empathy — observation",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira thinks some people move through the world noticing things about other people — their moods, their needs, what they're not saying — and other people don't notice much at all. She's curious where Everly falls on that spectrum.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about the people you saw today or recently. Is there anyone whose mood or state you picked up on without them saying anything?",
      "What did you notice? What gave it away?",
      "Did you do anything with what you noticed? Or did you just observe?",
      "Is there someone in your life whose emotional state you're particularly tuned into? Why that person?",
      "Here's what Kira wonders: is noticing something about someone an obligation to do something about it? Or is noticing enough on its own?"
    ],
    "topicBank": null,
    "masterySignal": "Can demonstrate genuine observational attunement — noticing specific behavioral or emotional signals in people she knows. Beginning to think about the relationship between noticing and responding.",
    "portfolioCapture": "One specific observation she made recently about someone and what she did (or didn't do) with it.",
    "crossDomains": [],
    "laWeavingHook": null,
    "connectiveHooks": [
      "empathy practice"
    ],
    "recommendedOrder": 8,
    "prerequisites": []
  },
  "HF-L4-009": {
    "id": "HF-L4-009",
    "title": "The Friendship You're Most Proud Of",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Relationship depth — positive",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to spend today's session on something good. She wants to hear about a friendship that matters to you — and what you think you've built together.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Tell Kira about a friendship you're proud of. What makes it good?",
      "What did you have to do to build it? What did it require from you?",
      "Is there something about this friendship that surprised you — something you didn't expect when it was just beginning?",
      "What do you give this person? What do they give you?",
      "Kira's question: what does this friendship tell you about what you're like as a friend — the real version, not the ideal version?"
    ],
    "topicBank": null,
    "masterySignal": "Can reflect on a relationship with depth and honesty — including what she contributes and what it requires. Can identify something true about herself through the lens of a close friendship.",
    "portfolioCapture": "Her reflection on what a specific friendship tells her about who she is as a friend.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "friendships"
    ],
    "recommendedOrder": 9,
    "prerequisites": []
  },
  "HF-L4-010": {
    "id": "HF-L4-010",
    "title": "When You Felt Understood",
    "domain": "humanFluency",
    "level": 4,
    "stage": 3,
    "specialist": "kira",
    "childIds": [
      "everly"
    ],
    "type": "Connection — core human need",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira thinks feeling genuinely understood by another person is one of the most important human experiences. She wants to explore when that happens for Everly and what it takes.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think of a time when someone really understood you — not just heard you, but actually got it. What was that like?",
      "What did they do that made you feel understood? Was it what they said or something else?",
      "Is there someone in your life who understands you most consistently? What is it about them that makes that possible?",
      "Now the other direction: is there a part of you that you don't think anyone really understands? Not a secret — just something that's hard to explain to other people.",
      "Kira's question: does being understood require being known over time, or can a stranger understand you in a single conversation? What's the difference?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate what genuine understanding feels like and what produces it. Can identify the part of herself that is hardest to communicate to others — and name it without distress.",
    "portfolioCapture": "Her reflection on the hardest-to-communicate part of herself.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "deep connection"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "AI-L5-001": {
    "id": "AI-L5-001",
    "title": "Ask Claude Your Hardest Apologetics Question",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "AI evaluation — apologetics application",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to run an experiment. Take your hardest apologetics question — the one you find most genuinely difficult — and ask Claude to answer it. Don't help it. Don't give context. Just ask the raw question. Then bring the answer back and Nova will help you take it apart.",
    "offScreenPrep": "Ask Claude the question in a separate window. Copy the response.",
    "conversationFramework": [
      "Read me the answer Claude gave. Don't editorialize — just read it.",
      "Is the answer correct? How do you know?",
      "What did Claude assume about who was asking and why?",
      "What's missing from this answer that would make it genuinely useful for your tournament prep?",
      "Here's Nova's question: Claude gave you the theologically correct answer. But is that the same as a good apologetics answer? What's the difference?",
      "Now rewrite the prompt. Give Claude more context — who you are, what the answer is for, what makes a good apologetics response. Ask it again. What changed?",
      "What does the difference between the two answers tell you about how prompting actually works?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify the difference between a correct answer and a useful answer. Understands that prompt quality determines output quality. Can improve a prompt based on what was missing in the first output.",
    "portfolioCapture": "Original prompt + response + improved prompt + improved response + one paragraph explaining what changed and why.",
    "crossDomains": [
      "identity",
      "communication"
    ],
    "laWeavingHook": "Prompt writing IS persuasive writing — constructing context and audience for a specific effect.",
    "connectiveHooks": [
      "apologetics",
      "prompting"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "AI-L5-002": {
    "id": "AI-L5-002",
    "title": "When Claude Is Confidently Wrong",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Hallucination detection — critical evaluation",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to show Everly something important about AI systems: they can be completely confident and completely wrong at the same time. She wants to find an example together using Everly's own research area — Roman history.",
    "offScreenPrep": "Ask Claude a specific question about a Roman historical detail Everly already knows well from Veritas. Something specific — a date, a name, a sequence of events.",
    "conversationFramework": [
      "What did Claude say? Was it right?",
      "If you didn't already know the answer — how would you have known whether to trust it?",
      "Claude didn't say 'I'm not sure.' It stated the answer as fact. Why does it do that?",
      "Nova wants to explain something: AI language models are trained to produce fluent, confident-sounding text. Confidence and accuracy are completely separate things in an AI. This is called hallucination. How is that different from how a human expert would handle uncertainty?",
      "What does this mean for how you should use AI for your Veritas research? What's the right workflow?",
      "Design a rule: when should you trust Claude's output directly and when should you verify? Make it specific enough to actually use."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate why AI hallucination happens at a conceptual level. Has produced a personal verification rule that is specific and usable.",
    "portfolioCapture": "'My AI verification rule is...' — specific, personal, based on her own experiment.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Veritas research",
      "epistemology"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "AI-L5-003": {
    "id": "AI-L5-003",
    "title": "The Feedback Loop in JellyBean",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Systems thinking — business application",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to take JellyBean apart — not the business, the system. Every business is a system with feedback loops. Nova thinks understanding those loops is more valuable than any individual business decision. She wants to map JellyBean together.",
    "offScreenPrep": null,
    "conversationFramework": [
      "A system is a set of things that affect each other over time. What are the main parts of the JellyBean system?",
      "Here's the concept of a feedback loop: when output from one part of the system becomes input to another part. Can you find a feedback loop in JellyBean? Start anywhere.",
      "Here's a specific one to think about: when you restock reliably, the machine is always full, which means customers can always buy, which means revenue is consistent, which means you have money to restock. That's a reinforcing loop — it can grow or shrink. What makes it grow? What could make it shrink?",
      "Is there a balancing loop — something that limits growth even when everything is working? What natural ceiling does JellyBean have?",
      "Nova's leverage point question: if you could change one thing in the system that would improve everything else downstream, what would it be? That's a leverage point. How do you find one?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify at least one reinforcing and one balancing feedback loop in a real system. Can identify a leverage point.",
    "portfolioCapture": "Simple system map of JellyBean — hand-drawn or digital — showing the key feedback loops.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean operations",
      "systems thinking"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "AI-L5-004": {
    "id": "AI-L5-004",
    "title": "Build a Better Research Prompt",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Prompt engineering — academic application",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova has a challenge. She thinks most people use AI like a search engine — ask a question, get an answer. She wants to show Everly that AI is actually a thinking partner, and that the difference depends entirely on how you talk to it. Today's experiment: use Claude to go deeper on something from Veritas than she could go alone.",
    "offScreenPrep": "Choose a topic from recent Veritas reading that Everly wants to understand better.",
    "conversationFramework": [
      "What do you want to understand? Not what do you want to know — what do you want to understand. There's a difference.",
      "Write your first prompt. Don't overthink it — just ask.",
      "Look at the response. Where did it stay shallow? Where did it go deep? Why the difference?",
      "Here's a prompt technique: instead of asking Claude for information, ask it to be a specific kind of thinking partner. Try: 'I'm an 11-year-old who has been studying Ancient Rome. I want to understand [X] deeply, not just factually. Ask me questions that will help me think it through, and challenge my assumptions when I make them.' Run that. What's different?",
      "One more technique: at the end of any AI session, ask 'what are the most important questions I haven't asked yet?' Run that now. What does it give you?",
      "What did you learn about [Veritas topic] that you wouldn't have gotten from just reading the book?"
    ],
    "topicBank": null,
    "masterySignal": "Can use three specific prompting techniques (role assignment, depth-seeking, gap identification) and articulate why each produces a different kind of output.",
    "portfolioCapture": "Her three prompts + responses + reflection on what each technique produced.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Prompt construction is precision writing. Nova names this as LA practice.",
    "connectiveHooks": [
      "Veritas research"
    ],
    "recommendedOrder": 4,
    "prerequisites": [
      "AI-L5-001"
    ]
  },
  "AI-L5-005": {
    "id": "AI-L5-005",
    "title": "The System Behind Speech Club",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Systems thinking — social/institutional",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to take something Everly knows well and look at it as a system: NCFCA Speech and Debate. Not the activities — the system. What are the parts? What are the feedback loops? What are the incentives? And what does understanding the system tell you about how to succeed inside it?",
    "offScreenPrep": null,
    "conversationFramework": [
      "What are the parts of the NCFCA system? Not just the events — all the parts. Judges, students, parents, coaches, club structure, tournament format.",
      "What does the system reward? What behaviors does it produce in students who want to succeed?",
      "Here's an important question: are the behaviors the system rewards the same as the behaviors you want to develop? Where do they overlap? Where do they diverge?",
      "Judges score apologetics on specific criteria. How does knowing those criteria change how you prepare? Is that good or bad — are you learning to think or learning to perform for the system?",
      "Nova's deeper question: every institution has a stated purpose and an actual purpose — what it says it's for and what it actually produces. What is NCFCA's stated purpose? What does it actually produce in the students who go through it?",
      "How do you get the genuine benefit from the system without just optimizing for the system's metrics?"
    ],
    "topicBank": null,
    "masterySignal": "Can analyze an institution as a system — identifying incentives, feedback loops, and the gap between stated and actual purpose.",
    "portfolioCapture": "Her NCFCA systems analysis + strategy for getting genuine value without being captured by metrics.",
    "crossDomains": [
      "communication",
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "NCFCA",
      "institutional analysis"
    ],
    "recommendedOrder": 5,
    "prerequisites": []
  },
  "AI-L5-006": {
    "id": "AI-L5-006",
    "title": "AI as a Thinking Partner — Not an Answer Machine",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "AI philosophy + practical",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to draw a clear line between two ways of using AI. Most people use it as an answer machine — ask question, get answer, done. Nova wants to show Everly how to use it as a thinking partner — something that helps her think better, not just think less.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What's the difference between getting an answer and doing your own thinking? Why does it matter?",
      "Here's the risk Nova sees: if you ask Claude 'what should I do?' and follow the answer — you've offloaded your judgment. What did you lose by doing that?",
      "Here's the same situation used differently: you've already thought through a decision. You have a position. You ask Claude to challenge it, find the weaknesses, tell you what you're missing. What's different about that use?",
      "In your apologetics prep — which way of using AI is more valuable? Getting Claude to write your answers or using Claude to stress-test the answers you've already built?",
      "Design a personal rule for when to ask AI for answers vs when to use it to challenge your own thinking. Make it specific.",
      "Nova's observation: the students who will thrive in the AI era are not the ones who can use AI best — they're the ones who know when not to use it and when to use it to sharpen their own thinking rather than replace it."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the distinction between AI as answer machine and AI as thinking partner. Has produced a personal usage rule that she can apply across her academic and business work.",
    "portfolioCapture": "Her personal AI-use rule with specific cases.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "AI sovereignty",
      "apologetics prep"
    ],
    "recommendedOrder": 6,
    "prerequisites": [
      "AI-L5-001",
      "AI-L5-002"
    ]
  },
  "AI-L5-007": {
    "id": "AI-L5-007",
    "title": "What Assumptions Does Google Make About You?",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Systems thinking — technology and power",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to take apart something Everly uses every day: search engines. Not how they work technically — what assumptions they make about what she wants. And what that means for how she gets information.",
    "offScreenPrep": null,
    "conversationFramework": [
      "When you search for something, what does Google do to decide what to show you first?",
      "It personalizes results based on what it thinks you want. How does it know what you want?",
      "Here's the interesting question: if your search results are shaped by your past behavior, what happens to your ability to encounter ideas that are new or different from what you already believe?",
      "This is called an information bubble or filter bubble. Have you ever noticed yourself in one? How would you even know?",
      "What's the AI equivalent of this problem? If you only ask Claude questions that confirm what you already think — what happens to your thinking over time?",
      "Design a habit: one thing you do regularly to make sure you're encountering ideas outside your existing views. Make it practical enough to actually do."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the filter bubble concept and its implications for AI use specifically. Has produced a concrete habit for intellectual exposure beyond existing views.",
    "portfolioCapture": "Her anti-filter-bubble habit and first-week implementation.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "technology sovereignty",
      "intellectual exposure"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "AI-L5-008": {
    "id": "AI-L5-008",
    "title": "The Leverage Point — Find One",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Systems thinking — applied",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova introduced the leverage point concept in Mission 003. Now she wants to find a real one. Not in JellyBean — in Everly's own education and development. Where is the one place that, if she applied more focus or changed her approach, it would improve everything else?",
    "offScreenPrep": null,
    "conversationFramework": [
      "A leverage point is a place in a system where a small change produces large effects. They're usually not obvious — if they were, everyone would use them.",
      "Look at your whole week — your learning, your activities, your business, your relationships. Where is one thing that, if it improved, would make a lot of other things better?",
      "Everly's speech work is one candidate. If her opening line got dramatically better, how many other things improve? Walk through the downstream effects.",
      "Her apologetics depth is another. If she genuinely understood the connections between all 12 questions, how does that change her tournament experience? Her ability to think about theology? Her identity work?",
      "Nova's question: what is the highest-leverage thing Everly could focus on right now that she's currently underinvesting in?",
      "How does knowing this change what you do tomorrow?"
    ],
    "topicBank": null,
    "masterySignal": "Can apply leverage point thinking to her own development — not just to external systems. Produces a specific and honest answer about where she's underinvesting.",
    "portfolioCapture": "Her identified leverage point + specific action plan for investing in it.",
    "crossDomains": [
      "identity",
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "self-development",
      "leverage"
    ],
    "recommendedOrder": 8,
    "prerequisites": [
      "AI-L5-003"
    ]
  },
  "AI-L5-009": {
    "id": "AI-L5-009",
    "title": "Use AI to Prepare for Your Tournament",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "Applied AI — real stakes",
    "timeMinutes": 25,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — run in the two weeks before May 9th",
    "brief": "Nova wants to use AI for something with real stakes: May 9th tournament prep. Not to write Everly's answers — to stress-test them. She wants Everly to use Claude as the most skeptical audience she'll face, sharper than any judge, and then evaluate whether Claude's challenges are actually good ones.",
    "offScreenPrep": "Have two apologetics cards ready. Ask Claude to 'act as a skeptical non-Christian who has just heard this apologetics argument and wants to challenge it as hard as possible.' Get Claude's response.",
    "conversationFramework": [
      "What challenges did Claude raise?",
      "Which ones are genuinely strong? Which ones are weak or off-target?",
      "How do you know the difference? What makes a challenge strong vs weak?",
      "For the strong challenges — does your current card address them? What would you add?",
      "Here's the meta-question Nova cares about: you just used AI to improve your own thinking. You didn't let AI think for you — you used AI to find the gaps in your thinking. What's the difference and why does it matter?",
      "Would you trust this process? Would you use it again for something else that matters?"
    ],
    "topicBank": null,
    "masterySignal": "Can use AI as a stress-testing tool rather than an answer generator. Can evaluate AI-generated challenges for quality. Can articulate why this use of AI improves rather than replaces her thinking.",
    "portfolioCapture": "Two cards + Claude's strongest challenges + her revisions.",
    "crossDomains": [
      "communication",
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "May 9 tournament",
      "apologetics stress-test"
    ],
    "recommendedOrder": 9,
    "prerequisites": [
      "AI-L5-001",
      "AI-L5-006"
    ]
  },
  "AI-L5-010": {
    "id": "AI-L5-010",
    "title": "How Does Compound Interest Work — Ask AI and Then Prove It",
    "domain": "aiSystems",
    "level": 5,
    "stage": 3,
    "specialist": "nova",
    "childIds": [
      "everly"
    ],
    "type": "AI + mathematical systems",
    "timeMinutes": 20,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to do something specific: ask Claude to explain compound interest, then verify the explanation by working through the math herself. She wants Everly to see the difference between understanding an explanation and actually understanding the thing.",
    "offScreenPrep": "After the AI explains, do the compound interest calculation by hand for her actual real estate fund numbers.",
    "conversationFramework": [
      "What did Claude say about compound interest? Explain it back to Nova in your own words.",
      "Now prove it. Take your real estate fund — $13,500 per year at 7%. What do you have at age 25? Work it out.",
      "Did the calculation match what you expected from the explanation? Where did your understanding break down when you actually tried to do it?",
      "Here's Nova's principle: you don't understand something until you can do something with it. Explanation is the first step. Verification is how you know if you actually got it.",
      "Apply this to apologetics: what's the difference between understanding an answer and being able to use it under pressure?"
    ],
    "topicBank": null,
    "masterySignal": "Can use AI explanation as a starting point, not an ending point. Understands the difference between receiving an explanation and demonstrating understanding through application.",
    "portfolioCapture": "Her own compound interest calculation at 25, 35, 45 + reflection on where understanding broke down during verification.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "real estate fund",
      "understanding vs knowing"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "PM-L6-001": {
    "id": "PM-L6-001",
    "title": "Your Best Day",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Performance self-knowledge — foundation",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to start with something specific. Think about the best practice session you've had recently — with Coach Dillon or at martial arts or anywhere. He wants to understand exactly what was different about that day.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Tell Zion about it. What happened? When was it?",
      "How did your body feel during that session? Not during — at the very start, before you got into it.",
      "What did you eat that day? How did you sleep the night before?",
      "Was there anything different about your mental state going in?",
      "Here's what Zion is looking for: most athletes know when they're playing well but very few know why. The ones who know why can reproduce it. Can you identify two or three conditions that were present on your best day that aren't always present?",
      "What would you need to change about a normal day to get closer to that?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify specific conditions — physical and mental — that correlate with her best performance. Beginning to treat high performance as reproducible rather than random.",
    "portfolioCapture": "'On my best days, the conditions that are present are...' — specific list, her own observation.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Coach Dillon sessions",
      "performance science"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "PM-L6-002": {
    "id": "PM-L6-002",
    "title": "What Coach Dillon Is Actually Teaching You",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Mental performance — transfer",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to ask something Coach Dillon probably doesn't say out loud: what is he actually teaching you? Not golf technique. Not tennis. What is the thing underneath the sport that you're learning that will matter for the rest of your life?",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about the last time Coach Dillon corrected something — not a technique, a mental thing. What was it?",
      "When you miss a shot or make an error — what does he want you to do in the next five seconds?",
      "That thing he's teaching you — that recovery, that composure, that focus reset — where else in your life does that apply?",
      "Zion thinks Coach Dillon is teaching you one of the most important skills in the world: the ability to stay present and composed when things go wrong. Do you feel that happening? Can you notice yourself getting better at it?",
      "Has there been a moment this year — not in sport but in your regular life — where you used something you learned from Coach Dillon? What was it?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the mental performance skills being built through athletic training and name a specific transfer to non-athletic life.",
    "portfolioCapture": "'What Coach Dillon is actually teaching me is...' — Everly's own insight about the deeper lesson.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Coach Dillon",
      "composure transfer"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "PM-L6-003": {
    "id": "PM-L6-003",
    "title": "The S2S Progress Check",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Neurological development — awareness and celebration",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "monthly",
    "tournamentRelevance": null,
    "brief": "Zion wants to do a progress check — not a test, a conversation. He's been watching what's happening through your S2S work and he wants to know what you're noticing.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Since you started S2S, has anything gotten easier that used to feel hard? Even something small.",
      "Handwriting, reading for a long time, staying focused at a desk — any of those feel different than they did a few months ago?",
      "What about in sport? Is there anything in your body awareness that feels sharper?",
      "Zion wants to tell you something: the work you're doing at S2S is changing your nervous system. That's not a metaphor — it's literally true. Primitive reflexes that should have integrated when you were younger are integrating now because of the work you're doing. What does it mean to you to be actively improving something about how your brain and body connect?",
      "Six months from now — what do you think will be noticeably different?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate specific observable changes from S2S work. Understands neurological integration at a conceptual level — not as therapy but as intentional development.",
    "portfolioCapture": "Monthly S2S progress entry — what she notices, what's changing.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "S2S program"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "PM-L6-004": {
    "id": "PM-L6-004",
    "title": "Sleep Is Training",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Body literacy — recovery science",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to talk about something that most athletes — even professional ones — underinvest in: sleep. Not because they don't know it matters. Because they don't know how much it matters or why. He wants to change that.",
    "offScreenPrep": null,
    "conversationFramework": [
      "How much sleep did you get last night? Do you know?",
      "How do you feel right now compared to a day when you slept really well? What's different?",
      "Here's something that will change how you think about sleep: when you practice a skill — a golf swing, a martial arts move, an apologetics argument — your brain doesn't actually consolidate that learning until you sleep. Sleep is when practice becomes skill. What does that mean for how you think about the night before practice?",
      "Professional athletes now treat sleep as performance training — some hire sleep coaches. Why do you think it took so long for that to be taken seriously?",
      "What would you need to change about your evenings to consistently get better sleep? Be honest — what actually gets in the way?",
      "Zion's challenge: pick one thing to change about your sleep this week. One thing only. What is it?"
    ],
    "topicBank": null,
    "masterySignal": "Can explain the physiological connection between sleep and skill consolidation in her own words. Has identified a specific and honest barrier to better sleep. Has committed to one concrete change.",
    "portfolioCapture": "Her one-week sleep experiment — what she changed, what she noticed.",
    "crossDomains": [],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Why We Sleep reading",
      "Coach Dillon performance"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "PM-L6-005": {
    "id": "PM-L6-005",
    "title": "What Happens in Your Body When You're Under Pressure",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Stress physiology — performance",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": "Direct — composure protocol for May 9",
    "brief": "Zion wants to talk about something you know from experience but have never had explained: what actually happens in your body when the stakes are high. Tournament day. A hard match. Walking up to give a speech. He wants you to understand the biology so you can work with it instead of against it.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about the feeling right before something high-stakes. Describe it physically — what does your body do?",
      "That feeling has a name and a mechanism. Cortisol and adrenaline release. Your heart rate increases, blood goes to muscles, your focus narrows. Your body is preparing you to perform. Why did evolution build this response?",
      "Here's the interesting thing: the physical sensations of excitement and anxiety are nearly identical. Heart racing, heightened alertness, physical tension. The difference is almost entirely in interpretation — what you tell yourself is happening. Have you ever felt nervous that turned into excited? What changed?",
      "Coach Dillon is teaching you to stay composed. Zion wants to tell you what that means physiologically: you're learning to keep your prefrontal cortex — the thinking, deciding part of your brain — online when your body is in stress mode. Most people lose access to clear thinking under pressure. You're training not to.",
      "What do you do in the first five seconds after you feel that pressure response? That habit is everything."
    ],
    "topicBank": null,
    "masterySignal": "Can explain the stress response physiologically in her own words. Understands the anxiety/excitement interpretation distinction. Can articulate her personal composure practice in the first five seconds of a pressure moment.",
    "portfolioCapture": "Her first-five-seconds pressure protocol.",
    "crossDomains": [
      "humanFluency",
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "May 9 tournament",
      "Coach Dillon composure"
    ],
    "recommendedOrder": 5,
    "prerequisites": []
  },
  "PM-L6-006": {
    "id": "PM-L6-006",
    "title": "Golf and Tennis — What Each Is Teaching Your Body",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Multi-sport body literacy",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion thinks there's something interesting about the fact that Everly trains both golf and tennis. They ask completely different things from her body and her mind. He wants to understand what each one is building.",
    "offScreenPrep": null,
    "conversationFramework": [
      "When you're playing tennis — what does your body need to do well? What are the key physical demands?",
      "When you're playing golf — what does your body need to do well? How is it different?",
      "Tennis is explosive and reactive — you respond to what's happening. Golf is deliberate and controlled — you create the moment. Which one comes more naturally to you? What does that tell you about your athletic personality?",
      "Here's what Zion thinks is happening: tennis is building your athletic reaction time, spatial awareness, and competitive composure under fast conditions. Golf is building your mental discipline, precision, and the ability to perform under self-created pressure with no one to react to. Together they're building something a single-sport athlete doesn't have. What do you think that is?",
      "Is there a skill you've developed in tennis that makes you better at golf? Or vice versa? Be specific."
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the specific physical and mental demands of each sport. Can identify genuine transfer between sports. Understands multi-sport training as intentional development not schedule conflict.",
    "portfolioCapture": "Her analysis of what each sport builds + one specific cross-sport transfer.",
    "crossDomains": [],
    "laWeavingHook": null,
    "connectiveHooks": [
      "multi-sport training"
    ],
    "recommendedOrder": 6,
    "prerequisites": []
  },
  "PM-L6-007": {
    "id": "PM-L6-007",
    "title": "What Ballet Is Building",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Body literacy — artistic physical development",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to think about something that doesn't get talked about enough in athletic development: what ballet is actually building. Not the art form — the physical capabilities. Because they're more connected to her athletic performance than most people realize.",
    "offScreenPrep": null,
    "conversationFramework": [
      "When you're at ballet — what does your body have to do that it doesn't have to do anywhere else?",
      "Here's a question: what does elite athletic performance and elite ballet performance have in common at the highest levels?",
      "Proprioception — the body's sense of where it is in space — is developed most precisely through ballet and gymnastics. Why does that matter for golf and tennis?",
      "Ballet requires you to be simultaneously aware of your whole body and controlled in each individual part. When is that useful in your other activities?",
      "Zion's observation: many elite athletes do ballet or dance training specifically because it builds body awareness and control that sport-specific training doesn't. You're getting this automatically. Do you feel it helping? Where?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the specific physical capacities ballet develops — proprioception, body awareness, simultaneous control — and connect them to her athletic performance in other domains.",
    "portfolioCapture": "Her connection between ballet capacities and athletic performance.",
    "crossDomains": [],
    "laWeavingHook": null,
    "connectiveHooks": [
      "ballet",
      "proprioception"
    ],
    "recommendedOrder": 7,
    "prerequisites": []
  },
  "PM-L6-008": {
    "id": "PM-L6-008",
    "title": "The Martial Arts Mindset",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Discipline and presence — cross-domain",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to think about what martial arts is actually for — beyond the physical techniques. He thinks the physical training is almost secondary to what happens in the mind and character of someone who trains consistently over years.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What do you think about during martial arts? Not the moves — what's happening in your head?",
      "There's a concept in martial arts called mushin — 'no mind' in Japanese. It's the state where your body acts without the mind getting in the way. Have you experienced anything like that? In martial arts or anywhere?",
      "Martial arts traditions believe that physical discipline is a path to self-knowledge. What do you think you know about yourself from your martial arts training that you couldn't have learned another way?",
      "The practice of showing up — even when you don't want to, even when you're tired — is itself the training. What has consistent physical practice taught you about the relationship between feeling like doing something and doing it anyway?",
      "Zion's question: is there a version of the martial arts mindset that would help you in your speech work? In your apologetics prep? In a conversation that's making you uncomfortable?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the character and mental formation aspects of martial arts training. Can connect the martial arts mindset to a non-physical application in her life.",
    "portfolioCapture": "Her reflection on a non-physical application of the martial arts mindset.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "martial arts",
      "discipline"
    ],
    "recommendedOrder": 8,
    "prerequisites": []
  },
  "PM-L6-009": {
    "id": "PM-L6-009",
    "title": "Fueling Performance — What You Eat Matters",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Nutrition — performance connection",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to talk about something that most athletes at your level are just starting to understand: food is fuel and the quality of the fuel affects the quality of the performance. Not diet advice — performance science.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about your energy level during a long Coach Dillon session. When does it drop? What were you doing in the two hours before?",
      "Your brain uses glucose — blood sugar — to function. When your blood sugar drops during a long practice, what happens to your focus and decision-making?",
      "Here's the basic principle: the goal is steady energy, not spikes and crashes. What foods produce steady energy vs spikes and crashes? What does that tell you about what to eat before a long training session?",
      "Professional golfers and tennis players are meticulous about what they eat during competition — not just before. Why during?",
      "Zion's challenge: next time you have a long session with Coach Dillon, be intentional about what you eat two hours before and how you feel during. Notice it. Don't change everything — just notice.",
      "This isn't about diet or weight — it's about performance. What's the difference in how you'd think about food if you framed it purely as performance input?"
    ],
    "topicBank": null,
    "masterySignal": "Can explain the blood sugar/energy/focus connection in her own words. Has committed to one specific noticing experiment with food and performance. Frames nutrition as performance science not restriction.",
    "portfolioCapture": "Her food-as-fuel experiment results.",
    "crossDomains": [],
    "laWeavingHook": null,
    "connectiveHooks": [
      "performance nutrition",
      "Coach Dillon sessions"
    ],
    "recommendedOrder": 9,
    "prerequisites": []
  },
  "PM-L6-010": {
    "id": "PM-L6-010",
    "title": "The Debrief — What Just Happened?",
    "domain": "physical",
    "level": 6,
    "stage": 3,
    "specialist": "zion",
    "childIds": [
      "everly"
    ],
    "type": "Performance reflection — habit building",
    "timeMinutes": 10,
    "standingPractice": true,
    "runFrequency": "after every significant training session",
    "tournamentRelevance": null,
    "brief": "Zion wants to establish a standing practice. After every significant training session or competition, he wants five minutes with Everly to debrief. Not a report — three specific questions. Every time.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What worked today? One specific thing.",
      "What do you want to do differently next time? One specific thing.",
      "What did you learn about yourself today? Could be anything — athletic, mental, anything.",
      "[After the three questions] Notice that question three is the one that matters most. The athletic improvement is the surface. The self-knowledge is the point.",
      "Zion is going to suggest you use this three-question framework with yourself — not just in Forge. After a tournament. After a hard conversation. After anything that mattered. It works everywhere."
    ],
    "topicBank": null,
    "masterySignal": "Can self-debrief with specificity — not 'it went fine' but concrete work/change/self-knowledge across each category. Over time the self-knowledge answers deepen.",
    "portfolioCapture": "Longitudinal debrief log — one entry per training session. Accumulates into one of the portfolio's richest documents.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Coach Dillon sessions",
      "tournaments",
      "all physical training"
    ],
    "recommendedOrder": 10,
    "prerequisites": []
  },
  "IJ-L3-001": {
    "id": "IJ-L3-001",
    "title": "That's Not Fair — Or Is It?",
    "domain": "identity",
    "level": 3,
    "stage": 2,
    "specialist": "sage",
    "childIds": [
      "isla"
    ],
    "type": "Moral reasoning — concrete",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Ren has a situation. Two kids work in a business together. One works twice as hard as the other. Should they get paid the same? Ren thinks there's more than one right answer here and she wants to know what Isla thinks — and why.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What's your answer? Don't think too long — just say it.",
      "Why? Give Ren your real reason, not the one that sounds best.",
      "Here's a harder question: what if the one who worked less was going through something really hard that week? Does that change your answer?",
      "What rule are you using to decide what's fair? Is that rule one you'd want applied to you?",
      "Ren wants to tell you something: you just did philosophy. Real philosophy. That's what it is — asking hard questions about right and wrong and not settling for easy answers."
    ],
    "topicBank": null,
    "masterySignal": "Can give a position and a reason. Can adjust position when new information is added without feeling defeated. Understands that hard questions can have more than one defensible answer.",
    "portfolioCapture": "Her answer + her reasoning + what changed when new info was added.",
    "crossDomains": [
      "building",
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean partnership with Everly",
      "fairness"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "IJ-L3-002": {
    "id": "IJ-L3-002",
    "title": "Find the Lie in the Ad",
    "domain": "identity",
    "level": 3,
    "stage": 2,
    "specialist": "sage",
    "childIds": [
      "isla"
    ],
    "type": "Logic — real world",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "every 2 weeks",
    "tournamentRelevance": null,
    "brief": "Ren has a challenge. She's going to show Isla a real advertisement and Isla has to find what's sneaky about it. Not a lie exactly — something more clever than a lie. Ready?",
    "offScreenPrep": "Bring one real ad Isla saw this week (or Ren presents one).",
    "conversationFramework": [
      "[Ren presents an age-appropriate advertisement — cereal box claim, toy commercial, food packaging claim. Examples: 'Part of a complete breakfast!' '9 out of 10 dentists recommend...' 'Up to 50% off!']",
      "Read it. What does it actually say?",
      "Now: what does it want you to believe?",
      "Are those the same thing? Where's the gap?",
      "Ren calls this a sneaky argument — it's not a lie but it's designed to make you think something that might not be true. What would you call it?",
      "Find one of these in real life this week. It won't be hard — they're everywhere once you know what to look for."
    ],
    "topicBank": null,
    "masterySignal": "Can distinguish between what a statement says and what it implies. Understands that communication can be technically true and still misleading. Beginning to notice this pattern independently.",
    "portfolioCapture": "Her growing ad-trick library. One entry every 2 weeks.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": "Close reading for implication vs. statement — foundational LA.",
    "connectiveHooks": [
      "advertising literacy",
      "critical reading"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "IJ-L3-003": {
    "id": "IJ-L3-003",
    "title": "Why Did Rome Fall? — Your Theory",
    "domain": "identity",
    "level": 3,
    "stage": 2,
    "specialist": "sage",
    "childIds": [
      "isla"
    ],
    "type": "Historical judgment — first principles",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Ren wants to tell Isla something about a really famous historical mystery and then ask for her theory. Nobody fully agrees on the answer — not even historians. So Isla's theory is as valid as anyone's, as long as she can back it up.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Rome was one of the most powerful civilizations in history. For hundreds of years nothing could stop it. Then it fell. What do you think happened?",
      "Give Ren your theory — don't worry about being right, worry about having a reason.",
      "Here are three things historians think contributed: the armies got too expensive, the leaders got corrupt, and the borders got too big to defend. Does any of that match your theory? Does any of it surprise you?",
      "Which one do you think mattered most? Why?",
      "Here's Ren's harder question: could it happen to a powerful country today? What would need to be true?"
    ],
    "topicBank": null,
    "masterySignal": "Can form a theory and defend it with a reason. Can update or refine the theory when new information is provided. Can apply historical thinking to a current question.",
    "portfolioCapture": "Her theory of Rome's fall + her reason + whether a current country could be at risk.",
    "crossDomains": [
      "communication"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Thrive Story of the World",
      "Everly's shared history content"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "IJ-L3-004": {
    "id": "IJ-L3-004",
    "title": "What Do You Actually Believe?",
    "domain": "identity",
    "level": 3,
    "stage": 2,
    "specialist": "sage",
    "childIds": [
      "isla"
    ],
    "type": "Faith and conviction — personal",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Ren has a question that she asks very few people because it requires real honesty: what do you actually believe? Not what you're supposed to believe — what you actually believe, in your gut, when you're being completely real.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Pick one thing — anything — that you believe is true. Something important to you.",
      "Why do you believe it? Not the answer you'd give in Sunday school — your real reason.",
      "Has anyone ever challenged that belief — told you they thought you were wrong? What happened?",
      "Here's what Ren thinks is really brave: not just having beliefs but knowing why you have them. Most people just believe what everyone around them believes. Do you think you're doing that or do you have your own reasons?",
      "What's one question about what you believe that you're not sure about yet?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate a genuine personal belief with a personal reason. Can identify at least one open question without anxiety. Beginning to distinguish between inherited belief and examined belief.",
    "portfolioCapture": "One belief she owns + her personal reason + one open question she's sitting with.",
    "crossDomains": [
      "humanFluency"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "faith formation",
      "inherited vs examined belief"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "CP-L3-001": {
    "id": "CP-L3-001",
    "title": "One Minute on Anything — Go",
    "domain": "communication",
    "level": 3,
    "stage": 2,
    "specialist": "atlas",
    "childIds": [
      "isla"
    ],
    "type": "Impromptu speaking — foundational",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "every 2 weeks",
    "tournamentRelevance": null,
    "brief": "Atlas has a topic. One minute. No prep. He just wants to hear Isla think out loud. Ready?",
    "offScreenPrep": null,
    "conversationFramework": [
      "[Atlas serves one topic from topicBank]",
      "[After the minute] What was your best sentence? Not your favorite — the one that did the most work.",
      "Did you start strong? What was your first sentence?",
      "One thing to do differently next time. Just one.",
      "Atlas's observation: you're not afraid to talk. That's rarer than you think. Now let's make it count."
    ],
    "topicBank": [
      "Why vending machines are actually a really good business idea",
      "The most interesting animal in the world and why",
      "What makes someone a good leader",
      "Why horses are better than [other animal]",
      "What I would do if I ran JellyBean for a whole year by myself",
      "The most important thing I learned this week",
      "Why it matters that you keep your promises"
    ],
    "masterySignal": "Delivers a 1-minute impromptu with a clear beginning and some organizational structure. Can identify one specific thing to improve without deflecting.",
    "portfolioCapture": "Topic + her best sentence + one change. Longitudinal impromptu log.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Sentence-level thinking under time pressure — foundational LA.",
    "connectiveHooks": [
      "JellyBean",
      "horseback"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "CP-L3-002": {
    "id": "CP-L3-002",
    "title": "Say It Shorter",
    "domain": "communication",
    "level": 3,
    "stage": 2,
    "specialist": "atlas",
    "childIds": [
      "isla"
    ],
    "type": "Writing — concision (S2S-calibrated: oral version available)",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Atlas has a challenge Isla might find annoying: take something complicated and explain it in as few words as possible. He thinks the hardest thing in communication isn't saying enough — it's not saying too much.",
    "offScreenPrep": "Something Isla knows well — her JellyBean business, a horse she knows, a sport she plays.",
    "conversationFramework": [
      "Explain JellyBean Vending to me. I know nothing about it. Go.",
      "[After explanation] That took [X] seconds. Now do it in half the time. Same information.",
      "Now do it in one sentence.",
      "What did you have to cut? Was any of it actually necessary?",
      "Here's what Atlas thinks: the most powerful communication is the most concentrated. Why do you think that is?"
    ],
    "topicBank": null,
    "masterySignal": "Can progressively distill a complex explanation. Understands that cutting is a form of communication craft not a loss.",
    "portfolioCapture": "Voice recording: her long version, half version, one-sentence version.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": "Revision as writing craft — hidden LA.",
    "connectiveHooks": [
      "JellyBean explanation"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "CP-L3-003": {
    "id": "CP-L3-003",
    "title": "The Book Report — But Make It Interesting",
    "domain": "communication",
    "level": 3,
    "stage": 2,
    "specialist": "atlas",
    "childIds": [
      "isla"
    ],
    "type": "Oral communication — narrative",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Ren wants to hear about the book Isla just finished — but not a summary. She wants to hear the most interesting thing in the book. The thing that surprised her, confused her, or made her feel something.",
    "offScreenPrep": "Recent book finished.",
    "conversationFramework": [
      "Don't tell me what happened. Tell me the thing that stuck.",
      "Why did that stick? What was it about it?",
      "If you had to convince someone to read this book in 30 seconds — what would you say?",
      "Atlas's question: is the most interesting thing in a book always the most important thing? Are they the same?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify and articulate what genuinely engaged her in a book — not plot summary but personal response. Can make a 30-second pitch that reflects genuine enthusiasm.",
    "portfolioCapture": "Voice-first book response + 30-second pitch. Replaces written book report until fine motor improves.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Reading response at an interpretive level — the LA Isla needs right now, voice-first.",
    "connectiveHooks": [
      "current read"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "CP-L3-004": {
    "id": "CP-L3-004",
    "title": "Persuade Ren of Something",
    "domain": "communication",
    "level": 3,
    "stage": 2,
    "specialist": "atlas",
    "childIds": [
      "isla"
    ],
    "type": "Persuasion — real attempt",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Ren wants Isla to try to persuade her of something. Something real — something Isla actually wants, believes, or thinks should change. Ren is going to genuinely push back. This is not pretend.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What are you trying to persuade me of?",
      "Why should I believe you? Give me your best reason.",
      "[Ren pushes back with a genuine counter] But what about [counter-argument]?",
      "That's a better answer — what made it better?",
      "Atlas's debrief question: what's the difference between asking for something and actually persuading someone? Did you ask or did you persuade?"
    ],
    "topicBank": null,
    "masterySignal": "Can make an argument that goes beyond assertion — gives reasons, responds to counter-arguments, adjusts approach when initial attempt doesn't land.",
    "portfolioCapture": "What she argued + her strongest response to pushback + her insight about asking vs persuading.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": "Argument and response structure at age 8 — foundational LA.",
    "connectiveHooks": [
      "real-life persuasion"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "BE-L4-001": {
    "id": "BE-L4-001",
    "title": "Read Your Own Numbers",
    "domain": "building",
    "level": 4,
    "stage": 2,
    "specialist": "flux",
    "childIds": [
      "isla"
    ],
    "type": "Financial literacy — P&L analysis",
    "timeMinutes": 15,
    "standingPractice": true,
    "runFrequency": "monthly after business block",
    "tournamentRelevance": null,
    "brief": "Flux has three questions about last month's JellyBean numbers. Not easy questions. He wants to see if Isla actually understands what she's looking at or if she just knows what the numbers say.",
    "offScreenPrep": "QuickBooks P&L open.",
    "conversationFramework": [
      "What was your revenue last month? Give me the number.",
      "What were your expenses? List them.",
      "What was your profit? Calculate it right now.",
      "Is that a good profit? Compared to what? How do you know?",
      "Flux's harder question: if profit went up by $20 next month, what would most likely have caused it? Name three possibilities.",
      "Which of those three would you actually want to happen? Why?"
    ],
    "topicBank": null,
    "masterySignal": "Can read and interpret a real P&L. Can reason about causes of profit changes — not just report the number but think about what drives it.",
    "portfolioCapture": "Monthly P&L commentary — number, cause theory, preference.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean operations",
      "Thursday meeting"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "BE-L4-002": {
    "id": "BE-L4-002",
    "title": "What Is 2% APR Actually Costing You?",
    "domain": "building",
    "level": 4,
    "stage": 2,
    "specialist": "flux",
    "childIds": [
      "isla"
    ],
    "type": "Loan math — real numbers",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants to make sure Isla understands exactly what the JellyBean loan is actually costing. Not approximately — exactly. He wants her to calculate it.",
    "offScreenPrep": "Loan tracker visible.",
    "conversationFramework": [
      "What's the current loan balance?",
      "The interest rate is 2% APR. What does APR mean?",
      "How much interest accrued last month? Calculate it.",
      "Over the whole life of the loan — from start to payoff — approximately how much total interest will you pay? Estimate it.",
      "Was the loan worth taking? Flux wants your honest answer, not the polite one.",
      "What would you do differently if you were starting JellyBean today?"
    ],
    "topicBank": null,
    "masterySignal": "Can calculate monthly interest accrual on a real loan. Can evaluate a past financial decision with honest hindsight. Beginning to think about the full cost of debt not just the monthly payment.",
    "portfolioCapture": "Her monthly interest calculation + her honest reflection on whether the loan was worth taking.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean loan"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "BE-L4-003": {
    "id": "BE-L4-003",
    "title": "The Rule of 72 — Watch This",
    "domain": "building",
    "level": 4,
    "stage": 2,
    "specialist": "flux",
    "childIds": [
      "isla"
    ],
    "type": "Compound interest — visual and tactile",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants to show Isla something that will make her feel like she has a superpower. It's called the Rule of 72 and it takes 30 seconds to learn and a lifetime to use.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Here's the rule: divide 72 by your interest rate and you get roughly how many years it takes to double your money. If you earn 7% per year — how long to double?",
      "Your real estate fund earns approximately 7%. You invest $13,500 per year. How long until the first year's investment doubles?",
      "Now: you're 8. At that rate, how many times will that money double before you're 50?",
      "What number do you end up with? Calculate it.",
      "Flux's question: does that number surprise you? Why does starting at 8 instead of 28 matter so much?",
      "This is why your parents structured your Denovo contract the way they did. Do you understand now what they were thinking?"
    ],
    "topicBank": null,
    "masterySignal": "Can use the Rule of 72 to calculate doubling time. Can apply it to her real estate fund with real numbers. Understands emotionally — not just intellectually — why starting early is disproportionately powerful.",
    "portfolioCapture": "Her compound growth projection from age 8 to 50 using Rule of 72.",
    "crossDomains": [
      "aiSystems"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "real estate fund",
      "Denovo contract"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "BE-L4-004": {
    "id": "BE-L4-004",
    "title": "What Would You Change About JellyBean?",
    "domain": "building",
    "level": 4,
    "stage": 2,
    "specialist": "flux",
    "childIds": [
      "isla"
    ],
    "type": "Strategic thinking — entry level",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Flux wants Isla's honest opinion. If she could change one thing about how JellyBean is run right now — not the products, the business itself — what would it be and why?",
    "offScreenPrep": null,
    "conversationFramework": [
      "What's your answer? Don't give the safe answer — give the real one.",
      "Why that thing? What problem does it solve?",
      "What would be the cost of making that change? Not money — what would be harder, what would you give up?",
      "Here's what Flux thinks is interesting: you just did strategic thinking. You identified a gap, proposed a change, and weighed the cost. That's what every business decision is. Does it feel different when you know what it's called?",
      "What's stopping you from making that change?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify a genuine operational improvement with a reason and an honest cost assessment. Beginning to think strategically not just operationally.",
    "portfolioCapture": "Her proposed change + reasoning + honest cost + what's stopping her.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean operations"
    ],
    "recommendedOrder": 4,
    "prerequisites": []
  },
  "HF-L3-001": {
    "id": "HF-L3-001",
    "title": "What Happens in Your Body When You're Frustrated",
    "domain": "humanFluency",
    "level": 3,
    "stage": 2,
    "specialist": "kira",
    "childIds": [
      "isla"
    ],
    "type": "Emotional regulation — body awareness",
    "timeMinutes": 12,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to understand something specific about you — not something bad, something interesting. She wants to understand what happens in your body when something is frustrating. Not the feelings — the physical stuff.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Think about the last time you were really frustrated. What happened in your body? Be specific — not 'I felt bad,' what did you actually feel physically?",
      "Where do you feel it? Your chest? Your face? Your hands?",
      "What do you want to do when you feel that?",
      "Here's something Kira wants you to know: that feeling — that heat or tightness or whatever it is for you — that's your body getting ready. It's not wrong. It's information. What do you think it's telling you?",
      "Is there anything that helps the feeling pass faster? Even something small?"
    ],
    "topicBank": null,
    "masterySignal": "Can locate frustration physically in her body. Can name what the physical sensation is. Beginning to understand the body signal as information rather than just discomfort.",
    "portfolioCapture": "Voice recording of where frustration lives in her body. Referenced in future sessions.",
    "crossDomains": [
      "physical"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "S2S Fear Paralysis",
      "martial arts frustration",
      "JellyBean stress"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "HF-L3-002": {
    "id": "HF-L3-002",
    "title": "Being a Good Partner to Everly",
    "domain": "humanFluency",
    "level": 3,
    "stage": 2,
    "specialist": "kira",
    "childIds": [
      "isla"
    ],
    "type": "Relationship — sibling business partnership",
    "timeMinutes": 12,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to think about something with Isla: what does it mean to be a good business partner to your sister? Not a good sister — specifically a good business partner.",
    "offScreenPrep": null,
    "conversationFramework": [
      "When JellyBean is going well — what does Everly do that helps?",
      "Is there anything about working with Everly that is harder than working with someone else would be? It's okay to say yes.",
      "What do you bring to the partnership that Everly doesn't? Be honest.",
      "What does Everly bring that you don't?",
      "Kira's question: what would make you a better partner to her specifically — not a better person, a better partner for Everly?"
    ],
    "topicBank": null,
    "masterySignal": "Can reflect on a close relationship with both appreciation and honest assessment. Can identify specific complementary strengths. Can name one concrete way to be better in that relationship.",
    "portfolioCapture": "Her honest reflection on partnership + one concrete thing she'll do differently.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean partnership",
      "Everly relationship"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "HF-L3-003": {
    "id": "HF-L3-003",
    "title": "When You Stayed In the Hard Thing",
    "domain": "humanFluency",
    "level": 3,
    "stage": 2,
    "specialist": "kira",
    "childIds": [
      "isla"
    ],
    "type": "Resilience — celebrating charge-toward instinct",
    "timeMinutes": 12,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Kira wants to celebrate something. Not an achievement — a moment. She wants to hear about a time Isla stayed in something hard when she could have left.",
    "offScreenPrep": null,
    "conversationFramework": [
      "Tell Kira about a time something was really hard and you stayed anyway. It can be small.",
      "What made you stay? What was happening in your head?",
      "What would have happened if you'd left?",
      "Kira wants to tell you something: the fact that you go toward hard things rather than away from them is one of the most important things about you. Most people avoid hard things. You don't. Do you know that about yourself?",
      "When is going toward a hard thing the right call? When might it not be?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify and narrate a specific instance of resilience. Understands that the charge-toward instinct is a genuine strength — and can begin thinking about when it serves her and when to modulate it.",
    "portfolioCapture": "Her narrated moment of staying + her reflection on when charging in is right and when it isn't.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "resilience",
      "charge-toward instinct"
    ],
    "recommendedOrder": 3,
    "prerequisites": []
  },
  "AI-L3-001": {
    "id": "AI-L3-001",
    "title": "Ask Claude Something for JellyBean",
    "domain": "aiSystems",
    "level": 3,
    "stage": 2,
    "specialist": "nova",
    "childIds": [
      "isla"
    ],
    "type": "Applied AI — business context",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova has a challenge: use Claude to help with something real in JellyBean. Not asking for the answer — asking for help thinking. There's a difference. Nova wants to see if Isla can find it.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What's a real question you have about JellyBean right now? Something you actually want to know.",
      "Ask Claude. Read me the answer.",
      "Is it useful? Why or why not?",
      "What did Claude assume that might not be true for your specific business?",
      "Now ask it better — give Claude more context about what JellyBean is and what you actually need. What changed?"
    ],
    "topicBank": null,
    "masterySignal": "Can identify the gap between a generic AI answer and a useful business-specific answer. Can improve a prompt based on what was missing.",
    "portfolioCapture": "Her generic prompt + better prompt + reflection on what changed.",
    "crossDomains": [
      "building"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "JellyBean questions"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "AI-L3-002": {
    "id": "AI-L3-002",
    "title": "When the Computer Got It Wrong",
    "domain": "aiSystems",
    "level": 3,
    "stage": 2,
    "specialist": "nova",
    "childIds": [
      "isla"
    ],
    "type": "Hallucination detection — age-appropriate",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Nova wants to show Isla something important: computers can be completely confident and completely wrong at the same time. She wants to find an example together.",
    "offScreenPrep": "Ask Claude a specific question about something Isla knows well — JellyBean, horses, something from Thrive. Something with a specific factual answer Isla can verify.",
    "conversationFramework": [
      "Was Claude right?",
      "Claude said it like it was definitely true. How do you know it wasn't?",
      "Here's what's interesting: Claude doesn't know when it doesn't know. It just answers. What does that mean for how you should use it?",
      "Make a rule: what would you always check before trusting what Claude says?"
    ],
    "topicBank": null,
    "masterySignal": "Can demonstrate understanding that AI confidence and AI accuracy are separate things. Has articulated a simple personal verification rule.",
    "portfolioCapture": "Her verification rule.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "AI critical evaluation"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  },
  "PM-L4-001": {
    "id": "PM-L4-001",
    "title": "What S2S Is Actually Doing",
    "domain": "physical",
    "level": 4,
    "stage": 2,
    "specialist": "zion",
    "childIds": [
      "isla"
    ],
    "type": "Neurological development — understanding and ownership",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to talk about S2S — not what you do there, what's actually happening. Because what's happening is really interesting and Isla deserves to understand it.",
    "offScreenPrep": null,
    "conversationFramework": [
      "What happens at S2S? Describe it.",
      "Here's what Zion wants you to know: some of the movement patterns your brain should have learned when you were a baby — called primitive reflexes — didn't fully switch off when they were supposed to. S2S is teaching your brain to finish that job. It's literally rewiring something.",
      "Has anything gotten easier since you started? Even something small?",
      "Here's the cool part: this work you're doing is making your brain physically different. More connected. What does it mean to you to be actively building your own brain?",
      "What do you think will be different in 6 months?"
    ],
    "topicBank": null,
    "masterySignal": "Understands S2S as neurological development — owns it as training, not treatment. Can identify at least one observable change. Has a positive orientation toward the process.",
    "portfolioCapture": "What's gotten easier + her prediction for 6 months.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "S2S program"
    ],
    "recommendedOrder": 1,
    "prerequisites": []
  },
  "PM-L4-002": {
    "id": "PM-L4-002",
    "title": "What Coach Dillon Wants From You",
    "domain": "physical",
    "level": 4,
    "stage": 2,
    "specialist": "zion",
    "childIds": [
      "isla"
    ],
    "type": "Athletic development — intention",
    "timeMinutes": 15,
    "standingPractice": false,
    "runFrequency": null,
    "tournamentRelevance": null,
    "brief": "Zion wants to know: what does Isla think Coach Dillon is actually trying to build in her? Not the sport skills — the person.",
    "offScreenPrep": null,
    "conversationFramework": [
      "When Coach Dillon corrects something you're doing — what does he say most often?",
      "What does he want you to do after a mistake? Does he want you to be upset? To forget it? Something else?",
      "Zion thinks Coach Dillon is teaching you how to stay yourself under pressure. Do you feel that? Can you describe a moment where you used something he's been teaching you?",
      "Is there something he works on with you that feels especially hard? Not physically — mentally.",
      "What would you tell a younger kid about what it's like to train with Coach Dillon?"
    ],
    "topicBank": null,
    "masterySignal": "Can articulate the mental and character development happening through athletic training. Can give a specific example of mental skill transfer.",
    "portfolioCapture": "Her example of using a Coach Dillon lesson outside sport.",
    "crossDomains": [
      "identity"
    ],
    "laWeavingHook": null,
    "connectiveHooks": [
      "Coach Dillon"
    ],
    "recommendedOrder": 2,
    "prerequisites": []
  }
};

module.exports = MISSION_CATALOG;
