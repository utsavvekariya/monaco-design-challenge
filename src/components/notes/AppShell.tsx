import { Sidebar } from '@/components/notes/Sidebar';
import { DemoToolbar } from '@/components/notes/DemoToolbar';
import { NoteList } from '@/components/notes/NoteList';
import { NoteDetail } from '@/components/notes/NoteDetail';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { SmartSuggestions } from '@/components/notes/SmartSuggestions';
import { AIComposer } from '@/components/notes/AIComposer';
import { AIChatPanel } from '@/components/notes/AIChatPanel';
import { AgentPage } from '@/components/notes/AgentPage';
import { MobileNav } from '@/components/notes/MobileNav';
import { useNotesApp } from '@/context/NotesAppContext';

function MainCanvas() {
  const { view, aiPanel, selectedNote, noteDetailOpen, closeNoteDetail } =
    useNotesApp();
  const dimmed = aiPanel === 'peek' || aiPanel === 'full';
  const showDetailFullscreen =
    noteDetailOpen &&
    selectedNote != null &&
    view !== 'classic' &&
    view !== 'agent';

  if (view === 'classic') {
    return (
      <div className="flex min-h-0 flex-1">
        <NoteList />
        <NoteDetail />
      </div>
    );
  }

  if (view === 'agent') {
    return <AgentPage />;
  }

  if (showDetailFullscreen) {
    return (
      <div className="note-detail-fullscreen flex min-h-0 flex-1 flex-col overflow-hidden bg-card">
        <header className="flex shrink-0 items-center gap-3 border-b border-hairline-soft px-4 py-3">
          <button
            type="button"
            className="rounded-[8px] px-2 py-1 text-[13px] font-medium text-brand-500 transition-colors hover:bg-brand-50"
            onClick={closeNoteDetail}
          >
            Back
          </button>
          <p className="text-[13px] font-medium text-ink-800">Note</p>
        </header>
        <NoteDetail />
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col transition-opacity duration-300"
      style={{ opacity: dimmed && view === 'chat' ? 0.4 : 1 }}
    >
      {(view === 'cards' || view === 'chat') && <SmartSuggestions />}
      <NoteGrid />
    </div>
  );
}

function MobileSheets() {
  const { mobileSheet, setMobileSheet, closeNoteDetail } = useNotesApp();

  return (
    <>
      {mobileSheet === 'notes' ? (
        <div
          className="absolute inset-0 z-50 flex flex-col bg-card md:hidden"
          role="dialog"
        >
          <header className="flex items-center justify-between border-b border-hairline-soft px-4 py-3">
            <p className="text-[15px] font-medium text-ink-900">Folders</p>
            <button
              type="button"
              className="text-[13px] text-brand-500"
              onClick={() => setMobileSheet(null)}
            >
              Done
            </button>
          </header>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      ) : null}
      {mobileSheet === 'detail' ? (
        <div className="absolute inset-0 z-50 flex flex-col bg-card md:hidden">
          <header className="flex items-center justify-between border-b border-hairline-soft px-4 py-3">
            <button
              type="button"
              className="text-[13px] text-brand-500"
              onClick={closeNoteDetail}
            >
              Back
            </button>
            <p className="text-[15px] font-medium text-ink-900">Note</p>
            <span className="w-10" />
          </header>
          <NoteDetail />
        </div>
      ) : null}
    </>
  );
}

export function AppShell() {
  const { view, aiPanel } = useNotesApp();

  return (
    <div className="notes-shell grain">
      <Sidebar />
      <div className="notes-main flex min-w-0 flex-1 flex-col">
        <DemoToolbar />
        <div className="relative flex min-h-0 flex-1 flex-col">
          <MainCanvas />
          {view !== 'agent' ? <AIChatPanel /> : null}
          {view !== 'agent' && aiPanel === 'closed' ? (
            <AIComposer floating />
          ) : null}
          <MobileSheets />
        </div>
        <MobileNav />
      </div>
    </div>
  );
}
