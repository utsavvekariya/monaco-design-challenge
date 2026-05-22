import {
  ArrowSquareOut,
  CaretDown,
  GitPullRequest,
  X,
} from '@phosphor-icons/react';

import { useNotesApp } from '@/context/NotesAppContext';
import { AIComposer } from '@/components/notes/AIComposer';

function renderMarkdownLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-inverted-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function AIChatPanel() {
  const {
    aiPanel,
    messages,
    isThinking,
    closeAiPanel,
    selectNote,
    startAgentFlow,
  } = useNotesApp();

  if (aiPanel === 'closed') return null;

  const panelClass =
    aiPanel === 'full' ? 'ai-panel ai-panel-full' : 'ai-panel ai-panel-peek';

  return (
    <div className={panelClass}>
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[13px] font-medium text-inverted-fg">Ask Recall</p>
          <p className="text-[11px] text-white/50">Searching across your notes</p>
        </div>
        <button
          type="button"
          className="rounded-[8px] p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          onClick={closeAiPanel}
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && !isThinking ? (
          <p className="text-[13px] leading-relaxed text-white/55">
            Try: summarize your job search, find a contact from an event, or pull
            action items from a meeting note.
          </p>
        ) : null}
        {messages.map((msg) => {
          if (msg.role === 'tool') {
            return (
              <button
                key={msg.id}
                type="button"
                className="flex items-center gap-2 self-start rounded-[8px] bg-white/5 px-2 py-1 text-[12px] text-white/70"
              >
                <GitPullRequest size={14} />
                {msg.toolLabel}
                <CaretDown size={12} />
              </button>
            );
          }
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="chat-bubble-user">
                {msg.content}
              </div>
            );
          }
          return (
            <div key={msg.id} className="space-y-3">
              <div className="chat-bubble-ai">{renderMarkdownLite(msg.content)}</div>
              {msg.citations?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {msg.citations.map((c) => (
                    <button
                      key={c.noteId}
                      type="button"
                      className="rounded-[6px] bg-white/10 px-2 py-1 text-[11px] text-white/80 hover:bg-white/15"
                      onClick={() => selectNote(c.noteId)}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              ) : null}
              {msg.actions?.length ? (
                <div className="flex flex-wrap gap-2">
                  {msg.actions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className={
                        action.variant === 'primary'
                          ? 'btn-primary !text-[12px]'
                          : 'rounded-[10px] border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white/90 hover:bg-white/10'
                      }
                      onClick={() => {
                        if (action.label.toLowerCase().includes('agent')) {
                          startAgentFlow(true);
                        }
                      }}
                    >
                      {action.label}
                      {action.label.includes('Mail') ? (
                        <ArrowSquareOut size={12} />
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        {isThinking ? (
          <div className="flex items-center gap-2 text-[12px] text-white/50">
            <span className="status-dot pulse-live bg-brand-500" />
            Reading your notes…
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 p-3">
        <AIComposer variant="dark" />
      </div>
    </div>
  );
}
