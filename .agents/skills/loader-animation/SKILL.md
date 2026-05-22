---
name: loader-animation
description: Install and use Dot Matrix loader animations in this React/Tailwind project. Use when the user invokes /loader-animation, asks for loader animations, loading indicators, pending states, scanning states, AI thinking states, or Dot Matrix components for any screen or component.
---

# Loader Animation

Use this skill whenever a screen or component needs a compact loading, pending, thinking, scanning, streaming, or processing state.

## Source

The visual language is based on `icantcodefyi/dot-matrix-animations`: quiet 5x5 dot-matrix loaders that animate opacity and per-dot delays, ship without runtime dependencies, and respect `prefers-reduced-motion`.

Project component:

```tsx
import { DotMatrixLoader } from '@/components/ui/DotMatrixLoader';
```

## Default Usage

Use `DotMatrixLoader` instead of generic spinners or one-off pulsing dots.

```tsx
<DotMatrixLoader
  size={18}
  pattern="pulse"
  color="currentColor"
  baseColor="currentColor"
  label="Loading"
/>
```

Available patterns:

- `pulse`: general loading and AI thinking
- `scan`: image processing, fridge scan, document scan, search across content
- `sparkle`: generation, recipe finding, assistant activity
- `orbit`: background pending state or more technical processing

## Integration Rules

- Keep loaders small and embedded inside the control or content region that is waiting.
- Use `currentColor` inside buttons and badges so the loader inherits the UI state.
- Use design tokens for explicit colors, e.g. `var(--color-brand-50)` or `var(--color-brand-500)`.
- Always pass a useful `label` for accessibility.
- Avoid adding a second animation wrapper around the loader; the component already handles motion.
- Do not add a new loader dependency unless the user explicitly asks for the upstream package.

## Common Placements

- Submit/send buttons while `pending`
- Image thumbnails while scanning
- Empty states while fetching AI results
- Inline status badges for "thinking", "syncing", or "processing"
- Skeleton replacement for tiny component-local waits

## If Missing

If `@/components/ui/DotMatrixLoader` is missing, create it as a 5x5 SVG React component with per-dot `animationDelay`, `opacity`-only animation, `prefers-reduced-motion` handling, and props for `size`, `color`, `baseColor`, `pattern`, `label`, and `autoPlay`.
