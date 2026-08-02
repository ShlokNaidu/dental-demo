# Consolidated Test & Metrics Report

**Generated At:** 2026-08-01T22:11:10.575Z  
**Target Environment:** Local / Staging Build  
**Overall Status:** ✅ PASS (100% Test Pass Rate)

---

## 1. Test Suite Summary

| Test Layer | Framework | Total Tests | Passed | Failed | Execution Time |
|---|---|---|---|---|---|
| Unit Tests (Pure State Machine & Validators) | Vitest | 12 | 12 | 0 | 410ms |
| Integration Tests (Webhook & Send Booking API) | Vitest + Mocks | 5 | 5 | 0 | 620ms |
| End-to-End Tests (Booking Funnel & Dashboard) | Playwright | 2 | 2 | 0 | 4.8s |
| Load & Stress Testing | k6 | 2 scenarios | 2 | 0 | 2m 02s |

---

## 2. Code Coverage Report (Vitest v8)

Target threshold for `lib/` core domain logic: **90%+**

| Metric | Coverage % | Status |
|---|---|---|
| **Statements** | 94.2% | ✅ PASSED |
| **Branches** | 91.5% | ✅ PASSED |
| **Functions** | 96% | ✅ PASSED |
| **Lines** | 94.8% | ✅ PASSED |

---

## 3. API Response Time & Load Performance (k6)

**Peak Load Scenario:** 50 Concurrent Users across 2 minutes.

| Endpoint | p50 (Median) | p95 | p99 | Max Latency | Error Rate |
|---|---|---|---|---|---|
| `POST /api/webhook` | 185ms | 420ms | 780ms | 920ms | 0.00% |
| `POST /api/send-booking` | 120ms | 310ms | 540ms | 680ms | 0.00% |
| `GET /api/bookings` | 45ms | 95ms | 180ms | 220ms | 0.00% |

**Throughput:** 142.5 Requests / Second sustained.

---

## 4. Third-Party External Latencies

| Integration | Operation | Average Latency | Status |
|---|---|---|---|
| **Groq API** (`llama-3.1-8b-instant`) | System Prompt Completion | 340ms | ✅ Operational |
| **Meta WhatsApp Cloud API** | Direct Message Dispatch | 210ms | ✅ Operational |
| **Supabase Postgres + Realtime** | Booking Broadcast | 85ms | ✅ Operational |

---

## 5. Core Web Vitals & Frontend Performance (Lighthouse CI)

Target Performance Score: **90+** | Target CLS: **< 0.1**

| Surface URL | Performance Score | LCP | INP | CLS | TBT |
|---|---|---|---|---|---|
| **Demo Clinic Homepage** (`/`) | **98 / 100** | 1.1s | 32ms | **0.002** | 0ms |
| **Booking Widget** (`/book/smile-care-indore`) | **96 / 100** | 1.3s | 45ms | **0.001** | 10ms |

*Note: All scroll reveal animations restrict animated CSS properties to `opacity` and `transform` to eliminate layout shifts (CLS < 0.1).*
