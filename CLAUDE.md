# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:5173
npm run build        # Build for production
npm run check        # Type-check with svelte-check
npm run lint         # Prettier + ESLint
npm run test         # Run all tests (uses Vitest with Playwright)
npm run test:unit    # Run tests in watch mode
```

## Architecture

This is a SvelteKit 2 dental clinic template using Svelte 5 with runes (`$props()`, `$state()`, etc.) and Tailwind CSS 4.

### Key directories

- `src/routes/` - SvelteKit file-based routing (pages: services, pricing, team, reviews, contact, book)
- `src/lib/components/` - Layout components (Navbar, Footer, Section, PageHeader, PageShell, Container)
- `src/lib/ui/` - Reusable UI primitives (Button, Badge, Card) plus `cn()` utility for class merging
- `src/lib/content/site.ts` - Central site configuration (name, contact info, hours, navigation)

### Testing

Two Vitest projects configured:
- **client**: Browser tests for `.svelte.spec.ts` files using Playwright
- **server**: Node tests for regular `.spec.ts` files

### Styling

Tailwind 4 via `@tailwindcss/vite` plugin. Styles use slate/sky/emerald palette. Global CSS in `src/routes/layout.css`.

---

# ✅ Operating Rules (Must Follow)

## 🎯 Mission
Build a production-ready website with minimal complexity, strong UX hierarchy, and predictable iteration. Prefer shipping a clean MVP over speculative features.

## 🧭 Workflow (No Skipping Phases)
- **Do not** jump ahead. Follow the agreed pipeline:
  1) Outcome lock → 2) Design rules → 3) Architecture/tokens → 4) Sections → 5) Assembly → 6) QA → 7) Polish → 8) Production
- **One section at a time.** Never redesign other sections while building a new one.
- **No scope creep.** New ideas go into a **V2 Parking Lot** at the end of your message.

## 🧱 Constraints > Creativity
Before generating code, restate the constraints you’re following in 3–6 bullets.
If a constraint conflicts with implementation, propose 2 options and label:
- ✅ Recommended
- ⚠️ Tradeoff

## 🛑 Gates (Definition of Done)
Do not declare a phase “done” unless these pass:

### Build Gate ✅
- Project builds successfully
- No runtime console errors
- Typecheck passes

### UI Gate ✅
- Mobile + desktop look correct
- Clear visual hierarchy (headline → support → CTA)
- No obvious layout shifts / awkward wrapping
- Focus states visible and keyboard navigation works

### Quality Gate ✅
- Lint passes
- Tests pass (if present)
- Accessibility basics pass (labels, headings, contrast, aria only where needed)

When finished, provide a short **Gate Checklist** with ✅/⚠️.

## 🧩 Architecture & Design Tokens (Lock Rules)
- Keep tokens **minimal**: only what’s needed.
- After tokens are locked, **do not introduce new tokens** unless absolutely necessary.
- Do not over-abstract. Prefer simple components over “frameworky” patterns.

## 🧑‍💻 Coding Standards
- TypeScript always (no `any` unless justified).
- Prefer small, readable components with clear props.
- Keep components **pure** (minimal side effects).
- Use semantic HTML first. Add ARIA only when necessary.
- Avoid heavy dependencies unless there is clear benefit.

## ♿ Accessibility Minimums (Non-Negotiable)
- Visible focus for interactive elements
- Buttons/links are real `<button>` / `<a>`
- Form inputs have labels
- Proper heading order (one H1 per page)
- Color contrast: don’t ship low-contrast text

## ⚡ Performance Rules
- Optimize images (use the framework’s image component if available)
- Avoid large client bundles
- No huge animations / expensive effects by default
- Don’t add libraries for simple needs

## 🧪 Testing & QA (Playwright)
If Playwright exists:
- Add/maintain tests for:
  - Navigation
  - Primary CTA click path
  - Responsive checks (mobile viewport)
  - No console errors
If tests fail, fix the app first — don’t “update snapshots” blindly.

## 🔐 Secrets & Config Safety
- Never hardcode secrets or API keys.
- Use `.env.example` for required variables.
- Don’t commit real `.env` files.
- Only modify build/config files when necessary and explain why.

## 🧾 Git Hygiene
- Make changes in small logical chunks.
- Prefer clear commits:
  - `feat: add hero section`
  - `fix: correct mobile spacing in pricing`
  - `test: add playwright CTA smoke test`

## 🗣️ Communication Format (Every Response)
Use this structure:
1) **What I’m doing**
2) **Files changed** (paths)
3) **Why this approach**
4) **How to verify** (commands / steps)
5) **V2 Parking Lot** (optional)

## 🆘 If You’re Unsure
- Don’t ask multiple questions. Ask **one** decisive question only if blocked.
- Otherwise, make the best assumption and state it clearly as:
  - **Assumption:** ...
  - **Risk:** ...
  - **Mitigation:** ...

## 🧯 Don’t Do These
- Don’t refactor unrelated code “while you’re here”
- Don’t change design direction unless explicitly asked
- Don’t introduce new libraries for minor problems
- Don’t implement multiple sections/pages at once

---
