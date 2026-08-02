# Dental Clinic WhatsApp Booking + Chatbot Automation

A realistic, high-performance demo dental clinic website ("Smile Care Dental Clinic" in Vijay Nagar, Indore) featuring an automated WhatsApp appointment booking flow, an intelligent Groq AI fallback chatbot with automated medical emergency flag detection, and a real-time clinic owner dashboard.

## 🌟 Surfaces Included

1. **Demo Clinic Website** (`/`): A warm, clinical, and reassuring landing page designed for prospective patients and live client demonstrations.
2. **Booking Widget** (`/book/smile-care-indore`): A responsive, multi-step booking funnel shareable directly or via WhatsApp link.
3. **Clinic Dashboard** (`/dashboard`): Live bookings feed with Supabase Realtime subscriptions, performance metrics, human follow-up flag queue, and clinic FAQ prompt manager (`/dashboard/settings`).

## 🎨 Visual System & Fonts
- **Background**: Warm Off-White (`#FAF9F6`)
- **Accent**: Confident Warm Teal (`#0D9488`)
- **Text**: Dark Charcoal (`#1C1917`)
- **Headings Font**: `Cabinet Grotesk` (Self-hosted woff2 font / CSS webfont setup)
- **Body Font**: `Switzer` (Self-hosted woff2 font / CSS webfont setup)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account or local Postgres database
- Groq API Key
- Meta WhatsApp Cloud API credentials

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and populate values:

```bash
cp .env.example .env.local
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 🧪 Testing

```bash
# Unit & Integration Tests (Vitest)
npm run test

# Test Coverage
npm run test:coverage

# End-to-End Tests (Playwright)
npm run test:e2e

# Load Test (k6)
npm run test:load

# Consolidated Metric Report Generation
npm run generate-report
```

## 📋 Database Schema

Execute SQL migrations located in `supabase/migrations/`:
1. `001_conversations.sql`
2. `002_bookings.sql`
3. `003_clinics.sql`
4. `004_human_followup_flags.sql`

## ⚡ Architecture & Fail-Safe Patterns
- **Pure State Machine**: `lib/booking/stateMachine.ts` manages WhatsApp step progression independently of HTTP infrastructure.
- **Medical Emergency Detection**: Automated keyword parser detects pain, swelling, bleeding, broken teeth, or emergency phrasing, flagging conversations to `human_followup_flags` for human callback.
- **AI Fallback**: Groq API (`llama-3.1-8b-instant`) answers FAQs based on clinic settings stored in Supabase.

## ⚠️ Known Limitations
- Meta WhatsApp Cloud API sandbox accounts require pre-registering recipient phone numbers before sending live test messages.
- Razorpay payment integration is scheduled for Phase 2 implementation.
