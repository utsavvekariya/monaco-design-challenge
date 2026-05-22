import {
  Briefcase,
  GraduationCap,
  Heart,
  Note,
  Notebook,
  Sparkle,
  Star,
  UsersThree,
} from '@phosphor-icons/react';

import { APP_NAME, folders, smartSuggestions } from '@/data/demo';
import { useNotesApp } from '@/context/NotesAppContext';
import type { FolderId } from '@/types/notes';

const folderIcons: Record<string, typeof Note> = {
  note: Note,
  star: Star,
  briefcase: Briefcase,
  graduation: GraduationCap,
  heart: Heart,
  users: UsersThree,
};

function FolderIcon({ id }: { id: string }) {
  const Icon = folderIcons[id] ?? Note;
  return <Icon size={18} weight="regular" className="nav-icon shrink-0" />;
}

export function Sidebar() {
  const {
    selectedFolderId,
    setSelectedFolderId,
    setView,
    sendMessage,
    setSelectedNoteId,
  } = useNotesApp();

  const onFolder = (id: FolderId) => {
    setSelectedFolderId(id);
    setSelectedNoteId(null);
  };

  return (
    <aside className="notes-sidebar enter-stagger">
      <div className="flex items-center gap-2.5 px-2 py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-brand-500 text-brand-50 shadow-action">
          <Notebook size={18} weight="fill" />
        </div>
        <div>
          <p className="text-[15px] font-medium tracking-[-0.02em] text-ink-900">
            {APP_NAME}
          </p>
          <p className="text-[11px] text-ink-500">Premium · AI memory</p>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary mt-2 w-full justify-center"
        onClick={() => setSelectedNoteId('n1')}
      >
        <Note size={16} weight="bold" />
        New note
      </button>

      <div className="mt-4">
        <p className="px-2 pb-1 text-[11px] font-medium text-ink-500">
          Favorites
        </p>
        <FavoritesRow />
      </div>

      <div className="mt-2">
        <p className="px-2 pb-1 text-[11px] font-medium text-ink-500">Folders</p>
        <nav className="flex flex-col gap-0.5">
          {folders
            .filter((f) => f.id !== 'favorites')
            .map((folder) => (
              <button
                key={folder.id}
                type="button"
                className="nav-row w-full"
                data-active={selectedFolderId === folder.id}
                onClick={() => onFolder(folder.id)}
              >
                <FolderIcon id={folder.icon} />
                <span className="flex-1 text-left">{folder.label}</span>
                {folder.count != null ? (
                  <span className="tabular text-[11px] text-ink-400">
                    {folder.count}
                  </span>
                ) : null}
              </button>
            ))}
        </nav>
      </div>

      <div className="mt-auto rounded-[12px] bg-card p-3 shadow-panel">
        <div className="mb-2 flex items-center gap-1.5 text-brand-500">
          <Sparkle size={14} weight="fill" />
          <span className="text-[11px] font-medium text-ink-600">
            Try asking
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {smartSuggestions.slice(0, 2).map((s) => (
            <button
              key={s.id}
              type="button"
              className="rounded-[8px] px-2 py-1.5 text-left text-[12px] leading-snug text-ink-600 transition-colors hover:bg-wash"
              onClick={() => {
                setView('chat');
                sendMessage(s.prompt);
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function FavoritesRow() {
  const { selectedFolderId, setSelectedFolderId } = useNotesApp();
  const fav = folders.find((f) => f.id === 'favorites');
  if (!fav) return null;
  return (
    <button
      type="button"
      className="nav-row w-full"
      data-active={selectedFolderId === 'favorites'}
      onClick={() => setSelectedFolderId('favorites')}
    >
      <Star size={18} weight="regular" className="nav-icon" />
      <span className="flex-1 text-left">{fav.label}</span>
      <span className="tabular text-[11px] text-ink-400">{fav.count}</span>
    </button>
  );
}
