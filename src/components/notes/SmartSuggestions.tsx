import {
  Calendar,
  EnvelopeSimple,
  ListChecks,
  Sparkle,
} from '@phosphor-icons/react';

import { smartSuggestions } from '@/data/demo';
import { useNotesApp } from '@/context/NotesAppContext';

const icons = {
  sparkle: Sparkle,
  calendar: Calendar,
  list: ListChecks,
  envelope: EnvelopeSimple,
};

export function SmartSuggestions() {
  const { sendMessage } = useNotesApp();

  return (
    <section className="border-b border-hairline-soft bg-paper px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-ink-800">Suggested for you</p>
          <p className="text-[12px] text-ink-500">
            Based on recent notes and open loops
          </p>
        </div>
        <span className="rounded-[6px] bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600">
          AI
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {smartSuggestions.map((s) => {
          const Icon = icons[s.icon];
          return (
            <button
              key={s.id}
              type="button"
              className="suggestion-chip max-w-[220px] shrink-0 flex-col !items-start !gap-1 !rounded-[12px] !py-3 !whitespace-normal"
              onClick={() => sendMessage(s.prompt)}
            >
              <span className="flex items-center gap-1.5 text-brand-500">
                <Icon size={14} weight="fill" />
                <span className="text-[12px] font-medium text-ink-800">
                  {s.title}
                </span>
              </span>
              <span className="text-left text-[11px] font-normal leading-snug text-ink-500">
                {s.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
