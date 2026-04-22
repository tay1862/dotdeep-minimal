# DotDeep Configuration Guide

## Environment Variables Setup for Production

### For Sanity Studio (Draft Mode Preview)

When deploying to production, set these environment variables in your Vercel project:

**For Sanity Studio** (studio/.env.production.local or Vercel project settings):
```env
SANITY_STUDIO_PROJECT_ID=<your_project_id>
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2024-01-15
# CRITICAL for presentation tool visual editing:
SANITY_STUDIO_PREVIEW_URL=https://dotdeep.vercel.app
```

**For Frontend** (frontend/.env.production.local or Vercel project settings):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-15
NEXT_PUBLIC_SITE_URL=https://dotdeep.vercel.app
SANITY_API_READ_TOKEN=<your_read_token>
SANITY_API_WRITE_TOKEN=<your_write_token>  # Only for draft mode
```

## Fonts Configuration

### Lao (Hinsiew Font)
- **File**: Frontend uses `Hinsiew-Regular.otf`, `Hinsiew-Bold.otf`, `Hinsiew-SemiBoldItalic.otf`
- **CSS Variable**: `--font-hinsiew`
- **Tailwind Class**: `font-lao`
- **Applied to**: All Lao language content via `locale === 'lo'` checks

### Thai (Noto Sans Thai)
- **Font**: Google Fonts `Noto_Sans_Thai`
- **CSS Variable**: `--font-noto-thai`
- **Tailwind Class**: `font-thai`

### English (General Sans + Satoshi)
- **Display Font**: `GeneralSans` (self-hosted)
- **Body Font**: `Satoshi` (self-hosted)

## Font Usage Pattern

All heading and body text that displays Lao content should conditionally use `font-lao`:

```tsx
<h1 className={`text-fluid-2xl font-display font-bold ${locale === 'lo' ? 'font-lao' : ''}`}>
  {content}
</h1>
```

Use the helper utility function from `app/utils/locale.ts`:
```tsx
import { getHeadingClasses } from '@/app/utils/locale'

<h1 className={getHeadingClasses(locale, 'text-fluid-2xl font-bold')}>
  {content}
</h1>
```

## Vercel Deployment Checklist

### Frontend Environment Variables (Vercel Dashboard)
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID=u0fnsyxd`
- [ ] `NEXT_PUBLIC_SANITY_DATASET=production`
- [ ] `NEXT_PUBLIC_SITE_URL=https://dotdeep.vercel.app`
- [ ] `SANITY_API_READ_TOKEN=<your_read_token>` (from .env.local)
- [ ] `SANITY_API_WRITE_TOKEN=<your_write_token>` (from .env.local)
- [ ] `RESEND_API_KEY=<your_resend_key>` (from .env.local)
- [ ] `CONTACT_EMAIL=totayk186@gmail.com`

### Studio Environment Variables (Vercel Dashboard - if deploying studio)
- [ ] `SANITY_STUDIO_PROJECT_ID=u0fnsyxd`
- [ ] `SANITY_STUDIO_DATASET=production`
- [ ] `SANITY_STUDIO_PREVIEW_URL=https://dotdeep.vercel.app`

### Vercel Project Settings
- [ ] Root Directory: `frontend`
- [ ] Framework Preset: Next.js
- [ ] Node Version: 18.x or higher

### Post-Deployment
- [ ] Test presentation tool visual editing from Sanity Studio
- [ ] Verify all Lao text renders with Hinsiew font
- [ ] Test contact form email delivery
- [ ] Verify all 3 locales (en, th, lo) work correctly
- [ ] Check dark mode toggle functionality
