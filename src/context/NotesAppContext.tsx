import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  chatScenarios,
  composerPlaceholders,
  defaultAssistantReply,
  matchScenario,
  notes as initialNotes,
} from '@/data/demo';
import type {
  AiPanelSize,
  AppView,
  ChatMessage,
  ChatScenarioId,
  FolderId,
  Note,
} from '@/types/notes';

interface NotesAppContextValue {
  view: AppView;
  setView: (view: AppView) => void;
  aiPanel: AiPanelSize;
  openComposer: () => void;
  expandAiPanel: () => void;
  closeAiPanel: () => void;
  selectedFolderId: FolderId;
  setSelectedFolderId: (id: FolderId) => void;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  selectNote: (id: string) => void;
  createNote: () => void;
  closeNoteDetail: () => void;
  noteDetailOpen: boolean;
  filteredNotes: Note[];
  selectedNote: Note | null;
  updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>) => void;
  composerValue: string;
  setComposerValue: (value: string) => void;
  composerPlaceholder: string;
  messages: ChatMessage[];
  isThinking: boolean;
  sendMessage: (text?: string) => void;
  activeScenario: ChatScenarioId | null;
  agentWorkflowActive: boolean;
  startAgentFlow: (withWorkflow?: boolean) => void;
  mobileSheet: 'notes' | 'detail' | 'ai' | null;
  setMobileSheet: (sheet: 'notes' | 'detail' | 'ai' | null) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  goToAllNotes: () => void;
}

const NotesAppContext = createContext<NotesAppContextValue | null>(null);

