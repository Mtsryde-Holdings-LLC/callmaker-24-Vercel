# User Guide

Complete guide for using the Email & SMS Marketing Platform.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Customer Management](#customer-management)
4. [Email Marketing](#email-marketing)
5. [SMS Marketing](#sms-marketing)
6. [AI Content Generator](#ai-content-generator)
7. [Chat & Helpdesk](#chat--helpdesk)
8. [Voice & IVR](#voice--ivr)
9. [Analytics & Reports](#analytics--reports)
10. [Settings](#settings)

## Getting Started

### Creating Your Account

1. Visit the homepage
2. Click "Get Started" or "Sign Up"
3. Choose sign-up method:
   - Email & Password
   - Google Account
   - Facebook Account
4. Complete your profile
5. Verify your email (if using email signup)
6. Choose your subscription plan

### First Login

1. Go to the login page
2. Enter your credentials or use OAuth
3. Complete 2FA if enabled
4. You'll be redirected to your dashboard

## Dashboard Overview

The dashboard provides a quick overview of your marketing activities:

### Key Metrics

- **Total Customers**: Number of contacts in your CRM
- **Email Campaigns**: Active and completed campaigns
- **SMS Campaigns**: SMS campaign statistics
- **Open Rate**: Average email open rate
- **Click Rate**: Average email click rate
- **Revenue**: Total revenue tracked

### Quick Actions

- Create Email Campaign
- Create SMS Campaign
- Add Customer
- Generate AI Content
- View Analytics

## Customer Management

### Adding Customers

#### Manual Entry

1. Navigate to **Customers** → **Add Customer**
2. Fill in customer details:
   - Email address (required for email campaigns)
   - Phone number (required for SMS campaigns)
   - First name
   - Last name
   - Company
   - Custom fields
3. Set preferences:
   - Email opt-in
   - SMS opt-in
4. Add tags for segmentation
5. Click **Save**

#### Bulk Import

1. Navigate to **Customers** → **Import**
2. Download CSV template
3. Fill in customer data
4. Upload CSV file
5. Map columns if needed
6. Review and confirm import
7. Wait for processing

**CSV Format:**
```csv
email,firstName,lastName,phone,company,emailOptIn,smsOptIn
john@example.com,John,Doe,+1234567890,Acme Inc,true,true
```

### Managing Customers

#### View Customer Profile

1. Click on customer name
2. View:
   - Contact information
   - Campaign history
   - Purchase history
   - Activity timeline
   - Notes and tags

#### Edit Customer

1. Open customer profile
2. Click **Edit**
3. Update information
4. Click **Save**

#### Delete Customer

1. Open customer profile
2. Click **Delete**
3. Confirm deletion
4. Customer data will be permanently removed

### Segmentation

#### Creating Segments

1. Navigate to **Customers** → **Segments**
2. Click **Create Segment**
3. Name your segment
4. Add conditions:
   - Email opened in last 30 days
   - Purchase amount > $100
   - Tag contains "VIP"
   - Custom field value
5. Preview matching customers
6. Save segment

#### Using Segments

- Target email campaigns to specific segments
- Send SMS to segmented groups
- Export segment data
- Analyze segment performance

### Tags

#### Adding Tags

1. Select customers
2. Click **Add Tags**
3. Enter tag name or select existing
4. Tags are applied immediately

#### Managing Tags

1. Navigate to **Settings** → **Tags**
2. View all tags
3. Edit tag names and colors
4. Delete unused tags
5. Merge duplicate tags

## Email Marketing

### Creating Email Campaigns

1. Navigate to **Email** → **Create Campaign**
2. **Campaign Details**:
   - Campaign name
   - From name
   - From email
   - Reply-to email
3. **Recipients**:
   - Select all customers
   - Choose segments
   - Choose tags
4. **Email Content**:
   - Subject line (use AI to generate)
   - Preview text
   - Email body (use visual editor)
5. **Schedule**:
   - Send immediately
   - Schedule for later
6. Click **Save** or **Send**

### Email Editor

#### Visual Editor

- Drag and drop components
- Add text, images, buttons
- Insert personalization tokens:
  - `{{firstName}}`
  - `{{lastName}}`
  - `{{company}}`
  - Custom fields
- Preview on desktop and mobile

#### HTML Editor

- Write custom HTML
- Use templates
- Add inline CSS
- Test across email clients

### A/B Testing

1. Enable A/B testing
2. Create variant B:
   - Different subject line
   - Different content
   - Different images
3. Set test percentage (e.g., 10% each)
4. Choose winning metric:
   - Open rate
   - Click rate
5. Set test duration
6. Winner is automatically sent to remaining recipients

### Email Templates

#### Using Templates

1. Navigate to **Email** → **Templates**
2. Browse template library
3. Click **Use Template**
4. Customize content
5. Save as new template (optional)

#### Creating Templates

1. Create email campaign
2. Design your email
3. Click **Save as Template**
4. Name your template
5. Template available for future use

### Tracking & Analytics

Automatically tracked metrics:
- **Sent**: Total emails sent
- **Delivered**: Successfully delivered
- **Opened**: Recipients who opened
- **Clicked**: Recipients who clicked links
- **Bounced**: Undeliverable emails
- **Unsubscribed**: Opt-outs

View detailed analytics:
- Open rate over time
- Click map (which links clicked)
- Device and email client breakdown
- Geographic distribution

## SMS Marketing

### Creating SMS Campaigns

1. Navigate to **SMS** → **Create Campaign**
2. **Campaign Details**:
   - Campaign name
   - Message content (160 characters recommended)
3. **Recipients**:
   - Select customers with phone numbers
   - Choose segments
   - Filter by SMS opt-in status
4. **Schedule**:
   - Send immediately
   - Schedule for later (consider time zones)
5. Preview message
6. Click **Send**

### SMS Best Practices

- Keep messages under 160 characters
- Include clear call-to-action
- Always include opt-out instructions
- Respect quiet hours (no messages 9 PM - 9 AM)
- Personalize with customer name
- Include your business name

### Two-Way Messaging

#### Receiving Replies

1. Navigate to **SMS** → **Conversations**
2. View incoming messages
3. Click conversation to reply
4. Type response
5. Send reply

#### Auto-Responses

1. Navigate to **Settings** → **SMS Auto-Responses**
2. Set up keyword triggers
3. Define automatic responses
4. Enable/disable as needed

Example keywords:
- `STOP` → Unsubscribe
- `HELP` → Support information
- `INFO` → Business details

### SMS Templates

Create reusable SMS templates:

1. Navigate to **SMS** → **Templates**
2. Click **Create Template**
3. Name template
4. Write message with placeholders
5. Save template

Example templates:
```
Hi {{firstName}}! Thanks for your purchase. Track your order: {{orderLink}}

{{firstName}}, your appointment is confirmed for {{date}} at {{time}}. Reply YES to confirm.

Flash Sale! {{discount}}% off {{product}}. Use code: {{code}}. Valid until {{expiry}}.
```

## AI Content Generator

### Generating Email Content

1. Navigate to **AI** → **Generate Content**
2. Select content type: **Email**
3. Enter prompt:
   ```
   Create an email announcing our summer sale with 30% off all products
   ```
4. Select options:
   - Tone: Professional, Casual, Friendly, Formal
   - Length: Short, Medium, Long
5. Add context (optional):
   ```
   Target audience: fashion-conscious millennials
   Brand voice: trendy and energetic
   ```
6. Click **Generate**
7. Review generated content
8. Edit if needed
9. Click **Use in Campaign**

### Generating Subject Lines

1. In email campaign editor
2. Click **AI Subject Generator**
3. Enter topic or main message
4. Click **Generate**
5. Review 5 suggested subject lines
6. Select your favorite
7. Subject line is inserted

### Generating SMS Content

1. Navigate to **AI** → **Generate Content**
2. Select content type: **SMS**
3. Enter prompt
4. AI ensures content stays under 160 characters
5. Use generated content in SMS campaign

### Cost Tracking

- View AI token usage in **Settings** → **Usage**
- Track costs per request
- Monitor monthly AI spend
- Set usage alerts

## Chat & Helpdesk

### Embedded Chat Widget

Add to your website:

```html
<script src="https://your-app.vercel.app/chat-widget.js"></script>
<script>
  ChatWidget.init({
    apiKey: 'your_api_key',
    position: 'bottom-right',
    primaryColor: '#0ea5e9'
  });
</script>
```

### AI Chatbot

#### How It Works

1. Customer sends message
2. AI analyzes question
3. If answer is in knowledge base → AI responds
4. If uncertain → Transfer to human agent
5. Agent receives notification
6. Agent takes over conversation

#### Knowledge Base

Create articles for AI to reference:

1. Navigate to **Helpdesk** → **Knowledge Base**
2. Click **Create Article**
3. Enter title and content
4. Add tags and category
5. Publish article
6. AI can now reference this content

### Agent Console

#### Viewing Conversations

1. Navigate to **Helpdesk** → **Conversations**
2. Filter by:
   - Status (Open, Assigned, Resolved)
   - Priority
   - Agent
3. Click conversation to open

#### Responding to Customers

1. Open conversation
2. View conversation history
3. Type response
4. Add attachments if needed
5. Click **Send**

#### Managing Tickets

- **Assign**: Assign to agent
- **Priority**: Set high, medium, low
- **Tag**: Add tags for organization
- **Resolve**: Mark as resolved
- **Close**: Close conversation

### Canned Responses

Create quick responses:

1. Navigate to **Settings** → **Canned Responses**
2. Click **Create**
3. Enter shortcode (e.g., `/greeting`)
4. Write response
5. Save

Usage:
- Type `/greeting` in chat
- Canned response is inserted

## Voice & IVR

### IVR Menu Setup

1. Navigate to **Voice** → **IVR Menus**
2. Click **Create Menu**
3. Name your menu
4. Add welcome message:
   ```
   Thank you for calling. Press 1 for sales, 2 for support, or 3 to speak with an agent.
   ```
5. Define key actions:
   - **1**: Transfer to sales number
   - **2**: Transfer to support number
   - **3**: Add to agent queue
   - **4**: Replay menu
6. Save menu

### Making Outbound Calls

1. Navigate to **Voice** → **Make Call**
2. Enter recipient phone number
3. Select IVR menu (optional)
4. Click **Call**
5. View call status in real-time

### Call Logs

1. Navigate to **Voice** → **Call History**
2. View all calls:
   - Date and time
   - Duration
   - Status
   - Recording link
3. Click call to view details
4. Play recording
5. View transcription
6. Add notes

### Call Recording

All calls are automatically recorded:

- Recordings available immediately after call
- Download as MP3
- Transcription available (optional)
- Recordings stored securely
- Auto-delete after 90 days (configurable)

## Analytics & Reports

### Dashboard Analytics

Real-time overview of:
- Campaign performance
- Customer growth
- Revenue metrics
- Engagement rates

### Campaign Reports

#### Email Campaign Analytics

1. Navigate to **Email** → **Campaigns**
2. Click campaign name
3. View metrics:
   - Delivery rate
   - Open rate
   - Click-through rate
   - Conversion rate
   - Revenue generated
4. Click map (which links were clicked)
5. Time-based charts
6. Device breakdown

#### SMS Campaign Analytics

1. Navigate to **SMS** → **Campaigns**
2. Click campaign name
3. View metrics:
   - Delivery rate
   - Response rate
   - Opt-out rate
4. Conversation threads
5. Time-based delivery

### Custom Reports

1. Navigate to **Analytics** → **Custom Reports**
2. Click **Create Report**
3. Select report type:
   - Campaign performance
   - Customer activity
   - Revenue analysis
   - Engagement trends
4. Choose date range
5. Select metrics
6. Add filters
7. Click **Generate**

### Exporting Data

#### CSV Export

1. Navigate to any list view
2. Click **Export** → **CSV**
3. Select columns to include
4. Download CSV file

#### PDF Reports

1. Generate custom report
2. Click **Export** → **PDF**
3. Professional PDF with charts
4. Includes your branding

#### Scheduled Reports

1. Create custom report
2. Click **Schedule**
3. Choose frequency:
   - Daily
   - Weekly
   - Monthly
4. Select recipients
5. Reports automatically emailed

## Settings

### Account Settings

1. Navigate to **Settings** → **Account**
2. Update:
   - Name
   - Email
   - Phone
   - Password
   - Profile picture
3. Enable two-factor authentication
4. Manage sessions

### Team Management

#### Adding Team Members

1. Navigate to **Settings** → **Team**
2. Click **Invite Member**
3. Enter email address
4. Select role:
   - **Super Admin**: Full access
   - **Admin**: Most features
   - **Sub-Admin**: Limited admin access
   - **Agent**: Support only
   - **Subscriber**: View only
5. Send invitation
6. Member receives email to join

#### Managing Permissions

Role-based permissions:
- Super Admin: Everything
- Admin: All except billing
- Sub-Admin: Campaigns and customers
- Agent: Helpdesk only
- Subscriber: Read-only access

### Billing & Subscription

1. Navigate to **Settings** → **Billing**
2. View current plan
3. See usage:
   - Email credits used/remaining
   - SMS credits used/remaining
   - AI credits used/remaining
4. Upgrade/downgrade plan
5. Update payment method
6. View invoices
7. Download receipts

### API & Integrations

#### Generating API Keys

1. Navigate to **Settings** → **API**
2. Click **Create API Key**
3. Name your key
4. Select permissions
5. Copy key (shown once)
6. Use in your applications

#### Webhooks

1. Navigate to **Settings** → **Webhooks**
2. Click **Create Webhook**
3. Enter webhook URL
4. Select events to subscribe to
5. Enter webhook secret
6. Save webhook
7. Test webhook

#### E-commerce Integrations

##### Shopify

1. Navigate to **Settings** → **Integrations**
2. Click **Shopify**
3. Enter your shop URL
4. Click **Connect**
5. Authorize application
6. Customer and order data syncs automatically

##### WooCommerce

1. Click **WooCommerce**
2. Enter your site URL
3. Enter API key and secret
4. Click **Connect**
5. Data syncs every 15 minutes

### Email Settings

1. Navigate to **Settings** → **Email**
2. Configure:
   - Default from name
   - Default from email
   - Reply-to email
3. Email signature
4. Unsubscribe footer
5. Tracking pixel (enable/disable)

### SMS Settings

1. Navigate to **Settings** → **SMS**
2. Configure:
   - Default sender ID
   - Opt-out keywords
   - Quiet hours
3. Auto-responses
4. Compliance settings

### Notifications

1. Navigate to **Settings** → **Notifications**
2. Choose notification channels:
   - Email
   - SMS
   - In-app
3. Select events:
   - New customer
   - Campaign completed
   - Low credits
   - Failed payment
4. Save preferences

## Tips & Best Practices

### Email Marketing

- **Subject Lines**: Keep under 50 characters
- **Sending Time**: Tuesday-Thursday, 10 AM - 2 PM
- **Personalization**: Always use first name
- **Mobile**: 60% of emails are opened on mobile
- **Testing**: Always A/B test subject lines
- **Frequency**: Don't send more than 2-3 per week

### SMS Marketing

- **Timing**: Respect time zones and quiet hours
- **Brevity**: Keep messages under 160 characters
- **Clear CTA**: One clear action per message
- **Opt-out**: Always include unsubscribe option
- **Value**: Every message should provide value
- **Frequency**: Maximum 2-4 per month

### CRM

- **Data Quality**: Keep customer data up-to-date
- **Segmentation**: Create meaningful segments
- **Tags**: Use consistent tagging system
- **Notes**: Add context to customer records
- **Custom Fields**: Track what matters to your business

### AI Usage

- **Specific Prompts**: More detail = better results
- **Tone Consistency**: Match your brand voice
- **Review**: Always review AI content before sending
- **Context**: Provide audience and brand context
- **Iteration**: Refine prompts based on results

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: Quick search
- `C`: Create new campaign
- `N`: Create new customer
- `/`: Focus search
- `Esc`: Close modal
- `?`: Show keyboard shortcuts

## Support

Need help?

- **Documentation**: Read full docs
- **Live Chat**: Click chat icon (bottom right)
- **Email**: support@yourdomain.com
- **Knowledge Base**: Search help articles
- **Video Tutorials**: Watch how-to videos

## Appendix

### Glossary

- **Open Rate**: % of recipients who opened email
- **Click Rate**: % of recipients who clicked link
- **Bounce Rate**: % of undeliverable emails
- **Opt-in**: Consent to receive messages
- **Opt-out**: Request to stop receiving messages
- **Segment**: Group of customers based on criteria
- **Campaign**: Marketing message sent to multiple recipients
- **Webhook**: Automated notification to your server
- **API**: Application Programming Interface

### Compliance

- **CAN-SPAM**: US email marketing law
- **GDPR**: EU data protection regulation
- **TCPA**: US telephone consumer protection
- **CASL**: Canadian anti-spam legislation

Platform includes compliance features:
- Unsubscribe links
- Consent tracking
- Data export/deletion
- Privacy policy templates
