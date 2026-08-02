# Project Spec: Dental Clinic WhatsApp Booking + Chatbot Automation

## 0. What We're Building

**Important framing: this is NOT a SaaS marketing site selling the product to clinic
owners.** This is a **demo dental clinic website** — a realistic, polished website for a
fictional clinic (e.g. "Smile Care Dental Clinic") — built specifically to be shown to
real clinic owners during sales calls/visits, as a live "here's what your patients would
see" demonstration. It doubles as the actual working proof-of-concept: the booking flow
and WhatsApp automation inside it are fully real and functional, not mocked, so it can also
serve as clinic #1's real site if they say yes.

The automation itself (WhatsApp booking + chatbot + dashboard) is the product being sold —
but what the clinic owner is shown, and what this spec describes, is a demo clinic's own
website, not a page pitching them a subscription.

Three user-facing surfaces:
- **Demo clinic website** — a normal-looking dental clinic site (home, services, about,
  contact/location) for the fictional demo clinic, with a "Book Appointment" CTA. This is
  what you show a prospective clinic owner and what patients would actually see/use.
- **Booking widget** — the booking flow itself, reached via the CTA above (also usable as
  a standalone link shareable over WhatsApp).
- **Clinic dashboard** — where the clinic owner watches bookings and enquiries come in
  live. This is the "wow, it's actually working" piece you show *them*, separate from what
  their patients see.

---

## 1. UI/UX Requirements

### 1.1 Visual direction
- **Theme: light only** for v1. Background: warm off-white (`#FAF9F6` or similar), not
  stark `#FFFFFF` — should feel calm and clinical-but-warm, appropriate for healthcare.
- **No default/cliché fonts.** Do not use Arial, Roboto, or plain Inter-everywhere. Use a
  distinctive font pairing that still stays highly readable:
  - **Display/headings font:** `Cabinet Grotesk` (free, via Fontshare) — a geometric sans
    with real character, works well at large hero sizes.
  - **Body font:** `Switzer` (free, via Fontshare) — clean, highly legible, pairs naturally
    with Cabinet Grotesk since both are from the same foundry family.
  - Self-host both (download `.woff2` files, serve from `/public/fonts/`) — do not load from
    a third-party CDN at runtime, for performance and reliability.
  - Alternative pairing if the above feels too geometric for a healthcare brand: `Fraunces`
    (serif, warm, elegant — great for a headline like "Never miss a booking again") paired
    with `Switzer` for body. Pick whichever the coding agent/designer feels renders best;
    document the final choice in `README.md`.
