import { AppShell } from '@/components/notes/AppShell';
import { NotesAppProvider } from '@/context/NotesAppContext';

export function HomePage() {
  return (
    <div className="h-full min-h-dvh">
      <NotesAppProvider>
        <AppShell />
      </NotesAppProvider>
    </div>
  );
}
