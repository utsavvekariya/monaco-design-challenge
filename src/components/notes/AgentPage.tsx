import {
  CalendarPlus,
  Check,
  EnvelopeSimple,
  PaperPlaneTilt,
} from '@phosphor-icons/react';

import { AIComposer } from '@/components/notes/AIComposer';
import { agentEmailDraft, agentSteps, APP_NAME } from '@/data/demo';
import { useNotesApp } from '@/context/NotesAppContext';

function AgentWorkflow() {
  return (
    <div className="agent-workflow surface-card shadow-card flex w-full max-w-[920px] flex-col overflow-hidden md:flex-row">
      <aside className="w-full border-b border-hairline-soft bg-paper-deep p-5 md:w-[260px] md:border-b-0 md:border-r">
        <div className="mb-4">
          <p className="text-[11px] font-medium text-brand-500">Agent mode</p>
          <h2 className="text-[17px] font-medium tracking-[-0.02em] text-ink-900">
            Follow-up workflow
          </h2>
        </div>
        <p className="mb-4 text-[13px] leading-relaxed text-ink-600">
          {APP_NAME} is drafting a follow-up from your networking note and linking it
          to your job search tracker.
        </p>
        <div className="space-y-0">
          {agentSteps.map((step) => (
            <div key={step.id} className="agent-step">
              <span className="agent-step-dot" data-status={step.status} />
              <div>
                <p className="text-[13px] font-medium text-ink-800">{step.label}</p>
                {step.detail ? (
                  <p className="text-[12px] text-ink-500">{step.detail}</p>
                ) : null}
              </div>
              {step.status === 'done' ? (
                <Check size={16} className="ml-auto text-good" weight="bold" />
              ) : null}
            </div>
          ))}
        </div>
      </aside>

      <div className="flex min-h-[280px] flex-1 flex-col overflow-hidden">
        <header className="border-b border-hairline-soft px-5 py-4 md:px-6">
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
        <div className="flex-1 overflow-y-auto px-5 py-4 md:px-6 md:py-5">
          <pre className="whitespace-pre-wrap font-sans text-[14px] leading-[1.65] text-ink-700">
            {agentEmailDraft.content}
          </pre>
        </div>
        <footer className="flex flex-wrap gap-2 border-t border-hairline-soft px-5 py-4 md:px-6">
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
  );
}

export function AgentPage() {
  const { agentWorkflowActive } = useNotesApp();

  return (
    <div className="agent-page flex min-h-0 flex-1 flex-col overflow-hidden">
      <div
        className={`flex min-h-0 flex-1 flex-col px-5 ${
          agentWorkflowActive
            ? 'justify-end gap-6 py-6 md:justify-center md:gap-8 md:py-8'
            : 'items-center justify-center py-10'
        }`}
      >
        {agentWorkflowActive ? (
          <div className="flex w-full justify-center overflow-y-auto">
            <AgentWorkflow />
          </div>
        ) : (
          <div className="agent-page-intro mb-8 max-w-[480px] text-center">
            <p className="text-[11px] font-medium text-brand-500">Agent</p>
            <h1 className="mt-1 text-[28px] font-medium tracking-[-0.03em] text-ink-900 md:text-[32px]">
              What should {APP_NAME} do?
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
              Run multi-step workflows across your notes — draft emails, schedule
              reminders, and send when you are ready.
            </p>
          </div>
        )}

        <AIComposer centered />
      </div>
    </div>
  );
}
