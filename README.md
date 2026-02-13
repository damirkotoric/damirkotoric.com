# damirkotoric.com

Personal portfolio website.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion (Framer Motion)

## Development

```bash
pnpm dev
```

## Image Conversion

Portfolio images are converted to AVIF using ffmpeg.

### Command

```bash
ffmpeg -i input.png -c:v libaom-av1 -crf 28 -still-picture 1 output.avif -y
```

### CRF Settings

- **CRF 28** - Default (good quality/size balance)
- **CRF 32** - Higher compression for large images
- Lower CRF = higher quality, larger file
- Higher CRF = more compression, smaller file

## Portfolio System

Portfolio projects are defined in `src/lib/portfolio-data.ts`.

### Image Block Layouts

- `full` - Full-width image
- `grid-2` - Two-column grid
- `grid-3` - Three-column grid

### Interactive Covers

Animated cover backgrounds are mapped in `src/components/portfolio-cover.tsx`:

1. Create component (e.g., `src/components/project-bg.tsx`)
2. Import and add to `interactiveCovers` map
