import type {
  AgentArtifact,
  AgentStep,
  ChatMessage,
  ChatScenarioId,
  Folder,
  Note,
  SmartSuggestion,
} from '@/types/notes';

export const APP_NAME = 'Apple Notes';

export const folders: Folder[] = [
  { id: 'all', label: 'All notes', icon: 'note', count: 24 },
  { id: 'favorites', label: 'Favorites', icon: 'star', count: 4 },
  { id: 'work', label: 'Work', icon: 'briefcase', count: 9 },
  { id: 'school', label: 'School', icon: 'graduation', count: 5 },
  { id: 'personal', label: 'Personal', icon: 'heart', count: 6 },
  { id: 'shared', label: 'Shared', icon: 'users', count: 3 },
];

export const notes: Note[] = [
  {
    id: 'n1',
    folderId: 'work',
    title: 'Product sync — Q2 roadmap',
    preview: 'Agreed to ship smart folders by May. Design review Thursday.',
    body: `## Product sync — March 18\n\n- Smart folders ship by May 12\n- Design review with Lena — Thursday 2pm\n- Open question: should AI summaries appear inline or in a side panel?\n- **Action:** send recap to eng@recall.app before EOD`,
    updatedAt: 'Today, 9:14 AM',
    pinned: true,
    tags: ['meetings'],
    snippet: '3 action items · 1 follow-up',
  },
  {
    id: 'n2',
    folderId: 'work',
    title: 'Job search tracker',
    preview: 'Applied to Meridian, Lattice, and Northwind. Follow-ups due next week.',
    body: `## Job search — running log\n\n### Meridian Health\n- Applied Mar 2, recruiter call Mar 14 (went well)\n\n### Lattice\n- Portfolio sent, waiting on design exercise\n\n### Northwind\n- Referral from Priya, intro email drafted but not sent\n\n**Themes from interviews:** systems thinking, calm AI UX, subscription value\n\n**Next:** thank-you note to Marcus at Meridian within 48h`,
    updatedAt: 'Yesterday',
    tags: ['career'],
    snippet: '4 companies · 2 pending follow-ups',
  },
  {
    id: 'n3',
    folderId: 'work',
    title: 'Networking night — contacts',
    preview: 'Met Marcus Chen (Meridian), Sam Ortiz (Lattice). Booth 14 near the espresso bar.',
    body: `## Design Leaders networking — March 8\n\n### Marcus Chen — VP Product, Meridian Health\n- Loved the "notes as context" framing\n- Email: marcus.chen@meridianhealth.io\n- Said follow up after the roadmap post\n\n### Sam Ortiz — Design lead, Lattice\n- Interested in shared study notes use case\n\n**Reminder:** send Marcus a concise follow-up referencing our conversation about ambient AI.`,
    updatedAt: 'Mar 8',
    tags: ['events', 'contacts'],
    snippet: '2 contacts · follow-up suggested',
  },
  {
    id: 'n4',
    folderId: 'school',
    title: 'HCI lecture — memory & retrieval',
    preview: 'Episodic vs semantic memory. Cues beat search when labels are weak.',
    body: `## HCI 442 — Lecture 7\n\nEpisodic memory = time-stamped events; semantic = facts without context.\n\n**Design implication:** notes apps should surface *when* and *why*, not just keywords.\n\n**Reading:** "The Design of Everyday Memory" — ch. 4–5\n\n**Study group:** Saturday 10am — bring printed flashcards`,
    updatedAt: 'Mar 12',
    tags: ['class'],
  },
  {
    id: 'n5',
    folderId: 'school',
    title: 'Group project — API milestone',
    preview: 'Backend due Friday. Frontend needs empty states for search.',
    body: `## CS capstone — Sprint 3\n\n- **Backend:** pagination + auth refresh by Friday\n- **Frontend:** empty states for zero-result search\n\n### Blockers\n- Waiting on schema from Jamie\n\n**Demo dry-run:** Mar 22, 4pm`,
    updatedAt: 'Mar 11',
    tags: ['group'],
  },
  {
    id: 'n6',
    folderId: 'personal',
    title: 'Apartment move checklist',
    preview: 'Book movers Apr 2. Update utilities by Mar 28.',
    body: `## Move — April 5 target\n\n- [ ] Book movers (get 3 quotes)\n- [ ] Utilities transfer — electric + internet\n- [ ] Change address: bank, health, voter reg\n- [ ] Measure nook for desk — 42" max width`,
    updatedAt: 'Mar 10',
    tags: ['life'],
  },
  {
    id: 'n7',
    folderId: 'shared',
    title: 'Family trip — Portugal',
    preview: 'Flights booked. Mom wants vegetarian restaurants in Lisbon.',
    body: `## Portugal — June 14–24\n\n**Flights:** arrive Lisbon 10:40am\n\n### Mom\n- Vegetarian spots near Alfama\n\n### Dad\n- Golf day trip options (Sat only)\n\nShared packing list in Notes → link calendar holds`,
    updatedAt: 'Mar 6',
    tags: ['family'],
  },
  {
    id: 'n8',
    folderId: 'work',
    title: '1:1 with Jordan — feedback',
    preview: 'Ask for clearer promo criteria. Mention interest in AI features squad.',
    body: `## 1:1 prep — Jordan\n\n- Promo criteria — want measurable examples\n- Interest in AI features squad for H2\n- Share prototype link after this review cycle`,
    updatedAt: 'Mar 5',
    tags: ['1:1'],
  },
  {
    id: 'n9',
    folderId: 'personal',
    title: 'Therapy session notes',
    preview: 'Boundary practice at work. Journal prompt: what drained energy this week?',
    body: `## Session — Mar 4\n\n**Themes:** saying no to last-minute requests, energy audit\n\n**Homework:** one boundary experiment per day\n\n> Journal prompt: "What drained energy this week — and what restored it?"`,
    updatedAt: 'Mar 4',
    tags: ['wellness'],
  },
  {
    id: 'n10',
    folderId: 'favorites',
    title: 'Recall product principles',
    preview: 'AI additive, not overwhelming. Default note-taking stays simple.',
    body: `## Recall — product principles\n\n1. Default experience = fast capture, zero config\n2. AI is discoverable but never blocks writing\n3. Every suggestion links to source notes\n4. Agent mode only when the task spans tools\n5. Premium = memory + action, not generic chat`,
    updatedAt: 'Feb 28',
    pinned: true,
    tags: ['product'],
  },
];

