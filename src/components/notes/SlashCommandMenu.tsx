import {
  CalendarBlank,
  EnvelopeSimple,
  ListChecks,
  MagnifyingGlass,
  Sparkle,
} from '@phosphor-icons/react';

import { slashCommands, type SlashCommand } from '@/data/demo';

const commandIcons: Record<string, typeof Sparkle> = {
  summarize: Sparkle,
  'follow-up': EnvelopeSimple,
  tasks: ListChecks,
  recall: CalendarBlank,
  actions: MagnifyingGlass,
};

interface SlashCommandMenuProps {
  query: string;
  activeIndex: number;
  variant: 'light' | 'dark';
  onSelect: (command: SlashCommand) => void;
  onHover: (index: number) => void;
}

export function filterSlashCommands(query: string): SlashCommand[] {
  const q = query.toLowerCase();
  if (!q) return slashCommands;
  return slashCommands.filter(
    (cmd) =>
      cmd.command.includes(q) ||
      cmd.label.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q),
  );
}

export function SlashCommandMenu({
  query,
  activeIndex,
  variant,
  onSelect,
  onHover,
}: SlashCommandMenuProps) {
  const filtered = filterSlashCommands(query);
  const isDark = variant === 'dark';

  if (filtered.length === 0) {
    return (
      <div
        className={`slash-command-menu ${isDark ? 'slash-command-menu-dark' : ''}`}
        role="listbox"
      >
        <p className="slash-command-empty">
          No commands match &ldquo;/{query}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div
      className={`slash-command-menu ${isDark ? 'slash-command-menu-dark' : ''}`}
      role="listbox"
    >
      <p className="slash-command-heading">Commands</p>
      <ul className="slash-command-list">
        {filtered.map((cmd, index) => {
          const Icon = commandIcons[cmd.id] ?? Sparkle;
          const isActive = index === activeIndex;

          return (
            <li key={cmd.id}>
              <button
                type="button"
                role="option"
                aria-selected={isActive}
                className={`slash-command-item ${isActive ? 'slash-command-item-active' : ''}`}
                onMouseEnter={() => onHover(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(cmd)}
              >
                <span className="slash-command-icon">
                  <Icon size={15} weight="regular" />
                </span>
                <span className="slash-command-copy">
                  <span className="slash-command-label">
                    <span className="slash-command-name">/{cmd.command}</span>
                    {cmd.label}
                  </span>
                  <span className="slash-command-desc">{cmd.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
