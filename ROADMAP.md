# DENTIST WEBSITE UPGRADE ROADMAP

> **Workflow:** We tackle ONE subpart at a time. Each subpart must pass its checklist before moving on.
> **Status Legend:** `[ ]` Not started | `[~]` In progress | `[x]` Complete | `[!]` Blocked

---

# AUDIT RESULTS (Phase 0.1 Complete)

## Current Tech Stack
| Technology | Version | Notes |
|------------|---------|-------|
| SvelteKit | 2.49.1 | Latest, using Svelte 5 runes |
| Svelte | 5.45.6 | Using `$props()`, `$state()`, `$derived()` |
| Tailwind CSS | 4.1.17 | Via `@tailwindcss/vite` plugin (no config file) |
| Tailwind Forms | 0.5.10 | Plugin for form styling |
| Tailwind Typography | 0.5.19 | Plugin for prose styling |
| TypeScript | 5.9.3 | Strict mode |
| Vitest + Playwright | Latest | Browser testing configured |

## Existing File Structure
```
src/
├── lib/
│   ├── components/       # Layout components
│   │   ├── Container.svelte    ✅ KEEP (enhance)
│   │   ├── Section.svelte      ✅ KEEP (enhance)
│   │   ├── PageShell.svelte    ✅ KEEP (enhance)
│   │   ├── PageHeader.svelte   ✅ KEEP (enhance)
│   │   ├── Navbar.svelte       ✅ KEEP (enhance significantly)
│   │   └── Footer.svelte       ✅ KEEP (enhance)
│   ├── ui/               # Primitive components
│   │   ├── Button.svelte       ✅ KEEP (extend variants)
│   │   ├── Card.svelte         ✅ KEEP (add hover effects)
│   │   ├── Badge.svelte        ✅ KEEP (add variants)
│   │   ├── cn.ts               ✅ KEEP
│   │   └── utils.ts            ⚠️  DUPLICATE of cn.ts - REMOVE
│   ├── content/
│   │   └── site.ts             ✅ KEEP (expand content)
│   └── index.ts
├── routes/
│   ├── +layout.svelte          ✅ KEEP (minimal, clean)
│   ├── +page.svelte            🔄 REPLACE (homepage redesign)
│   ├── layout.css              ✅ KEEP (extend with tokens)
│   ├── services/+page.svelte   🔄 REPLACE (redesign)
│   ├── pricing/+page.svelte    🔄 REPLACE (redesign)
│   ├── team/+page.svelte       🔄 REPLACE (redesign)
│   ├── reviews/+page.svelte    🔄 REPLACE (redesign)
│   ├── contact/+page.svelte    🔄 REPLACE (redesign)
│   └── book/+page.svelte       ✅ KEEP (form logic good, restyle)
```

## Component Quality Assessment

### ✅ STRENGTHS (Keep & Build On)
1. **Clean Svelte 5 patterns** — Proper use of `$props()`, `$state()`, `$derived()`
2. **Good component API design** — Button has variants, sizes, href/button modes
3. **Accessibility basics** — aria-labels, focus rings, keyboard handling in nav
4. **TypeScript throughout** — Props typed, no `any` except `children`
5. **Site config centralized** — `site.ts` makes content changes easy
6. **Mobile nav works** — Slide-out drawer with escape key, backdrop
7. **Form validation started** — Book page has basic client validation
8. **Svelte transitions used** — `fly`, `fade` already in use

### ⚠️ AREAS TO IMPROVE
1. **No custom Tailwind tokens** — Using default slate/sky/emerald, no custom palette
2. **Inconsistent component usage** — Some pages use Button, others inline `<a>` with same styles
3. **No hover animations on cards** — Cards have `hover:shadow-md` but no transform
4. **Duplicate utility functions** — `cn.ts` and `utils.ts` both export same function
5. **No scroll reveal animations** — Only hero has entry animations
6. **Limited section variants** — Only "surface" and "muted" tones
7. **No reduced-motion support** — Animations don't check `prefers-reduced-motion`
8. **Hardcoded focus ring color** — `focus:ring-sky-400` scattered, not tokenized

### 🔧 TECHNICAL DEBT
1. `utils.ts` exports `cx()`, `cn.ts` exports `cn()` — same function, consolidate
2. Some pages use inline button styles instead of `<Button>` component
3. Form inputs have inline Tailwind classes — should be componentized
4. No loading/disabled states on form submission
5. `PageShell` has hardcoded `bg-slate-50` — should use Section component

