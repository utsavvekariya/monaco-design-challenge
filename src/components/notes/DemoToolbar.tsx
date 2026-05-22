import { useNotesApp } from '@/context/NotesAppContext';
import type { AppView } from '@/types/notes';

const views: { id: AppView; label: string }[] = [
  { id: 'classic', label: 'Notes' },
  { id: 'cards', label: 'Smart home' },
  { id: 'chat', label: 'Ask' },
  { id: 'agent', label: 'Agent' },
];

export function DemoToolbar() {
  const {
    view,
    setView,
    closeAiPanel,
    expandAiPanel,
    startAgentFlow,
    sendMessage,
    messages,
    aiPanel,
  } = useNotesApp();

  const onView = (id: AppView) => {
    setView(id);
    if (id === 'chat') {
      expandAiPanel();
      if (messages.length === 0) {
        sendMessage(
          'Find the person I met at the networking event and draft a follow-up email',
        );
      }
    } else if (id === 'agent') {
      startAgentFlow();
    } else {
      closeAiPanel();
    }
  };

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-hairline-soft bg-paper-deep px-4 py-2">
      <div className="flex items-center gap-1 rounded-[10px] bg-paper p-0.5">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onView(v.id)}
            className="rounded-[8px] px-3 py-1.5 text-[12px] font-medium transition-colors"
            style={
              view === v.id
                ? {
                    background: 'var(--color-card-raised)',
                    boxShadow: 'var(--shadow-action)',
                    color: 'var(--color-ink-900)',
                  }
                : { color: 'var(--color-ink-500)' }
            }
          >
            {v.label}
          </button>
        ))}
      </div>
      {aiPanel !== 'closed' ? (
        <span className="hidden text-[11px] text-ink-500 sm:inline">
          AI panel: {aiPanel}
        </span>
      ) : null}
    </div>
  );
}
