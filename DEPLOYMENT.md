# Card-Genie Deployment Guide

## Deploy to Vercel (Recommended - Free)

Vercel offers the best free hosting for Next.js applications with automatic deployments.

### Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com - it's free)
3. PostgreSQL database (we'll use Vercel Postgres - also free)

### Step 1: Prepare Your Repository

Your code is already pushed to GitHub on branch `claude/card-genie-app-Tk9eQ`.

### Step 2: Set Up Vercel Postgres (Free)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name: `card-genie-db`
6. Select region closest to you
7. Click "Create"

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository: `anilvignesh/test-app`
4. Select branch: `claude/card-genie-app-Tk9eQ`
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. **Environment Variables** - Add these:
   ```
   DATABASE_URL=          [Will be auto-filled from Vercel Postgres]
   NEXTAUTH_URL=          https://your-app-name.vercel.app
   NEXTAUTH_SECRET=       [Generate: openssl rand -base64 32]
   OPENAI_API_KEY=        [Optional - your OpenAI key]
   ```

7. Connect Vercel Postgres:
   - In Environment Variables section
   - Click "Connect Store"
   - Select your `card-genie-db`
   - This auto-fills `DATABASE_URL`

8. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: card-genie
# - Directory: ./
# - Override settings? No

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET

# Deploy to production
vercel --prod
```

### Step 4: Initialize Database

After deployment, you need to run migrations and seed data:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link your project
vercel link

# Run database migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

Or use Vercel's built-in Postgres commands:
1. Go to your Vercel project dashboard
2. Click on "Storage" → Your database
3. Click "Query" tab
4. Or connect via CLI and run migrations

### Step 5: Environment Variables Checklist

Make sure these are set in Vercel:

- ✅ `DATABASE_URL` - Auto-filled by Vercel Postgres
- ✅ `NEXTAUTH_URL` - Your Vercel app URL (e.g., https://card-genie.vercel.app)
- ✅ `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- ⚪ `OPENAI_API_KEY` - Optional, for enhanced AI features
- ⚪ `REFRESH_API_KEY` - Optional, for API-based data refresh

### Step 6: Seed Database

**Option 1: Via Vercel CLI**
```bash
# Pull environment variables
vercel env pull

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

**Option 2: Via API Endpoint (After first deploy)**
Create a temporary seed endpoint or use Vercel's serverless functions.

### Step 7: Test Your Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test features:
   - Browse credit cards
   - Search and filter
   - Sign up for account
   - Add cards to wallet
   - Use AI chat

### Step 8: Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update `NEXTAUTH_URL` to your custom domain
5. Follow Vercel's DNS instructions

---

## Alternative Deployment Options

### Deploy to Railway.app (Free Tier)

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Add PostgreSQL database
7. Set environment variables
8. Deploy

### Deploy to Render.com (Free Tier)

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
6. Add PostgreSQL database
7. Set environment variables
8. Deploy

### Deploy to Netlify (Free)

1. Go to [Netlify](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import existing project"
4. Choose your repository
5. Configure build settings
6. Add PostgreSQL database (external - use Supabase)
7. Set environment variables
8. Deploy

---

## Database Options (All have free tiers)

### Vercel Postgres (Recommended)
- **Free Tier**: 256MB storage, 60 hours compute
- **Setup**: Built into Vercel
- **Best For**: Vercel deployments

### Supabase
- **Free Tier**: 500MB database, 2GB bandwidth
- **Setup**: https://supabase.com
- **Connection String**: Available in Supabase dashboard

### Neon
- **Free Tier**: 512MB storage, 3GB transfer
- **Setup**: https://neon.tech
- **Serverless**: Auto-scales to zero

### PlanetScale
- **Free Tier**: 5GB storage, 1 billion row reads
- **Setup**: https://planetscale.com
- **MySQL**: Uses MySQL instead of PostgreSQL

---

## Post-Deployment Setup

### 1. Database Migration & Seeding

```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Seed production database
DATABASE_URL="your-production-url" npx prisma db seed
```

### 2. Set Up Automated Data Refresh

For Vercel, use Vercel Cron Jobs:

Create `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/refresh",
    "schedule": "0 0 * * 0"
  }]
}
```

Or use external cron services:
- [Cron-job.org](https://cron-job.org)
- [EasyCron](https://easycron.com)
- [GitHub Actions](https://github.com/features/actions)

### 3. Monitor Your Application

- **Vercel Analytics**: Built-in analytics
- **Vercel Logs**: Real-time logs in dashboard
- **Error Tracking**: Consider Sentry (free tier available)

---

## Troubleshooting

### Build Fails

**Error**: "Cannot find module '@prisma/client'"
**Solution**: Add `prisma generate` to build command

**Error**: "Database connection failed"
**Solution**: Check `DATABASE_URL` is set correctly

### Runtime Errors

**Error**: "NEXTAUTH_SECRET must be set"
**Solution**: Add `NEXTAUTH_SECRET` in environment variables

**Error**: "Database schema not synced"
**Solution**: Run `prisma migrate deploy` in production

### Database Issues

**Error**: "No tables found"
**Solution**: Run migrations:
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## Cost Breakdown (Free Tiers)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel Hosting** | ✅ Free | 100GB bandwidth, unlimited deployments |
| **Vercel Postgres** | ✅ Free | 256MB storage, 60 hours compute |
| **Supabase** | ✅ Free | 500MB database, 2GB bandwidth |
| **OpenAI API** | 💰 Paid | ~$0.002 per 1K tokens |

**Total Monthly Cost**: $0 (without OpenAI) or ~$5-10 (with OpenAI for moderate usage)

---

## Production Checklist

Before going live:

- [ ] Database migrated and seeded
- [ ] Environment variables set
- [ ] `NEXTAUTH_SECRET` is secure (not default)
- [ ] `NEXTAUTH_URL` points to production domain
- [ ] Test user signup/login
- [ ] Test wallet functionality
- [ ] Test AI chat (with and without OpenAI)
- [ ] Test on mobile devices
- [ ] Set up error monitoring
- [ ] Set up automated backups (database)
- [ ] Configure custom domain (optional)

---

## Quick Deploy Commands

```bash
# 1. Clone and setup
git clone <your-repo-url>
cd card-genie
npm install

# 2. Deploy to Vercel
npm i -g vercel
vercel login
vercel

# 3. Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET

# 4. Deploy to production
vercel --prod

# 5. Initialize database
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

---

**Your Card-Genie app is now live! 🎉**

Share your URL: `https://your-app-name.vercel.app`
