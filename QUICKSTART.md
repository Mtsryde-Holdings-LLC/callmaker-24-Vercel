# Quick Start Guide

Get your Email & SMS Marketing Platform running in 5 minutes!

## Prerequisites Check

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Installation (Windows)

### Option 1: Automated Setup Script

```powershell
# Run the automated setup
npm run setup
```

This will:
- Install all dependencies
- Create .env file
- Generate Prisma client
- Set up database schema

### Option 2: Manual Setup

```powershell
# 1. Install dependencies
npm install

# 2. Create environment file
copy .env.example .env

# 3. Edit .env file with your settings
# (Use VS Code or any text editor)

# 4. Generate Prisma client
npm run prisma:generate

# 5. Push database schema
npm run prisma:push

# 6. Seed sample data (optional)
npm run prisma:seed
```

## Minimum Required Configuration

Edit your `.env` file with these essential values:

```env
# Database - Get from Neon, Supabase, or PlanetScale
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth Secret - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Email - Sign up at resend.com
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=noreply@yourdomain.com
```

## Start Development Server

```powershell
npm run dev
```

Visit: http://localhost:3000

## Default Login (After Seeding)

```
Email: admin@example.com
Password: Admin123!
```

## Quick Database Setup Options

### Neon (Recommended - Free Tier)

1. Go to https://neon.tech
2. Sign up (free)
3. Create new project
4. Copy connection string
5. Paste in `.env` as `DATABASE_URL`

### Supabase (Alternative)

1. Go to https://supabase.com
2. Create project
3. Go to Settings → Database
4. Copy connection string (Transaction mode)
5. Replace `[YOUR-PASSWORD]` with your password
6. Paste in `.env`

### PlanetScale (Alternative)

1. Go to https://planetscale.com
2. Create database
3. Get connection string
4. Paste in `.env`

## Test Features

### Test Email Sending

1. Get free Resend API key: https://resend.com
2. Add to `.env`: `RESEND_API_KEY=re_...`
3. Create customer in dashboard
4. Send test email campaign

### Test SMS (Optional)

1. Sign up for Twilio: https://twilio.com
2. Get Account SID and Auth Token
3. Buy phone number ($1)
4. Add credentials to `.env`
5. Send test SMS

### Test AI Features (Optional)

1. Get OpenAI API key: https://platform.openai.com
2. Add to `.env`: `OPENAI_API_KEY=sk-...`
3. Use AI content generator in dashboard

## Common Issues & Solutions

### Issue: Module not found

```powershell
# Solution: Install dependencies
npm install
```

### Issue: Prisma Client not generated

```powershell
# Solution: Generate Prisma Client
npm run prisma:generate
```

### Issue: Database connection error

```powershell
# Solution: Check DATABASE_URL format
# Should be: postgresql://user:password@host:5432/database
```

### Issue: Port 3000 already in use

```powershell
# Solution: Use different port
$env:PORT=3001; npm run dev
```

### Issue: TypeScript errors

```powershell
# Solution: These are expected until dependencies are installed
npm install
```

## Development Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Generate Prisma client
npm run prisma:generate

# Push schema changes to database
npm run prisma:push

# Create migration
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

## Project Structure Overview

```
callmaker24-vercel/
├── src/
│   ├── app/          # Next.js pages and API routes
│   ├── components/   # React components
│   ├── lib/          # Utilities and configurations
│   ├── services/     # Business logic (Email, SMS, AI, etc.)
│   ├── styles/       # Global CSS
│   └── types/        # TypeScript types
├── prisma/
│   ├── schema.prisma # Database schema
│   └── seed.js       # Sample data seeder
├── docs/             # Documentation
├── .env              # Environment variables (create this)
└── README.md         # Main documentation
```

## Next Steps

1. **Explore Dashboard**: Login and explore the UI
2. **Read Documentation**: Check `docs/` folder for detailed guides
3. **Configure APIs**: Add API keys for full functionality
4. **Deploy to Vercel**: Follow `docs/DEPLOYMENT.md`

## Essential Documentation

- `README.md` - Complete project overview
- `docs/USER_GUIDE.md` - How to use the platform
- `docs/API.md` - API reference
- `docs/DEPLOYMENT.md` - Deploy to Vercel
- `docs/ARCHITECTURE.md` - Technical details
- `PROJECT_SUMMARY.md` - Project summary

## Getting Help

### Documentation
- Read the docs in the `docs/` folder
- Check `README.md` for detailed instructions

### Common Questions

**Q: Do I need all the API keys?**
A: No, only database and NextAuth are required to run locally. Add others as needed.

**Q: How do I deploy to production?**
A: Follow the guide in `docs/DEPLOYMENT.md`

**Q: Can I use a different email service?**
A: Yes, modify `src/services/email.service.ts` for SendGrid or Mailgun

**Q: Is this free to use?**
A: The code is free (MIT license). External services have free tiers with usage limits.

## Production Checklist

Before deploying to production:

- [ ] All API keys configured
- [ ] Database provisioned (Neon/Supabase/PlanetScale)
- [ ] Stripe account set up (for payments)
- [ ] Domain purchased (optional)
- [ ] Email sending configured (Resend/SendGrid)
- [ ] Read `docs/DEPLOYMENT.md`

## Quick Reference

### Environment Variables Priority

**Must Have:**
1. DATABASE_URL (PostgreSQL)
2. NEXTAUTH_SECRET
3. NEXTAUTH_URL

**Should Have:**
4. RESEND_API_KEY (email)
5. EMAIL_FROM

**Nice to Have:**
6. TWILIO credentials (SMS/Voice)
7. OPENAI_API_KEY (AI features)
8. STRIPE keys (payments)
9. OAuth credentials (Google, Facebook)

### File Locations

- Environment config: `.env`
- Database schema: `prisma/schema.prisma`
- API routes: `src/app/api/`
- Services: `src/services/`
- Components: `src/components/`

## Support

If you run into issues:

1. Check the documentation in `docs/`
2. Review error messages carefully
3. Verify all required environment variables
4. Check database connection
5. Ensure Node.js version is 18+

---

**Ready to start?** Run `npm run setup` and follow the prompts!

🚀 Happy building!
