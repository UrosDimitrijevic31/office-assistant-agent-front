# .claude/database-schema.md - office-assistant-web

## Note: This Frontend Does NOT Access Database Directly

The frontend communicates with the backend API only. All database operations happen on the backend.

## Backend Database Schema (Reference)

**Conversations Table:**
- id (UUID)
- user_id (UUID)
- title (string)
- status (active|archived)
- created_at, updated_at

**Messages Table:**
- id (serial)
- conversation_id (UUID)
- role (user|assistant)
- content (text)
- tool_name (optional)
- token_count (optional)
- created_at

**Documents Table:**
- id (UUID)
- user_id (UUID)
- file_name (string)
- file_size (integer)
- anthropic_file_id (string)
- vectorized (boolean)
- created_at

## Frontend Type Definitions

See `types/api.ts` for TypeScript interfaces matching backend schema.

```typescript
export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
}
```

For actual database schema and queries, see backend documentation in office-assistant-agent.

