import { test, expect } from '@playwright/test'

test.describe('Email Campaign Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth/signin')
    await page.fill('input[name="email"]', 'admin@example.com')
    await page.fill('input[name="password"]', 'Admin123!')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should display email campaigns list', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns')
    await expect(page.locator('h1:has-text("Email Campaigns")')).toBeVisible()
  })

  test('should create a new email campaign', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns')
    await page.click('button:has-text("Create Campaign")')
    
    // Fill campaign details
    await page.fill('input[name="name"]', 'Test Email Campaign')
    await page.fill('input[name="subject"]', 'Welcome to Our Platform!')
    await page.fill('input[name="fromName"]', 'Marketing Team')
    await page.fill('input[name="fromEmail"]', 'marketing@example.com')
    
    // Fill email content
    await page.fill('textarea[name="htmlContent"]', '<h1>Welcome!</h1><p>Thanks for joining.</p>')
    
    // Save as draft
    await page.click('button:has-text("Save Draft")')
    
    await expect(page.locator('text=Campaign saved')).toBeVisible()
  })

  test('should use AI to generate email content', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns/new')
    
    // Click AI generate button
    await page.click('button:has-text("Generate with AI")')
    
    // Enter prompt
    await page.fill('textarea[name="prompt"]', 'Write a welcome email for new customers')
    await page.click('button:has-text("Generate")')
    
    // Wait for AI response
    await page.waitForSelector('text=Generated content', { timeout: 10000 })
    
    await expect(page.locator('textarea[name="htmlContent"]')).not.toBeEmpty()
  })

  test('should schedule campaign for later', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns/new')
    
    await page.fill('input[name="name"]', 'Scheduled Campaign')
    await page.fill('input[name="subject"]', 'Coming Soon!')
    await page.fill('input[name="fromName"]', 'Team')
    await page.fill('input[name="fromEmail"]', 'team@example.com')
    await page.fill('textarea[name="htmlContent"]', '<p>Content</p>')
    
    // Set schedule
    await page.click('input[name="scheduledAt"]')
    await page.fill('input[name="scheduledAt"]', '2025-12-01T10:00')
    
    await page.click('button:has-text("Schedule")')
    
    await expect(page.locator('text=Campaign scheduled')).toBeVisible()
  })

  test('should send test email', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns')
    await page.click('tbody tr:first-child')
    
    await page.click('button:has-text("Send Test")')
    await page.fill('input[name="testEmail"]', 'test@example.com')
    await page.click('button:has-text("Send")')
    
    await expect(page.locator('text=Test email sent')).toBeVisible()
  })

  test('should view campaign analytics', async ({ page }) => {
    await page.goto('/dashboard/email-campaigns')
    await page.click('tbody tr:first-child')
    await page.click('button:has-text("Analytics")')
    
    // Should display metrics
    await expect(page.locator('text=Open Rate')).toBeVisible()
    await expect(page.locator('text=Click Rate')).toBeVisible()
    await expect(page.locator('text=Delivery Rate')).toBeVisible()
  })
})
