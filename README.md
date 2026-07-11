# Delight Sheriff Portfolio v3

A production-ready, 10/10 portfolio built to land senior engineering roles. Modern design with delightful micro-interactions, content management via Sanity, and optimized for hiring managers.

**Live Demo:** [delightsheriff.dev](https://delightsheriff.dev)  
**Open Source:** Use this as a template for your own hiring-focused portfolio.

## Why This Portfolio?

Most portfolios are boring. This one isn't. It combines:

- **Spark animations** that fire on every click (delightful, not distracting)
- **Dark-first design** with editorial typography (Syne headings, Inter body)
- **Impact metrics** that animate on scroll (50% faster, 10k users, etc.)
- **Project grouping** to show full-stack systems (frontend + backend + mobile)
- **Case studies** with architecture thinking (Why Node + Postgres? Why React Native?)
- **Sanity CMS integration** with visibility toggles (no redeploying to hide content)
- **Zero TypeScript errors** and production-optimized build
- **Magnetic cursor** on homepage for premium feel

This portfolio is designed for engineering hiring managers who care about problem-solving, not just pretty colors.

## Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS v4 with semantic design tokens
- **CMS:** Sanity headless CMS with GROQ queries
- **Animations:** Framer Motion + custom spark/glow effects
- **Deployment:** Vercel (push-to-deploy)
- **Language:** TypeScript with strict typing
- **Fonts:** Syne (headings), Inter (body), Playfair Display (serif), JetBrains Mono (code)

## Features

### Content Management
- **Projects:** Showcase case studies with architecture, impact metrics, and links (GitHub, live demo, API docs, demo video)
- **Project Groups:** Show connected systems (mobile app + backend API + infrastructure)
- **Experience:** Timeline of roles with achievements
- **About:** Bio, skills grid, profile image
- **Blog:** Technical articles with rich text and Portable Text support
- **Uses:** Stack of tools, frameworks, and AI tools you use daily
- **Visibility Toggles:** Hide/show any section without code changes

### Animations
- **Click Sparks:** Orange particle burst on every link, button, and interactive element
- **Glow Pulse:** Infinitely pulsing glow on primary CTAs
- **Animated Counters:** Impact metrics count up on scroll (e.g., "50% latency reduction")
- **Scroll Reveals:** Staggered fade-ins on case study sections
- **Magnetic Cursor:** Premium feel on homepage (optional)
- **Theme Toggle:** Smooth dark/light mode switch

### Performance & Accessibility
- Mobile-first responsive design
- Semantic HTML with ARIA labels
- Zero TypeScript errors
- Optimized images with Next.js Image component
- 60fps animations
- Production build: `npm run build`

## Getting Started

### Prerequisites
- Node.js v20+
- npm or pnpm
- A Sanity project (create free at [sanity.io](https://sanity.io))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Delightsheriff/portfolio-v3.git
   cd portfolio-v3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` from template:**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your Sanity credentials:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Create a new project or select existing
   - Copy your Project ID and Dataset name
   - Paste into `.env.local`

5. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

6. **Access Sanity Studio:**
   Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content

## Project Structure

```
portfolio-v3/
├── app/                           # Next.js 16 App Router
│   ├── page.tsx                   # Homepage with hero, work, experience, about
│   ├── blog/                      # Blog listing page
│   ├── blog/[slug]/               # Individual blog post
│   ├── projects/                  # All projects archive
│   ├── project/[slug]/            # Individual case study
│   ├── resume/                    # Resume page
│   ├── uses/                      # Stack/tools page
│   ├── layout.tsx                 # Root layout with fonts and theme
│   └── globals.css                # Design tokens and animations
├── components/
│   ├── animations/                # Click sparks, glow pulse, animated counter
│   │   ├── click-spark.tsx        # Particle burst logic
│   │   ├── spark-button.tsx       # SparkLink & SparkButton wrappers
│   │   ├── spark-next-link.tsx    # Next.js Link with sparks
│   │   ├── custom-cursor.tsx      # Magnetic cursor (optional)
│   │   └── click-spark-provider.tsx
│   ├── nav/
│   │   ├── navbar.tsx             # Desktop & mobile navigation
│   │   ├── footer.tsx             # Footer with links
│   │   └── theme-toggle.tsx       # Dark/light mode
│   ├── hero.tsx                   # Hero section with glowing CTA
│   ├── works.tsx                  # Project cards + groups
│   ├── project-card.tsx           # Individual project card
│   ├── project-group-card.tsx     # Grouped projects (mobile + backend)
│   ├── experience.tsx             # Timeline of roles
│   ├── about.tsx                  # Bio + skills grid
│   ├── blog-page.tsx              # Blog listing with empty state
│   ├── projects-page.tsx          # All projects archive
│   ├── uses-page.tsx              # Stack listing
│   └── ui/                        # shadcn/ui components
├── sanity/
│   ├── sanity.ts                  # GROQ queries (getProjects, getBlogBySlug, etc.)
│   ├── sanity.client.ts           # Sanity client config
│   └── index.ts                   # Sanity exports
├── schemaTypes/                   # Sanity content models
│   ├── project.ts                 # Project case study schema
│   ├── project-group.ts           # Grouped projects schema
│   ├── blog.ts                    # Blog post schema
│   ├── hero.ts                    # Hero section content
│   ├── about.ts                   # About section content
│   ├── experience.ts              # Resume experience
│   ├── resume.ts                  # Resume page
│   ├── uses.ts                    # Stack/tools listing
│   └── video-pitch.ts             # Optional video pitch section
├── lib/
│   ├── utils.ts                   # Helper functions
│   └── env.ts                     # Environment variable validation
├── interface/                     # TypeScript types
│   └── sanity.ts                  # Sanity schema interfaces
├── public/                        # Static assets
└── IMPROVEMENTS.md                # List of enhancement ideas
```

## Customization Guide

### Change Your Name & Title
1. Open Sanity Studio: `http://localhost:3000/studio`
2. Create a **Hero** document with your name and headline
3. Add your stack pills (e.g., React, Node.js, TypeScript)

### Add Your Projects
1. In Sanity Studio, create a **Project** document
2. Add title, description, GitHub link, live URL
3. Add **impact metric** (e.g., "50% faster API", "10k monthly users")
4. Add **architecture paragraph** explaining your tech choices
5. Set visibility toggle to true
6. Publish

### Add Your Experience
1. Create **Experience** documents for each role
2. Add company, role, dates, achievements
3. Set visibility to true

### Customize Colors
Edit `app/globals.css` to change design tokens:
```css
@theme inline {
  --color-background: oklch(0.09 0.008 240);    /* Near-black */
  --color-foreground: oklch(0.96 0.006 90);     /* Warm white */
  --color-highlight: oklch(0.628 0.221 33.05);  /* Orange accent */
}
```

### Write Blog Posts
1. In Sanity Studio, create a **Blog** document
2. Add title, excerpt, body (rich text with Portable Text support)
3. Set publication date and visibility
4. Access at `/blog` and `/blog/[slug]`

### Disable Sections
Use visibility toggles in Sanity:
- Hide projects: Project visibility toggle
- Hide blog: Blog visibility toggle
- Hide experience: Experience visibility toggle
- Hide entire sections: Hero, About, Resume, Uses visibility toggles

## Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables (see `.env.example`)
5. Deploy

Vercel handles zero-downtime deployments automatically.

### Alternative Hosts
This is a standard Next.js app, so it works on:
- Netlify
- AWS Amplify
- Railway
- Self-hosted (Docker)

## Environment Variables

See `.env.example` for all required variables. Key ones:

| Variable | Required | Source |
|----------|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Same as above |
| `SANITY_API_READ_TOKEN` | No | For published content only |

## Performance

- **Lighthouse:** 90+ on all metrics
- **Build Time:** ~30 seconds
- **Bundle Size:** ~150KB gzipped
- **First Contentful Paint:** <1s
- **Animations:** 60fps on modern browsers

## Troubleshooting

### Sanity queries failing at build time
The client has fallback values for missing env vars. This is intentional to prevent build failures in CI/CD.

### Click sparks not showing
Ensure `ClickSparkProvider` wraps your app in `layout.tsx`. It should wrap the entire app except the HTML element.

### Animations feel janky
Check DevTools performance tab. Ensure no layout thrashing. All animations use transform and opacity (GPU-optimized).

### Blog posts not showing
1. Check visibility toggle in Sanity (must be true)
2. Ensure `publishedAt` is set
3. Rebuild/redeploy

## Learning Resources

- **Next.js 16:** https://nextjs.org/docs
- **Sanity CMS:** https://www.sanity.io/docs
- **Framer Motion:** https://www.framer.com/motion
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org/docs

## Contributing

This is an open-source portfolio template. Contributions welcome:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see `LICENSE` file for details. Feel free to use this for your own portfolio.

## Inspiration & Credits

Built with love to help engineers land their dream roles. Inspired by best practices from:
- Vercel design system
- Raycast UI patterns
- Premium portfolio sites
- Hiring manager feedback

## Share Your Portfolio

If you use this template, consider sharing your portfolio:
1. Deploy to your domain
2. Add your projects and content
3. Share the link with hiring managers, on social, and in job applications

Portfolio as a competitive advantage: most engineers don't have one. You will.

---

Questions? Open an issue or reach out at [hello@delightsheriff.dev](mailto:hello@delightsheriff.dev)
