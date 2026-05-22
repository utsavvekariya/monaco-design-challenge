import { Clock, PushPin } from '@phosphor-icons/react';

import type { Note } from '@/types/notes';

interface NoteCardProps {
  note: Note;
  selected?: boolean;
  onSelect: () => void;
}

function noteExcerpt(note: Note): string {
  const preview = note.preview.trim();
  if (preview) return preview;
  return note.body
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean) ?? '';
}

export function NoteCard({ note, selected, onSelect }: NoteCardProps) {
  const excerpt = noteExcerpt(note);

  return (
    <button
      type="button"
      className="note-card-tile h-full min-h-[148px]"
      data-selected={selected}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-[14px] font-medium leading-snug tracking-[-0.02em] text-ink-900">
          {note.title}
        </h3>
        {note.pinned ? (
          <PushPin size={14} className="shrink-0 text-brand-500" weight="fill" />
        ) : null}
      </div>
      {excerpt ? (
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-ink-500">
          {excerpt}
        </p>
      ) : null}
      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        <span className="inline-flex items-center gap-1 text-[11px] text-ink-400">
          <Clock size={11} aria-hidden />
          {note.updatedAt}
        </span>
        {note.snippet ? (
          <span className="rounded-[6px] bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600">
            {note.snippet}
          </span>
        ) : null}
      </div>
    </button>
  );
}
