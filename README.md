# Card Genie 🎴✨

**Your intelligent assistant for finding the perfect credit card in India**

Card Genie is a comprehensive web application that helps users find, compare, and manage credit card information across all major Indian banks. With an AI-powered chat interface, personalized wallet, and detailed card comparisons, finding the right credit card has never been easier.

## Features

### 🎯 Core Features
- **Comprehensive Card Database**: Information on 20+ credit cards from major Indian banks (HDFC, SBI, ICICI, Axis, Kotak, IndusInd, Standard Chartered, American Express)
- **Smart Grouping**: View cards grouped by bank or category (rewards, cashback, fuel, travel, shopping)
- **Advanced Search**: Search cards by name, bank, category, or features
- **User Wallet**: Save your owned cards for quick access
- **AI-Powered Recommendations**: Ask questions in natural language and get personalized card suggestions

### 📱 Technical Features
- **Responsive Design**: Optimized for both desktop and mobile devices
- **User Authentication**: Secure login system with NextAuth.js
- **Real-time Updates**: Weekly automated data refresh mechanism
- **Modern UI**: Beautiful interface built with Tailwind CSS
- **Type-Safe**: Built with TypeScript for reliability

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (Prisma ORM)
- **AI**: OpenAI API (optional), rule-based fallback
- **Icons**: Lucide React

## 🚀 Quick Deploy (5 minutes)

**Deploy to Vercel for FREE:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anilvignesh/test-app/tree/claude/card-genie-app-Tk9eQ)

📖 **Deployment Guides:**
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - 5-minute visual guide for Vercel
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide (Vercel, Railway, Render, Netlify)

The app includes free hosting on Vercel with PostgreSQL database. No credit card required!

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd card-genie
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32
OPENAI_API_KEY="your-openai-api-key"    # Optional
```

### 4. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with credit card data
npx prisma db seed
```

Update `package.json` to include the seed script:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### For Users

1. **Browse Cards**: View all available credit cards on the homepage
2. **Search & Filter**: Use the search bar to find specific cards
3. **Group By**: Toggle between grouping by bank or category
4. **View Details**: Click "View Details" on any card to see complete information
5. **Create Account**: Sign up to access the wallet feature
6. **Save to Wallet**: Click the "+" button to add cards to your wallet
7. **Ask Card Genie**: Use the AI chat to ask questions like:
   - "Which card is best for fuel payments?"
   - "Show me cards with lounge access"
   - "What are the best cashback cards?"

### For Developers

#### Project Structure

```
card-genie/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── cards/           # Card data endpoints
│   │   ├── wallet/          # Wallet management
│   │   └── chat/            # AI chat endpoint
│   ├── auth/                # Auth pages (signin/signup)
│   ├── wallet/              # Wallet page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── CardList.tsx
│   ├── CreditCard.tsx
│   ├── ChatInterface.tsx
│   └── ...
├── lib/                     # Utility libraries
│   ├── prisma.ts
│   └── auth.ts
├── prisma/                  # Database
│   ├── schema.prisma
│   └── seed.ts
├── scripts/                 # Maintenance scripts
│   ├── refresh-data.ts
│   └── setup-cron.sh
└── public/                  # Static assets
```

#### Database Schema

**User**
- id, email, name, password
- Relations: userCards

**CreditCard**
- id, name, bank, category
- annualFee, joiningFee
- rewardPoints, welcomeBenefits
- loungeAccess, fuelBenefits, offers
- otherBenefits, eligibility
- lastUpdated

**UserCard**
- id, userId, cardId
- Relation table for user wallet

## Data Refresh

### Automated Weekly Updates

Set up a cron job for weekly data refresh:

```bash
# Make the script executable
chmod +x scripts/setup-cron.sh

# Run the setup script
./scripts/setup-cron.sh
```

This will refresh card data every Sunday at midnight.

### Manual Refresh

#### Option 1: Run Script Directly
```bash
npx ts-node scripts/refresh-data.ts
```

#### Option 2: Use API Endpoint

Set `REFRESH_API_KEY` in `.env`, then:

```bash
curl -X POST http://localhost:3000/api/refresh \
  -H "Authorization: Bearer your-api-key"
```

## AI Chat Feature

### With OpenAI

Set `OPENAI_API_KEY` in `.env` for enhanced AI responses powered by GPT-3.5.

### Without OpenAI

The app includes a rule-based fallback system that works without OpenAI:
- Keyword matching for common queries
- Pre-programmed responses for categories
- Bank-specific filtering

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

Compatible with any Node.js hosting platform:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

**Note**: For production, switch to PostgreSQL instead of SQLite:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cardgenie"
```

## Customization

### Adding New Cards

1. Edit `prisma/seed.ts`
2. Add card data in the `creditCards` array
3. Run: `npx prisma db seed`

### Updating Card Information

Use the data refresh scripts or update directly via Prisma:

```typescript
await prisma.creditCard.update({
  where: { id: 'card-id' },
  data: { offers: 'New offer details' }
});
```

### Styling

- Colors: Edit `tailwind.config.js`
- Components: Modify files in `/components`
- Global styles: Edit `app/globals.css`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cards` | GET | Get all credit cards |
| `/api/wallet` | GET | Get user's saved cards |
| `/api/wallet` | POST | Add card to wallet |
| `/api/wallet` | DELETE | Remove card from wallet |
| `/api/chat` | POST | AI chat endpoint |
| `/api/refresh` | POST | Trigger data refresh |
| `/api/auth/signup` | POST | User registration |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## Future Enhancements

- [ ] Admin panel for card management
- [ ] Card comparison feature (side-by-side)
- [ ] Email notifications for new offers
- [ ] Mobile app (React Native)
- [ ] Integration with bank APIs for real-time data
- [ ] Credit score simulator
- [ ] Card application tracking
- [ ] User reviews and ratings

## Security Notes

- Passwords are hashed with bcrypt
- JWT-based session management
- Environment variables for sensitive data
- SQL injection protection via Prisma
- XSS protection in React

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Submit a pull request
- Contact: [your-email@example.com]

## Acknowledgments

- Credit card data compiled from official bank websites
- Icons by Lucide React
- UI components inspired by modern design systems

---

**Built with ❤️ for the Indian credit card users**
