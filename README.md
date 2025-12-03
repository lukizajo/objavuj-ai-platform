# OBJAVUJ-AI Educational Platform

An AI-focused educational platform built with React, TypeScript, and TailwindCSS. Features a modern UI with dark mode, multi-language support, and a Supabase-ready architecture.

## Live Demo

**Deployed URL**: https://ntd8m8nqnb84.space.minimax.io

## Features

- **Dark/Light Theme** - Toggle with smooth transitions, saved to localStorage
- **Multi-language Support** - Slovak, Czech, and English
- **Audio Player** - For lesson recordings with play/pause, progress, volume
- **Floating AI Assistant** - Bottom panel in course player (mock responses)
- **Podcast Section** - Spotify integration on homepage
- **Course Player** - Video, markdown content, downloadable materials
- **Progress Tracking** - Mark lessons as complete
- **Protected Routes** - Authentication guards
- **Supabase-Ready** - Switch between mock and real data

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Navigate to project
cd objavuj-ai

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm run build
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Available Settings

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_DATA_SOURCE` | Data source: `mock` or `supabase` | `mock` |
| `VITE_SUPABASE_URL` | Your Supabase project URL | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | - |
| `VITE_OPENAI_API_KEY` | OpenAI API key (for AI assistant) | - |
| `VITE_AI_MODEL` | AI model to use | `gpt-4o-mini` |

### Mock Mode (Default)

By default, the application runs in mock mode with sample data. No external services required.

```env
VITE_DATA_SOURCE=mock
```

Features in mock mode:
- Sample courses, modules, and lessons
- Demo login (any email/password works)
- Local progress tracking via localStorage
- Mock AI assistant responses

### Supabase Mode

To enable real authentication and data persistence:

1. Create a Supabase project at https://supabase.com
2. Run the database schema (see below)
3. Configure environment variables:

```env
VITE_DATA_SOURCE=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database Setup (Supabase)

### 1. Create Tables

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy and run contents from supabase_schema.sql
```

### 2. Enable Authentication

1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)

### 3. Tables Overview

| Table | Description |
|-------|-------------|
| `profiles` | User profiles linked to auth.users |
| `courses` | Course catalog |
| `modules` | Course modules/sections |
| `lessons` | Individual lessons with content |
| `lesson_files` | Downloadable materials |
| `user_progress` | Lesson completion tracking |
| `chat_messages` | AI assistant chat history |

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication (ProtectedRoute)
│   ├── course/         # Course components (FloatingAIAssistant, etc.)
│   ├── lesson/         # Lesson content (LessonContent)
│   └── ui/             # Reusable UI (Button, Card, AudioPlayer, etc.)
├── hooks/              # Custom hooks (useTranslation)
├── i18n/               # Translations (SK/CZ/EN)
├── lib/                # Core utilities
│   ├── config.ts       # App configuration
│   ├── supabase.ts     # Supabase client
│   ├── dataLayer.ts    # Data abstraction layer
│   └── mockData.ts     # Mock data for development
├── layouts/            # Page layouts (MainLayout, PlayerLayout)
├── pages/              # Page components
└── stores/             # Zustand stores (auth, theme, language)
```

## Authentication

### Mock Mode

- Use any email/password to log in
- Click "Demo Login" for instant access
- State persisted in localStorage

### Supabase Mode

Full email/password authentication with:
- User registration with email verification
- Password reset
- Session management
- Profile data storage

## AI Assistant

The floating AI assistant appears at the bottom of the course player.

### Current Behavior (Mock)
- Shows placeholder responses
- Demonstrates UI interaction

### Enabling Real AI

1. Get an OpenAI API key from https://platform.openai.com
2. Add to environment:
   ```env
   VITE_OPENAI_API_KEY=sk-...
   ```
3. Create a Supabase Edge Function for secure API calls:

```typescript
// supabase/functions/ai-chat/index.ts
Deno.serve(async (req) => {
  const { message, context } = await req.json()
  const apiKey = Deno.env.get('OPENAI_API_KEY')
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `AI learning assistant. Context: ${context}` },
        { role: 'user', content: message }
      ],
    }),
  })
  
  const data = await response.json()
  return new Response(JSON.stringify({ response: data.choices[0].message.content }))
})
```

## Internationalization

Supported languages:
- **SK** - Slovak (default)
- **CZ** - Czech
- **EN** - English

Language preference saved to localStorage. Translations in `src/i18n/translations.ts`.

## Theming

### Dark Mode Colors

```css
--dark-background: #0A0A0A
--dark-card: #111827
--dark-muted: #1F2937
--dark-text-primary: #F9FAFB
--dark-text-secondary: #9CA3AF
--dark-border: #374151
```

### Light Mode Colors

```css
--background: #F8FAFC
--card: #FFFFFF
--primary: #FF8A26 (Orange)
--secondary: #0A2238 (Deep Blue)
--success: #0C2A1D (Green)
--community: #B8205B (Pink)
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Routing
- **React Markdown** - Content rendering
- **Supabase** - Backend (optional)
- **Lucide Icons** - Icon library

## Scripts

```bash
pnpm run dev      # Start development server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
pnpm run lint     # Run ESLint
```

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Framework: Vite
   - Build: `pnpm build`
   - Output: `dist`

### Environment Variables in Production

Set these in your hosting platform:
- `VITE_DATA_SOURCE`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## License

MIT License - feel free to use for your own projects.

## Credits

Built with React, TailwindCSS, Zustand, and Lucide Icons.
