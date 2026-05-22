import { useNotesApp } from '@/context/NotesAppContext';

export function DemoToolbar() {
  const { view, goToAllNotes, startAgentFlow } = useNotesApp();

  const onNotes = () => {
    goToAllNotes();
  };

  const onAgent = () => {
    startAgentFlow();
  };

  const notesActive = view !== 'agent';

  return (
    <div className="flex shrink-0 items-center border-b border-hairline-soft bg-paper-deep px-4 py-2">
      <div className="flex items-center gap-1 rounded-[10px] bg-paper p-0.5">
        <button
          type="button"
          onClick={onNotes}
          className="rounded-[8px] px-3 py-1.5 text-[12px] font-medium transition-colors"
          style={
            notesActive
              ? {
                  background: 'var(--color-card-raised)',
                  boxShadow: 'var(--shadow-action)',
                  color: 'var(--color-ink-900)',
                }
              : { color: 'var(--color-ink-500)' }
          }
        >
          Notes
        </button>
        <button
          type="button"
          onClick={onAgent}
          className="rounded-[8px] px-3 py-1.5 text-[12px] font-medium transition-colors"
          style={
            view === 'agent'
              ? {
                  background: 'var(--color-card-raised)',
                  boxShadow: 'var(--shadow-action)',
                  color: 'var(--color-ink-900)',
                }
              : { color: 'var(--color-ink-500)' }
          }
        >
          Agent
        </button>
      </div>
    </div>
  );
}
