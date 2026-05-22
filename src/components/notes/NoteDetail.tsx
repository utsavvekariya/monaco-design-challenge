import { Clock, PushPin, Tag } from '@phosphor-icons/react';

import { NoteBodyEditor } from '@/components/notes/NoteBodyEditor';
import { useNotesApp } from '@/context/NotesAppContext';

const NOTE_CONTENT_CLASS =
  'note-detail-content mx-auto w-full max-w-[640px] px-8';

export function NoteDetail() {
  const { selectedNote, updateNote } = useNotesApp();

  if (!selectedNote) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-[15px] font-medium text-ink-700">Select a note</p>
        <p className="max-w-xs text-[13px] text-ink-500">
          Choose a note from the list, or switch to card view to browse with AI
          suggestions.
        </p>
      </div>
    );
  }

  return (
    <article className="note-detail-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className={NOTE_CONTENT_CLASS}>
        <header className="border-b border-hairline-soft py-5">
          <div className="flex flex-wrap items-center gap-2 text-ink-500">
            {selectedNote.pinned ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-brand-500">
                <PushPin size={12} weight="fill" />
                Pinned
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 text-[11px]">
              <Clock size={12} />
              {selectedNote.updatedAt}
            </span>
            {selectedNote.snippet ? (
              <span className="rounded-[6px] bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-600">
                {selectedNote.snippet}
              </span>
            ) : null}
          </div>
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
            placeholder="Untitled note"
            className="note-title-editor mt-2 w-full bg-transparent text-[26px] font-medium tracking-[-0.03em] text-ink-900 outline-none placeholder:text-ink-300"
          />
          {selectedNote.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-[6px] bg-paper-deep px-2 py-0.5 text-[11px] text-ink-600"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>
        <div className="note-detail-body py-6">
          <NoteBodyEditor
            noteId={selectedNote.id}
            value={selectedNote.body}
            onChange={(body) => updateNote(selectedNote.id, { body })}
          />
        </div>
      </div>
    </article>
  );
}
