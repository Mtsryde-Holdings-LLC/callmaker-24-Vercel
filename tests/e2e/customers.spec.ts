import { test, expect } from '@playwright/test'

test.describe('Customer Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/signin')
    await page.fill('input[name="email"]', 'admin@example.com')
    await page.fill('input[name="password"]', 'Admin123!')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should display customers list', async ({ page }) => {
    await page.goto('/dashboard/customers')
    await expect(page.locator('h1:has-text("Customers")')).toBeVisible()
    await expect(page.locator('table')).toBeVisible()
  })

  test('should create a new customer', async ({ page }) => {
    await page.goto('/dashboard/customers')
    await page.click('button:has-text("Add Customer")')
    
    // Fill customer form
    await page.fill('input[name="email"]', 'newcustomer@example.com')
    await page.fill('input[name="firstName"]', 'John')
    await page.fill('input[name="lastName"]', 'Doe')
    await page.fill('input[name="phone"]', '+1234567890')
    await page.fill('input[name="company"]', 'Test Company')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Should show success message
    await expect(page.locator('text=Customer created successfully')).toBeVisible()
  })

  test('should search for customers', async ({ page }) => {
    await page.goto('/dashboard/customers')
    await page.fill('input[placeholder*="Search"]', 'John')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    // Should show filtered results
    const rows = page.locator('tbody tr')
    await expect(rows).toContainText('John')
  })

  test('should edit customer details', async ({ page }) => {
    await page.goto('/dashboard/customers')
    
    // Click on first customer
    await page.click('tbody tr:first-child')
    
    // Click edit button
    await page.click('button:has-text("Edit")')
    
    // Update customer
    await page.fill('input[name="firstName"]', 'Jane')
    await page.click('button[type="submit"]')
    
    // Should show success message
    await expect(page.locator('text=Customer updated successfully')).toBeVisible()
  })

  test('should delete a customer', async ({ page }) => {
    await page.goto('/dashboard/customers')
    
    // Click on a customer
    await page.click('tbody tr:first-child')
    
    // Click delete button
    await page.click('button:has-text("Delete")')
    
    // Confirm deletion
    await page.click('button:has-text("Confirm")')
    
    // Should show success message
    await expect(page.locator('text=Customer deleted successfully')).toBeVisible()
  })

  test('should import customers from CSV', async ({ page }) => {
    await page.goto('/dashboard/customers')
    await page.click('button:has-text("Import")')
    
    // Upload CSV file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles({
      name: 'customers.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from('email,firstName,lastName\ntest@example.com,Test,User'),
    })
    
    await page.click('button:has-text("Upload")')
    
    // Should show import success
    await expect(page.locator('text=Imported successfully')).toBeVisible()
  })
})
