const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default super admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'VIP' },
      update: {},
      create: { name: 'VIP', color: '#f59e0b' },
    }),
    prisma.tag.upsert({
      where: { name: 'New Customer' },
      update: {},
      create: { name: 'New Customer', color: '#10b981' },
    }),
    prisma.tag.upsert({
      where: { name: 'High Value' },
      update: {},
      create: { name: 'High Value', color: '#8b5cf6' },
    }),
  ])

  console.log('✅ Created tags:', tags.length)

  // Create sample customers
  const customers = []
  for (let i = 1; i <= 10; i++) {
    const customer = await prisma.customer.create({
      data: {
        email: `customer${i}@example.com`,
        phone: `+1555000${String(i).padStart(4, '0')}`,
        firstName: `Customer`,
        lastName: `${i}`,
        company: `Company ${i}`,
        status: 'ACTIVE',
        emailOptIn: true,
        smsOptIn: true,
        createdById: admin.id,
        totalSpent: Math.random() * 1000,
        orderCount: Math.floor(Math.random() * 20),
      },
    })
    customers.push(customer)
  }

  console.log('✅ Created customers:', customers.length)

  // Create sample segment
  const segment = await prisma.segment.create({
    data: {
      name: 'Active Customers',
      description: 'Customers who made a purchase in the last 30 days',
      conditions: {
        status: 'ACTIVE',
        lastOrderDays: 30,
      },
    },
  })

  console.log('✅ Created segment:', segment.name)

  // Create sample email campaign
  const emailCampaign = await prisma.emailCampaign.create({
    data: {
      name: 'Welcome Campaign',
      subject: 'Welcome to Our Platform!',
      previewText: 'Thanks for joining us',
      fromName: 'Marketing Team',
      fromEmail: 'marketing@example.com',
      htmlContent: '<h1>Welcome!</h1><p>Thanks for joining our platform.</p>',
      textContent: 'Welcome! Thanks for joining our platform.',
      status: 'DRAFT',
      type: 'REGULAR',
      createdById: admin.id,
    },
  })

  console.log('✅ Created email campaign:', emailCampaign.name)

  // Create sample SMS campaign
  const smsCampaign = await prisma.smsCampaign.create({
    data: {
      name: 'Flash Sale Alert',
      message: '🔥 Flash Sale! 30% off everything today only. Shop now!',
      status: 'DRAFT',
      type: 'REGULAR',
      createdById: admin.id,
    },
  })

  console.log('✅ Created SMS campaign:', smsCampaign.name)

  // Create IVR menu
  const ivrMenu = await prisma.ivrMenu.create({
    data: {
      name: 'Main Menu',
      welcomeText: 'Thank you for calling. Press 1 for sales, 2 for support, or 3 to speak with an agent.',
      options: {
        '1': { action: 'transfer', number: '+15551234567' },
        '2': { action: 'transfer', number: '+15551234568' },
        '3': { action: 'queue', queue: 'AgentQueue' },
      },
      isActive: true,
    },
  })

  console.log('✅ Created IVR menu:', ivrMenu.name)

  // Create knowledge base articles
  const kbArticles = await Promise.all([
    prisma.knowledgeBase.create({
      data: {
        title: 'How to reset your password',
        content: 'To reset your password, click on "Forgot Password" on the login page...',
        category: 'Account',
        tags: ['password', 'account', 'security'],
        isPublished: true,
      },
    }),
    prisma.knowledgeBase.create({
      data: {
        title: 'Shipping Information',
        content: 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days...',
        category: 'Shipping',
        tags: ['shipping', 'delivery', 'orders'],
        isPublished: true,
      },
    }),
  ])

  console.log('✅ Created knowledge base articles:', kbArticles.length)

  // Create sample subscription for admin
  const subscription = await prisma.subscription.create({
    data: {
      userId: admin.id,
      plan: 'PRO',
      status: 'ACTIVE',
      emailCredits: 10000,
      smsCredits: 1000,
      aiCredits: 500,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  })

  console.log('✅ Created subscription for admin')

  console.log('')
  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('📝 Login credentials:')
  console.log('   Email: admin@example.com')
  console.log('   Password: Admin123!')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
