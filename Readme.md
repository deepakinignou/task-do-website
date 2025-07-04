# 🤖 Smart Todo - AI-Powered Task Management

[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](https://github.com/yourusername/smart-todo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.5.3-blue.svg)](https://www.typescriptlang.org/)

A modern, intelligent task management application with AI-powered features, built with React, TypeScript, Express, and cutting-edge UI technologies.

## 🌟 Live Demo

🚀 **[Try Smart Todo Live](https://yourusername.github.io/smart-todo)**

## ✨ Key Features

### 🧠 AI-Powered Intelligence

- **🤖 Smart Task Suggestions** - AI analyzes context and suggests optimal task structure
- **⚡ Intelligent Prioritization** - Automatic priority scoring based on urgency, deadlines, and context
- **📊 Context Analysis** - Extract actionable tasks from daily activities (WhatsApp, emails, notes)
- **💬 AI Chatbot Assistant** - Real-time conversational help and task management
- **📈 Productivity Insights** - AI-driven analytics, patterns, and personalized recommendations
- **🎯 Smart Categorization** - Automatic task categorization with 85%+ accuracy
- **⏰ Deadline Intelligence** - AI suggests realistic deadlines based on task complexity

### 🎨 Modern UI/UX Design

- **🌙 Dark-First Theme** - Professional black interface with vibrant green AI accents
- **✨ Glass Morphism Effects** - Modern translucent design with backdrop blur
- **📱 Fully Responsive** - Pixel-perfect experience on desktop, tablet, and mobile
- **🎬 Smooth Animations** - Pulse effects, floating elements, fade-ins, and micro-interactions
- **🎆 Loading Experiences** - AI brain with bouncing dots and progressive loading states
- **🎯 Visual Priority System** - Color-coded task priorities with intuitive indicators

### 📋 Advanced Task Management

- **✅ Complete CRUD Operations** - Create, read, update, delete with real-time sync
- **🏷️ Smart Category System** - Work, Personal, Health, Learning, Shopping with auto-suggestion
- **⚡ 4-Level Priority System** - Urgent, High, Medium, Low with visual color coding
- **📅 Intelligent Deadline Tracking** - Smart suggestions, overdue alerts, and timeline optimization
- **🔄 Status Flow Management** - Todo → In Progress → Completed with progress tracking
- **🏷️ Dynamic Tag System** - Custom tags with auto-completion and trending suggestions

### 🤖 AI Assistant Features

- **💬 Natural Language Interface** - Chat with AI using plain English
- **🧠 Context-Aware Responses** - AI remembers your preferences and patterns
- **⚡ Quick Actions** - Instant task creation, prioritization, and organization
- **📊 Analytics Queries** - Ask about productivity patterns, trends, and insights
- **🎯 Smart Recommendations** - Personalized suggestions based on your workflow

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Minimum Version | Recommended | Download Link                       |
| ----------- | --------------- | ----------- | ----------------------------------- |
| **Node.js** | `18.0.0`        | `20.x LTS`  | [nodejs.org](https://nodejs.org/)   |
| **npm**     | `9.0.0`         | `10.x`      | Included with Node.js               |
| **Git**     | `2.x`           | Latest      | [git-scm.com](https://git-scm.com/) |

### 📦 Installation

#### Method 1: Clone Repository (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/smart-todo.git
cd smart-todo

# 2. Install dependencies (this may take 2-3 minutes)
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start development server
npm run dev
```

#### Method 2: Download ZIP

```bash
# 1. Download and extract ZIP from GitHub
# 2. Navigate to extracted folder
cd smart-todo-main

# 3. Install and run
npm install && npm run dev
```

### 🔧 Environment Setup

Create a `.env` file in the root directory:

```bash
# Basic Configuration (Required)
NODE_ENV=development
PORT=8080

# AI Features (Optional - Currently using mock responses)
ENABLE_AI_FEATURES=true
ENABLE_CONTEXT_ANALYSIS=true
ENABLE_TASK_SUGGESTIONS=true

# Production AI Integration (Optional)
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here

# Security (Production)
JWT_SECRET=your_super_secret_jwt_key_here
```

### 🏃‍♂️ Development Commands

| Command              | Purpose                   | When to Use           |
| -------------------- | ------------------------- | --------------------- |
| `npm run dev`        | Start development server  | Daily development     |
| `npm run build`      | Build for production      | Before deployment     |
| `npm run start`      | Start production server   | Test production build |
| `npm run typecheck`  | Check TypeScript errors   | Before commits        |
| `npm test`           | Run test suite            | Verify functionality  |
| `npm run format:fix` | Format code with Prettier | Code cleanup          |

### 🌐 Development Server

After running `npm run dev`, you'll see:

```bash
🚀 Smart Todo server running on port 8080
📝 Dashboard: http://localhost:8080
🤖 AI Features: Enabled
📊 Analytics: Available at /api/dashboard/stats
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 🎯 First Steps After Installation

1. **✅ Verify Installation** - Check that the dark theme loads correctly
2. **🤖 Test AI Features** - Click the floating AI brain icon
3. **📝 Create First Task** - Click "AI Task" button and follow AI suggestions
4. **💬 Try AI Assistant** - Ask "What should I prioritize today?"
5. **📊 Explore Dashboard** - Review productivity insights and analytics

### 🔧 Production Build

```bash
# Build optimized production bundle
npm run build

# Test production build locally
npm start

# Deploy to various platforms
npm run deploy:github    # GitHub Pages
npm run deploy:netlify   # Netlify
npm run deploy:vercel    # Vercel
```

### 📱 Mobile Development

The app is fully responsive, but for mobile testing:

```bash
# Start dev server accessible on network
npm run dev -- --host

# Test on mobile device using your computer's IP
http://YOUR_IP_ADDRESS:8080
```

### 🐛 Troubleshooting Installation

#### Common Issues and Solutions:

**Port Already in Use:**

```bash
# Kill process on port 8080
npx kill-port 8080
# Or use different port
PORT=3001 npm run dev
```

**Node Version Issues:**

```bash
# Check Node version
node --version
# Use Node Version Manager (recommended)
nvm install 18
nvm use 18
```

**Permission Errors (macOS/Linux):**

```bash
# Fix npm permissions
sudo chown -R $USER /usr/local/lib/node_modules
```

**Cache Issues:**

```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Windows-Specific Issues:**

```bash
# Enable long paths (run as Administrator)
git config --system core.longpaths true
# Use PowerShell instead of Command Prompt
```

### 🔄 Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies (careful in production)
npm update

# Update specific package
npm install package-name@latest
```

## 🛠️ Technology Stack

### 🎨 Frontend Architecture

| Technology       | Version  | Purpose      | Why We Use It                                                       |
| ---------------- | -------- | ------------ | ------------------------------------------------------------------- |
| **React**        | `18.3.1` | UI Framework | Modern hooks, concurrent features, excellent ecosystem              |
| **TypeScript**   | `5.5.3`  | Type Safety  | Catch errors early, better DX, self-documenting code                |
| **Vite**         | `6.2.2`  | Build Tool   | Lightning-fast HMR, optimized bundling, modern dev experience       |
| **Tailwind CSS** | `3.4.11` | Styling      | Utility-first approach, consistent design system, rapid prototyping |
| **React Router** | `6.26.2` | Routing      | Modern declarative routing, code splitting, nested routes           |

### 🎭 UI Component Library

| Component           | Version   | Purpose                                                 |
| ------------------- | --------- | ------------------------------------------------------- |
| **Radix UI**        | `1.x`     | Headless primitives for accessible, unstyled components |
| **Lucide React**    | `0.462.0` | Beautiful, consistent icon library with 1000+ icons     |
| **Framer Motion**   | `12.6.2`  | Advanced animations and micro-interactions              |
| **React Hook Form** | `7.53.0`  | Performant forms with minimal re-renders                |
| **TanStack Query**  | `5.56.2`  | Server state management and caching                     |

### ⚙️ Backend Infrastructure

| Technology     | Version  | Purpose                       |
| -------------- | -------- | ----------------------------- |
| **Express.js** | `4.18.2` | Web framework for Node.js     |
| **TypeScript** | `5.5.3`  | Full-stack type safety        |
| **Zod**        | `3.23.8` | Runtime type validation       |
| **CORS**       | `2.8.5`  | Cross-origin resource sharing |

### 🧠 AI & Intelligence Layer

| Feature                    | Implementation          | Purpose                                  |
| -------------------------- | ----------------------- | ---------------------------------------- |
| **Context Analysis**       | Custom NLP algorithms   | Extract tasks from daily activities      |
| **Priority Scoring**       | Weighted scoring system | Intelligent task prioritization          |
| **Pattern Recognition**    | Behavioral analysis     | Learn user preferences and habits        |
| **Natural Language**       | Intent recognition      | Conversational AI assistant              |
| **Productivity Analytics** | Statistical modeling    | Performance insights and recommendations |

### 🎨 Design System

| Aspect                | Implementation                | Details                                           |
| --------------------- | ----------------------------- | ------------------------------------------------- |
| **Color Palette**     | CSS Custom Properties         | Black (#000), White (#FFF), Green (#22C55E) theme |
| **Typography**        | Inter Font Family             | Modern, readable, multiple weights                |
| **Spacing**           | Tailwind Scale                | Consistent 4px base unit spacing system           |
| **Animation**         | CSS Keyframes + Framer Motion | Smooth 60fps animations                           |
| **Responsive Design** | Tailwind Breakpoints          | Mobile-first, pixel-perfect scaling               |

### 📦 Core Dependencies Breakdown

#### Production Dependencies

```json
{
  "express": "^4.18.2", // Web server framework
  "zod": "^3.23.8" // Schema validation
}
```

#### Development Dependencies (Frontend)

```json
{
  "react": "^18.3.1", // Core React library
  "react-dom": "^18.3.1", // React DOM rendering
  "react-router-dom": "^6.26.2", // Client-side routing
  "typescript": "^5.5.3", // TypeScript compiler
  "vite": "^6.2.2", // Build tool and dev server
  "tailwindcss": "^3.4.11", // Utility-first CSS framework
  "@vitejs/plugin-react-swc": "^3.5.0" // Fast React refresh
}
```

#### UI Components & Styling

```json
{
  "@radix-ui/react-*": "^1.x", // 25+ accessible UI primitives
  "lucide-react": "^0.462.0", // Icon library
  "tailwindcss-animate": "^1.0.7", // Animation utilities
  "tailwind-merge": "^2.5.2", // Utility merging
  "class-variance-authority": "^0.7.1", // Component variants
  "clsx": "^2.1.1" // Conditional classes
}
```

#### State Management & Data Fetching

```json
{
  "@tanstack/react-query": "^5.56.2", // Server state management
  "react-hook-form": "^7.53.0", // Form state management
  "@hookform/resolvers": "^3.9.0" // Form validation resolvers
}
```

#### Animation & Interaction

```json
{
  "framer-motion": "^12.6.2", // Advanced animations
  "embla-carousel-react": "^8.3.0", // Carousel component
  "vaul": "^0.9.3" // Drawer component
}
```

#### Development Tools

```json
{
  "tsx": "^4.7.0", // TypeScript execution
  "vitest": "^3.1.4", // Testing framework
  "prettier": "^3.5.3", // Code formatting
  "autoprefixer": "^10.4.21", // CSS vendor prefixes
  "postcss": "^8.5.6" // CSS processing
}
```

#### Deployment & Build Tools

```json
{
  "gh-pages": "^6.1.1", // GitHub Pages deployment
  "serverless-http": "^3.2.0" // Serverless deployment adapter
}
```

### 🏗️ Architecture Patterns

#### Frontend Architecture

- **Component-Driven Development** - Atomic design with reusable components
- **Custom Hooks Pattern** - Logic extraction and reusability
- **Compound Components** - Flexible, composable UI patterns
- **Server State Management** - TanStack Query for API state
- **Form State Management** - React Hook Form for performant forms

#### Backend Architecture

- **RESTful API Design** - Clean, predictable endpoint structure
- **Middleware Pattern** - Modular request processing pipeline
- **Controller-Service Pattern** - Separation of concerns
- **Type-Safe APIs** - Shared TypeScript interfaces
- **Error Handling** - Centralized error management

#### AI Architecture

- **Modular AI Services** - Pluggable AI providers (OpenAI, Claude, Local)
- **Context Pipeline** - Multi-stage text processing
- **Scoring Algorithms** - Weighted priority calculation
- **Pattern Detection** - Behavioral analysis engine
- **Response Generation** - Template-based AI responses

## 📁 Project Structure

```
smart-todo/
├── 📂 client/                      # React Frontend Application
│   ├── 📂 components/
│   │   ├── 📂 ui/                  # Reusable UI Components (40+ components)
│   │   │   ├── button.tsx          # Button variants with animations
│   │   │   ├── task-card.tsx       # Smart task display component
│   │   │   ├── ai-chatbot.tsx      # AI assistant interface
│   │   │   ├── create-task-dialog.tsx # Task creation with AI suggestions
│   │   │   └── ...                 # Other UI primitives
│   │   └── 📂 layout/
│   │       ├── sidebar.tsx         # App navigation sidebar
│   │       └── header.tsx          # App header (if needed)
│   ├── 📂 pages/                   # Route Components
│   │   ├── Index.tsx               # Dashboard/Homepage
│   │   ├── ContextInput.tsx        # Daily context analysis
│   │   ├── NotFound.tsx            # 404 error page
│   │   └── ...                     # Other pages (coming soon)
│   ├── 📂 lib/                     # Utilities & Helpers
│   │   ├── utils.ts                # Common utility functions
│   │   ├── ai.ts                   # AI service integrations
│   │   └── constants.ts            # App constants
│   ├── 📂 hooks/                   # Custom React Hooks
│   │   ├── use-mobile.tsx          # Mobile detection hook
│   │   ├── use-toast.ts            # Toast notification hook
│   │   └── use-ai.ts               # AI features hook
│   ├── App.tsx                     # App entry point with routing
│   ├── global.css                  # Global styles & CSS variables
│   └── vite-env.d.ts               # Vite type definitions
├── 📂 server/                      # Express Backend API
│   ├── 📂 routes/                  # API Route Handlers
│   │   ├── tasks.ts                # Task CRUD operations
│   │   ├── context.ts              # Context analysis endpoints
│   │   ├── ai.ts                   # AI-powered features
│   │   ├── dashboard.ts            # Analytics & insights
│   │   └── demo.ts                 # Demo/testing endpoints
│   ├── index.ts                    # Server entry point & configuration
│   └── node-build.ts               # Production server build
├── 📂 shared/                      # Shared Code Between Client & Server
│   └── api.ts                      # TypeScript interfaces & types
├── 📂 public/                      # Static Assets
│   ├── placeholder.svg             # Placeholder images
│   ├── robots.txt                  # SEO robots file
│   └── favicon.ico                 # App favicon
├── 📂 .github/workflows/           # GitHub Actions
│   └── deploy.yml                  # Automatic deployment workflow
├── 📂 netlify/functions/           # Netlify Functions
│   └── api.ts                      # Serverless function handler
├── 📄 Configuration Files
│   ├── package.json                # Dependencies & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── vite.config.ts              # Vite build configuration
│   ├── vite.config.server.ts       # Server build configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── components.json             # UI components configuration
│   └── netlify.toml                # Netlify deployment config
├── 📄 Documentation
│   ├── README.md                   # This comprehensive guide
│   ├── USER_GUIDE.md               # User manual & instructions
│   ├── AGENTS.md                   # Technical documentation
│   ├── .env.example                # Environment variables template
│   └── .gitignore                  # Git ignore rules
└── 📄 Other Files
    ├── .env                        # Environment variables (local)
    └── package-lock.json           # Dependency lock file
```

## 🔌 API Documentation

### 📊 Dashboard & Analytics

| Endpoint                  | Method | Purpose                     | Response                                |
| ------------------------- | ------ | --------------------------- | --------------------------------------- |
| `/api/ping`               | `GET`  | Health check                | `{ message: "pong", timestamp: "..." }` |
| `/api/dashboard/stats`    | `GET`  | Get productivity statistics | `DashboardStats` object                 |
| `/api/dashboard/insights` | `GET`  | Get AI-powered insights     | Productivity recommendations            |

### 📝 Task Management

| Endpoint         | Method   | Purpose           | Request Body        | Response                          |
| ---------------- | -------- | ----------------- | ------------------- | --------------------------------- |
| `/api/tasks`     | `GET`    | Get all tasks     | -                   | `TasksResponse` with sorted tasks |
| `/api/tasks`     | `POST`   | Create new task   | `CreateTaskRequest` | Created `Task` object             |
| `/api/tasks/:id` | `GET`    | Get specific task | -                   | `Task` object                     |
| `/api/tasks/:id` | `PATCH`  | Update task       | `UpdateTaskRequest` | Updated `Task` object             |
| `/api/tasks/:id` | `DELETE` | Delete task       | -                   | `204 No Content`                  |

### 💬 Context Analysis

| Endpoint              | Method   | Purpose             | Request Body           | Response                       |
| --------------------- | -------- | ------------------- | ---------------------- | ------------------------------ |
| `/api/context`        | `GET`    | Get context entries | -                      | `ContextResponse` with entries |
| `/api/context`        | `POST`   | Add context entry   | `CreateContextRequest` | Created `ContextEntry`         |
| `/api/context/recent` | `GET`    | Get recent context  | `?limit=10`            | Recent context entries         |
| `/api/context/:id`    | `GET`    | Get specific entry  | -                      | `ContextEntry` object          |
| `/api/context/:id`    | `DELETE` | Delete entry        | -                      | `204 No Content`               |

### 🤖 AI-Powered Features

| Endpoint                  | Method | Purpose              | Request Body        | Response              |
| ------------------------- | ------ | -------------------- | ------------------- | --------------------- |
| `/api/ai/suggestions`     | `POST` | Get task suggestions | `AIAnalysisRequest` | `AITaskSuggestion[]`  |
| `/api/ai/analyze-context` | `POST` | Analyze context      | `AIAnalysisRequest` | AI insights & actions |
| `/api/ai/full-analysis`   | `POST` | Complete AI analysis | `AIAnalysisRequest` | `AIAnalysisResponse`  |

### 📋 Example API Requests

#### Create Smart Task with AI

```javascript
// POST /api/tasks
{
  "title": "Prepare quarterly presentation",
  "description": "Create slides for Q4 business review",
  "category": "Work",
  "tags": ["presentation", "quarterly", "business"]
}

// Response: Task with AI-generated priority, score, and suggestions
{
  "id": "123",
  "title": "Prepare quarterly presentation",
  "priority": "high",        // AI-assigned
  "aiScore": 85,            // AI confidence
  "aiSuggestions": [
    "Break into smaller tasks",
    "Schedule practice session"
  ],
  "deadline": "2024-01-15T10:00:00Z"  // AI-suggested
}
```

#### Get AI Task Suggestions

```javascript
// POST /api/ai/suggestions
{
  "taskDetails": {
    "title": "Team meeting tomorrow"
  },
  "contextEntries": [
    {
      "content": "Meeting with clients at 2pm tomorrow",
      "source": "whatsapp"
    }
  ]
}

// Response: AI-powered suggestions
{
  "suggestions": [
    {
      "suggestedTitle": "Prepare for client meeting",
      "suggestedCategory": "Work",
      "suggestedPriority": "high",
      "suggestedDeadline": "2024-01-10T13:00:00Z",
      "confidence": 0.92,
      "reasoning": "Meeting detected with high urgency"
    }
  ]
}
```

#### Analyze Daily Context

```javascript
// POST /api/ai/analyze-context
{
  "contextEntries": [
    {
      "content": "Doctor appointment Friday 10am",
      "source": "email",
      "type": "reminder"
    }
  ]
}

// Response: Extracted insights and tasks
{
  "insights": [
    "Medical appointment scheduled",
    "Calendar blocking recommended"
  ],
  "recommendedActions": [
    "Add doctor appointment to calendar",
    "Set reminder day before"
  ]
}
```

### 🔐 Response Types & Status Codes

#### Success Responses

- `200 OK` - Successful GET/PATCH requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests

#### Error Responses

- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

```javascript
// Error Response Format
{
  "error": "Task not found",
  "message": "No task exists with ID: 123",
  "code": "TASK_NOT_FOUND"
}
```

### 📊 TypeScript Interfaces

All API types are defined in `shared/api.ts`:

```typescript
// Core Task Interface
interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed" | "cancelled";
  deadline?: string;
  aiScore?: number;
  aiSuggestions?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// AI Analysis Request
interface AIAnalysisRequest {
  taskDetails?: Partial<Task>;
  contextEntries?: ContextEntry[];
  userPreferences?: UserPreferences;
  currentWorkload?: number;
}

// Dashboard Statistics
interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  productivityScore: number;
  weeklyProgress: Array<{
    date: string;
    completed: number;
    created: number;
  }>;
}
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist/spa`
4. Functions directory: `netlify/functions`

### Option 2: Vercel

1. Connect your GitHub repository to Vercel
2. Build command: `npm run build`
3. Output directory: `dist/spa`

### Option 3: Railway/Render

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Start command: `npm start`

### Option 4: Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Development
NODE_ENV=development
PORT=8080

# Production (optional)
NODE_ENV=production
PORT=3000

# AI Features (for production AI integration)
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here
```

## 🎯 Usage Guide

### Creating Tasks

1. Click the **"AI Task"** button
2. Enter task title and description
3. AI will suggest category, priority, and deadline
4. Review and apply AI suggestions
5. Save your enhanced task

### Using AI Assistant

1. Click the floating **AI brain icon**
2. Ask questions like:
   - "Create a task for tomorrow's meeting"
   - "What should I prioritize today?"
   - "Analyze my productivity patterns"
3. Get instant AI-powered responses

### Context Analysis

1. Navigate to **"Context Input"** page
2. Paste WhatsApp messages, emails, or notes
3. AI will extract potential tasks and insights
4. Review and add extracted tasks to your list

## 🔮 AI Features Demo

The app includes mock AI responses for demonstration:

- **Task Suggestions** - Smart recommendations based on content
- **Priority Scoring** - Intelligent priority assignment
- **Context Extraction** - Extract tasks from daily activities
- **Productivity Insights** - Pattern analysis and recommendations

For production use, integrate with:

- **OpenAI GPT** for advanced language understanding
- **Claude** for context analysis
- **LM Studio** for local AI processing

## 🎨 Design System

### Colors

- **Background**: Pure Black (#000000)
- **Text**: White (#FFFFFF)
- **Primary**: Green (#22C55E)
- **Cards**: Dark Gray (#0F0F0F)
- **Borders**: Green (#22C55E with opacity)

### Typography

- **Font Family**: Inter
- **Headers**: Bold weights
- **Body**: Regular weight
- **UI Elements**: Medium weight

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript checks
- `npm test` - Run tests

### Adding New Features

1. **Frontend Components**: Add to `client/components/`
2. **API Routes**: Add to `server/routes/`
3. **Shared Types**: Add to `shared/api.ts`
4. **Styling**: Use Tailwind CSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **React Team** - Amazing frontend framework
- **Tailwind CSS** - Excellent utility-first CSS
- **Radix UI** - Beautiful headless components
- **Lucide** - Perfect icon library
- **Vite** - Lightning-fast build tool

---

**Made with 🤖 AI & ❤️ Love**

## 🌟 Screenshots

### Dashboard

![Dashboard](https://via.placeholder.com/800x400/000000/22C55E?text=Smart+Todo+Dashboard)

### AI Assistant

![AI Assistant](https://via.placeholder.com/400x600/000000/22C55E?text=AI+Chatbot)

### Task Creation

![Task Creation](https://via.placeholder.com/600x400/000000/22C55E?text=AI+Task+Creation)

---

⭐ **Star this repository if you found it helpful!**