## Content Inventory
**Current fictional practice:**
- Name: "Pearl Dental Studio"
- Location: Istanbul, Turkey (Kadıköy)
- Currency: Turkish Lira (₺)
- Phone: +90 555 123 45 67

**Decision needed:** Keep Istanbul/Turkey setting or change to generic US/UK?
*Recommendation: Keep as-is for now, easy to change in `site.ts` later*

## Pages Status
| Page | Content | Design | Priority |
|------|---------|--------|----------|
| Homepage | ✅ Good structure | 🔄 Needs redesign | HIGH |
| Services | ✅ Good data | 🔄 Needs redesign | HIGH |
| Pricing | ❓ Not reviewed | 🔄 Needs redesign | MEDIUM |
| Team | ❓ Not reviewed | 🔄 Needs redesign | MEDIUM |
| Reviews | ❓ Not reviewed | 🔄 Needs redesign | MEDIUM |
| Contact | ✅ Good structure | 🔄 Needs styling | MEDIUM |
| Book | ✅ Form works | 🔄 Needs styling | HIGH |

## Recommendations Summary

### Phase 1 Priorities
1. **Add Tailwind theme tokens** via CSS `@theme` (Tailwind 4 way)
2. **Define color palette** — warm neutrals + primary accent
3. **Typography scale** — add display font for headlines
4. **Consolidate utilities** — remove `utils.ts`, keep `cn.ts`

### Component Enhancements
1. **Button** — Add `outline` variant, icon support, loading state
2. **Card** — Add hover lift animation, clickable variant
3. **Section** — Add more tone variants, size variants
4. **NEW: Input** — Componentize form inputs
5. **NEW: SectionHeader** — Reusable heading pattern

### Quick Wins
- [x] Delete `utils.ts` (duplicate) — Done in Phase 2.1
- [ ] Add `prefers-reduced-motion` check to existing animations
- [ ] Extract inline button styles to use `<Button>` component

---

## PHASE 0: PROJECT SETUP & AUDIT
*Estimated: 1 session*

### 0.1 Current State Audit
- [x] Review existing codebase structure
- [x] Identify what to keep vs. replace
- [x] Document current components
- [x] Note any technical debt

### 0.2 Asset Preparation
- [ ] Source placeholder images (Unsplash dental/medical)
- [ ] Choose and install fonts (Instrument Serif + Inter)
- [ ] Create fictional content document (practice name, address, team, etc.)

**Gate 0 Checklist:**
- [ ] Clear understanding of current state
- [ ] All placeholder assets ready
- [ ] Fictional content drafted

---

## PHASE 1: DESIGN FOUNDATIONS
*Estimated: 2-3 sessions*

### 1.1 Tailwind Configuration ✅
- [x] Extend color palette (warm neutrals, primary accent, semantic colors)
- [x] Configure typography scale (font families, sizes, weights)
- [x] Set up spacing scale
- [x] Define border radius tokens
- [x] Define shadow tokens
- [x] Define animation/easing tokens

**Gate 1.1 Checklist:**
- [x] `layout.css` updated with @theme tokens (Tailwind 4 CSS-first config)
- [x] Build passes with no errors
- [x] Type check passes
- [x] Dev server runs correctly

### 1.2 Base Styles & CSS Reset ✅
- [x] Update `layout.css` with CSS custom properties
- [x] Set base typography styles (body, headings)
- [x] Define focus state styles
- [x] Add reduced-motion media query support

**Gate 1.2 Checklist:**
- [x] Global styles apply correctly
- [x] Focus states visible on all interactive elements
- [x] Reduced motion respected

*Note: Completed as part of 1.1 — Tailwind 4 CSS-first approach combines tokens + base styles*

### 1.3 Core Layout Components ✅
- [x] Update `Container.svelte` with size variants (sm, md, lg, xl, full)
- [x] Update `Section.svelte` with tone + spacing variants
- [x] Update `PageShell.svelte` to use neutral tokens

**Gate 1.3 Checklist:**
- [x] Layout components render correctly
- [x] Responsive at all breakpoints (tested 375px mobile + 1280px desktop)
- [x] No horizontal scroll
- [x] Build passes
- [x] No console errors

---

## PHASE 2: CORE UI COMPONENTS
*Estimated: 3-4 sessions*

### 2.1 Button Component ✅
- [x] Primary variant
- [x] Secondary variant
- [x] Outline variant
- [x] Ghost variant
- [x] Size variants (sm, md, lg)
- [x] Loading state
- [x] Disabled state
- [x] Icon support (left/right)

