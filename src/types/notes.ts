export type AppView = 'classic' | 'cards' | 'chat' | 'agent';

export type AiPanelSize = 'closed' | 'peek' | 'full';

export type FolderId =
  | 'all'
  | 'work'
  | 'personal'
  | 'school'
  | 'shared'
  | 'favorites';

export interface Folder {
  id: FolderId;
  label: string;
  icon: string;
  count?: number;
}

export interface Note {
  id: string;
  folderId: FolderId;
  title: string;
  preview: string;
  body: string;
  updatedAt: string;
  pinned?: boolean;
  tags?: string[];
  snippet?: string;
}

export interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: 'sparkle' | 'calendar' | 'list' | 'envelope';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  toolLabel?: string;
  citations?: { noteId: string; title: string }[];
  actions?: { id: string; label: string; variant?: 'primary' | 'secondary' }[];
}

export interface AgentStep {
  id: string;
  status: 'done' | 'active' | 'pending';
  label: string;
  detail?: string;
}

export interface AgentArtifact {
  type: 'email' | 'tasks' | 'contact' | 'reminder';
  title: string;
  content: string;
  meta?: string[];
}

export type ChatScenarioId =
  | 'job-search'
  | 'event-followup'
  | 'task-list'
  | 'project-recall'
  | 'action-items'
  | 'custom';