export const smartSuggestions: SmartSuggestion[] = [
  {
    id: 's1',
    title: 'Summarize job search',
    description: 'Pull themes, deadlines, and open loops from 6 related notes.',
    prompt: 'Summarize everything I wrote about my job search',
    icon: 'sparkle',
  },
  {
    id: 's2',
    title: 'Draft event follow-up',
    description: 'Find Marcus from networking night and draft a warm email.',
    prompt:
      'Find the person I met at the networking event and draft a follow-up email',
    icon: 'envelope',
  },
  {
    id: 's3',
    title: 'Turn notes into tasks',
    description: 'Extract checkboxes from move, capstone, and sync notes.',
    prompt: 'Turn these scattered notes into a task list',
    icon: 'list',
  },
  {
    id: 's4',
    title: 'What did I say about Q2?',
    description: 'Recall project decisions from the last month.',
    prompt: 'Remind me what I said about the Q2 roadmap project last month',
    icon: 'calendar',
  },
];

export const composerPlaceholders = [
  'Ask across all notes…',
  'Type / for commands',
  'Summarize my job search notes',
  'Find a contact and draft a follow-up',
  'Pull action items from this note',
];

export interface SlashCommand {
  id: string;
  command: string;
  label: string;
  description: string;
  prompt: string;
}

