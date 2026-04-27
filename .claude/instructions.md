# .claude/instructions.md - office-assistant-web

## Project: Office Assistant Web

**Purpose:** Modern React/Next.js frontend for office-assistant-agent backend
**Framework:** Next.js 16.2.4
**UI Library:** Chakra UI 3.35.0
**State Management:** Zustand 5.0.12
**Data Fetching:** React Query (TanStack) 5.100.5

---

## ✅ Established Tech Stack

### Core Framework
- **Framework:** Next.js 16.2.4 (App Router by default)
- **Runtime:** React 19.2.4
- **Language:** TypeScript 5
- **Package Manager:** npm

### UI & Styling
- **Component Library:** Chakra UI 3.35.0
- **Styling Engine:** @emotion/react 11.14.0
- **Theme Support:** next-themes 0.4.6 (light/dark mode)

### State Management & Data
- **State:** Zustand 5.0.12 (client state)
- **Server State:** TanStack React Query 5.100.5 (@tanstack/react-query)
- **Async Form:** React Hook Form 7.74.0
- **Form Validation:** Zod 4.3.6 (with @hookform/resolvers)
- **HTTP Client:** Axios 1.15.2

### Utilities
- **Date Handling:** date-fns 4.1.0
- **Error Boundary:** react-error-boundary 6.1.1
- **Notifications:** sonner 2.0.7 (toast notifications)
- **Devtools:** @tanstack/react-query-devtools 5.100.5

### Developer Tools
- **Linting:** ESLint 9 + next/eslint-config
- **Type Checking:** TypeScript 5

---

## 📁 Project Structure

```
office-assistant-web/
├── app/
│   ├── layout.tsx                  # Root layout (providers, theme)
│   ├── page.tsx                    # Home page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── (dashboard)/
│       ├── chat/
│       │   ├── page.tsx            # Chat interface
│       │   └── [id]/page.tsx       # Conversation detail
│       ├── documents/
│       │   └── page.tsx            # Document management
│       └── layout.tsx              # Dashboard layout
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Chakra UI wrapper
│   │   ├── Input.tsx               # Form input
│   │   ├── Card.tsx                # Card component
│   │   ├── Modal.tsx               # Modal dialog
│   │   └── Toast.tsx               # Toast notifications
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation
│   │   ├── Sidebar.tsx             # Left sidebar
│   │   └── Layout.tsx              # Main layout wrapper
│   ├── features/
│   │   ├── Chat/
│   │   │   ├── ChatWindow.tsx      # Chat UI
│   │   │   ├── MessageList.tsx     # Message display
│   │   │   ├── MessageInput.tsx    # Message input form
│   │   │   └── ChatActions.tsx     # Tool actions (Jira, Calendar)
│   │   ├── Documents/
│   │   │   ├── DocumentUpload.tsx  # File upload
│   │   │   ├── DocumentList.tsx    # Document list
│   │   │   └── DocumentCard.tsx    # Document item
│   │   └── Common/
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   └── providers/
│       ├── ThemeProvider.tsx       # Chakra UI + next-themes
│       ├── QueryProvider.tsx       # React Query wrapper
│       └── RootProviders.tsx       # All providers combined
├── hooks/
│   ├── useChat.ts                  # Chat conversation hook
│   ├── useDocuments.ts             # Document management hook
│   ├── useAuth.ts                  # Authentication hook
│   └── useLocalStorage.ts          # LocalStorage hook
├── lib/
│   ├── api.ts                      # Axios instance + interceptors
│   ├── api-client.ts               # API request helpers
│   ├── errors.ts                   # Error handling
│   ├── env.ts                      # Environment validation
│   └── utils.ts                    # Utility functions
├── store/
│   ├── auth.ts                     # Zustand auth store
│   ├── ui.ts                       # UI state store
│   └── chat.ts                     # Chat state store
├── types/
│   ├── api.ts                      # Backend API types
│   ├── ui.ts                       # UI component types
│   └── domain.ts                   # Business domain types
├── services/
│   ├── api/
│   │   ├── chat.ts                 # Chat API calls
│   │   ├── documents.ts            # Document API calls
│   │   └── auth.ts                 # Auth API calls
│   └── queries/
│       ├── useConversations.ts     # React Query hooks
│       ├── useMessages.ts
│       └── useDocuments.ts
├── .env.example                    # Environment variables template
├── .claude/                        # Claude context (this folder)
├── tsconfig.json                   # TypeScript config
├── eslint.config.mjs               # ESLint rules
├── next.config.ts                  # Next.js config
└── package.json                    # Dependencies
```

---

## ✅ DO's

**Architecture & Design**
- ✅ Use Next.js App Router (not Pages Router)
- ✅ Use Chakra UI for all UI components
- ✅ Use Zustand for client state (auth, UI)
- ✅ Use React Query for server state (conversations, documents)
- ✅ Use React Hook Form for all forms
- ✅ Use Zod for form validation
- ✅ Use Axios with custom instance for API calls
- ✅ Use next-themes for dark/light mode

**Code Organization**
- ✅ Put pages in app/ folder (App Router)
- ✅ Put components in components/ folder
- ✅ Put API calls in services/api/
- ✅ Put React Query hooks in services/queries/
- ✅ Put Zustand stores in store/ folder
- ✅ Put types in types/ folder
- ✅ Keep custom hooks in hooks/ folder
- ✅ Keep utilities in lib/ folder

