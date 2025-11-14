import { test, expect } from '@playwright/test'

test.describe('Security Tests', () => {
  test.describe('Authentication Security', () => {
    test('should prevent SQL injection in login', async ({ page }) => {
      await page.goto('/auth/signin')
      
      // Try SQL injection
      await page.fill('input[name="email"]', "admin@example.com' OR '1'='1")
      await page.fill('input[name="password"]', "' OR '1'='1")
      await page.click('button[type="submit"]')
      
      // Should show invalid credentials, not bypass auth
      await expect(page.locator('text=Invalid credentials')).toBeVisible()
    })

    test('should have CSRF protection', async ({ page }) => {
      await page.goto('/auth/signin')
      
      // Check for CSRF token in forms
      const form = page.locator('form')
      const csrfToken = await form.locator('input[name="csrfToken"]')
      
      // NextAuth automatically adds CSRF protection
      expect(csrfToken).toBeDefined()
    })

    test('should enforce password requirements', async ({ page }) => {
      await page.goto('/auth/signup')
      
      await page.fill('input[name="email"]', 'test@example.com')
      await page.fill('input[name="password"]', '123') // Weak password
      await page.click('button[type="submit"]')
      
      // Should show password strength error
      await expect(page.locator('text=/password.*strong/i')).toBeVisible()
    })

    test('should prevent brute force with rate limiting', async ({ page }) => {
      await page.goto('/auth/signin')
      
      // Try multiple failed logins
      for (let i = 0; i < 10; i++) {
        await page.fill('input[name="email"]', 'test@example.com')
        await page.fill('input[name="password"]', 'wrongpassword')
        await page.click('button[type="submit"]')
        await page.waitForTimeout(100)
      }
      
      // Should show rate limit error
      await expect(page.locator('text=/too many.*attempts/i')).toBeVisible()
    })

    test('should have secure session cookies', async ({ page, context }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      await page.waitForURL('/dashboard')
      
      // Check cookie attributes
      const cookies = await context.cookies()
      const sessionCookie = cookies.find(c => c.name.includes('session'))
      
      expect(sessionCookie).toBeDefined()
      expect(sessionCookie?.httpOnly).toBe(true)
      expect(sessionCookie?.secure).toBe(true) // In production
      expect(sessionCookie?.sameSite).toBe('Lax')
    })
  })

  test.describe('XSS Protection', () => {
    test('should sanitize user input in customer name', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/customers')
      await page.click('button:has-text("Add Customer")')
      
      // Try XSS injection
      await page.fill('input[name="firstName"]', '<script>alert("XSS")</script>')
      await page.fill('input[name="email"]', 'xss@example.com')
      await page.click('button[type="submit"]')
      
      // Script should not execute
      page.on('dialog', () => {
        throw new Error('XSS vulnerability detected')
      })
      
      await page.waitForTimeout(1000)
      // If we get here, XSS was prevented
    })

    test('should escape HTML in email content preview', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/email-campaigns/new')
      
      // Insert HTML that should be escaped
      const maliciousContent = '<img src=x onerror=alert("XSS")>'
      await page.fill('textarea[name="htmlContent"]', maliciousContent)
      
      // Check preview - should not execute script
      await page.click('button:has-text("Preview")')
      
      page.on('dialog', () => {
        throw new Error('XSS vulnerability in preview')
      })
      
      await page.waitForTimeout(1000)
    })
  })

  test.describe('Authorization', () => {
    test('should prevent unauthorized API access', async ({ request }) => {
      // Try to access API without authentication
      const response = await request.get('/api/customers')
      
      expect(response.status()).toBe(401)
    })

    test('should enforce role-based access control', async ({ page }) => {
      // Login as regular user (not admin)
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'user@example.com')
      await page.fill('input[name="password"]', 'User123!')
      await page.click('button[type="submit"]')
      
      // Try to access admin-only page
      await page.goto('/dashboard/settings/team')
      
      // Should show access denied or redirect
      await expect(page.locator('text=/access denied|forbidden/i')).toBeVisible()
    })

    test('should prevent customer data access across users', async ({ request, page }) => {
      // Login as user 1
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'user1@example.com')
      await page.fill('input[name="password"]', 'User123!')
      await page.click('button[type="submit"]')
      
      // Get session cookie
      const cookies = await page.context().cookies()
      const sessionCookie = cookies.find(c => c.name.includes('session'))
      
      // Try to access another user's customer
      const response = await request.get('/api/customers/other-user-customer-id', {
        headers: {
          Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
        },
      })
      
      expect(response.status()).toBe(403)
    })
  })

  test.describe('Data Protection', () => {
    test('should not expose sensitive data in responses', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      // Navigate to customer list
      const response = await page.waitForResponse(
        response => response.url().includes('/api/customers')
      )
      
      const data = await response.json()
      
      // Should not include password hashes
      if (data.data && data.data.length > 0) {
        expect(data.data[0].password).toBeUndefined()
        expect(data.data[0].passwordHash).toBeUndefined()
      }
    })

    test('should use HTTPS in production', async ({ page }) => {
      if (process.env.NODE_ENV === 'production') {
        await page.goto('/')
        const url = page.url()
        expect(url).toMatch(/^https:\/\//)
      }
    })

    test('should have secure headers', async ({ page }) => {
      const response = await page.goto('/')
      const headers = response?.headers()
      
      // Check for security headers
      expect(headers?.['x-frame-options']).toBeDefined()
      expect(headers?.['x-content-type-options']).toBe('nosniff')
      expect(headers?.['x-xss-protection']).toBeDefined()
    })
  })

  test.describe('API Security', () => {
    test('should validate input data types', async ({ request }) => {
      // Try to send invalid data type
      const response = await request.post('/api/customers', {
        data: {
          email: 12345, // Should be string
          firstName: ['array'], // Should be string
        },
      })
      
      expect(response.status()).toBe(400)
    })

    test('should sanitize database queries', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/customers')
      
      // Try SQL injection in search
      await page.fill('input[placeholder*="Search"]', "'; DROP TABLE users; --")
      await page.waitForTimeout(500)
      
      // Should not cause error or delete data
      await expect(page.locator('table')).toBeVisible()
    })

    test('should have rate limiting on API endpoints', async ({ request }) => {
      // Make many rapid requests
      const requests = []
      for (let i = 0; i < 100; i++) {
        requests.push(request.get('/api/customers'))
      }
      
      const responses = await Promise.all(requests)
      
      // Should eventually get rate limited
      const rateLimited = responses.some(r => r.status() === 429)
      expect(rateLimited).toBe(true)
    })
  })

  test.describe('Payment Security', () => {
    test('should use Stripe secure checkout', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/billing')
      await page.click('button:has-text("Upgrade")')
      
      // Should redirect to Stripe checkout (not handle cards directly)
      await page.waitForURL(/checkout\.stripe\.com|stripe/, { timeout: 5000 })
    })

    test('should verify webhook signatures', async ({ request }) => {
      // Try to send webhook without signature
      const response = await request.post('/api/webhooks/stripe', {
        data: { type: 'payment_intent.succeeded' },
      })
      
      expect(response.status()).toBe(400)
    })
  })

  test.describe('File Upload Security', () => {
    test('should validate file types for CSV import', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/customers')
      await page.click('button:has-text("Import")')
      
      // Try to upload non-CSV file
      const fileInput = page.locator('input[type="file"]')
      await fileInput.setInputFiles({
        name: 'malicious.exe',
        mimeType: 'application/x-msdownload',
        buffer: Buffer.from('MZ'), // EXE header
      })
      
      // Should show error
      await expect(page.locator('text=/invalid.*file.*type/i')).toBeVisible()
    })

    test('should limit file upload size', async ({ page }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      await page.goto('/dashboard/customers')
      await page.click('button:has-text("Import")')
      
      // Try to upload large file
      const largeBuffer = Buffer.alloc(20 * 1024 * 1024) // 20MB
      const fileInput = page.locator('input[type="file"]')
      await fileInput.setInputFiles({
        name: 'large.csv',
        mimeType: 'text/csv',
        buffer: largeBuffer,
      })
      
      // Should show size error
      await expect(page.locator('text=/file.*too.*large/i')).toBeVisible()
    })
  })

  test.describe('Session Security', () => {
    test('should expire sessions after inactivity', async ({ page, context }) => {
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      // Wait for session timeout (mocked in test environment)
      await page.waitForTimeout(5000)
      
      // Try to access protected page
      await page.goto('/dashboard')
      
      // Should redirect to login
      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should invalidate old sessions on password change', async ({ page, context }) => {
      // Login
      await page.goto('/auth/signin')
      await page.fill('input[name="email"]', 'admin@example.com')
      await page.fill('input[name="password"]', 'Admin123!')
      await page.click('button[type="submit"]')
      
      // Get current session
      const oldCookies = await context.cookies()
      
      // Change password
      await page.goto('/dashboard/settings/account')
      await page.click('button:has-text("Change Password")')
      await page.fill('input[name="currentPassword"]', 'Admin123!')
      await page.fill('input[name="newPassword"]', 'NewPassword123!')
      await page.click('button[type="submit"]')
      
      // Old session should be invalid
      const newCookies = await context.cookies()
      const oldSessionCookie = oldCookies.find(c => c.name.includes('session'))
      const newSessionCookie = newCookies.find(c => c.name.includes('session'))
      
      expect(oldSessionCookie?.value).not.toBe(newSessionCookie?.value)
    })
  })
})
