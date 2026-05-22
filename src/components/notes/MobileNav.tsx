import { List, Note, Sparkle } from '@phosphor-icons/react';

import { useNotesApp } from '@/context/NotesAppContext';

export function MobileNav() {
  const { mobileSheet, setMobileSheet, openComposer } = useNotesApp();

  return (
    <nav className="flex shrink-0 items-center justify-around border-t border-hairline-soft bg-paper-deep px-2 py-2 md:hidden">
      <button
        type="button"
        className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] text-ink-600"
        onClick={() => setMobileSheet('notes')}
        style={
          mobileSheet === 'notes' ? { color: 'var(--color-brand-500)' } : undefined
        }
      >
        <List size={20} />
        Browse
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] text-ink-600"
        onClick={() => setMobileSheet('detail')}
      >
        <Note size={20} />
        Note
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-0.5 rounded-[12px] bg-brand-500 px-4 py-1.5 text-[10px] text-brand-50 shadow-action"
        onClick={() => {
          openComposer();
          setMobileSheet('ai');
        }}
      >
        <Sparkle size={20} weight="fill" />
        Ask
      </button>
    </nav>
  );
}
