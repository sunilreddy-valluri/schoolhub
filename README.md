# SchoolHub

SchoolHub is a React + TypeScript school management dashboard foundation. The first shipped surface is the responsive login flow, built on shared design tokens and reusable UI primitives.

## Run locally

```bash
npm install
npm run dev
```

Build and lint checks:

```bash
npm run build
npm run lint
```

## Architecture

- `src/config/design-system.ts` is the single source of truth for brand colors, typography, spacing, radius, and shadows.
- `src/styles/globals.css` mirrors those tokens as CSS variables and contains the shared visual language.
- `src/components/ui` contains reusable `Button`, `Input`, `Label`, `Card`, `Badge`, `Divider`, and `Spinner` primitives.
- `src/components/layout` contains the reusable `AuthLayout` and `PageContainer` shells.
- `src/routes/AppRoutes.tsx` owns navigation for Login, Register, and Dashboard entry points.

Future pages should use the existing tokens and components instead of introducing page-specific colors, controls, or typography.

## Dependencies

- `react-router-dom` provides client-side routes for the auth and future dashboard flows.
- `lucide-react` provides accessible, consistent interface icons.
- `tailwindcss` and `@tailwindcss/vite` provide the project's Tailwind integration; the current foundation keeps the shared component styling in `globals.css` so tokens remain centralized.