**Gate 2.1 Checklist:**
- [x] All variants visually correct
- [x] Hover/focus/active states work
- [x] Keyboard accessible
- [x] Reduced motion respected

### 2.2 Card Component ✅
- [x] Base card with padding/shadow/radius
- [x] Hover lift effect
- [x] Clickable card variant (as link)

**Gate 2.2 Checklist:**
- [x] Cards render with correct styling
- [x] Hover animation smooth
- [x] Clickable variant accessible

### 2.3 Badge Component ✅
- [x] Default variant
- [x] Color variants (primary, success, warning)
- [x] Size variants

**Gate 2.3 Checklist:**
- [x] Badge displays correctly
- [x] Text remains legible

### 2.4 Form Components ✅
- [x] Text input with label
- [x] Textarea with label
- [x] Select dropdown
- [x] Checkbox
- [x] Radio buttons
- [x] Error states
- [x] Success states

**Gate 2.4 Checklist:**
- [x] All form elements styled consistently
- [x] Labels properly associated
- [x] Error messages accessible
- [x] Keyboard navigation works

### 2.5 Section Header Component ✅
- [x] Eyebrow text (optional)
- [x] Main heading
- [x] Subtitle/description (optional)
- [x] Alignment variants (left, center)

**Gate 2.5 Checklist:**
- [x] Headers render with correct hierarchy
- [x] Responsive text sizes

### 2.6 Feature List Component ✅
- [x] Checkmark icon list
- [x] Proper spacing
- [x] Optional icon customization

**Gate 2.6 Checklist:**
- [x] List renders correctly
- [x] Icons are decorative (aria-hidden)

---

## PHASE 3: NAVIGATION & FOOTER
*Estimated: 2 sessions*

### 3.1 Navigation Bar
- [ ] Desktop layout (logo, links, CTA)
- [ ] Mobile hamburger menu
- [ ] Mobile slide-out drawer
- [ ] Scroll behavior (transparent → solid)
- [ ] Skip-to-content link
- [ ] Active link states

**Gate 3.1 Checklist:**
- [ ] Nav works at all breakpoints
- [ ] Mobile menu keyboard accessible
- [ ] Scroll behavior smooth
- [ ] Skip link functional

### 3.2 Footer
- [ ] Multi-column layout
- [ ] Contact information
- [ ] Quick links
- [ ] Social icons
- [ ] Copyright bar
- [ ] Mobile stacking

**Gate 3.2 Checklist:**
- [ ] Footer renders correctly
- [ ] All links work
- [ ] Responsive layout correct

---

## PHASE 4: HOMEPAGE SECTIONS
*Estimated: 4-5 sessions*

### 4.1 Hero Section
- [ ] Layout (text + image split)
- [ ] Typography hierarchy
- [ ] Primary + secondary CTAs
- [ ] Trust badge/rating
- [ ] Decorative accents (optional)
- [ ] Responsive behavior
- [ ] Entry animation

**Gate 4.1 Checklist:**
- [ ] Hero renders above fold
- [ ] Image optimized
- [ ] CTAs prominent
- [ ] Animation respects reduced-motion

### 4.2 Trust Strip / Stats Bar
- [ ] Icon + stat layout
- [ ] Responsive (scroll on mobile, grid on desktop)
- [ ] 4-6 key metrics

**Gate 4.2 Checklist:**
- [ ] Stats display correctly
- [ ] Mobile scroll works

### 4.3 Services Preview Section
- [ ] Service cards grid
- [ ] Card content (icon, title, description, link)
- [ ] Responsive grid (1 → 2 → 3/4 columns)
- [ ] Scroll reveal animation

**Gate 4.3 Checklist:**
- [ ] Cards display correctly
- [ ] Grid responsive
- [ ] Links work

### 4.4 About/Why Us Section
- [ ] Two-column layout (image + content)
- [ ] Feature checklist
- [ ] Responsive stacking

**Gate 4.4 Checklist:**
- [ ] Section renders correctly
- [ ] Image loads efficiently

### 4.5 Testimonials Section
- [ ] Testimonial card design
- [ ] Carousel or grid layout
- [ ] Navigation controls (if carousel)
- [ ] Quote styling

**Gate 4.5 Checklist:**
- [ ] Testimonials display correctly
- [ ] Carousel accessible (if used)
- [ ] Pause on hover/focus

### 4.6 CTA Banner Section
- [ ] Full-width colored background
- [ ] Centered text + button
- [ ] Responsive padding

