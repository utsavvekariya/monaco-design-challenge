import { useEffect, useRef } from 'react';
import { Clock, PushPin, Tag } from '@phosphor-icons/react';

import { useNotesApp } from '@/context/NotesAppContext';

function NoteBodyEditor({
  noteId,
  value,
  onChange,
}: {
  noteId: string;
  value: string;
  onChange: (body: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [noteId, value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start writing…"
      rows={1}
      className="note-body-editor w-full resize-none bg-transparent text-[15px] leading-[1.65] tracking-[-0.01em] text-ink-700 outline-none placeholder:text-ink-400"
    />
  );
}

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
    <article className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="border-b border-hairline-soft px-8 py-5">
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
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-[640px]">
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
