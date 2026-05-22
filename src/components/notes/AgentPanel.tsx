import {
  CalendarPlus,
  Check,
  EnvelopeSimple,
  PaperPlaneTilt,
  X,
} from '@phosphor-icons/react';

import { agentEmailDraft, agentSteps } from '@/data/demo';
import { useNotesApp } from '@/context/NotesAppContext';

export function AgentPanel() {
  const { setView, closeAiPanel } = useNotesApp();

  return (
    <div className="absolute inset-4 z-30 flex overflow-hidden rounded-[20px] bg-card shadow-card md:inset-6 md:left-[28%]">
      <div className="flex w-full flex-col md:flex-row">
        <aside className="w-full border-b border-hairline-soft bg-paper-deep p-5 md:w-[280px] md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-brand-500">Agent mode</p>
              <h2 className="text-[17px] font-medium tracking-[-0.02em] text-ink-900">
                Follow-up workflow
              </h2>
            </div>
            <button
              type="button"
              className="rounded-[8px] p-1.5 text-ink-500 hover:bg-wash"
              onClick={() => {
                setView('chat');
                closeAiPanel();
              }}
            >
              <X size={18} />
            </button>
          </div>
          <p className="mb-4 text-[13px] leading-relaxed text-ink-600">
            Recall is drafting a follow-up from your networking note and linking it
            to your job search tracker.
          </p>
          <div className="space-y-0">
            {agentSteps.map((step) => (
              <div key={step.id} className="agent-step">
                <span
                  className="agent-step-dot"
                  data-status={step.status}
                />
                <div>
                  <p className="text-[13px] font-medium text-ink-800">{step.label}</p>
                  {step.detail ? (
                    <p className="text-[12px] text-ink-500">{step.detail}</p>
                  ) : null}
                </div>
                {step.status === 'done' ? (
                  <Check
                    size={16}
                    className="ml-auto text-good"
                    weight="bold"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="border-b border-hairline-soft px-6 py-4">
            <div className="flex items-center gap-2 text-ink-500">
              <EnvelopeSimple size={18} className="text-brand-500" />
              <span className="text-[13px] font-medium text-ink-800">
                {agentEmailDraft.title}
              </span>
            </div>
            {agentEmailDraft.meta?.map((line) => (
              <p key={line} className="mt-1 font-mono text-[11px] text-ink-500">
                {line}
              </p>
            ))}
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <pre className="whitespace-pre-wrap font-sans text-[14px] leading-[1.65] text-ink-700">
              {agentEmailDraft.content}
            </pre>
          </div>
          <footer className="flex flex-wrap gap-2 border-t border-hairline-soft px-6 py-4">
            <button type="button" className="btn-primary">
              <PaperPlaneTilt size={16} weight="bold" />
              Send with Mail
            </button>
            <button type="button" className="btn-secondary">
              Edit draft
            </button>
            <button type="button" className="btn-secondary">
              <CalendarPlus size={16} />
              Schedule reminder
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
