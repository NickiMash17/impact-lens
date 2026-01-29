# Impact Lens — Judge Q&A Preparation

## Architecture Questions

### Q: "Is this full-stack?"

**A:** "Yes. Impact Lens is a lightweight full-stack application. The core simulation logic runs on the frontend for transparency and immediate feedback. The backend is intentionally minimal—it exists only to securely handle AI explanation generation. This architecture matches the product's needs: transparent simulation, fast feedback, and secure API handling."

**Key points:**
- ✅ Full-stack (frontend + backend)
- ✅ Intentionally lightweight
- ✅ Architecture matches problem
- ✅ Transparent and explainable

---

### Q: "Why no database?"

**A:** "This is a scenario simulation tool, not a data management system. Persistence isn't required for the core insight—users explore trade-offs in real-time. The simulation is deterministic and stateless. If we needed to add persistence later, we could, but it's not necessary for the core value proposition."

**Key points:**
- ✅ Right-sized for the problem
- ✅ No unnecessary complexity
- ✅ Could add persistence if needed
- ✅ Focused on core value

---

### Q: "Why frontend simulation?"

**A:** "Simulation logic needs to be transparent and explainable. Running it client-side makes it auditable—judges can see exactly how metrics are calculated. It also provides instant feedback—no server round-trips for core logic. The simulation is pure functions, deterministic, and easy to understand."

**Key points:**
- ✅ Transparent (judges can audit)
- ✅ Instant feedback
- ✅ Pure functions
- ✅ Deterministic

---

### Q: "What does the backend do?"

**A:** "The backend is intentionally minimal. It exists solely to securely call the OpenAI API for generating explanations. All decision logic, simulation, and visualization happens client-side. The backend is a thin layer for API key security and prompt management."

**Key points:**
- ✅ Minimal and focused
- ✅ Secure API handling
- ✅ No business logic
- ✅ Clean separation

---

### Q: "Can it work without the backend?"

**A:** "Yes. The app functions perfectly without the backend. If the AI service is unavailable, we use deterministic fallback insights. The core simulation never depends on external services—it's pure functions. The backend is purely for enhanced explanation generation."

**Key points:**
- ✅ Resilient design
- ✅ Fallbacks at every layer
- ✅ Core logic independent
- ✅ Enhanced feature, not required

---

## Product Questions

### Q: "What makes this different from other decision tools?"

**A:** "Impact Lens focuses on making trade-offs visible and immediate. Unlike tools that optimize for one KPI or show everything improving, we show the honest reality: some metrics improve while others degrade. This reflects real-world complexity. We also surface trade-off signals—the system admits when it's under stress or when short-term pain is required for long-term gain."

**Key points:**
- ✅ Honest about trade-offs
- ✅ Visible tensions
- ✅ Admits discomfort
- ✅ Real-world complexity

---

### Q: "How does the AI work?"

**A:** "AI is used only as a supporting narrator—it explains what changed and why, translating numeric changes into plain language. It does not make decisions or recommendations. The AI uses uncertain language—'suggests,' 'appears,' 'may'—because this is a simulation, not a prediction. The app functions perfectly with deterministic fallback insights if AI is unavailable."

**Key points:**
- ✅ Supporting narrator, not decision-maker
- ✅ Uncertain language
- ✅ Explains, doesn't decide
- ✅ Fallback available

---

### Q: "Is this accurate?"

**A:** "This is a simulation model, not a prediction. We're transparent about this—values are modeled approximations designed to illustrate trade-offs and systemic relationships. The goal is insight, not certainty. We use uncertain language throughout, and our disclaimer makes this clear."

**Key points:**
- ✅ Simulation, not prediction
- ✅ Transparent boundaries
- ✅ Models relationships
- ✅ Goal is insight

---

### Q: "Who would use this?"

**A:** "Policy makers, strategy teams, executives, and educators who need to understand the full consequences of complex decisions before committing. It's particularly valuable for stakeholder communication—explaining why certain trade-offs were chosen. The comparison mode allows side-by-side scenario analysis, which is useful for presentations and briefings."

**Key points:**
- ✅ Policy makers
- ✅ Strategy teams
- ✅ Stakeholder communication
- ✅ Educational use

---

## Technical Questions

### Q: "What's the technical architecture?"

**A:** "Lightweight full-stack application. Frontend handles all simulation logic—pure TypeScript functions that are deterministic and explainable. Backend is a serverless function that securely handles OpenAI API calls. No databases, no auth, no unnecessary complexity. The architecture matches the product's needs."

**Key points:**
- ✅ Lightweight full-stack
- ✅ Pure functions
- ✅ Serverless backend
- ✅ Right-sized complexity

---

### Q: "How scalable is this?"

**A:** "The frontend is static assets served via CDN—scales automatically. The backend is serverless functions—scales automatically with usage. The simulation is stateless pure functions—scales infinitely. We could add persistence or user accounts if needed, but they're not required for the core value proposition."

**Key points:**
- ✅ CDN for frontend
- ✅ Serverless scales automatically
- ✅ Stateless simulation
- ✅ Can add features if needed

---

### Q: "What about security?"

**A:** "In production, API keys are stored securely in serverless function environment variables—never exposed to the client. The frontend simulation is pure functions with no sensitive data. We use CORS appropriately and could add rate limiting if needed. The architecture prioritizes security where it matters—API key protection."

**Key points:**
- ✅ API keys secured
- ✅ No sensitive data in frontend
- ✅ CORS configured
- ✅ Security where it matters

---

## One-Sentence Answers (Quick Reference)

**Architecture:** "Lightweight full-stack application with client-side simulation for transparency and serverless backend for secure AI integration."

**Why no database:** "This is a scenario simulation, not a data management system. Persistence isn't required for the core insight."

**Why frontend simulation:** "Simulation logic needs to be transparent and explainable. Running it client-side makes it auditable and provides instant feedback."

**What backend does:** "The backend exists solely to securely call the OpenAI API for generating explanations. All decision logic is client-side."

**Can it work without backend:** "Yes. The app functions perfectly without the backend. We use deterministic fallback insights if AI is unavailable."

**What makes it different:** "Impact Lens makes trade-offs visible and immediate. Unlike tools that optimize one metric, we show the honest reality: some metrics improve while others degrade."

**How AI works:** "AI is used only as a supporting narrator—it explains what changed and why, using uncertain language. It does not make decisions."

**Is it accurate:** "This is a simulation model, not a prediction. Values are modeled approximations designed to illustrate trade-offs. The goal is insight, not certainty."

---

## Practice Tips

1. **Use the exact phrases** — They're tested and defensible
2. **Stay calm** — Confidence, not hype
3. **Emphasize intentionality** — "We chose this architecture because..."
4. **Acknowledge trade-offs** — "We could add X, but Y isn't necessary for core value"
5. **Be honest** — "This is a simulation, not a prediction"

---

## Red Flags to Avoid

❌ "AI-powered dashboard"
❌ "Predicts the future"
❌ "Optimizes decisions"
❌ "Best solution"
❌ "Guaranteed outcomes"
❌ "We'll add a database later" (implies poor planning)

✅ "Trade-off simulator"
✅ "Shows consequences"
✅ "Explores scenarios"
✅ "Surfaces tensions"
✅ "Models relationships"
✅ "Intentionally minimal" (shows judgment)
