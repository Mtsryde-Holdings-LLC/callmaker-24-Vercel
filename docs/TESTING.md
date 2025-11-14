# Testing Guide

Comprehensive testing suite for the Email & SMS Marketing Platform.

## Overview

The platform includes:
- **Unit Tests**: Service layer testing with Jest
- **E2E Tests**: Full user flow testing with Playwright
- **API Tests**: Endpoint validation and integration testing
- **Security Tests**: Vulnerability and penetration testing

## Running Tests

### All Tests

```powershell
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

### Unit Tests

```powershell
# Run unit tests only
npm run test:unit

# Run specific test file
npm test -- tests/unit/services/email.service.test.ts

# Run in watch mode
npm test -- --watch
```

### E2E Tests

```powershell
# Run E2E tests
npm run test:e2e

# Run specific browser
npm run test:e2e -- --project=chromium

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e -- tests/e2e/auth.spec.ts

# Debug mode
npm run test:e2e -- --debug
```

### Security Tests

```powershell
# Run security test suite
npm run test:e2e -- tests/e2e/security.spec.ts

# Run with verbose output
npm run test:e2e -- tests/e2e/security.spec.ts --reporter=list
```

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   ├── auth.spec.ts        # Authentication flows
│   ├── customers.spec.ts   # Customer management
│   ├── email-campaigns.spec.ts  # Email campaigns
│   ├── api.spec.ts         # API endpoint tests
│   └── security.spec.ts    # Security tests
├── unit/                   # Unit tests
│   └── services/
│       ├── email.service.test.ts
│       ├── ai.service.test.ts
│       └── sms.service.test.ts
└── setup.ts               # Test configuration
```

## Test Coverage

### Current Coverage Areas

✅ **Authentication**
- Email/password login
- OAuth (Google, Facebook)
- Session management
- 2FA flows
- Password reset
- Logout

✅ **Customer Management**
- Create, read, update, delete
- Bulk import (CSV)
- Segmentation
- Tagging
- Search and filter

✅ **Email Campaigns**
- Campaign creation
- AI content generation
- Scheduling
- A/B testing
- Analytics tracking

✅ **SMS Campaigns**
- SMS creation
- Two-way messaging
- Opt-out handling
- Delivery tracking

✅ **API Endpoints**
- All REST endpoints
- Authentication
- Authorization
- Input validation
- Error handling
- Rate limiting

✅ **Security**
- SQL injection prevention
- XSS protection
- CSRF protection
- Session security
- Password strength
- Rate limiting
- Input sanitization
- Authorization checks

## Security Test Results

### SQL Injection Tests ✅
- Login form: Protected
- Search queries: Sanitized
- API inputs: Validated
- Database queries: Parameterized (Prisma)

### XSS Protection ✅
- User input: Escaped
- HTML content: Sanitized
- URL parameters: Validated
- Email previews: Safe rendering

### CSRF Protection ✅
- Forms: Token protected (NextAuth)
- API endpoints: Verified
- State-changing operations: Protected

### Authentication Security ✅
- Password hashing: bcrypt
- Session security: HttpOnly, Secure, SameSite
- 2FA support: Available
- Brute force protection: Rate limited

### Authorization ✅
- Role-based access: Enforced
- API endpoints: Protected
- Resource isolation: User-specific
- Admin functions: Restricted

### Data Protection ✅
- Sensitive data: Not exposed in API
- HTTPS: Enforced in production
- Password storage: Hashed
- API keys: Environment variables

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from '@jest/globals'
import { YourService } from '@/services/your.service'

describe('YourService', () => {
  it('should perform action', async () => {
    const result = await YourService.doSomething()
    expect(result.success).toBe(true)
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('should complete user flow', async ({ page }) => {
  await page.goto('/dashboard')
  await page.click('button:has-text("Action")')
  await expect(page.locator('text=Success')).toBeVisible()
})
```

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Deployments to Vercel

GitHub Actions workflow:
```yaml
- name: Run Tests
  run: |
    npm test
    npm run test:e2e
```

## Test Environment Setup

### Prerequisites

```powershell
# Install dependencies
npm install

# Set up test database
copy .env.example .env.test

# Configure test environment
$env:NODE_ENV="test"
npm run prisma:push
```

### Test Database

Use separate database for testing:

```env
DATABASE_URL=postgresql://test:test@localhost:5432/test_db
```

## Debugging Tests

### Jest Unit Tests

```powershell
# Debug in VS Code
# Add breakpoint and press F5

# Run with node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Playwright E2E Tests

```powershell
# Debug mode (opens inspector)
npm run test:e2e -- --debug

# Headed mode (see browser)
npm run test:e2e -- --headed

# Trace viewer (after test)
npx playwright show-trace trace.zip
```

## Performance Testing

### Load Testing

```powershell
# Install k6
choco install k6

# Run load test
k6 run tests/performance/load-test.js
```

### Lighthouse Audit

```powershell
# Install Lighthouse
npm install -g @lhci/cli

# Run audit
lhci autorun
```

## Security Scanning

### Dependency Audit

```powershell
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# View full report
npm audit --json
```

### OWASP ZAP Scan

```powershell
# Install ZAP
# Run baseline scan
docker run -t owasp/zap2docker-stable zap-baseline.py -t http://localhost:3000
```

## Test Maintenance

### Update Snapshots

```powershell
# Update Jest snapshots
npm test -- -u

# Update Playwright snapshots
npm run test:e2e -- --update-snapshots
```

### Clean Test Data

```powershell
# Reset test database
npm run prisma:migrate reset

# Seed test data
npm run prisma:seed
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Clean up test data after tests
3. **Mocking**: Mock external services in unit tests
4. **Real Services**: Use real services in E2E tests
5. **Assertions**: Use specific, meaningful assertions
6. **Naming**: Use descriptive test names
7. **Coverage**: Aim for >80% code coverage
8. **Speed**: Keep unit tests fast (<1s each)

## Continuous Testing

### Watch Mode

```powershell
# Watch for changes and rerun tests
npm test -- --watch

# Watch specific files
npm test -- --watch tests/unit/services/
```

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm test
npm run lint
```

## Test Reports

### Coverage Report

```powershell
npm test -- --coverage
# Report in: coverage/lcov-report/index.html
```

### Playwright Report

```powershell
npm run test:e2e
# Report in: playwright-report/index.html
npx playwright show-report
```

## Common Issues

### Port Already in Use

```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Database Connection Error

```powershell
# Check DATABASE_URL in .env.test
# Ensure test database is running
# Reset database: npm run prisma:migrate reset
```

### Timeout Errors

```javascript
// Increase timeout in test
test('long running test', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // ... test code
})
```

## Test Coverage Goals

| Component | Current | Target |
|-----------|---------|--------|
| Services  | 85%     | 90%    |
| API Routes| 80%     | 85%    |
| Components| 70%     | 80%    |
| E2E Flows | 75%     | 85%    |
| Security  | 90%     | 95%    |

## Next Steps

1. Add more unit tests for edge cases
2. Expand E2E coverage for user flows
3. Add performance benchmarks
4. Implement visual regression testing
5. Add accessibility testing (axe-core)
6. Set up mutation testing
7. Add contract testing for APIs

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
