# .claude/coding-standards.md - office-assistant-web

## TypeScript Settings

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "preserve",
    "jsxImportSource": "@emotion/react",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  }
}
```

## Component Structure

**Functional Components Only:**
```tsx
// ✅ CORRECT
interface MessageProps {
  text: string;
  author: string;
}

const Message: React.FC<MessageProps> = ({ text, author }) => {
  return <Box>{text} by {author}</Box>;
};

// ❌ WRONG - Class component
class Message extends React.Component {
  render() { ... }
}
```

## Chakra UI Usage

**Always use Chakra components:**
```tsx
// ✅ CORRECT
import { Box, VStack, Button, Input } from '@chakra-ui/react';

export const ChatInput = () => {
  return (
    <VStack>
      <Input placeholder="Type message..." />
      <Button colorScheme="blue">Send</Button>
    </VStack>
  );
};

// ❌ WRONG
import styled from 'styled-components';
const InputBox = styled.input`...`;
```

## React Hook Form + Zod

**All forms must use these together:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 chars'),
});

type LoginInput = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
};
```

## React Query (TanStack)

**For all server state:**
```tsx
// ✅ CORRECT
import { useQuery } from '@tanstack/react-query';

export const ConversationsList = () => {
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => api.getConversations(),
  });

  if (isLoading) return <Spinner />;
  return <VStack>{conversations?.map(c => <Text key={c.id}>{c.title}</Text>)}</VStack>;
};

// ❌ WRONG - useEffect + useState
const [conversations, setConversations] = useState([]);
useEffect(() => {
  api.getConversations().then(setConversations);
}, []);
```

## Zustand Stores

**For client state only:**
```tsx
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage in component:
const { user, logout } = useAuthStore();
```

## Type Definitions

**Centralize in types/ folder:**
```tsx
// types/api.ts
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

// Use everywhere:
import { Conversation, Message } from '@/types/api';
```

## Import Organization

**Order imports logically:**
```tsx
// 1. React & external libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Chakra UI
import { Box, VStack, Button } from '@chakra-ui/react';

// 3. Local imports
import { useAuthStore } from '@/store/auth';
import { MessageList } from '@/components/features/Chat/MessageList';
import { Conversation } from '@/types/api';

// ❌ WRONG - Mixed import order
import MessageList from '@/components/features/Chat/MessageList';
import React from 'react';
import { Box } from '@chakra-ui/react';
```

## Error Handling

**Use error boundaries:**
```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}) {
  return <Box color="red.500">Error: {error.message}</Box>;
}

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ChatWindow />
  </ErrorBoundary>
);
```

**Use try-catch in async functions:**
```tsx
const handleSubmit = async (data: Message) => {
  try {
    const response = await api.sendMessage(data);
    return response;
  } catch (error) {
    toast.error('Failed to send message');
    console.error(error);
    throw error;
  }
};
```

## Notifications

**Always use sonner:**
```tsx
import { toast } from 'sonner';

// Success
toast.success('Message sent!');

// Error
toast.error('Failed to send message');

// Loading
const { promise } = toast.promise(
  asyncFunction(),
  {
    loading: 'Sending...',
    success: 'Sent!',
    error: 'Failed to send',
  }
);

// ❌ WRONG - Alert
alert('Success!');
```

## File Size Guidelines

- **Components:** Max 200 lines (extract smaller pieces)
- **Pages:** Max 150 lines (move logic to custom hooks)
- **Custom hooks:** Max 100 lines
- **Store files:** Max 100 lines
- **Service files:** Max 100 lines per file

## Naming Conventions

**Components:** PascalCase → `MessageList.tsx`, `ChatWindow.tsx`
**Hooks:** camelCase, usePrefix → `useChat.ts`, `useDocuments.ts`
**Stores:** camelCase → `auth.ts`, `ui.ts`
**Services:** camelCase → `api.ts`, `queries.ts`
**Types:** camelCase → `api.ts`, `domain.ts`
**Constants:** UPPER_SNAKE_CASE → `MAX_FILE_SIZE = 10485760`
**Variables:** camelCase → `conversationId`, `isLoading`

## Code Review Checklist

- [ ] No `any` types
- [ ] All components < 200 lines
- [ ] Using Chakra UI (not custom CSS)
- [ ] Using React Hook Form for forms
- [ ] Using Zod for validation
- [ ] Using React Query for server state
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] No console.log (use proper logging)
- [ ] Follows naming conventions
- [ ] Types centralized in types/ folder
- [ ] No prop drilling (use Zustand)