**React & TypeScript**
- ✅ Use functional components only
- ✅ Use TypeScript for all files (.tsx, .ts)
- ✅ Write explicit types, no `any`
- ✅ Use `React.FC<Props>` for components
- ✅ Use error boundaries for error handling
- ✅ Handle loading states with React Query
- ✅ Use React Query for API state management

**Forms & Validation**
- ✅ Use React Hook Form for all forms
- ✅ Use Zod for validation schemas
- ✅ Use @hookform/resolvers for integration
- ✅ Show validation errors clearly
- ✅ Use sonner for toast notifications

**Styling**
- ✅ Use Chakra UI components exclusively
- ✅ Use Chakra's `useColorMode()` for theme switching
- ✅ Use `Box`, `Stack`, `Grid` for layouts
- ✅ Use theme tokens for spacing, colors, sizes
- ✅ Avoid custom CSS (use Chakra props)

---

## ❌ DON'Ts

**Forbidden Patterns**
- ❌ Use styled-components or Tailwind CSS (use Chakra UI)
- ❌ Use Redux or Context API (use Zustand)
- ❌ Use fetch() directly (use Axios)
- ❌ Use Pages Router (use App Router)
- ❌ Use regular HTML form handling (use React Hook Form)
- ❌ Store server state in Zustand (use React Query)

**Code Anti-Patterns**
- ❌ Use `any` type
- ❌ Fetch data in useEffect (use React Query)
- ❌ Prop drilling deeply (use Zustand stores)
- ❌ Custom CSS files (use Chakra props + Emotion)
- ❌ Component files longer than 200 lines
- ❌ Hardcoded API URLs (use env variables)
- ❌ Direct localStorage access (create useLocalStorage hook)

**React Anti-Patterns**
- ❌ Class components (use functional)
- ❌ useState for server data (use React Query)
- ❌ Missing error boundaries
- ❌ Unhandled promise rejections
- ❌ Missing loading states in async operations
- ❌ Direct DOM manipulation

**Architecture Anti-Patterns**
- ❌ API logic in components (put in services/)
- ❌ Types scattered everywhere (centralize in types/)
- ❌ Deep component nesting (extract to separate components)
- ❌ Mixed concerns (UI, logic, types separate)

---

## 📋 File Naming Conventions

**Pages:** PascalCase → `ChatPage.tsx`
**Components:** PascalCase → `MessageList.tsx`, `ChatWindow.tsx`
**Hooks:** camelCase, usePrefix → `useChat.ts`, `useDocuments.ts`
**Stores:** camelCase → `auth.ts`, `ui.ts`, `chat.ts`
**Services:** camelCase → `api.ts`, `queries.ts`
**Types:** camelCase → `api.ts`, `ui.ts`, `domain.ts`
**Utilities:** camelCase → `utils.ts`, `env.ts`

---

## 🔧 Development Workflow

### Local Setup
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your backend API URL

npm run dev
# Runs on http://localhost:3000
```

### Before Committing
```bash
npm run lint
npm run build  # Type-check & build
```

### Building for Production
```bash
npm run build
npm start
```

---

## 📊 Constraints

- Max conversation display: 100 messages (paginate)
- File upload max size: 10MB
- API timeout: 30 seconds
- Debounce search: 300ms
- Rate limit awareness: Check backend limits

---

## 🎯 API Integration Points

Your frontend connects to office-assistant-agent backend:

**Endpoints:**
- POST /chat → Send message to agent
- POST /upload → Upload document
- GET /conversations → List conversations
- GET /conversations/:id → Get conversation with messages
- DELETE /conversations/:id → Delete conversation

**Authentication:**
- Better Auth sessions (via cookies)
- Store auth state in Zustand

**Error Handling:**
- Use error-boundary for crashed components
- Show error toast with sonner
- Display user-friendly error messages

---

## 🎨 Chakra UI + next-themes Setup

**Always use Chakra components:**
```tsx
// ✅ CORRECT
import { Box, Stack, Button } from '@chakra-ui/react'

// ❌ WRONG
import styled from 'styled-components'
const StyledBox = styled.div`...`
```

**Theme switching:**
```tsx
const { colorMode, toggleColorMode } = useColorMode()
// next-themes handles persistence automatically
```

---

## 🔄 React Query Setup

**For all server state:**
```tsx
// ✅ CORRECT
const { data: conversations, isLoading } = useQuery({
  queryKey: ['conversations'],
  queryFn: () => api.getConversations()
})

// ❌ WRONG
const [conversations, setConversations] = useState([])
useEffect(() => {
  api.getConversations().then(setConversations)
}, [])
```

---

## 💾 Zustand Setup

**For client state only:**
```tsx
// ✅ CORRECT
const authStore = create(state => ({
  user: null,
  setUser: (user) => state({ user })
}))

// ❌ WRONG
const [user, setUser] = useState(null) // For global state
```

---

## 📝 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, perf, test, chore
Scopes: chat, documents, auth, ui, form, api

Example:
```
feat(chat): add message input validation

- Add Zod schema for message validation
- Show validation errors in toast
- Disable send button during submission

Fixes #42
```

---

## Summary

This is a **modern Next.js + React 19 frontend** using Chakra UI, Zustand, React Query, and React Hook Form. It's a professional, maintainable, and scalable frontend application for the office-assistant-agent platform.

Follow these patterns and your code will be consistent, performant, and high-quality.