- **Color palette:** light background, one confident accent color (e.g. a warm teal or
  coral — avoid generic "medical blue" if possible, it's overused in this space), dark
  charcoal (not pure black) for text. Keep it to background / text / accent / accent-muted /
  success / error — five colors, defined as CSS variables / Tailwind theme tokens, used
  consistently everywhere. No ad-hoc hex codes scattered through components.

### 1.2 Demo clinic website (patient-facing — this is the main deliverable)
This reads like a real, polished dental clinic's own website — not a SaaS product page.
Use a fictional name ("Smile Care Dental Clinic" or similar), fictional but realistic
address/hours/services, in Indore (matches the market we're demoing to).

- **Hero section:** clinic name/tagline + short reassuring subheadline (e.g. "Painless,
  modern dental care in Vijay Nagar, Indore") + primary CTA ("Book Appointment"), with a
  **lightweight scroll-triggered entrance animation**:
  - On page load: headline and subheadline fade in + slide up slightly (staggered, ~80–120ms
    delay between words or lines), CTA button fades in last.
  - A subtle background element (soft gradient blob, or a warm abstract shape — nothing
    clinical/cold) can have gentle parallax or slow drift on mouse move / scroll — keep it
    subtle, not distracting, and it must respect `prefers-reduced-motion` (disable/skip
    animation entirely for users who have that OS setting on).
  - Implementation: use **Framer Motion**'s `whileInView` for scroll-triggered reveals on
    every section below the fold — same fade + translateY pattern, small stagger between
    child elements. Keep all animated properties limited to `opacity` and `transform`
    (never animate `width`, `height`, `top`, `left` — these cause layout thrashing).
  - Performance budget: total added JS for animation should stay light — Framer Motion is
    fine for this; do not reach for Three.js/WebGL/GSAP-with-plugins for a page like this.
- **Sections needed:** Hero → Services (Cleaning, Root Canal, Braces, Checkup — each with a
  real-looking price, matching the Groq system prompt data so the site and the chatbot never
  contradict each other) → Why Choose Us (hygiene, experience, technology — standard clinic
  trust signals) → Testimonials (a few realistic placeholder patient quotes) → Location/Hours
  (with a map embed) → Book Appointment CTA repeated → Footer with contact info.
- **Micro-interactions:** buttons should have a real hover/press state (slight scale or
  color shift + smooth transition, ~150–200ms ease), not just a default browser hover.
  Service cards should lift slightly on hover (small shadow + translateY).
- **Why this matters for the pitch:** this page has to look like a site a clinic would be
  proud to have as their own — since if a clinic says yes, this can become their actual
  site with their real name/details swapped in, not just a throwaway demo.

### 1.3 Booking widget (patient-facing)
- Simple, fast, mobile-first (most patients will open this from a WhatsApp-shared link on
  their phone). Steps: pick service → pick date → pick time → enter name/phone → confirm.
- Each step transition should animate (slide/fade between steps, not an abrupt jump cut).
- On successful booking: a clear success state (checkmark animation, confirmation text,
  "We've sent you a confirmation on WhatsApp").

### 1.4 Clinic dashboard
- **Live bookings feed** — new bookings should visually animate into the list in real time
  (via Supabase Realtime subscription) rather than requiring a page refresh. This is the
  single most important "wow" moment for a clinic owner watching a demo — it must work
  reliably and feel instant.
- **Stats cards** at the top: bookings today, bookings this week, enquiries handled by bot
  vs. handed off to human, average response time.
- **Human-follow-up queue** — a clearly separated list of medical-sounding messages that
  were flagged for the clinic to call back personally (from the `human_followup_flags`
  table), so nothing falls through the cracks.
- Settings page: clinic owner can edit their own FAQ info (hours, prices, services) which
  feeds directly into the Groq system prompt — no code change needed to update this per
  clinic.

---

## 2. Folder Structure (predefined — follow exactly, don't improvise a different layout)

```
dental-whatsapp-booking/
├── app/
│   ├── (clinic-site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Demo clinic homepage
│   │   └── components/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx      # Services + prices (matches Groq prompt data)
│   │       ├── WhyChooseUsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── LocationSection.tsx      # Hours + map embed
│   │       ├── CTASection.tsx
│   │       └── Footer.tsx
│   ├── book/
│   │   └── [clinicSlug]/
│   │       └── page.tsx                 # Booking widget, reached via CTA or shared link
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # Live bookings feed + stats
│   │   ├── settings/
│   │   │   └── page.tsx                 # Clinic FAQ/system prompt editor
│   │   └── components/
│   │       ├── LiveBookingsFeed.tsx
│   │       ├── BookingCard.tsx
│   │       ├── StatsCards.tsx
│   │       └── FollowUpQueue.tsx
│   ├── api/
│   │   ├── webhook/route.ts             # WhatsApp incoming messages (server-only)
│   │   ├── send-booking/route.ts        # Booking form submission (server-only)
│   │   ├── bookings/route.ts            # Dashboard read/write (server-only)
│   │   ├── clinics/[id]/route.ts        # Clinic settings CRUD
│   │   └── health/route.ts              # Health check for monitoring
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                              # Reusable primitives: Button, Card, Input, Modal
│   └── animations/
│       ├── ScrollReveal.tsx             # Wraps Framer Motion whileInView pattern
│       └── FadeIn.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # Browser client (anon key only)
│   │   └── server.ts                    # Server client (service role key, server-only)
│   ├── whatsapp/
│   │   ├── send.ts
│   │   └── types.ts
│   ├── groq/
│   │   └── client.ts
│   ├── booking/
│   │   └── stateMachine.ts              # Pure functions, fully unit-testable
│   └── utils/
│       └── validators.ts
├── types/
│   └── index.ts                         # Shared TypeScript types across app
├── tests/
│   ├── unit/
│   │   ├── stateMachine.test.ts
│   │   └── validators.test.ts
│   ├── integration/
│   │   ├── webhook.test.ts
│   │   └── send-booking.test.ts
│   ├── e2e/
│   │   └── booking-flow.spec.ts         # Playwright
│   └── performance/
│       ├── load-test.js                 # k6 script
│       └── lighthouse-ci.config.js
├── supabase/
│   └── migrations/
│       ├── 001_conversations.sql
│       ├── 002_bookings.sql
│       ├── 003_clinics.sql
│       └── 004_human_followup_flags.sql
├── public/
│   └── fonts/                           # Self-hosted .woff2 files
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

No stray files outside this structure. No component logic living directly inside
`app/api/*` beyond request parsing/response — real logic belongs in `lib/`, so it's
unit-testable independently of the HTTP layer.

---

## 3. Testing & Metrics Requirements

Every metric below must be **actually generated by running real tests**, not estimated
or hardcoded into a report.

### 3.1 Unit tests (Vitest)
- Cover all pure logic in `lib/booking/stateMachine.ts`, `lib/utils/validators.ts`, keyword
  detection for the medical-handoff check, and Groq prompt construction.
- Run with coverage enabled (`vitest --coverage`, using `v8` provider). Output: a coverage
  report (HTML + terminal summary) showing % statements/branches/functions/lines covered.
  Target: 90%+ on `lib/` (pure logic), lower is acceptable for UI components.

### 3.2 Integration tests (Vitest + mocked externals)
- Test `/api/webhook` and `/api/send-booking` end-to-end at the request/response level,
  with Supabase, Groq, and WhatsApp calls mocked (use `msw` or manual mocks) — verify
  correct behavior for: new conversation, mid-flow booking step, medical-keyword handoff,
  Groq-fallback-on-error path, malformed webhook payload (should not crash).

### 3.3 End-to-end tests (Playwright)
- Full booking flow through the actual UI: land on booking widget → pick service → pick
  date/time → submit → see confirmation state.
- Dashboard: verify a new booking (inserted directly into Supabase during the test) appears
  in the live feed without a manual refresh, within a defined time budget (e.g. under 2s).

### 3.4 Performance / load tests (k6)
Run against a deployed staging environment (not localhost, so numbers are meaningful) and
produce a real k6 summary report including:
- **API response time** for `/api/webhook` and `/api/send-booking`: p50, p95, p99, max.
- **Throughput**: requests/second sustained without errors.
- **Error rate** under load (target: <1% at expected peak load; define expected peak
  as e.g. 50 concurrent conversations, adjust based on real usage once live).
- Ramp profile: start at 1 virtual user, ramp to a defined peak over 30s, hold for 1 minute,
  ramp down — standard k6 load test shape, not just a single-request smoke test.

### 3.5 Frontend performance (Lighthouse CI)
- Run Lighthouse CI against the demo clinic homepage and the booking widget.
- Capture and report: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS
  (Cumulative Layout Shift), Total Blocking Time, and overall Performance score.
- Target: Performance score 90+, CLS under 0.1 (animations must not cause layout shift —
  this is why animated properties are restricted to opacity/transform in section 1.2).

### 3.6 Consolidated metrics report
- After running the full suite (unit + integration + e2e + load + lighthouse), produce
  **one consolidated `TEST_REPORT.md`** (generated, not hand-written) summarizing:
  - Test coverage % (from Vitest)
  - Pass/fail count across all suites
  - API latency table (p50/p95/p99/max per endpoint, from k6)
  - Throughput and error rate under load (from k6)
  - Core Web Vitals (from Lighthouse CI)
  - Groq call latency specifically (measure and log this separately, since it's the one
    external dependency most likely to vary)
  - WhatsApp send latency specifically (same reasoning)
- This file should be regenerated every time the test suite runs, not maintained by hand.

---

## 4. Non-Negotiable Build-Quality Instructions (for the coding agent)

**Read this section before writing any code, and re-read it before declaring anything done.**

1. **Every function must be fully implemented, end to end.** No function body that returns
   a hardcoded/mocked value "for now." No `// TODO: implement this later`. No `throw new
   Error("not implemented")`. If a feature in this spec is built, it must actually work
   when exercised for real — not just when a specific test calls it with specific inputs.
2. **Do not write code that passes tests without doing the real work.** A function that
   detects "is this a medical question" must actually check the message content — it
   cannot special-case the exact strings used in the test suite and fail on anything else.
   Tests are a check on real behavior, not a target to game.
3. **No placeholder/stub files.** If a file is listed in the folder structure in Section 2,
   it must exist and be complete — not an empty file, not a file with just an export
   statement and no implementation.
4. **Before declaring the build finished, do a full self-review pass:**
   - Re-open every file created and confirm there is no leftover TODO, placeholder, or
     commented-out "real" implementation next to a fake one.
   - Trace each user-facing flow from front to back manually (booking form submission →
     webhook receipt → Groq/state machine → WhatsApp send → Supabase write → dashboard
     realtime update) and confirm every step is wired to a real implementation, not a stub.
   - Run the full test suite (Section 3) and confirm it passes against real code, not
     against mocks that happen to match whatever the implementation currently does.
   - Confirm all environment variables referenced in code are documented in `.env.example`.
   - Confirm no API key or secret is referenced anywhere under `app/(marketing)`,
     `app/book`, `app/dashboard`, or `components/` (i.e. nothing server-only leaked into
     client-rendered code).
5. If something in this spec genuinely cannot be completed (e.g. an external API limitation
   discovered mid-build), it must be **explicitly flagged in `README.md` under a "Known
   Limitations" section** with the reason — never silently left half-done without a note.

---

## 5. Code Quality Standards

- **TypeScript strict mode** enabled (`"strict": true` in `tsconfig.json`). No `any` unless
  truly unavoidable (and commented why, if so).
- **ESLint** (Next.js recommended config + `@typescript-eslint`) and **Prettier**, both
  configured and passing with zero errors before considering any file "done."
- Small, single-responsibility functions. If a function does more than one clearly-named
  thing, split it.
- No magic strings/numbers scattered in code — constants belong in a dedicated `constants.ts`
  or config file (e.g. medical keyword list, booking step names, Groq model name).
- Consistent naming: `camelCase` for variables/functions, `PascalCase` for components/types,
  `kebab-case` for file names except React components (`PascalCase.tsx`).
- Proper error handling everywhere external calls happen (Groq, WhatsApp, Supabase) — try/
  catch with a sensible fallback (see Section 4's "fail safe" pattern already used in the
  webhook route), and log errors server-side (console.error is fine for MVP; a real logging
  service can be added later, note this as a future improvement in README, not skipped
  silently).
- Comments explain *why*, not *what* — code should be readable enough that a comment
  restating the line above it is unnecessary.

---

## 6. Tech Stack (final — do not substitute without a documented reason)

| Layer | Choice |
|---|---|
| Frontend framework | Next.js 14+ (App Router), TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (`whileInView` for scroll reveals, `AnimatePresence` for step transitions) |
| Fonts | Cabinet Grotesk (display) + Switzer (body) — self-hosted via `/public/fonts` |
| Backend | Next.js API routes (serverless, on Vercel) |
| Database | Supabase (Postgres + Realtime + Row Level Security) |
| AI (FAQ answering) | Groq API — `llama-3.1-8b-instant` model |
| Messaging | Meta WhatsApp Cloud API (direct, not a third-party BSP, for MVP stage) |
| Payments | Razorpay (added in Phase 2, once collecting real subscriptions) |
| Hosting | Vercel |
| Unit/integration testing | Vitest (+ `@vitest/coverage-v8`) |
| E2E testing | Playwright |
| Load/performance testing | k6 |
| Frontend performance auditing | Lighthouse CI |

---

## 7. Environment Variables (document in `.env.example`, never commit real values)

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GROQ_API_KEY=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
WHATSAPP_VERIFY_TOKEN=
```

---

## 8. Definition of Done

This project is considered complete only when:
- Every file in Section 2's folder structure exists and is fully implemented (Section 4).
- All test suites in Section 3 run and pass against real, non-mocked behavior where
  applicable, and `TEST_REPORT.md` has been freshly generated.
- Lighthouse score, coverage %, and load-test latency numbers are all real numbers pulled
  from an actual run — not placeholder text like "TBD" or invented figures.
- A clinic owner can, without any code changes, go from booking form submission → WhatsApp
  confirmation → dashboard live update, and a patient can ask a logistics question and get
  a real Groq-generated answer, and a medical-sounding message gets correctly handed off.