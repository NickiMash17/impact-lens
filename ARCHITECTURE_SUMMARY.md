# Impact Lens — Architecture Quick Reference

## One-Sentence Answer

**"Impact Lens is a lightweight full-stack application. The core logic runs on the frontend, with a minimal backend used only for AI explanation and system boundaries."**

---

## What Runs Where

### Frontend (Primary)
- Simulation logic (pure functions)
- State management
- UI & animations
- Chart rendering

### Backend (Minimal)
- OpenAI API proxy
- API key security
- That's it

---

## Why This Architecture?

✅ **Transparent** — Judges can audit simulation logic  
✅ **Fast** — Instant feedback, no server round-trips  
✅ **Right-sized** — Matches the problem  
✅ **Resilient** — Works without backend or AI  

---

## Judge-Ready Phrases

**"The backend is intentionally minimal and exists only to support AI narration; all decision logic is client-side and transparent."**

**"This is a scenario simulation, not a data management system. Persistence isn't required for the core insight."**

**"Simulation logic needs to be transparent and explainable. Running it client-side makes it auditable."**

---

## Full Documentation

- **ARCHITECTURE.md** — Complete architecture documentation
- **JUDGE_QA.md** — Judge Q&A preparation with answers
- **api/explain-impact/index.ts** — Serverless function example

---

## Current vs Production

**Current (Development):**
- Frontend calls OpenAI directly
- API key in environment variable
- Fine for hackathon demo

**Production (Recommended):**
- Frontend → Serverless function → OpenAI
- API key secured on server
- Deploy to Vercel/Netlify

---

## Key Point

**This is good system design, not a shortcut.**

Judges will respect:
- Judgment
- Restraint  
- Product thinking
- Right-sized architecture