export const slashCommands: SlashCommand[] = [
  {
    id: 'summarize',
    command: 'summarize',
    label: 'Summarize notes',
    description: 'Pull themes, deadlines, and open loops from related notes',
    prompt: 'Summarize everything I wrote about my job search',
  },
  {
    id: 'follow-up',
    command: 'follow-up',
    label: 'Draft follow-up',
    description: 'Find a contact from your notes and draft a warm email',
    prompt:
      'Find the person I met at the networking event and draft a follow-up email',
  },
  {
    id: 'tasks',
    command: 'tasks',
    label: 'Extract tasks',
    description: 'Turn scattered checkboxes and bullets into a task list',
    prompt: 'Turn these scattered notes into a task list',
  },
  {
    id: 'recall',
    command: 'recall',
    label: 'Recall project context',
    description: 'Surface decisions and dates from a project thread',
    prompt: 'Remind me what I said about the Q2 roadmap project last month',
  },
  {
    id: 'actions',
    command: 'actions',
    label: 'Pull action items',
    description: 'Extract next steps from the current note',
    prompt: 'Pull action items from this note',
  },
];

export const chatScenarios: Record<
  ChatScenarioId,
  { messages: ChatMessage[]; followUp?: string }
> = {
  'job-search': {
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Summarize everything I wrote about my job search',
      },
      {
        id: 'm2',
        role: 'tool',
        content: '',
        toolLabel: 'Searching 6 notes in Work',
      },
      {
        id: 'm3',
        role: 'assistant',
        content:
          'You are actively pursuing three companies: **Meridian Health** (recruiter call went well — thank-you due within 48h), **Lattice** (portfolio sent, awaiting design exercise), and **Northwind** (referral from Priya; intro email drafted but not sent).\n\nRecurring interview themes: systems thinking, calm AI UX, and articulating subscription value. Your next concrete steps are the Meridian follow-up and sending the Northwind intro.',
        citations: [
          { noteId: 'n2', title: 'Job search tracker' },
          { noteId: 'n3', title: 'Networking night — contacts' },
        ],
        actions: [
          { id: 'a1', label: 'Draft thank-you to Meridian', variant: 'primary' },
          { id: 'a2', label: 'Create reminder', variant: 'secondary' },
        ],
      },
    ],
  },
  'event-followup': {
    messages: [
      {
        id: 'm1',
        role: 'user',
        content:
          'Hey — remember we talked to someone at the networking event? Can you send him an email?',
      },
      {
        id: 'm2',
        role: 'tool',
        content: '',
        toolLabel: 'Found Marcus Chen in Networking night — contacts',
      },
      {
        id: 'm3',
        role: 'assistant',
        content:
          'Found **Marcus Chen**, VP Product at Meridian Health (marcus.chen@meridianhealth.io). You met at Design Leaders on March 8 and discussed "notes as context" — he asked you to follow up after your roadmap post.\n\nI drafted a concise follow-up below. Want me to open Mail or schedule a reminder if he does not reply?',
        citations: [{ noteId: 'n3', title: 'Networking night — contacts' }],
        actions: [
          { id: 'a1', label: 'Open agent to send', variant: 'primary' },
          { id: 'a2', label: 'Edit draft', variant: 'secondary' },
        ],
      },
    ],
    followUp: 'agent',
  },
  'task-list': {
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Turn these scattered notes into a task list',
      },
      {
        id: 'm2',
        role: 'tool',
        content: '',
        toolLabel: 'Reading move, capstone, and product sync notes',
      },
      {
        id: 'm3',
        role: 'assistant',
        content:
          'Here are **9 tasks** pulled from three notes, grouped by urgency:\n\n**This week**\n• Send product sync recap to eng@recall.app\n• Book movers (3 quotes) — due before Apr 2\n• Backend pagination + auth — capstone, Friday\n\n**Soon**\n• Utilities transfer by Mar 28\n• Frontend empty states for search\n• Thank Marcus at Meridian within 48h',
        citations: [
          { noteId: 'n1', title: 'Product sync — Q2 roadmap' },
          { noteId: 'n6', title: 'Apartment move checklist' },
          { noteId: 'n5', title: 'Group project — API milestone' },
        ],
        actions: [
          { id: 'a1', label: 'Add to Reminders', variant: 'primary' },
          { id: 'a2', label: 'Copy as Markdown', variant: 'secondary' },
        ],
      },
    ],
  },
  'project-recall': {
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Remind me what I said about the Q2 roadmap project last month',
      },
      {
        id: 'm2',
        role: 'assistant',
        content:
          'From your **Product sync** note: smart folders target **May 12**, design review with Lena is **Thursday 2pm**, and you flagged an open product question — whether AI summaries should appear inline or in a side panel. You also committed to sending a recap to engineering before end of day.',
        citations: [{ noteId: 'n1', title: 'Product sync — Q2 roadmap' }],
      },
    ],
  },
  'action-items': {
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Pull action items from this note',
      },
      {
        id: 'm2',
        role: 'assistant',
        content:
          'From **Product sync — Q2 roadmap**:\n\n1. Send recap to eng@recall.app before EOD\n2. Prepare for design review Thursday 2pm with Lena\n3. Decide: inline AI summaries vs side panel (discussion item)',
        citations: [{ noteId: 'n1', title: 'Product sync — Q2 roadmap' }],
        actions: [
          { id: 'a1', label: 'Add all to Reminders', variant: 'primary' },
        ],
      },
    ],
  },
  custom: { messages: [] },
};

