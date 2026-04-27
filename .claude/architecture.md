# .claude/architecture.md - office-assistant-web

## Office Assistant Web - System Architecture

### High-Level Design

```
┌──────────────────────────────────┐
│    User Browser                  │
│  (Office Assistant Web)          │
└────────────────┬─────────────────┘
                 │ HTTPS/API
┌────────────────▼──────────────────────────┐
│      Next.js Frontend (Port 3000)         │
├──────────────────────────────────────────┤
│  App Router (app/ folder):                │
│  ├─ (auth): Login/Signup pages           │
│  └─ (dashboard): Main app pages          │
├──────────────────────────────────────────┤
│  Providers (Root Layout):                 │
│  ├─ Chakra UI + next-themes              │
│  ├─ React Query (TanStack)               │
│  └─ Zustand stores                       │
├──────────────────────────────────────────┤
│  Components Layer:                        │
│  ├─ UI components (Chakra)               │
│  ├─ Feature components (Chat, Docs)      │
│  └─ Layout components                    │
├──────────────────────────────────────────┤
│  State Management:                        │
│  ├─ Zustand (auth, UI state)             │
│  └─ React Query (server state)           │
├──────────────────────────────────────────┤
│  API & Services:                          │
│  ├─ Axios instance (custom config)       │
│  ├─ API calls (chat, documents, auth)    │
│  └─ React Query hooks                    │
└────────────────┬──────────────────────────┘
                 │ HTTPS/REST
┌────────────────▼──────────────────────────┐
│   Backend: office-assistant-agent        │
│   (Fastify on localhost:3001)            │
│                                          │
│   ├─ POST /chat                          │
│   ├─ POST /upload                        │
│   ├─ GET /conversations                  │
│   └─ More endpoints...                   │
└──────────────────────────────────────────┘
```

### Data Flow: User Login

```
1. User fills login form
2. React Hook Form validates with Zod
3. Submit → API call via Axios
4. Backend authenticates via Better Auth
5. Session cookie set in browser
6. Zustand auth store updated
7. Redirect to dashboard
8. React Query refetch conversations
```

### Data Flow: Chat Request

```
1. User types message in MessageInput
2. Validate with Zod schema
3. Show optimistic UI update
4. Submit → Axios POST /chat
5. Show loading state (React Query)
6. Receive response from backend agent
7. Display message in MessageList
8. Update conversation in React Query cache
9. Scroll to latest message
```

### Data Flow: Document Upload

```
1. User selects file
2. Validate file size/type
3. Create FormData
4. POST /upload via Axios
5. Show progress bar
6. On success:
   - Add to documents list (React Query)
   - Show success toast (sonner)
   - Refresh documents query
7. On error:
   - Show error toast
   - Log error
```

### State Management Layers

**Zustand Stores (Client State):**
- auth.ts - User info, login status
- ui.ts - Dark/light mode, sidebar state
- chat.ts - Current conversation, selected message

**React Query (Server State):**
- useConversations - List of all conversations
- useMessages - Messages in current conversation
- useDocuments - User's documents
- useUpload - File upload mutation

**Local Component State:**
- Form inputs (React Hook Form)
- Temporary UI state (accordion open/close)
- Component-level animations

### Component Architecture

```
RootLayout (Providers, Theme, Devtools)
  ├─ Header (Navigation, User Menu)
  ├─ Sidebar (Links, Documents)
  └─ Main Content Area
      ├─ Dashboard Routes
      │   ├─ Chat Page
      │   │   ├─ ChatWindow
      │   │   │   ├─ MessageList
      │   │   │   └─ MessageInput
      │   │   └─ ChatActions
      │   └─ Documents Page
      │       ├─ DocumentUpload
      │       └─ DocumentList
      └─ Auth Routes
          ├─ Login Page
          └─ Signup Page
```

### API Integration Points

**Backend URL:** `process.env.NEXT_PUBLIC_API_URL` (set in .env)

**Authentication:**
- Cookies sent automatically by axios interceptors
- Redirect to login on 401 errors

**Request/Response Flow:**
1. Component calls React Query hook
2. Hook calls service function
3. Service calls Axios instance
4. Axios adds auth headers, handles errors
5. Response cached by React Query
6. Component updates with data

### Error Handling

**Levels:**
1. Network errors - Axios interceptor → toast
2. API errors (4xx/5xx) - Service layer → user message
3. Component errors - Error boundary → fallback UI
4. Form errors - React Hook Form + Zod → inline messages

**User Feedback:**
- sonner for quick notifications
- Error boundary for crashed sections
- Inline form validation messages
- Loading spinners for async operations

### Performance Optimization

**Code Splitting:**
- Next.js automatic route splitting
- Dynamic imports for heavy components

**Caching:**
- React Query cache management
- Browser cache headers from backend
- Session storage for temp data

**Rendering:**
- Client-side rendering (CSR) for interactive features
- Memoization for expensive components
- Debounced search/filtering (300ms)

### Accessibility

- Chakra UI built-in a11y support
- Form labels with proper associations
- ARIA labels for dynamic content
- Keyboard navigation support

