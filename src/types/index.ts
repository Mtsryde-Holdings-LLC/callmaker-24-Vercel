// Type definitions for NextAuth
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
      organizationId?: string | null
    }
  }

  interface User {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
    role: string
    organizationId?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    organizationId?: string | null
  }
}

// Global type definitions
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface EmailCampaignData {
  name: string
  subject: string
  previewText?: string
  fromName: string
  fromEmail: string
  replyTo?: string
  htmlContent: string
  textContent?: string
  segmentIds?: string[]
  tagIds?: string[]
  scheduledAt?: Date
  isAbTest?: boolean
}

export interface SmsCampaignData {
  name: string
  message: string
  segmentIds?: string[]
  tagIds?: string[]
  scheduledAt?: Date
}

export interface CustomerData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  company?: string
  tags?: string[]
  customFields?: Record<string, any>
  emailOptIn?: boolean
  smsOptIn?: boolean
}

export interface ChatMessageData {
  conversationId: string
  content: string
  sender: 'CUSTOMER' | 'AGENT' | 'BOT'
  attachments?: string[]
}

export interface CallData {
  customerId?: string
  direction: 'INBOUND' | 'OUTBOUND'
  from: string
  to: string
}

export interface AnalyticsData {
  emailCampaigns: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
    openRate: number
    clickRate: number
  }
  smsCampaigns: {
    sent: number
    delivered: number
    replied: number
    failed: number
    deliveryRate: number
    replyRate: number
  }
  customers: {
    total: number
    active: number
    new: number
    growthRate: number
  }
  revenue: {
    total: number
    recurring: number
    average: number
    growth: number
  }
}

export interface AIGenerationRequest {
  prompt: string
  type: 'email' | 'sms' | 'subject' | 'copy'
  context?: string
  tone?: 'professional' | 'casual' | 'friendly' | 'formal'
  length?: 'short' | 'medium' | 'long'
}

export interface AIGenerationResponse {
  content: string
  tokensUsed: number
  model: string
  cost?: number
}
