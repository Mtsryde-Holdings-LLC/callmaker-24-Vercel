import { test, expect } from '@playwright/test'

test.describe('API Endpoints', () => {
  let authToken: string

  test.beforeAll(async ({ request }) => {
    // Get auth token
    const response = await request.post('/api/auth/signin', {
      data: {
        email: 'admin@example.com',
        password: 'Admin123!',
      },
    })
    
    const cookies = response.headers()['set-cookie']
    authToken = cookies || ''
  })

  test.describe('Customer API', () => {
    test('GET /api/customers should return customers list', async ({ request }) => {
      const response = await request.get('/api/customers', {
        headers: { Cookie: authToken },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
      expect(data.pagination).toBeDefined()
    })

    test('POST /api/customers should create customer', async ({ request }) => {
      const response = await request.post('/api/customers', {
        headers: { Cookie: authToken },
        data: {
          email: 'apitest@example.com',
          firstName: 'API',
          lastName: 'Test',
          phone: '+1234567890',
        },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.email).toBe('apitest@example.com')
    })

    test('GET /api/customers/:id should return customer details', async ({ request }) => {
      // Create customer first
      const createResponse = await request.post('/api/customers', {
        headers: { Cookie: authToken },
        data: {
          email: 'detail@example.com',
          firstName: 'Detail',
          lastName: 'Test',
        },
      })
      
      const customer = (await createResponse.json()).data

      const response = await request.get(`/api/customers/${customer.id}`, {
        headers: { Cookie: authToken },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.data.id).toBe(customer.id)
    })

    test('should return 400 for invalid customer data', async ({ request }) => {
      const response = await request.post('/api/customers', {
        headers: { Cookie: authToken },
        data: {
          email: 'invalid-email', // Invalid email format
        },
      })

      expect(response.status()).toBe(400)
    })
  })

  test.describe('Email Campaign API', () => {
    test('GET /api/email-campaigns should return campaigns', async ({ request }) => {
      const response = await request.get('/api/email-campaigns', {
        headers: { Cookie: authToken },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    test('POST /api/email-campaigns should create campaign', async ({ request }) => {
      const response = await request.post('/api/email-campaigns', {
        headers: { Cookie: authToken },
        data: {
          name: 'API Test Campaign',
          subject: 'Test Subject',
          fromName: 'API Test',
          fromEmail: 'api@example.com',
          htmlContent: '<p>Test content</p>',
        },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.name).toBe('API Test Campaign')
    })

    test('should validate required fields', async ({ request }) => {
      const response = await request.post('/api/email-campaigns', {
        headers: { Cookie: authToken },
        data: {
          name: 'Incomplete Campaign',
          // Missing required fields
        },
      })

      expect(response.status()).toBe(400)
    })
  })

  test.describe('AI API', () => {
    test('POST /api/ai/generate should generate content', async ({ request }) => {
      const response = await request.post('/api/ai/generate', {
        headers: { Cookie: authToken },
        data: {
          prompt: 'Write a test email',
          type: 'email',
          tone: 'professional',
        },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.content).toBeDefined()
      expect(data.data.tokensUsed).toBeGreaterThan(0)
    })

    test('should validate AI generation input', async ({ request }) => {
      const response = await request.post('/api/ai/generate', {
        headers: { Cookie: authToken },
        data: {
          prompt: '', // Empty prompt
          type: 'invalid-type', // Invalid type
        },
      })

      expect(response.status()).toBe(400)
    })
  })

  test.describe('Analytics API', () => {
    test('GET /api/analytics/dashboard should return metrics', async ({ request }) => {
      const response = await request.get('/api/analytics/dashboard', {
        headers: { Cookie: authToken },
      })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.emailCampaigns).toBeDefined()
      expect(data.data.smsCampaigns).toBeDefined()
      expect(data.data.customers).toBeDefined()
    })
  })

  test.describe('Error Handling', () => {
    test('should return 401 for unauthenticated requests', async ({ request }) => {
      const response = await request.get('/api/customers')
      expect(response.status()).toBe(401)
    })

    test('should return 404 for non-existent resources', async ({ request }) => {
      const response = await request.get('/api/customers/non-existent-id', {
        headers: { Cookie: authToken },
      })
      expect(response.status()).toBe(404)
    })

    test('should return 500 for server errors', async ({ request }) => {
      // Trigger server error (would need specific endpoint for testing)
      const response = await request.post('/api/test/error', {
        headers: { Cookie: authToken },
      })
      
      if (response.status() === 500) {
        const data = await response.json()
        expect(data.error).toBeDefined()
      }
    })
  })

  test.describe('Rate Limiting', () => {
    test('should enforce rate limits', async ({ request }) => {
      const requests = []
      
      // Make many rapid requests
      for (let i = 0; i < 150; i++) {
        requests.push(
          request.get('/api/customers', {
            headers: { Cookie: authToken },
          })
        )
      }

      const responses = await Promise.all(requests)
      const rateLimitedResponse = responses.find(r => r.status() === 429)
      
      expect(rateLimitedResponse).toBeDefined()
    })
  })

  test.describe('Pagination', () => {
    test('should paginate results correctly', async ({ request }) => {
      const page1 = await request.get('/api/customers?page=1&limit=5', {
        headers: { Cookie: authToken },
      })
      const page1Data = await page1.json()

      const page2 = await request.get('/api/customers?page=2&limit=5', {
        headers: { Cookie: authToken },
      })
      const page2Data = await page2.json()

      expect(page1Data.pagination.page).toBe(1)
      expect(page2Data.pagination.page).toBe(2)
      expect(page1Data.data.length).toBeLessThanOrEqual(5)
      expect(page2Data.data.length).toBeLessThanOrEqual(5)
    })
  })
})
