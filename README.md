# Impact Lens

> **If I change this decision, what happens next—and what do I sacrifice?**

Impact Lens is a decision-support simulation that helps people explore the real-world trade-offs of complex choices by visualizing their social, environmental, and economic consequences over time.

## The Problem

Important decisions (policy, strategy, investment) are usually:

- Made with **partial information**
- Optimized for **one KPI**
- Blind to **second-order effects**
- Explained poorly to stakeholders

Most tools either:

- Show historical data (too late), or
- Predict a single outcome (dishonest), or
- Overwhelm users with dashboards

**Impact Lens lets someone experiment safely with a decision before committing. No risk. No overconfidence. No fake certainty.**

## Core Features

> **Impact Lens enables real-time, trade-off-aware simulation of complex decisions by visualizing their social, economic, and environmental consequences over time, supported by AI-generated explanations that clarify why outcomes change.**

### 1. **Single-Decision Scenario Simulation**
Users explore the consequences of **one focused decision variable** at a time (e.g., renewable energy investment level), eliminating noise and forcing clarity. Encourages deliberate thinking instead of trial-and-error optimization.

### 2. **Trade-Off-Aware Impact Modeling**
Each decision produces **competing outcomes** across multiple dimensions:
- 🌍 **Environmental**: Carbon reduction, resource usage
- 💰 **Economic**: GDP impact, energy costs, ROI
- 👥 **Social**: Jobs created, public approval, access
- ⚡ **Infrastructure**: Grid stability, reliability

Some metrics improve while others degrade. Reflects real-world complexity instead of presenting false "win-win" outcomes.

### 3. **Real-Time Impact Recalculation**
All impacts update instantly as the decision input changes, allowing users to see **cause-and-effect** relationships in motion. Transforms static data into an interactive decision experience.

### 4. **Multi-Dimensional Impact Dashboard**
Outcomes are visualized simultaneously using:
- Key metrics with comparative indicators
- Minimal, readable charts
- Clear visual hierarchy

Prevents siloed thinking and highlights interdependencies.

### 5. **Time-Horizon Impact Projection**
A forward-looking trajectory (10 years) shows:
- Short-term transition costs
- Medium-term instability
- Long-term stabilization or gains

Helps users weigh immediate pain against long-term benefit.

### 6. **AI-Generated Impact Insight**
A short, contextual explanation translates numeric changes into plain language, highlighting:
- What changed
- Why it changed
- Where trade-offs exist

Improves accessibility and supports informed discussion without automating decisions.

### 7. **Transparent Simulation Boundaries**
Clear messaging communicates that:
- This is a simulation, not a prediction
- Values are modeled approximations
- Results illustrate relationships, not certainty

Builds trust and avoids misleading overconfidence.

### 8. **Calm, Decision-Focused UX**
A single-screen, distraction-free interface designed to:
- Encourage reflection
- Reduce cognitive overload
- Emphasize understanding over action

Positions the product as a serious decision tool, not a gimmick.

### 9. **Interpretability-First Visualization**
Charts and metrics are designed to answer: **"What changed because of my decision?"** Not: **"How much data can we show?"** Ensures every visual element contributes to insight.

### 10. **Stakeholder-Ready Explanation Layer**
The system supports:
- Policy discussion
- Executive briefings
- Educational use

By making trade-offs visible and explainable. Extends usefulness beyond the individual user to teams and organizations.

## Architecture

### Core Philosophy

**Simplicity > Complexity**  
**Clarity > Features**  
**Insight > Accuracy**

### Technical Stack

<div align="center">

**Frontend:**
<br/>

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.10-FF6B6B?style=for-the-badge&logo=zustand&logoColor=white)

