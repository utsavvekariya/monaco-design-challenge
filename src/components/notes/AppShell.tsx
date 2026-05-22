import { Sidebar } from '@/components/notes/Sidebar';
import { DemoToolbar } from '@/components/notes/DemoToolbar';
import { NoteList } from '@/components/notes/NoteList';
import { NoteDetail } from '@/components/notes/NoteDetail';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { SmartSuggestions } from '@/components/notes/SmartSuggestions';
import { AIComposer } from '@/components/notes/AIComposer';
import { AIChatPanel } from '@/components/notes/AIChatPanel';
import { AgentPanel } from '@/components/notes/AgentPanel';
import { MobileNav } from '@/components/notes/MobileNav';
import { useNotesApp } from '@/context/NotesAppContext';

function MainCanvas() {
  const { view, aiPanel } = useNotesApp();
  const dimmed = aiPanel === 'peek' || aiPanel === 'full';

  if (view === 'classic') {
    return (
      <div className="flex min-h-0 flex-1">
        <NoteList />
        <NoteDetail />
      </div>
    );
  }

  if (view === 'agent') {
    return (
      <div
        className="relative flex min-h-0 flex-1 flex-col transition-opacity duration-300"
        style={{ opacity: 0.35 }}
      >
        <SmartSuggestions />
        <NoteGrid />
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
  const { mobileSheet, setMobileSheet, presentationMode } = useNotesApp();

  if (presentationMode !== 'mobile') return null;

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
              onClick={() => setMobileSheet(null)}
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
  const { view, aiPanel, presentationMode } = useNotesApp();

  const inner = (
    <div className="notes-shell grain">
      <Sidebar />
      <div className="notes-main flex min-w-0 flex-1 flex-col">
        <DemoToolbar />
        <div className="relative flex min-h-0 flex-1 flex-col">
          <MainCanvas />
          {view === 'agent' ? <AgentPanel /> : null}
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

  if (presentationMode === 'mobile') {
    return (
      <div className="mobile-mock-stage">
        <div className="mobile-mock-device">
          <div className="mobile-mock-bezel">
            <div className="mobile-mock-island" aria-hidden />
            <div className="mobile-mock-screen">{inner}</div>
            <div className="mobile-mock-home-bar" aria-hidden />
          </div>
        </div>
      </div>
    );
  }

  return inner;
}
