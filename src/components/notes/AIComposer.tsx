import type { KeyboardEvent } from 'react';
import { ArrowUp, Sparkle, X } from '@phosphor-icons/react';

import { useNotesApp } from '@/context/NotesAppContext';

interface AIComposerProps {
  variant?: 'light' | 'dark';
  floating?: boolean;
}

export function AIComposer({ variant = 'light', floating }: AIComposerProps) {
  const {
    composerValue,
    setComposerValue,
    composerPlaceholder,
    sendMessage,
    openComposer,
    aiPanel,
    closeAiPanel,
    expandAiPanel,
  } = useNotesApp();

  const isDark = variant === 'dark';

  const onFocus = () => {
    if (aiPanel === 'closed') openComposer();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={
        floating
          ? 'absolute bottom-0 left-0 right-0 z-40 px-5 pb-5 pt-2'
          : isDark
            ? ''
            : 'border-t border-hairline-soft bg-card px-5 py-4'
      }
    >
      {aiPanel !== 'closed' && floating ? (
        <button
          type="button"
          className="mb-2 ml-auto flex items-center gap-1 rounded-[8px] px-2 py-1 text-[11px] text-ink-500 hover:bg-wash"
          onClick={closeAiPanel}
        >
          <X size={12} />
          Minimize
        </button>
      ) : null}
      <div
        className={`composer-shell ${isDark ? 'composer-shell-dark border border-white/10 bg-white/[0.08] shadow-none focus-within:border-brand-500/50 focus-within:shadow-[0_0_0_3px_rgba(1,94,254,0.2)]' : ''} composer-panel-enter`}
        onFocus={onFocus}
      >
        <Sparkle
          size={18}
          weight="fill"
          className={isDark ? 'text-brand-200' : 'text-brand-500'}
        />
        <input
          type="text"
          value={composerValue}
          onChange={(e) => setComposerValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder={composerPlaceholder}
          className={`min-w-0 flex-1 bg-transparent text-[14px] outline-none ${
            isDark
              ? 'text-inverted-fg placeholder:text-white/45'
              : 'text-ink-900 placeholder:text-ink-400'
          }`}
        />
        <button
          type="button"
          className={isDark ? 'btn-primary !h-8' : 'btn-primary !h-8'}
          onClick={() => {
            if (aiPanel === 'peek') expandAiPanel();
            sendMessage();
          }}
          aria-label="Send"
        >
          <ArrowUp size={16} weight="bold" />
        </button>
      </div>
      {!isDark && aiPanel === 'closed' ? (
        <p className="mt-2 text-center text-[11px] text-ink-400">
          Ask across all notes — summaries, search, and actions
        </p>
      ) : null}
    </div>
  );
}
