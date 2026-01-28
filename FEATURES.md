# Impact Lens — Official Feature List

> **One-Sentence Summary:** Impact Lens enables real-time, trade-off-aware simulation of complex decisions by visualizing their social, economic, and environmental consequences over time, supported by AI-generated explanations that clarify why outcomes change.

---

## 1. Single-Decision Scenario Simulation

**What it is:**
Users explore the consequences of **one focused decision variable** at a time (e.g., renewable energy investment level), eliminating noise and forcing clarity.

**Why it matters:**
Encourages deliberate thinking instead of trial-and-error optimization.

**Where you see it:**
- Decision slider (single input control)
- Focused scenario description
- No multi-variable complexity

---

## 2. Trade-Off-Aware Impact Modeling

**What it is:**
Each decision produces **competing outcomes** across multiple dimensions:
- Environmental (carbon reduction)
- Economic (GDP impact, energy costs)
- Social (jobs created, public approval)
- Infrastructure (grid stability)

Some metrics improve while others degrade.

**Why it matters:**
Reflects real-world complexity instead of presenting false "win-win" outcomes.

**Where you see it:**
- Metrics grid showing both positive and negative changes
- Color-coded indicators (green for improvement, red for degradation)
- Energy cost increases while carbon decreases
- Grid stability dips during transition

---

## 3. Real-Time Impact Recalculation

**What it is:**
All impacts update instantly as the decision input changes, allowing users to see **cause-and-effect** relationships in motion.

**Why it matters:**
Transforms static data into an interactive decision experience.

**Where you see it:**
- Slider adjustment → immediate metric updates
- Animated value transitions (Framer Motion)
- No loading states or delays
- Smooth spring animations

---

## 4. Multi-Dimensional Impact Dashboard

**What it is:**
Outcomes are visualized simultaneously using:
- Key metrics
- Comparative indicators
- Minimal, readable charts

**Why it matters:**
Prevents siloed thinking and highlights interdependencies.

**Where you see it:**
- Metrics grid (6 metrics side-by-side)
- Timeline chart showing multiple dimensions
- Single-screen layout showing all impacts together

---

## 5. Time-Horizon Impact Projection

**What it is:**
A forward-looking trajectory (10 years) shows:
- Short-term transition costs
- Medium-term instability
- Long-term stabilization or gains

**Why it matters:**
Helps users weigh immediate pain against long-term benefit.

**Where you see it:**
- Timeline chart component
- 10-year projection visualization
- Shows inflection points and trends over time

---

## 6. AI-Generated Impact Insight

**What it is:**
A short, contextual explanation translates numeric changes into plain language, highlighting:
- What changed
- Why it changed
- Where trade-offs exist

**Why it matters:**
Improves accessibility and supports informed discussion without automating decisions.

**Where you see it:**
- Insight panel component
- AI-generated text (with fallback)
- Clear disclosure: "AI-generated explanation"
- Explains trade-offs in plain language

---

## 7. Transparent Simulation Boundaries

**What it is:**
Clear messaging communicates that:
- This is a simulation, not a prediction
- Values are modeled approximations
- Results illustrate relationships, not certainty

**Why it matters:**
Builds trust and avoids misleading overconfidence.

**Where you see it:**
- Disclaimer component at bottom of dashboard
- Scenario description text
- Clear messaging throughout UI
- No overclaiming or false certainty

---

## 8. Calm, Decision-Focused UX

**What it is:**
A single-screen, distraction-free interface designed to:
- Encourage reflection
- Reduce cognitive overload
- Emphasize understanding over action

**Why it matters:**
Positions the product as a serious decision tool, not a gimmick.

**Where you see it:**
- Single-screen dashboard layout
- Minimal navigation
- Editorial-quality design
- No feature bloat
- Restrained color palette

---

## 9. Interpretability-First Visualization

**What it is:**
Charts and metrics are designed to answer:

> "What changed because of my decision?"

Not:

> "How much data can we show?"

**Why it matters:**
Ensures every visual element contributes to insight.

**Where you see it:**
- Clean metric cards with clear deltas
- Timeline chart focused on key metrics
- Minimal gridlines and decorations
- Clear labels and units
- Purposeful animations

---

## 10. Stakeholder-Ready Explanation Layer

**What it is:**
The system supports:
- Policy discussion
- Executive briefings
- Educational use

By making trade-offs visible and explainable.

**Why it matters:**
Extends usefulness beyond the individual user to teams and organizations.

**Where you see it:**
- Comparison mode (side-by-side scenarios)
- AI insights for explanation
- Clear visualizations for presentations
- Export-ready format
- Educational value

---

## Feature Mapping to UI Components

| Feature | Primary Component | Supporting Elements |
|---------|------------------|---------------------|
| Single-Decision Simulation | `DecisionSlider.tsx` | Scenario description |
| Trade-Off Modeling | `MetricsGrid.tsx` | `ImpactMetric.tsx` with change indicators |
| Real-Time Recalculation | `simulationStore.ts` | Framer Motion animations |
| Multi-Dimensional Dashboard | `MetricsGrid.tsx` + `TimelineChart.tsx` | Layout structure |
| Time-Horizon Projection | `TimelineChart.tsx` | `generateProjection()` function |
| AI-Generated Insight | `InsightPanel.tsx` | `ai-insights.ts` |
| Transparent Boundaries | `Disclaimer.tsx` | Messaging throughout |
| Decision-Focused UX | `Dashboard.tsx` layout | Design system |
| Interpretability-First | All visualization components | Design principles |
| Stakeholder-Ready | `ComparisonMode.tsx` | Explanation layer |

---

## Judge Q&A Preparation

**Q: "What makes this different from other decision tools?"**
A: "Impact Lens focuses on making trade-offs visible and immediate. Unlike tools that optimize for one KPI or show everything improving, we show the honest reality: some metrics improve while others degrade. This reflects real-world complexity."

**Q: "How does the AI work?"**
A: "AI is used only as a supporting narrator—it explains what changed and why, translating numeric changes into plain language. It does not make decisions or recommendations. The app functions perfectly with deterministic fallback insights if AI is unavailable."

**Q: "Is this accurate?"**
A: "This is a simulation model, not a prediction. We're transparent about this—values are modeled approximations designed to illustrate trade-offs and systemic relationships. The goal is insight, not certainty."

**Q: "Who would use this?"**
A: "Policy makers, strategy teams, executives, and educators who need to understand the full consequences of complex decisions before committing. It's particularly valuable for stakeholder communication—explaining why certain trade-offs were chosen."

**Q: "What's the technical architecture?"**
A: "Pure simulation engine with deterministic functions—no API dependencies for core calculations. Zustand for state management. AI only for insight generation with fallback. Clean separation of concerns, easily auditable."

---

## Devpost Features Section (Compressed)

**Impact Lens enables real-time, trade-off-aware simulation of complex decisions.**

**Key Features:**
- Single-decision focus eliminates noise
- Trade-off-aware modeling shows competing outcomes
- Real-time recalculation with instant feedback
- Multi-dimensional dashboard prevents siloed thinking
- 10-year time-horizon projection
- AI-generated insights (supporting narrator, not decision-maker)
- Transparent simulation boundaries
- Calm, decision-focused UX
- Interpretability-first visualizations
- Stakeholder-ready explanation layer

**Built with:** React, TypeScript, Vite, Zustand, Framer Motion, Recharts, OpenAI API
