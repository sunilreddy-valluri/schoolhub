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

- `DESIGN_SYSTEM.md` is the project-wide visual and implementation contract.
- `src/styles/globals.css` contains the runtime CSS custom properties and shared visual language.
- `src/config/design-system.ts` provides the typed token catalog for TypeScript consumers and must stay synchronized with the CSS tokens.
- `src/components/ui` contains reusable `Button`, `Input`, `Label`, `Card`, `Badge`, `Divider`, and `Spinner` primitives.
- `src/components/layout` contains the reusable `AuthLayout` and `PageContainer` shells.
- `src/routes/AppRoutes.tsx` owns navigation for Login, Register, and Dashboard entry points.

Future pages should use the existing tokens and components instead of introducing page-specific colors, controls, or typography.

## Dependencies

- `react-router-dom` provides client-side routes for the auth and future dashboard flows.
- `lucide-react` provides accessible, consistent interface icons.
- `tailwindcss` and `@tailwindcss/vite` provide the project's Tailwind integration; the current foundation keeps the shared component styling in `globals.css` so tokens remain centralized.