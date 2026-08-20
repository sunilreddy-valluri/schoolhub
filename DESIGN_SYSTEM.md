# SchoolHub Design System

## Purpose

This document is the visual and implementation contract for SchoolHub. Read it before building or modifying any UI. Login and Register are the reference surfaces for the system: modern, clean, professional, trustworthy, and education-focused without feeling like a traditional school website.

SchoolHub should feel like a calm, premium SaaS product. Avoid cartoonish visuals, neon colors, heavy shadows, excessive gradients, glassmorphism, decorative clutter, and excessive pill-shaped controls.

## Source Of Truth

The runtime design tokens live in `src/styles/globals.css` as CSS custom properties. The typed token catalog in `src/config/design-system.ts` contains the same semantic values for TypeScript consumers. Keep both synchronized when a token is intentionally changed; do not introduce page-level values that bypass them.

Tailwind CSS v4 is enabled through `@tailwindcss/vite`. There is no separate `tailwind.config.js`; existing components use the shared CSS token layer directly. Prefer existing Tailwind utilities when they map cleanly to the tokens, and use the shared component classes for UI primitives.

## Brand

- Product: SchoolHub
- Personality: modern, clean, professional, trustworthy, simple, premium, education-focused, friendly but not childish
- Primary typeface: `Inter`, with `system-ui, sans-serif` fallback
- Icon library: Lucide React only

Do not add another font or icon library for an individual feature.

## Colors

These are the colors currently used by the application. Reuse semantic tokens rather than copying hex values into components.

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#2563EB` | Primary actions, links, info |
| `--color-primary-hover` | `#1D4ED8` | Primary hover state |
| `--color-primary-light` | `#EFF6FF` | Light brand surfaces |
| `--color-secondary` | `#0F172A` | Dark brand panel |
| `--color-background` | `#F8FAFC` | App and page background |
| `--color-surface` | `#FFFFFF` | Cards, inputs, content surfaces |
| `--color-text-primary` | `#0F172A` | Headings and primary text |
| `--color-text-secondary` | `#475569` | Supporting copy |
| `--color-text-muted` | `#64748B` | Metadata and quiet text |
| `--color-border` | `#E2E8F0` | Default borders and dividers |
| `--color-border-hover` | `#CBD5E1` | Input hover border |
| `--color-success` | `#16A34A` | Success states |
| `--color-warning` | `#F59E0B` | Warning states |
| `--color-error` | `#DC2626` | Validation and destructive states |
| `--color-info` | `#2563EB` | Informational states |

Supporting semantic tokens are also available for the existing dark brand panel, placeholders, badge surfaces, hover states, and focus rings. If a new color is genuinely required, add a named semantic token in both token files and document it here before using it.

## Typography

Use Inter everywhere. Do not introduce page-specific typography.

| Role | Size | Weight | Guidance |
| --- | --- | --- | --- |
| Display / hero | `36px` to `56px` | `700` | Auth brand headline; responsive with `clamp` |
| Page heading | `28px` to `32px` | `700` | Main page title |
| Section heading | `20px` to `24px` | `600` | Section or major group heading |
| Card heading | `18px` to `28px` | `600` to `700` | Auth card heading currently uses `28px` |
| Body | `14px` to `16px` | `400` to `500` | Supporting and operational content |
| Small text | `12px` to `14px` | `400` | Metadata, errors, helper copy |
| Buttons | `14px` | `500` to `600` | Shared `Button` component |

Headings use tight negative tracking where already established in the auth surfaces. Do not scale type with arbitrary viewport formulas outside the existing responsive pattern.

## Spacing

Use the 4px/8px rhythm already represented in the token catalog. Preferred values are:

`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`

Existing auth measurements include 48px input/button height, 40px desktop card padding, 28px/22px mobile card padding, 24px form gaps on Login, 18px form gaps on Register, and 8px field gaps. Reuse these values or the nearest shared component style instead of inventing arbitrary spacing.

## Radius

| Token | Value | Use |
| --- | --- | --- |
| Small | `6px` | Icon controls, status badges |
| Default | `8px` | Inputs and buttons |
| Medium | `12px` | Standard content surfaces |
| Large | `16px` | Auth cards and prominent containers |

Cards generally use the existing `16px` auth-card radius. New dashboard/content cards should normally use `12px` unless they are a large container. Pills are reserved for statuses, tags, and compact filters.

## Shadows And Depth

Use light depth only:

- Card shadow: `0 12px 32px rgba(15, 23, 42, 0.06)`
- Focus shadow: `0 0 0 3px rgba(37, 99, 235, 0.16)`

Surface color and border should carry most of the hierarchy. Do not use large dark shadows, floating effects, or heavy blur.

## Buttons

Always use `src/components/ui/Button.tsx`.

- **Primary:** blue background, white text, `8px` radius, visible hover/focus, and a muted disabled state.
- **Secondary:** white surface, border, and primary/text color.
- **Ghost:** transparent with primary text; use only where a low-emphasis action is appropriate.
- **Danger:** error background for destructive actions only; never use for ordinary navigation or form submission.

Buttons are at least `48px` high in the current auth system, are keyboard accessible, and should remain touch-friendly. Do not create page-specific button classes.

## Inputs And Forms

Always use `Input` and `Label` from `src/components/ui`.

Inputs use a consistent `48px` height, `14px` horizontal padding, `8px` radius, surface background, border token, placeholder token, visible primary focus state, error border/focus state, and disabled state. Labels are associated with controls using `htmlFor` and required fields use the shared asterisk treatment.

Validation messages must be inline, understandable, and associated with the invalid control through `aria-describedby`. Never use `alert()` for validation. Password visibility controls use Lucide `Eye` / `EyeOff` icons and an accessible label.

## Cards And Shared Components

Use the existing components before creating a new primitive:

```text
src/components/ui/
  Button.tsx
  Input.tsx
  Label.tsx
  Card.tsx
  Badge.tsx
  Divider.tsx
  Spinner.tsx

src/components/layout/
  AuthLayout.tsx
  PageContainer.tsx
```

Cards use surface background, border, `12px` to `16px` radius, and the subtle card shadow only when elevation is useful. Do not nest decorative cards inside other cards.

## Layout And Responsive Behavior

The current auth layout is the reference layout:

- Desktop: two columns using `minmax(320px, 0.9fr) minmax(460px, 1.1fr)`.
- Auth brand panel: dark navy surface with restrained blue tint, flexible content spacing, and 48px desktop padding.
- Auth content: light background with a subtle 56px grid treatment and centered form card.
- Tablet/mobile breakpoint: `820px`; the brand panel collapses to its logo row and the form becomes the primary content.
- Small mobile breakpoint: `480px`; horizontal padding and card padding reduce while controls remain full width.

Future dashboard pages should use the same principle: desktop sidebar plus main content, and mobile header plus main content. Define shared `Sidebar` and `Header` components when that feature is introduced rather than creating page-specific navigation. Content must not overflow horizontally; cards and tables should stack or provide an intentional responsive treatment.

## Icons

Use Lucide React consistently:

- Small: `16px`
- Default: `18px` to `20px`
- Large: `24px`

Icons should clarify an action or state, not fill empty space. Icon-only controls need an accessible label or tooltip.

## Accessibility And Motion

Use semantic HTML, associated labels, keyboard navigation, visible focus states, adequate contrast, meaningful button names, and accessible error messaging. Keep transitions subtle and fast. Motion should clarify state changes or interaction feedback; do not animate every element or add long page transitions. No animation library is currently installed.

## Rules for Developers

1. Never introduce a new font without approval.
2. Never introduce random colors or hardcoded page-level color literals.
3. Never create duplicate Button, Input, or Card components unnecessarily.
4. Always inspect existing components before creating new ones.
5. Always read `DESIGN_SYSTEM.md` before starting UI work.
6. Reuse existing design tokens and shared component classes.
7. Keep responsive behavior consistent with the established breakpoints.
8. Keep accessibility in mind from the first markup pass.
9. Do not redesign existing pages while implementing unrelated features.
10. Keep the SchoolHub visual language consistent across the entire application.

## AI Agent Instruction

Every future development prompt should include:

> Before implementing the feature, read `DESIGN_SYSTEM.md` and inspect existing shared components. Follow the SchoolHub design system exactly. Reuse existing components and tokens. Do not introduce new fonts, colors, spacing systems, button styles, or visual patterns.

## Verification Checklist

Before shipping UI work:

- Run `npm run lint` and `npm run build`.
- Check Login and Register after shared changes.
- Check desktop, tablet, and mobile widths.
- Check keyboard focus and inline error states.
- Confirm colors and spacing come from shared tokens.
- Confirm no duplicate UI primitive or visual system was introduced.
- Confirm no unnecessary dependency was added.
