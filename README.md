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

## Why Impact Lens is Different

### 1. **One Decision, Multiple Dimensions**
Adjust a single lever (e.g., renewable energy investment percentage) and see impacts across:
- 🌍 **Environmental**: Carbon reduction, resource usage
- 💰 **Economic**: GDP impact, energy costs, ROI
- 👥 **Social**: Jobs created, public approval, access

### 2. **Visible Trade-offs**
Unlike tools that show "everything goes up," Impact Lens reveals the honest truth: some metrics improve while others degrade. This is the reality of complex decisions.

### 3. **Immediate Feedback**
No waiting for complex models to run. Adjust the slider and watch metrics animate to new values in real time.

### 4. **AI-Powered Context**
AI generates concise explanations of what changed and why—not as the main feature, but as a supporting narrator. The AI does **not decide**—it **explains**.

### 5. **Transparency & Honesty**
This is a simulation model, not reality. Clear disclaimers, no overclaiming. The output is **insight**, not an answer. Built with the restraint and clarity of a policy lab—serious, approachable, confident.

## Architecture

### Core Philosophy

**Simplicity > Complexity**  
**Clarity > Features**  
**Insight > Accuracy**

### Technical Stack

- **React 18 + TypeScript** - Type-safe UI
- **Vite** - Fast build tool and dev server
- **Zustand** - Minimal state management
- **Pure Simulation Engine** - Deterministic, explainable calculations
- **OpenAI API** - Contextual insight generation (with fallback)
- **Recharts** - Data visualization
- **Framer Motion** - Purposeful animations
- **Radix UI + Tailwind CSS** - Editorial-quality design system

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