**Gate 4.6 Checklist:**
- [ ] High contrast text
- [ ] CTA prominent

### 4.7 Location Preview Section
- [ ] Map embed or static image
- [ ] Contact info display
- [ ] Hours display

**Gate 4.7 Checklist:**
- [ ] Map doesn't block page load
- [ ] Contact info clickable (tel:, mailto:)

### 4.8 Homepage Assembly
- [ ] Combine all sections in correct order
- [ ] Verify section spacing
- [ ] Test full page scroll
- [ ] Verify all animations

**Gate 4.8 Checklist:**
- [ ] Homepage complete end-to-end
- [ ] No layout issues
- [ ] Performance acceptable

---

## PHASE 5: SECONDARY PAGES
*Estimated: 3-4 sessions*

### 5.1 Services Page
- [ ] Page header with breadcrumb
- [ ] Services grid (expanded)
- [ ] Individual service sections or cards
- [ ] CTA banner

**Gate 5.1 Checklist:**
- [ ] All services listed
- [ ] Page complete and navigable

### 5.2 About/Team Page
- [ ] Practice story section
- [ ] Team member cards
- [ ] Office gallery (optional)
- [ ] CTA banner

**Gate 5.2 Checklist:**
- [ ] Team displays correctly
- [ ] Bios readable

### 5.3 Contact Page
- [ ] Contact form
- [ ] Contact info sidebar
- [ ] Map section
- [ ] Form validation
- [ ] Success/error states

**Gate 5.3 Checklist:**
- [ ] Form submits correctly
- [ ] Validation works
- [ ] Error messages helpful

### 5.4 Booking Page
- [ ] Booking integration or placeholder
- [ ] What to expect info
- [ ] Insurance info

**Gate 5.4 Checklist:**
- [ ] Booking flow clear
- [ ] Page complete

### 5.5 Pricing Page (if separate)
- [ ] Pricing table or cards
- [ ] Insurance info
- [ ] FAQ section

**Gate 5.5 Checklist:**
- [ ] Pricing clear and readable

### 5.6 Reviews Page (if separate)
- [ ] Extended testimonials
- [ ] Filter/sort (optional)

**Gate 5.6 Checklist:**
- [ ] Reviews display correctly

---

## PHASE 6: MOTION & INTERACTIONS
*Estimated: 2 sessions*

### 6.1 Scroll Reveal System
- [ ] Create reusable reveal action/component
- [ ] Implement fade-up pattern
- [ ] Add stagger support for lists
- [ ] Ensure reduced-motion support

**Gate 6.1 Checklist:**
- [ ] Scroll reveals work
- [ ] Reduced motion respected
- [ ] Performance smooth

### 6.2 Micro-interactions Polish
- [ ] Button hover/active refinements
- [ ] Card hover refinements
- [ ] Link hover effects
- [ ] Form focus animations

**Gate 6.2 Checklist:**
- [ ] All interactions feel polished
- [ ] No jarring effects

### 6.3 Page Transitions (Optional)
- [ ] Simple fade between pages
- [ ] Loading states if needed

**Gate 6.3 Checklist:**
- [ ] Transitions smooth
- [ ] No content flash

---

## PHASE 7: SEO & PERFORMANCE
*Estimated: 1-2 sessions*

### 7.1 SEO Implementation
- [ ] Meta titles per page
- [ ] Meta descriptions per page
- [ ] Open Graph tags
- [ ] JSON-LD structured data (LocalBusiness)
- [ ] Sitemap generation
- [ ] Robots.txt

**Gate 7.1 Checklist:**
- [ ] All pages have proper meta
- [ ] Structured data valid

### 7.2 Performance Optimization
- [ ] Image optimization (WebP, srcset)
- [ ] Font loading optimization
- [ ] Lazy loading images
- [ ] Bundle analysis
- [ ] Lighthouse audit

**Gate 7.2 Checklist:**
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No major issues in Lighthouse

---

## PHASE 8: ACCESSIBILITY & QA
*Estimated: 1-2 sessions*

### 8.1 Accessibility Audit
- [ ] Keyboard navigation test
- [ ] Screen reader test
- [ ] Color contrast verification
- [ ] Focus indicator check
- [ ] ARIA audit (remove unnecessary)
- [ ] Heading hierarchy check

**Gate 8.1 Checklist:**
- [ ] All WCAG AA issues resolved
- [ ] Keyboard fully navigable

### 8.2 Cross-Browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] iOS Safari
- [ ] Android Chrome

