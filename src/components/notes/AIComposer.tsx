import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { ArrowUp, Sparkle, X } from '@phosphor-icons/react';

import {
  filterSlashCommands,
  SlashCommandMenu,
} from '@/components/notes/SlashCommandMenu';
import { useNotesApp } from '@/context/NotesAppContext';
import type { SlashCommand } from '@/data/demo';

interface AIComposerProps {
  variant?: 'light' | 'dark';
  floating?: boolean;
  centered?: boolean;
}

export function AIComposer({
  variant = 'light',
  floating,
  centered,
}: AIComposerProps) {
  const {
    composerValue,
    setComposerValue,
    composerPlaceholder,
    sendMessage,
    openComposer,
    aiPanel,
    closeAiPanel,
    expandAiPanel,
    view,
    noteDetailOpen,
  } = useNotesApp();

  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = variant === 'dark';

  const slashQuery = composerValue.startsWith('/')
    ? composerValue.slice(1)
    : null;
  const slashOpen = slashQuery !== null;
  const filteredCommands = useMemo(
    () => (slashOpen ? filterSlashCommands(slashQuery) : []),
    [slashOpen, slashQuery],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [slashQuery]);

  useEffect(() => {
    if (activeIndex >= filteredCommands.length && filteredCommands.length > 0) {
      setActiveIndex(filteredCommands.length - 1);
    }
  }, [activeIndex, filteredCommands.length]);

  const onFocus = () => {
    if (view === 'agent' || centered) return;
    if (aiPanel === 'closed') openComposer();
  };

  const placeholder =
    view === 'agent' || centered
      ? 'Find a contact and draft a follow-up email…'
      : composerPlaceholder;

  const runCommand = (command: SlashCommand) => {
    sendMessage(command.prompt);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (slashOpen && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filteredCommands.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + filteredCommands.length) % filteredCommands.length,
        );
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const command = filteredCommands[activeIndex];
        if (command) runCommand(command);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setComposerValue('');
        return;
      }
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const command = filteredCommands[activeIndex];
        if (command) runCommand(command);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const wrapperClass = centered
    ? 'w-full max-w-[640px] mx-auto'
    : floating
      ? 'pointer-events-none absolute bottom-0 left-0 right-0 z-40 px-6 pb-5 pt-2'
      : isDark
        ? ''
        : 'border-t border-hairline-soft bg-card px-5 py-4';

  const floatingInnerClass = floating
    ? noteDetailOpen && view !== 'classic'
      ? 'mx-auto w-full max-w-[640px]'
      : 'w-full'
    : undefined;

  return (
    <div className={wrapperClass}>
      <div className={floatingInnerClass}>
        {aiPanel !== 'closed' && floating ? (
          <button
            type="button"
            className="pointer-events-auto mb-2 ml-auto flex items-center gap-1 rounded-[8px] px-2 py-1 text-[11px] text-ink-500 hover:bg-wash"
            onClick={closeAiPanel}
          >
            <X size={12} />
            Minimize
          </button>
        ) : null}
        <div className="pointer-events-auto relative">
          {slashOpen ? (
            <SlashCommandMenu
              query={slashQuery}
              activeIndex={activeIndex}
              variant={variant}
              onSelect={runCommand}
              onHover={setActiveIndex}
            />
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
              placeholder={placeholder}
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
                if (view !== 'agent' && aiPanel === 'peek') expandAiPanel();
                sendMessage();
              }}
              aria-label="Send"
            >
              <ArrowUp size={16} weight="bold" />
            </button>
          </div>
        </div>
        {!isDark && (centered || aiPanel === 'closed') ? (
          <p className="pointer-events-none mt-2 text-center text-[11px] text-ink-400">
            Type <span className="font-medium text-ink-500">/</span> for
            commands — summaries, search, and actions
          </p>
        ) : null}
      </div>
    </div>
  );
}
