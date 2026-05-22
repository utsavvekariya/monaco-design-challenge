import { MagnifyingGlass, SquaresFour, Rows } from '@phosphor-icons/react';

import { useNotesApp } from '@/context/NotesAppContext';
import { NoteCard } from '@/components/notes/NoteCard';

export function NoteGrid() {
  const {
    filteredNotes,
    selectedNoteId,
    selectNote,
    view,
    setView,
  } = useNotesApp();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-hairline-soft px-6 py-3">
        <div className="flex items-center gap-2 rounded-[10px] bg-paper-deep p-1">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition-colors"
            style={
              view === 'cards'
                ? { background: 'var(--color-card-raised)', boxShadow: 'var(--shadow-action)' }
                : { color: 'var(--color-ink-500)' }
            }
            onClick={() => setView('cards')}
          >
            <SquaresFour size={14} />
            Cards
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition-colors"
            style={
              view === 'classic'
                ? { background: 'var(--color-card-raised)', boxShadow: 'var(--shadow-action)' }
                : { color: 'var(--color-ink-500)' }
            }
            onClick={() => setView('classic')}
          >
            <Rows size={14} />
            List
          </button>
        </div>
        <div className="composer-shell max-w-[240px] flex-1 !py-2">
          <MagnifyingGlass size={16} className="text-ink-400" />
          <input
            type="search"
            placeholder="Search notes"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink-800 outline-none placeholder:text-ink-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-28">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 enter-stagger">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              selected={selectedNoteId === note.id}
              onSelect={() => selectNote(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
