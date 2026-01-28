# Impact Lens — Devpost Submission Content

## Project Name
**Impact Lens**

## Tagline
**Explore the real-world trade-offs of complex decisions — before you make them.**

---

## One-Line Description
Decision trade-off simulator that visualizes the social, economic, and environmental consequences of complex policy and strategy decisions in real time.

---

## Full Description

### The Problem

Most decision tools optimize for one metric. Real decisions create trade-offs.

Policy makers, strategists, and executives face a critical challenge: understanding the full impact of their choices before committing. Traditional tools either:

- Show only one dimension (economic OR environmental)
- Predict a single outcome (dishonest)
- Overwhelm users with dashboards
- Hide trade-offs behind aggregated metrics

**Impact Lens solves this by making trade-offs visible, immediate, and honest.**

---

### What Impact Lens Does

Impact Lens is a **decision trade-off simulator** that helps users explore the real-world consequences of complex choices by visualizing their social, economic, and environmental impacts in real time.

**Key Features:**

1. **Single-Decision Focus** — Explore one decision variable at a time, eliminating noise and forcing clarity

2. **Trade-Off-Aware Modeling** — See competing outcomes across multiple dimensions. Some metrics improve while others degrade—real-world complexity

3. **Real-Time Recalculation** — All impacts update instantly as you adjust the decision. See cause-and-effect relationships in motion

4. **Multi-Dimensional Dashboard** — Visualize outcomes simultaneously with key metrics, comparative indicators, and minimal charts

5. **Time-Horizon Projection** — 10-year trajectory shows short-term costs, medium-term instability, and long-term gains

6. **AI-Generated Insight** — Contextual explanations translate numeric changes into plain language. Highlights what changed, why, and where trade-offs exist—without automating decisions

7. **Transparent Boundaries** — Clear messaging: this is a simulation, not a prediction. Values are modeled approximations. Results illustrate relationships, not certainty

8. **Trade-Off Signals** — System surfaces when competing outcomes occur. "System under transition stress" or "Short-term instability for long-term gain"

9. **Stakeholder-Ready** — Supports policy discussion, executive briefings, and educational use by making trade-offs visible and explainable

---

### How We Built It

**Tech Stack:**
- React 18 + TypeScript
- Vite
- Zustand (state management)
- Pure Simulation Engine (deterministic, explainable)
- OpenAI API (insight generation with fallback)
- Recharts (visualization)
- Framer Motion (animations)
- Radix UI + Tailwind CSS

**Architecture:**
- Pure simulation layer with deterministic functions
- Single source of truth (Zustand)
- AI as supporting narrator, not decision-maker
- Clean separation of concerns

---

### Challenges We Faced

1. **Balancing simplicity with depth** — Ensuring the interface remains calm while showing complex trade-offs
2. **AI tone** — Making AI sound like an analyst (uncertain, honest) rather than confident predictions
3. **Trade-off detection** — Identifying when competing outcomes occur and surfacing them clearly
4. **Performance** — Real-time recalculation with smooth animations

---

### What's Next

- Additional scenarios (urban planning, healthcare policy, education)
- Export functionality (PDF reports, shareable links)
- Custom scenario builder
- Multi-user collaboration

---

## Try It Out

**Live Demo:** [Your deployment URL]

**GitHub:** https://github.com/NickiMash17/impact-lens

**Key Interaction:**
1. Adjust the renewable energy investment slider
2. Watch metrics update in real time
3. Notice trade-offs: some metrics improve, others degrade
4. Read AI-generated explanation of what changed and why
5. View 10-year projection timeline

---

## Screenshots

[Add screenshots showing:]
- Landing page
- Dashboard with trade-off signal visible
- Metrics showing competing outcomes
- Timeline projection
- Comparison mode

---

## Built With

- React
- TypeScript
- Vite
- Zustand
- OpenAI API
- Recharts
- Framer Motion
- Tailwind CSS

---

## Team

[Your team info]

---

## Key Differentiators

**What makes Impact Lens different:**

1. **Honest about trade-offs** — Most tools show "everything goes up." We show the reality: some metrics improve while others degrade

2. **Simulation, not prediction** — Clear boundaries. We model relationships, not certainty

3. **Single decision focus** — Eliminates noise. One lever, multiple dimensions

4. **AI as narrator** — Explains, doesn't decide. Uses uncertain language

5. **Stakeholder-ready** — Designed for policy discussion and executive briefings

---

## Judging Criteria Alignment

**Originality:** Not a chatbot, not predictive hype. Models tension, not perfection.

**Technical Complexity:** Real-time simulation, deterministic modeling, state-driven UI, responsible AI usage.

**Practical Applicability:** Policy, strategy, education, stakeholder communication.

**UX & Clarity:** Single decision, immediate feedback, clean visual hierarchy.

**Scalability:** New scenarios, new domains, same engine.

---

## One-Sentence Summary

**Impact Lens enables real-time, trade-off-aware simulation of complex decisions by visualizing their social, economic, and environmental consequences over time, supported by AI-generated explanations that clarify why outcomes change.**