**Gate 8.2 Checklist:**
- [ ] No major issues in any browser

### 8.3 Responsive QA
- [ ] Test 320px → 1536px+
- [ ] Fix any layout breaks
- [ ] Verify touch targets

**Gate 8.3 Checklist:**
- [ ] Perfect at all breakpoints

---

## PHASE 9: FINAL POLISH
*Estimated: 1 session*

### 9.1 Content Review
- [ ] Replace all placeholder text
- [ ] Verify all links work
- [ ] Check spelling/grammar
- [ ] Update copyright year
- [ ] Verify contact info

### 9.2 Final Visual Polish
- [ ] Consistent spacing throughout
- [ ] No orphaned words
- [ ] Images properly cropped
- [ ] Loading states where needed

### 9.3 Pre-Launch Checklist
- [ ] Build passes
- [ ] No console errors
- [ ] Forms work end-to-end
- [ ] Analytics ready (if applicable)
- [ ] Favicon set

**Gate 9.3 Checklist:**
- [ ] Site ready for launch

---

## RECOMMENDED WORKFLOW

### Session Structure
Each working session, we:
1. **Pick ONE subpart** (e.g., "2.1 Button Component")
2. **Implement** the feature
3. **Verify** against the checklist
4. **Mark complete** in this roadmap
5. **Commit** the changes
6. **Move on** to next subpart

### Suggested Order
```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9
```

Within phases, follow the numbered order (1.1 → 1.2 → 1.3, etc.)

### Dependencies
- Phase 1 must complete before Phase 2 (need tokens for components)
- Phase 2 & 3 must complete before Phase 4 (need components for pages)
- Phase 4 before Phase 5 (homepage patterns reused)
- Phase 6 can partially overlap with Phase 4-5
- Phase 7-8 after all pages built
- Phase 9 is final

### Time Estimates
| Phase | Sessions | Complexity |
|-------|----------|------------|
| 0 | 1 | Low |
| 1 | 2-3 | Medium |
| 2 | 3-4 | Medium |
| 3 | 2 | Medium |
| 4 | 4-5 | High |
| 5 | 3-4 | Medium |
| 6 | 2 | Medium |
| 7 | 1-2 | Low |
| 8 | 1-2 | Medium |
| 9 | 1 | Low |
| **Total** | **~20-26** | |

---

## CURRENT STATUS

**Last Updated:** Dec 15, 2024
**Current Phase:** Phase 2 In Progress
**Current Subpart:** 2.6 Feature List ✅ — Phase 2 Complete! Ready for Phase 3
**Blockers:** None

---

## NOTES & DECISIONS LOG

*Document any decisions made during implementation here:*

- **Dec 14, 2024** - Phase 1.1: Used Tailwind 4 CSS-first configuration with `@theme` directive in `layout.css` instead of `tailwind.config.js`
- **Dec 14, 2024** - Phase 1.1: Chose oklch() color space for perceptual uniformity across the palette
- **Dec 14, 2024** - Phase 1.1: Added Google Fonts via @font-face (Instrument Serif for display, Inter for body) directly in CSS
- **Dec 14, 2024** - Phase 1.1: Included reduced-motion support and focus states in base layer
- **Dec 14, 2024** - Phase 1.3: Container now has size variants (sm/md/lg/xl/full) for flexible layouts
- **Dec 14, 2024** - Phase 1.3: Section has tone (surface/muted/primary/dark) + spacing (none/compact/default/spacious) variants
- **Dec 14, 2024** - Phase 1.3: Simplified PageShell to just handle page-level bg + fade transition
- **Dec 15, 2024** - Phase 2.1: Enhanced Button with outline variant, loading state, icon support; consolidated `utils.ts` into `cn.ts`
- **Dec 15, 2024** - Phase 2.2: Enhanced Card with hover lift effect, clickable variant (renders as `<a>`), padding variants, and primary tone; updated to neutral tokens
- **Dec 15, 2024** - Phase 2.3: Enhanced Badge with size variants (sm/md/lg), added primary/warning tones, updated to design tokens (sage for success)
- **Dec 15, 2024** - Phase 2.4: Created Input, Textarea, Select, Checkbox, Radio, FormMessage components with consistent API (label, error/hint, disabled states, aria-describedby)
- **Dec 15, 2024** - Phase 2.5: Created SectionHeader with eyebrow, title, subtitle, and alignment variants (left/center)
- **Dec 15, 2024** - Phase 2.6: Created FeatureList with icon variants (check/arrow/dot), size variants, and proper aria-hidden icons