export const agentEmailDraft: AgentArtifact = {
  type: 'email',
  title: 'Follow-up for Marcus Chen',
  meta: ['To: marcus.chen@meridianhealth.io', 'Subject: Great meeting at Design Leaders'],
  content: `Hi Marcus,

It was great meeting you at Design Leaders last week. I appreciated your take on using notes as shared context instead of another chat window.

I published a short outline of our Q2 roadmap approach — happy to send it over if useful. Would love to stay in touch as we ship smart folders in May.

Best,
Rushin`,
};

export const agentSteps: AgentStep[] = [
  {
    id: 'st1',
    status: 'done',
    label: 'Read networking note',
    detail: 'Found Marcus Chen + context from Mar 8',
  },
  {
    id: 'st2',
    status: 'done',
    label: 'Matched open job search thread',
    detail: 'Linked to Meridian follow-up reminder',
  },
  {
    id: 'st3',
    status: 'active',
    label: 'Draft follow-up email',
    detail: 'Tone: warm, concise, references roadmap',
  },
  {
    id: 'st4',
    status: 'pending',
    label: 'Offer calendar hold',
    detail: 'Optional 15-min intro next week',
  },
];

export function matchScenario(prompt: string): ChatScenarioId {
  const p = prompt.toLowerCase();
  if (p.includes('job search') || p.includes('summarize everything')) {
    return 'job-search';
  }
  if (p.includes('networking') || p.includes('follow-up email') || p.includes('send him')) {
    return 'event-followup';
  }
  if (p.includes('task list') || p.includes('scattered')) {
    return 'task-list';
  }
  if (p.includes('last month') || p.includes('q2') || p.includes('roadmap project')) {
    return 'project-recall';
  }
  if (p.includes('action items') || p.includes('pull action')) {
    return 'action-items';
  }
  return 'custom';
}

export function defaultAssistantReply(prompt: string): ChatMessage {
  return {
    id: `reply-${Date.now()}`,
    role: 'assistant',
    content: `I searched your recent notes for "${prompt.slice(0, 60)}${prompt.length > 60 ? '…' : ''}" and found relevant context in **Product sync**, **Job search tracker**, and **Networking night**. Ask me to summarize, draft an email, or extract tasks — I will cite the source notes each time.`,
    citations: [
      { noteId: 'n1', title: 'Product sync — Q2 roadmap' },
      { noteId: 'n2', title: 'Job search tracker' },
    ],
  };
}
