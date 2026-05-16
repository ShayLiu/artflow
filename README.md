# ArtFlow

A beautiful canvas-based image editor with AI-powered creation.

## Features

- Infinite canvas with drawing tools (pen, shapes, text, arrows)
- Paste images from clipboard (Cmd+V / Ctrl+V)
- AI-powered image inpainting via ZhipuAI CogView
- Export with custom aspect ratios (1:1, 4:3, 16:9, free)
- Warm beige aesthetic with glassmorphism UI

## Tech Stack

- Next.js + TypeScript
- tldraw (canvas engine)
- Tailwind CSS + shadcn/ui
- ZhipuAI CogView API
- Docker ready for deployment

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your ZHIPU_API_KEY
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
docker build -t artflow .
docker run -p 3000:3000 --env-file .env.local artflow
```

## License

MIT
