import {
  Briefcase,
  CaretDoubleLeft,
  GraduationCap,
  Heart,
  Note,
  Notebook,
  SidebarSimple,
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
    selectNote,
    sidebarCollapsed,
    toggleSidebar,
  } = useNotesApp();

  const onFolder = (id: FolderId) => {
    setSelectedFolderId(id);
    setSelectedNoteId(null);
  };

  return (
    <aside
      className="notes-sidebar enter-stagger"
      data-collapsed={sidebarCollapsed}
      aria-expanded={!sidebarCollapsed}
    >
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-brand-500 text-brand-50 shadow-action">
            <Notebook size={18} weight="fill" />
          </div>
          <div className="sidebar-brand-text min-w-0">
            <p className="truncate text-[15px] font-medium tracking-[-0.02em] text-ink-900">
              {APP_NAME}
            </p>
            <p className="truncate text-[11px] text-ink-500">Premium · AI memory</p>
          </div>
        </div>
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <SidebarSimple size={16} weight="regular" />
          ) : (
            <CaretDoubleLeft size={16} weight="regular" />
          )}
        </button>
      </div>

      <button
        type="button"
        className="btn-primary sidebar-new-note"
        onClick={() => selectNote('n1')}
        title="New note"
      >
        <Note size={16} weight="bold" />
        <span className="sidebar-expand-only">New note</span>
      </button>

      <div className="mt-1">
        <p className="sidebar-section-title px-2 pb-1 text-[11px] font-medium text-ink-500">
          Favorites
        </p>
        <FavoritesRow />
      </div>

      <div className="mt-1">
        <p className="sidebar-section-title px-2 pb-1 text-[11px] font-medium text-ink-500">
          Folders
        </p>
        <nav className="flex flex-col gap-0.5">
          {folders
            .filter((f) => f.id !== 'favorites')
            .map((folder) => (
              <button
                key={folder.id}
                type="button"
                className="nav-row w-full"
                data-active={selectedFolderId === folder.id}
                title={folder.label}
                onClick={() => onFolder(folder.id)}
              >
                <FolderIcon id={folder.icon} />
                <span className="sidebar-expand-only flex-1 truncate text-left">
                  {folder.label}
                </span>
                {folder.count != null ? (
                  <span className="sidebar-expand-only tabular text-[11px] text-ink-400">
                    {folder.count}
                  </span>
                ) : null}
              </button>
            ))}
        </nav>
      </div>

      <div className="sidebar-suggestions mt-auto rounded-[12px] bg-card p-3 shadow-panel">
        <div className="mb-2 flex items-center gap-1.5 text-brand-500">
          <Sparkle size={14} weight="fill" />
          <span className="text-[11px] font-medium text-ink-600">Try asking</span>
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
      title={fav.label}
      onClick={() => setSelectedFolderId('favorites')}
    >
      <Star size={18} weight="regular" className="nav-icon" />
      <span className="sidebar-expand-only flex-1 text-left">{fav.label}</span>
      <span className="sidebar-expand-only tabular text-[11px] text-ink-400">
        {fav.count}
      </span>
    </button>
  );
}
