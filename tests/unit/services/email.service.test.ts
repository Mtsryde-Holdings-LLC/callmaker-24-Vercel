import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { EmailService } from '@/services/email.service'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({
        data: { id: 'test-email-id' },
        error: null,
      }),
    },
  })),
}))

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    emailMessage: {
      update: jest.fn(),
    },
  },
}))

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('send', () => {
    it('should send email successfully', async () => {
      const result = await EmailService.send({
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test content</p>',
      })

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })

    it('should handle send errors', async () => {
      // Mock error
      const { Resend } = require('resend')
      Resend.mockImplementationOnce(() => ({
        emails: {
          send: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Send failed' },
          }),
        },
      }))

      const result = await EmailService.send({
        to: 'test@example.com',
        subject: 'Test',
        html: '<p>Test</p>',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should include all email fields', async () => {
      const { Resend } = require('resend')
      const sendMock = jest.fn().mockResolvedValue({ data: { id: 'test' }, error: null })
      
      Resend.mockImplementationOnce(() => ({
        emails: { send: sendMock },
      }))

      await EmailService.send({
        to: 'test@example.com',
        subject: 'Test',
        html: '<p>Test</p>',
        text: 'Test',
        from: 'sender@example.com',
        replyTo: 'reply@example.com',
      })

      expect(sendMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Test',
          html: '<p>Test</p>',
          text: 'Test',
          reply_to: 'reply@example.com',
        })
      )
    })
  })

  describe('sendBatch', () => {
    it('should send multiple emails', async () => {
      const emails = [
        { to: 'test1@example.com', subject: 'Test 1', html: '<p>Test 1</p>' },
        { to: 'test2@example.com', subject: 'Test 2', html: '<p>Test 2</p>' },
      ]

      const result = await EmailService.sendBatch(emails)

      expect(result.success).toBe(true)
      expect(result.total).toBe(2)
      expect(result.successful).toBe(2)
      expect(result.failed).toBe(0)
    })
  })

  describe('trackOpen', () => {
    it('should update email message status on open', async () => {
      const { prisma } = require('@/lib/prisma')
      
      await EmailService.trackOpen('message-id-123')

      expect(prisma.emailMessage.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'message-id-123' },
          data: expect.objectContaining({
            status: 'OPENED',
            openCount: { increment: 1 },
          }),
        })
      )
    })
  })

  describe('trackClick', () => {
    it('should update email message status on click', async () => {
      const { prisma } = require('@/lib/prisma')
      
      await EmailService.trackClick('message-id-123')

      expect(prisma.emailMessage.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'message-id-123' },
          data: expect.objectContaining({
            status: 'CLICKED',
            clickCount: { increment: 1 },
          }),
        })
      )
    })
  })
})
