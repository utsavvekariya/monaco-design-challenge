import { Placeholder } from '@tiptap/extension-placeholder';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';
import { Markdown } from 'tiptap-markdown';

const TaskListWithShortcut = TaskList.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => this.editor.commands.toggleTaskList(),
    };
  },
});

interface NoteBodyEditorProps {
  noteId: string;
  value: string;
  onChange: (body: string) => void;
}

function getMarkdown(editor: NonNullable<ReturnType<typeof useEditor>>) {
  return (
    editor.storage as unknown as { markdown: { getMarkdown(): string } }
  ).markdown.getMarkdown();
}

export function NoteBodyEditor({ noteId, value, onChange }: NoteBodyEditorProps) {
  const lastNoteId = useRef(noteId);
  const skipUpdate = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TaskListWithShortcut,
      TaskItem.configure({ nested: true }),
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: '-',
        transformPastedText: true,
      }),
      Placeholder.configure({
        placeholder:
          'Start writing — ⌘B bold, ⌘I italic, ⌘⇧7 bullet list, ⌘⇧8 task list',
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'note-tiptap-editor note-markdown',
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (skipUpdate.current) return;
      const markdown = getMarkdown(ed);
      onChange(markdown);
    },
  });

  useEffect(() => {
    if (!editor || noteId === lastNoteId.current) return;

    lastNoteId.current = noteId;
    skipUpdate.current = true;
    editor.commands.setContent(value);
    skipUpdate.current = false;
  }, [editor, noteId, value]);

  if (!editor) return null;

  return (
    <div className="note-body-editor-wrap">
      <EditorContent editor={editor} />
    </div>
  );
}
