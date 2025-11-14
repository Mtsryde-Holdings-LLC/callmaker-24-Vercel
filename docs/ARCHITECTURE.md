# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  Next.js    │  │   React UI   │  │  Tailwind CSS   │   │
│  │  App Router │  │  Components  │  │    Styling      │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  NextAuth.js (Session Management, OAuth, JWT)       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       API Layer (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │Customers │  │  Email   │  │   SMS    │  │   Voice  │  │
│  │   API    │  │Campaign  │  │ Campaign │  │  IVR API │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Chat   │  │    AI    │  │Analytics │  │ Webhooks │  │
│  │  & Help  │  │Generation│  │ Reports  │  │   API    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │Email Service │  │  SMS Service │  │Voice Service │     │
│  │  (Resend)    │  │   (Twilio)   │  │   (Twilio)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  AI Service  │  │Payment Svc.  │  │Storage Svc.  │     │
│  │  (OpenAI)    │  │  (Stripe)    │  │(Vercel Blob) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      Prisma ORM (Type-safe Database Access)         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database (Neon/Supabase/PlanetScale)    │   │
│  │  - Users, Customers, Campaigns, Messages, etc.      │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      Redis Cache (Upstash) - Session & Cache        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Google  │  │ Facebook │  │  Shopify │  │WooComm.  │  │
│  │  OAuth   │  │   OAuth  │  │   API    │  │   API    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (lightweight store)
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: React Quill
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Heroicons

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes (Serverless)
- **Language**: TypeScript
- **API Architecture**: RESTful
- **Authentication**: NextAuth.js
- **ORM**: Prisma
- **Validation**: Zod schemas

### Database
- **Primary Database**: PostgreSQL (via Neon/Supabase/PlanetScale)
- **ORM**: Prisma
- **Caching**: Redis (Upstash) - optional
- **File Storage**: Vercel Blob Storage

### External APIs
- **Email**: Resend / SendGrid
- **SMS & Voice**: Twilio
- **AI**: OpenAI GPT-4
- **Payments**: Stripe
- **OAuth**: Google, Facebook

### DevOps & Deployment
- **Hosting**: Vercel (Serverless)
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics, Sentry
- **Logging**: Logtail
- **Testing**: Jest (unit), Playwright (e2e)

## Data Flow

### Email Campaign Flow

```
1. User creates campaign in UI
   ↓
2. POST /api/email-campaigns
   ↓
3. Campaign saved to database (Prisma)
   ↓
4. User triggers send
   ↓
5. POST /api/email-campaigns/:id/send
   ↓
6. System fetches customers based on segments/tags
   ↓
7. Email Service batches emails (50 at a time)
   ↓
8. Resend API sends emails
   ↓
9. Email messages saved to database
   ↓
10. Webhooks track opens/clicks
   ↓
11. Analytics updated in real-time
```

### SMS Campaign Flow

```
1. User creates SMS campaign
   ↓
2. POST /api/sms-campaigns
   ↓
3. Campaign saved to database
   ↓
4. User triggers send
   ↓
5. SMS Service sends via Twilio
   ↓
6. Status callbacks received via webhook
   ↓
7. Incoming replies handled via webhook
   ↓
8. Customer conversation created
```

### AI Chat Flow

```
1. Customer sends message via chat widget
   ↓
2. POST /api/chat/messages
   ↓
3. AI Service checks if bot can answer
   ↓
4. OpenAI generates response
   ↓
5. Response sent back to customer
   ↓
6. If bot can't answer → transfer to human agent
   ↓
7. Agent receives notification
   ↓
8. Conversation continues with agent
```

### IVR Call Flow

```
1. Call initiated (inbound or outbound)
   ↓
2. Twilio sends request to /api/voice/ivr
   ↓
3. System generates TwiML response
   ↓
4. Caller hears menu options
   ↓
5. Caller presses digit
   ↓
6. POST /api/voice/handle-key
   ↓
7. Call routed based on selection
   ↓
8. Call recorded and transcribed
   ↓
9. Call log saved to database
```

## Database Schema

### Core Tables

**users** - Authentication and user management
- Credentials, OAuth profiles, roles, permissions

**organizations** - Multi-tenant support
- Company settings, branding, domains

**customers** - CRM data
- Contact information, preferences, custom fields

**email_campaigns** - Email marketing
- Campaign details, content, scheduling

**email_messages** - Individual emails
- Delivery status, tracking, engagement

**sms_campaigns** - SMS marketing
- Campaign details, message content

**sms_messages** - Individual SMS
- Delivery status, replies, opt-outs

**chat_conversations** - Support tickets
- Conversation threads, agent assignments

**chat_messages** - Chat history
- Message content, sender, attachments

**calls** - Voice call logs
- Call details, recordings, transcriptions

**subscriptions** - Billing
- Stripe integration, credit tracking

**invoices** - Payment history
- Invoice records, payment status

## Security Architecture

### Authentication Flow

```
1. User submits credentials
   ↓
2. NextAuth validates credentials
   ↓
3. Password verified with bcrypt
   ↓
4. JWT token generated
   ↓
5. Session created with secure cookie
   ↓
6. 2FA verification (if enabled)
   ↓
7. User logged in
```

### API Security

- **Authentication**: NextAuth session cookies or API keys
- **Authorization**: Role-based access control (RBAC)
- **Rate Limiting**: Per-user and per-endpoint limits
- **CSRF Protection**: Built-in Next.js protection
- **XSS Prevention**: React automatic escaping
- **SQL Injection**: Prisma parameterized queries
- **Environment Variables**: Secure storage in Vercel
- **HTTPS Only**: Enforced in production
- **CORS**: Configured allowed origins

### Data Protection

- **Encryption at Rest**: Database encryption
- **Encryption in Transit**: TLS/HTTPS
- **Password Hashing**: bcrypt with salt
- **Sensitive Data**: Encrypted before storage
- **PII Handling**: GDPR compliant data management
- **Audit Logs**: All actions logged

## Scalability Considerations

### Horizontal Scaling

- **Serverless Functions**: Auto-scale with Vercel
- **Database**: Connection pooling via Prisma
- **Caching**: Redis for session and frequently accessed data
- **CDN**: Static assets served via Vercel Edge Network

### Performance Optimizations

- **Database Indexing**: Strategic indexes on frequently queried fields
- **Query Optimization**: Efficient Prisma queries with includes
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **API Response Caching**: Cache-Control headers
- **Background Jobs**: Queue system for heavy tasks

### Monitoring & Observability

- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Vercel Analytics
- **Log Aggregation**: Logtail
- **Uptime Monitoring**: Vercel status
- **Database Metrics**: Provider dashboards

## Deployment Architecture

### Vercel Deployment

```
GitHub Repository
    ↓
Commit/Push to main branch
    ↓
GitHub Actions CI/CD Pipeline
    ↓
Build & Test
    ↓
Vercel Auto-Deploy
    ↓
Edge Network Distribution
    ↓
Production Live
```

### Environment Configuration

- **Development**: Local PostgreSQL, local env vars
- **Staging**: Vercel preview, test database
- **Production**: Vercel production, production database

### Rollback Strategy

- Vercel instant rollback to previous deployment
- Database migrations versioned with Prisma
- Feature flags for gradual rollouts

## Integration Points

### Incoming Webhooks

- Twilio SMS callbacks
- Twilio Voice status updates
- Stripe payment events
- E-commerce platform events

### Outgoing Webhooks

- Campaign completion notifications
- Customer activity events
- Payment confirmations
- Custom user-defined webhooks

## Future Enhancements

- GraphQL API layer
- Real-time WebSocket connections
- Mobile app (React Native)
- Advanced ML/AI features
- Multi-language support
- White-label capabilities
