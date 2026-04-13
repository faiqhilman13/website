# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Editing Content

All content is stored in TypeScript files under `src/data/`. Edit these files to update your information:

### Experience (`src/data/experienceData.ts`)
- Work history
- Job responsibilities
- Technologies used
- Time periods

### Education (`src/data/educationData.ts`)
- Degrees and certifications
- Institutions
- Coursework
- Achievements

### Projects (`src/data/projectsData.ts`)
- Project titles and descriptions
- Technologies used
- Key features
- Outcomes

### Leadership (`src/data/leadershipData.ts`)
- Leadership positions
- Organizations
- Achievements
- Skills gained

### Skills (`src/data/skillsData.ts`)
- Technical skills by category
- Proficiency levels
- Tools and technologies

## Customizing Appearance

- Colors and styling: Edit `tailwind.config.js`
- Layout and components: Modify files in `src/components/`
- Global styles: Update `src/index.css`

## Building for Production

Build the website for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Analytics Setup

This site supports optional analytics through environment variables.

1. Copy `.env.example` to `.env.local`
2. Fill in any analytics IDs you want to enable
3. Rebuild and redeploy

Supported variables:

- `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 measurement ID, for example `G-XXXXXXXXXX`
- `VITE_CLOUDFLARE_BEACON_TOKEN`: Cloudflare Web Analytics beacon token

## Google Search Console

Search Console ownership verification still needs to be done at the Google/domain level.
Recommended methods:

- DNS TXT verification on your domain
- Google Analytics ownership if GA4 is set up on the same Google account
- HTML meta tag or verification file once Google gives you the exact token

## Project Structure

```
src/
├── components/     # React components
├── data/          # Content files
├── utils/         # Utility functions
├── App.tsx        # Main app component
└── index.css      # Global styles
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)
