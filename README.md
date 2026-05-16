# ArtFlow

A beautiful canvas-based image editor with AI-powered creation, built with Linear design aesthetics.

**Live Demo**: [http://8.217.227.70:3000](http://8.217.227.70:3000)

## Features

- **Infinite Canvas** — Draw, write text, add shapes with tldraw engine
- **Paste Images** — Cmd+V / Ctrl+V to paste screenshots or clipboard images
- **AI Image Generation** — Text-to-image and image-to-image powered by ZhipuAI CogView-4
- **8 Style Presets** — Watercolor, oil painting, Chinese ink, anime, pixel art, and more
- **Smart Prompt Enhancement** — GLM-4 automatically optimizes your descriptions
- **One-Click Brush Cleanup** — Remove all brush strokes before AI generation or export
- **Flexible Export** — Custom aspect ratios (1:1, 4:3, 16:9, free) in PNG/SVG/JSON
- **Linear Design System** — Dark canvas, lavender-blue accent, glassmorphism panels

## Tech Stack

- **Framework**: Next.js + TypeScript
- **Canvas**: tldraw v2
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: ZhipuAI CogView-4 (image) + GLM-4-Flash (prompt enhancement)
- **Animation**: Framer Motion
- **Deploy**: Docker

## Getting Started

### 1. Clone

```bash
git clone https://github.com/ShayLiu/artflow.git
cd artflow
```

### 2. Install

```bash
npm install
```

### 3. Configure API Key

Get your API key from [ZhipuAI Open Platform](https://open.bigmodel.cn):

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
ZHIPU_API_KEY=your_api_key_here
```

> You need a CogView resource package for image generation. Sign up at [open.bigmodel.cn](https://open.bigmodel.cn) and purchase CogView tokens (~¥0.1/image).

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

```bash
docker build -t artflow .
docker run -d -p 3000:3000 \
  -e ZHIPU_API_KEY=your_api_key_here \
  --restart unless-stopped \
  artflow
```

## Usage

1. **Draw** — Use tldraw's built-in tools (pen, shapes, text, arrows)
2. **Paste** — Cmd+V to paste images from clipboard
3. **AI Create** — Click "AI 创作" in toolbar, choose style & size, describe what you want
4. **Enhance Prompt** — Click the ✨ button to auto-optimize your description
5. **Clean Up** — Click "清除画笔" to remove brush strokes
6. **Export** — Click "导出", choose ratio & format, download

## License

MIT