export function NotesAppProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [view, setView] = useState<AppView>('cards');
  const [aiPanel, setAiPanel] = useState<AiPanelSize>('closed');
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId>('all');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>('n1');
  const [composerValue, setComposerValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [activeScenario, setActiveScenario] = useState<ChatScenarioId | null>(null);
  const [agentWorkflowActive, setAgentWorkflowActive] = useState(false);
  const [mobileSheet, setMobileSheet] = useState<'notes' | 'detail' | 'ai' | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [noteDetailOpen, setNoteDetailOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const goToAllNotes = useCallback(() => {
    setSelectedFolderId('all');
    setSelectedNoteId(null);
    setNoteDetailOpen(false);
    setView('cards');
    setAiPanel('closed');
    setAgentWorkflowActive(false);
    setMobileSheet(null);
  }, []);

  const selectNote = useCallback((id: string) => {
    setSelectedNoteId(id);
    setNoteDetailOpen(true);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileSheet('detail');
    }
  }, []);

  const createNote = useCallback(() => {
    const folderForNote: FolderId =
      selectedFolderId === 'all' || selectedFolderId === 'favorites'
        ? 'personal'
        : selectedFolderId;

    const id = `n-${Date.now()}`;
    const newNote: Note = {
      id,
      folderId: folderForNote,
      title: '',
      preview: '',
      body: '',
      updatedAt: 'Just now',
    };

    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(id);
    setNoteDetailOpen(true);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileSheet('detail');
    }
  }, [selectedFolderId]);

  const closeNoteDetail = useCallback(() => {
    setNoteDetailOpen(false);
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileSheet(null);
    }
  }, []);

  const composerPlaceholder =
    composerPlaceholders[0] ?? 'Ask across all notes…';

  const filteredNotes = useMemo(() => {
    if (selectedFolderId === 'all') return notes;
    if (selectedFolderId === 'favorites') {
      return notes.filter((n) => n.pinned || n.folderId === 'favorites');
    }
    return notes.filter((n) => n.folderId === selectedFolderId);
  }, [notes, selectedFolderId]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedNoteId) ?? null,
    [notes, selectedNoteId],
  );

  const updateNote = useCallback(
    (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>) => {
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id !== id) return note;
          const title = updates.title ?? note.title;
          const body = updates.body ?? note.body;
          const preview = body.replace(/\s+/g, ' ').trim().slice(0, 120);
          return {
            ...note,
            title,
            body,
            preview,
            updatedAt: 'Just now',
          };
        }),
      );
    },
    [],
  );

  const openComposer = useCallback(() => {
    setAiPanel('peek');
    setView((v) => (v === 'classic' || v === 'agent' ? v : 'chat'));
    setMobileSheet('ai');
  }, []);

  const expandAiPanel = useCallback(() => {
    setAiPanel('full');
    setView('chat');
    setMobileSheet('ai');
  }, []);

  const closeAiPanel = useCallback(() => {
    setAiPanel('closed');
    setMobileSheet(null);
    if (view === 'chat') setView('cards');
  }, [view]);

  const playScenario = useCallback((scenarioId: ChatScenarioId, userText: string) => {
    const scenario = chatScenarios[scenarioId];
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: userText,
    };

    setMessages([userMsg]);
    setIsThinking(true);
    setActiveScenario(scenarioId);
    expandAiPanel();

    const toolMsg = scenario.messages.find((m) => m.role === 'tool');
    const assistantMsgs = scenario.messages.filter((m) => m.role === 'assistant');

    window.setTimeout(() => {
      if (toolMsg) {
        setMessages((prev) => [...prev, { ...toolMsg, id: `t-${Date.now()}` }]);
      }
    }, 700);

    window.setTimeout(() => {
      setIsThinking(false);
      if (assistantMsgs.length > 0) {
        setMessages((prev) => [
          ...prev,
          ...assistantMsgs.map((m, i) => ({ ...m, id: `a-${Date.now()}-${i}` })),
        ]);
      } else {
        setMessages((prev) => [...prev, defaultAssistantReply(userText)]);
      }
      if (scenario.followUp === 'agent') {
        window.setTimeout(() => {
          setView('agent');
          setAgentWorkflowActive(true);
          setAiPanel('closed');
          setMobileSheet(null);
        }, 1200);
      }
    }, toolMsg ? 1600 : 1100);
  }, [expandAiPanel]);

  const sendMessage = useCallback(
    (text?: string) => {
      const content = (text ?? composerValue).trim();
      if (!content) return;
      setComposerValue('');

      if (view === 'agent') {
        setAgentWorkflowActive(true);
        return;
      }

      const scenarioId = matchScenario(content);
      if (scenarioId !== 'custom') {
        playScenario(scenarioId, content);
        return;
      }
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);
      expandAiPanel();
      window.setTimeout(() => {
        setIsThinking(false);
        setMessages((prev) => [...prev, defaultAssistantReply(content)]);
      }, 1200);
    },
    [composerValue, expandAiPanel, playScenario, view],
  );

  const startAgentFlow = useCallback((withWorkflow = false) => {
    setView('agent');
    setAgentWorkflowActive(withWorkflow);
    setAiPanel('closed');
    setMobileSheet(null);
  }, []);

  const value = useMemo(
    () => ({
      view,
      setView,
      aiPanel,
      openComposer,
      expandAiPanel,
      closeAiPanel,
      selectedFolderId,
      setSelectedFolderId,
      selectedNoteId,
      setSelectedNoteId,
      selectNote,
      createNote,
      closeNoteDetail,
      noteDetailOpen,
      filteredNotes,
      selectedNote,
      updateNote,
      composerValue,
      setComposerValue,
      composerPlaceholder,
      messages,
      isThinking,
      sendMessage,
      activeScenario,
      agentWorkflowActive,
      startAgentFlow,
      mobileSheet,
      setMobileSheet,
      sidebarCollapsed,
      toggleSidebar,
      goToAllNotes,
    }),
    [
      view,
      aiPanel,
      openComposer,
      expandAiPanel,
      closeAiPanel,
      selectedFolderId,
      selectedNoteId,
      selectNote,
      createNote,
      closeNoteDetail,
      noteDetailOpen,
      filteredNotes,
      selectedNote,
      updateNote,
      composerValue,
      composerPlaceholder,
      messages,
      isThinking,
      sendMessage,
      activeScenario,
      agentWorkflowActive,
      startAgentFlow,
      mobileSheet,
      sidebarCollapsed,
      toggleSidebar,
      goToAllNotes,
    ],
  );

  return (
    <NotesAppContext.Provider value={value}>{children}</NotesAppContext.Provider>
  );
}

export function useNotesApp() {
  const ctx = useContext(NotesAppContext);
  if (!ctx) {
    throw new Error('useNotesApp must be used within NotesAppProvider');
  }
  return ctx;
}
