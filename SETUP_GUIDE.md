# Card Genie - Quick Setup Guide

This guide will help you get Card Genie up and running in just a few minutes.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your values
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"  # Generate: openssl rand -base64 32
```

**Optional:**
```env
OPENAI_API_KEY="sk-..."  # For enhanced AI features
```

### 3. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# Seed with credit card data
npx prisma db seed
```

**Or use the all-in-one setup command:**
```bash
npm run setup
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

1. **Homepage**: Browse all 20+ credit cards
2. **Search**: Find cards by name, bank, or category
3. **Grouping**: Switch between Bank and Category views
4. **AI Chat**: Ask questions about cards
5. **Auth**: Sign up to access wallet features

## Test the Application

### Create a Test Account
1. Click "Login" in the navbar
2. Click "Sign up"
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Sign in with the credentials

### Test Features
- ✅ Browse cards grouped by bank/category
- ✅ Search for specific cards
- ✅ View detailed card information
- ✅ Add cards to wallet (after login)
- ✅ Ask AI questions like "best fuel cards?"
- ✅ Access wallet page to see saved cards

## Database Management

### View Database (Prisma Studio)
```bash
npm run db:studio
```

Opens a GUI at [http://localhost:5555](http://localhost:5555) to:
- View all credit cards
- See user accounts
- Check wallet entries
- Edit data directly

### Reset Database
```bash
# Delete database
rm prisma/dev.db

# Recreate and seed
npx prisma migrate dev --name init
npx prisma db seed
```

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:**
```bash
npm install
npx prisma generate
```

### Issue: Database connection errors
**Solution:**
```bash
# Check DATABASE_URL in .env
# Regenerate Prisma client
npx prisma generate
```

### Issue: NextAuth errors
**Solution:**
```bash
# Ensure NEXTAUTH_SECRET is set in .env
# Generate new secret:
openssl rand -base64 32
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use different port
PORT=3001 npm run dev
```

## Development Workflow

### Adding New Cards

Edit `prisma/seed.ts`:
```typescript
{
  name: 'New Card Name',
  bank: 'Bank Name',
  category: 'rewards',  // or cashback, fuel, travel, shopping
  annualFee: 1000,
  joiningFee: 1000,
  rewardPoints: 'Description of reward points',
  welcomeBenefits: 'Welcome benefits',
  loungeAccess: 'Lounge access details',
  fuelBenefits: 'Fuel benefits',
  offers: 'Current offers',
  otherBenefits: 'Other benefits',
  eligibility: 'Eligibility criteria',
}
```

Then run:
```bash
npm run db:seed
```

### Updating Card Information

Use Prisma Studio:
```bash
npm run db:studio
```

Or programmatically:
```typescript
await prisma.creditCard.update({
  where: { id: 'card-id' },
  data: { offers: 'New offers' }
});
```

### Testing AI Chat

With OpenAI:
1. Get API key from [OpenAI](https://platform.openai.com)
2. Add to `.env`: `OPENAI_API_KEY="sk-..."`
3. Restart server

Without OpenAI:
- App uses rule-based fallback
- Works for common queries
- Good for development/testing

## Production Deployment

### Environment Variables Checklist
- ✅ `DATABASE_URL` (PostgreSQL recommended)
- ✅ `NEXTAUTH_URL` (your domain)
- ✅ `NEXTAUTH_SECRET` (secure random string)
- ✅ `OPENAI_API_KEY` (optional but recommended)
- ✅ `REFRESH_API_KEY` (for data refresh endpoint)

### Build for Production
```bash
npm run build
npm start
```

### Database Migration (SQLite → PostgreSQL)

1. Update `.env`:
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

2. Run migration:
```bash
npx prisma migrate dev
npx prisma db seed
```

## Next Steps

After setup, you can:

1. **Customize Styling**: Edit `tailwind.config.js` and `app/globals.css`
2. **Add More Cards**: Edit `prisma/seed.ts`
3. **Set Up Cron Jobs**: Run `./scripts/setup-cron.sh`
4. **Deploy**: Push to Vercel, Railway, or your hosting platform
5. **Add Features**: See README.md for feature ideas

## Getting Help

- **Documentation**: See README.md
- **Database Issues**: Check Prisma docs
- **NextAuth Issues**: Check NextAuth.js docs
- **General Questions**: Create an issue on GitHub

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Reseed database |
| `npm run setup` | Complete setup (install + db) |

---

**You're all set! 🎉**

Visit http://localhost:3000 and start exploring Card Genie!
