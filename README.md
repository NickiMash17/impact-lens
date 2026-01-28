# Impact Lens

A decision-simulation dashboard that lets you visualize the ripple effects of policy decisions across economic, social, and environmental dimensions in real time.

## Features

- **Real-time Decision Simulation**: Visualize the consequences of decisions before you make them
- **Multi-dimensional Impact Analysis**: Track effects across economic, social, and environmental dimensions
- **Interactive Dashboard**: Explore scenarios with intuitive controls and visualizations
- **Timeline Visualization**: See how impacts unfold over time

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd impact-lens

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Technologies

This project is built with:

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Component library
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Recharts** - Data visualization

## Project Structure

```
src/
├── components/     # React components
│   ├── dashboard/ # Dashboard-specific components
│   ├── landing/   # Landing page components
│   └── ui/        # Reusable UI components
├── pages/         # Page components
├── store/         # State management
├── hooks/         # Custom React hooks
└── lib/           # Utility functions
```

## License

MIT
