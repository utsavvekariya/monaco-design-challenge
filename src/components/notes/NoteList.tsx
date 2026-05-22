import { useNotesApp } from '@/context/NotesAppContext';

export function NoteList() {
  const { filteredNotes, selectedNoteId, selectNote } = useNotesApp();

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col border-r border-hairline-soft bg-paper">
      <div className="border-b border-hairline-soft px-4 py-3">
        <p className="text-[13px] font-medium text-ink-800">
          {filteredNotes.length} notes
        </p>
      </div>
      <ul className="flex-1 overflow-y-auto p-2 enter-stagger">
        {filteredNotes.map((note) => (
          <li key={note.id}>
            <button
              type="button"
              className="w-full rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-wash"
              style={
                selectedNoteId === note.id
                  ? {
                      background: 'var(--color-card-raised)',
                      boxShadow: 'var(--shadow-action)',
                    }
                  : undefined
              }
              onClick={() => selectNote(note.id)}
            >
              <p className="truncate text-[14px] font-medium text-ink-900">
                {note.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink-500">
                {note.preview}
              </p>
              <p className="mt-1.5 text-[11px] text-ink-400">{note.updatedAt}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
