# Quick Deploy to Vercel - 5 Minutes! 🚀

Follow these steps to deploy Card-Genie to Vercel for free.

## Step 1: Create Vercel Account (1 min)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

## Step 2: Import Your Project (1 min)

1. Click "Add New..." → "Project"
2. Find your repository: `anilvignesh/test-app`
3. Click "Import"
4. **Important**: Set the branch to `claude/card-genie-app-Tk9eQ`

## Step 3: Configure Project (2 min)

### Build Settings (Auto-detected)
- Framework Preset: **Next.js** ✅ (automatically detected)
- Root Directory: `./` ✅
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

### Environment Variables
Click "Add" for each:

1. **NEXTAUTH_SECRET** (Required)
   ```bash
   # Generate this by running in your terminal:
   openssl rand -base64 32
   ```
   Paste the output here

2. **NEXTAUTH_URL** (Required)
   ```
   https://card-genie.vercel.app
   ```
   ⚠️ You'll update this with your actual URL after first deploy

3. **DATABASE_URL** (Will add after database setup)
   - Skip for now, we'll add in Step 4

4. **OPENAI_API_KEY** (Optional)
   ```
   sk-your-openai-api-key
   ```
   Only if you have OpenAI API access

## Step 4: Create Database (1 min)

1. While still in import screen, scroll down to "Add Storage"
2. Click "Create" under "Postgres"
3. Name it: `card-genie-db`
4. Choose your region
5. Click "Create"
6. This automatically adds `DATABASE_URL` to your environment variables ✅

Alternatively, after deployment:
1. Go to your project dashboard
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Follow prompts

## Step 5: Deploy! (30 seconds)

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. 🎉 Your app is live!

## Step 6: Initialize Database (1 min)

After first deployment, you need to add data:

### Option A: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma migrate deploy

# Seed database with credit card data
npx prisma db seed
```

### Option B: Manual Database Setup

1. In Vercel dashboard, go to Storage → Your database
2. Click "Connect"
3. Copy the connection string
4. Run locally:
   ```bash
   DATABASE_URL="your-connection-string" npx prisma migrate deploy
   DATABASE_URL="your-connection-string" npx prisma db seed
   ```

## Step 7: Update NEXTAUTH_URL

1. Copy your Vercel deployment URL (e.g., `card-genie-abc123.vercel.app`)
2. Go to Project Settings → Environment Variables
3. Edit `NEXTAUTH_URL`
4. Change to: `https://your-actual-url.vercel.app`
5. Save

## Step 8: Redeploy

1. Go to Deployments tab
2. Click ⋮ on latest deployment
3. Click "Redeploy"

Or make a small commit to trigger auto-deployment.

---

## ✅ Checklist

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] `NEXTAUTH_SECRET` environment variable set
- [ ] `NEXTAUTH_URL` environment variable set
- [ ] Postgres database created
- [ ] `DATABASE_URL` automatically added
- [ ] First deployment successful
- [ ] Database migrated (`prisma migrate deploy`)
- [ ] Database seeded (`prisma db seed`)
- [ ] `NEXTAUTH_URL` updated with real URL
- [ ] Redeployed

---

## 🎯 Your App is Live!

Visit: `https://your-app-name.vercel.app`

### Test These Features:
1. Browse credit cards ✅
2. Search and filter ✅
3. Sign up for account ✅
4. Add cards to wallet ✅
5. Use AI chat ✅

---

## 🔧 Troubleshooting

### "Build failed" error
- Check build logs in Vercel
- Ensure all environment variables are set
- Try redeploying

### "Database connection failed"
- Ensure `DATABASE_URL` is set
- Check database is running in Vercel Storage
- Run migrations: `npx prisma migrate deploy`

### "NEXTAUTH_SECRET required"
- Add the environment variable
- Redeploy

### No credit cards showing
- Database not seeded
- Run: `npx prisma db seed`

### Login not working
- Check `NEXTAUTH_URL` matches your deployment URL
- Ensure it starts with `https://`

---

## 🎨 Customize Your Deployment

### Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. Update `NEXTAUTH_URL` to your domain

### Auto-Deploy on Push
Vercel automatically deploys when you push to your GitHub branch!

### View Logs
- Go to Deployments
- Click on any deployment
- View real-time logs

---

## 💰 Cost

**Total: $0/month** 🎉

Vercel Free Tier includes:
- Unlimited deployments
- 100GB bandwidth
- Automatic HTTPS
- Serverless functions
- Postgres database (256MB)

---

## Next Steps

1. Share your app URL with friends!
2. Add more credit cards (edit `prisma/seed.ts`)
3. Customize colors and branding
4. Set up custom domain
5. Monitor usage in Vercel dashboard

**Need help?** Check DEPLOYMENT.md for detailed instructions.

---

**Congratulations! You've deployed Card-Genie! 🎊**