![Recharts](https://img.shields.io/badge/Recharts-2.15.4-FF6B6B?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.29.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix%20UI-Latest-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

**Backend & Services:**
<br/>

![Serverless](https://img.shields.io/badge/Serverless-Functions-FD5750?style=for-the-badge&logo=serverless&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

</div>

**Key Technologies:**
- **React 18 + TypeScript** - Type-safe UI framework
- **Vite** - Fast build tool and dev server
- **Zustand** - Minimal, performant state management
- **Pure Simulation Engine** - Deterministic, explainable calculations (client-side)
- **Recharts** - Beautiful, responsive data visualization
- **Framer Motion** - Purposeful, performant animations
- **Radix UI + Tailwind CSS** - Accessible, editorial-quality design system
- **Serverless Functions** - Minimal backend for AI explanation generation
- **OpenAI API** - Contextual insight generation (with fallback)

**Architecture:** Lightweight full-stack application. Core simulation logic runs client-side for transparency and immediate feedback. Backend exists solely for secure AI integration. See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

### Key Architectural Decisions

1. **Pure Simulation Layer** (`src/lib/simulation.ts`)
   - Deterministic functions
   - No API dependencies for core calculations
   - Clear, explainable formulas
   - Easy to audit and understand

2. **Single Source of Truth** (`src/store/simulationStore.ts`)
   - Zustand store manages all state
   - No prop drilling
   - No duplicated state

3. **AI as Supporting Feature**
   - OpenAI used only for insight generation
   - Always falls back to deterministic insights
   - App functions perfectly without AI

4. **One Scenario, Deeply Explored**
   - Renewable Energy Investment Allocation
   - Focused depth > broad coverage
   - Demonstrates the concept clearly

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) OpenAI API key for AI insights (app works without it)

### Installation

```sh
# Clone the repository
git clone https://github.com/NickiMash17/impact-lens.git

# Navigate to project directory
cd impact-lens

# Install dependencies
npm install

# (Optional) Add OpenAI API key for AI insights
# Create .env file:
echo "VITE_OPENAI_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   │   ├── DecisionSlider.tsx    # Primary interaction control
│   │   ├── MetricsGrid.tsx       # Impact metrics display
│   │   ├── InsightPanel.tsx      # AI-generated explanations
│   │   └── TimelineChart.tsx     # 10-year projections
│   ├── landing/      # Landing page components
│   └── ui/           # Reusable UI components (shadcn)
├── lib/
│   ├── simulation.ts      # Pure simulation engine
│   └── ai-insights.ts     # AI insight generation
├── pages/            # Page components
├── store/            # Zustand state management
└── hooks/            # Custom React hooks
```

## The Core Interaction Loop

1. **User adjusts decision lever** (renewable investment %)
2. **System recalculates impacts** (pure simulation)
3. **Metrics animate to new values** (Framer Motion)
4. **Trade-offs become visible** (some metrics improve, others degrade)
5. **AI generates insight** (explains what changed and why)

This loop is immediate, understandable in under 10 seconds, and visually calm.

## Demo Flow (3 Minutes)

1. **Landing Page** (30s)
   - One-sentence product definition
   - Clear call-to-action

2. **Dashboard** (2 min)
   - Adjust slider from 15% → 35% → 55% → 80%
   - Point out trade-offs (cost increases, stability dips)
   - Show timeline projection
   - Highlight AI insight panel

3. **Key Message** (30s)
   - "This is what decision-making should feel like: informed, immediate, honest about trade-offs."

## Future Roadmap

- **Additional Scenarios**
  - Urban planning decisions
  - Healthcare policy allocation
  - Education budget distribution

- **Comparison Mode**
  - Side-by-side scenario comparison
  - "What if" branching

- **Export & Share**
  - PDF reports
  - Shareable scenario links

- **Custom Scenarios**
  - User-defined decision variables
  - Custom impact metrics

## Judging Criteria Alignment

### Innovation
- **Novel approach**: Making trade-offs visible and immediate
- **AI integration**: Used appropriately, not as a gimmick

### Technical Excellence
- **Clean architecture**: Pure simulation engine, clear separation of concerns
- **Performance**: Instant feedback, smooth animations
- **Code quality**: TypeScript, well-structured, maintainable

### Design & UX
- **Editorial quality**: Policy-lab aesthetic, not generic dashboard
- **Clarity**: One interaction loop, immediately understandable
- **Restraint**: No feature bloat, focused experience

### Impact
- **Real-world relevance**: Addresses actual decision-making challenges
- **Scalability**: Architecture supports multiple scenarios
- **Accessibility**: Works without API keys, clear fallbacks

## License

MIT

## About

Built for DevDash hackathon. Impact Lens demonstrates how thoughtful architecture, clear product definition, and restrained design can create tools that genuinely help people make better decisions.

---

**Remember**: This isn't a chatbot. It's not a reporting dashboard. It's a decision consequence simulator. Every feature serves that core purpose.
