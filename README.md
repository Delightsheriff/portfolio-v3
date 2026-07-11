# Delight Sheriff Portfolio

A production-ready portfolio built to land senior engineering roles.

**Live:** [delightsheriff.com](https://delightsheriff.com)

## Stack

- **Next.js 16** with React 19, TypeScript
- **Tailwind CSS v4** with semantic design tokens
- **Sanity CMS** for content management
- **Framer Motion** for animations
- **Vercel** for deployment

## Features

- Click sparks on every interactive element
- Dark-first design with Syne typography
- Project case studies with impact metrics and architecture thinking
- Full project visibility control in Sanity Studio
- Project filtering by tech stack and type
- Blog with rich text support
- Responsive mobile-first design
- Zero TypeScript errors

## Getting Started

### Prerequisites
- Node.js v20+
- Sanity project (free at [sanity.io](https://sanity.io))

### Installation

```bash
# Clone
git clone https://github.com/Delightsheriff/portfolio-v3.git
cd portfolio-v3

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your Sanity credentials to .env.local

# Run dev server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

See `.env.example` for required Sanity credentials:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (optional, for publishing)

## Project Structure

```
app/
├── layout.tsx          # Root layout with fonts & metadata
├── page.tsx            # Homepage
├── blog/               # Blog pages
├── projects/           # Projects listing page
├── project/[slug]/     # Individual project case study
├── resume/             # Resume page
├── uses/               # Tech stack page
└── globals.css         # Theme tokens & animations

components/
├── hero.tsx            # Hero section with Open to Work badge
├── works.tsx           # Projects grid
├── project-filter.tsx  # Tech & type filtering
├── about.tsx           # About section
├── experience.tsx      # Experience timeline
├── blog-page.tsx       # Blog listing
├── contact.tsx         # Social icons
├── nav/                # Navbar & footer
└── animations/         # Click sparks, scroll reveals, etc.

schemaTypes/           # Sanity schemas for all content
sanity/                # Sanity client & GROQ queries
```

## Customization

### Change Colors
Edit `app/globals.css` theme tokens:
```css
@theme inline {
  --color-background: oklch(0.09 0.008 240);
  --color-foreground: oklch(0.96 0.006 90);
  --color-highlight: oklch(0.628 0.221 33.05);
}
```

### Add Projects
In Sanity Studio:
1. Create a new **Project** document
2. Fill title, slug, description, stack, project type
3. Add impact metrics and architecture thinking
4. Toggle "Show on Site" to publish

### Add Blog Posts
1. Create a new **Blog** document
2. Add title, slug, body (rich text)
3. Toggle "Show on Site" to publish

### Update About Section
Edit the **About** document in Sanity with bio, skills, and profile image.

## Deployment

### Vercel (Recommended)
```bash
npm run build
git push origin main
```
Connect your GitHub repo to Vercel for auto-deployment.

### Other Platforms
- **Netlify**: Same build process, connect GitHub
- **AWS Amplify**: Connect GitHub repo
- **Self-hosted**: Run `npm run build`, serve `.next` with Node.js

## Performance

- Production build: `npm run build`
- Type checking: `npx tsc --noEmit`
- Animations: 60fps via Framer Motion
- Images: Next.js Image optimization
- Fonts: Google Fonts with `font-display: swap`

## Open Source

This portfolio is open source and available as a template. Use it to build your own hiring-focused portfolio.

Inspired by production principles: clean code, semantic HTML, accessibility first, performance optimized.

## Support

- Questions? Email: delightsheriff@gmail.com
- GitHub: [@Delightsheriff](https://github.com/Delightsheriff)
- LinkedIn: [Delight Sheriff](https://linkedin.com/in/delightsheriff)
