import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AIService } from '@/services/ai.service'
import { z } from 'zod'

const generateSchema = z.object({
  prompt: z.string().min(1),
  type: z.enum(['email', 'sms', 'subject', 'copy']),
  context: z.string().optional(),
  tone: z.enum(['professional', 'casual', 'friendly', 'formal']).optional(),
  length: z.enum(['short', 'medium', 'long']).optional(),
})

// POST /api/ai/generate
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = generateSchema.parse(body)

    const result = await AIService.generateContent(validatedData)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Deduct AI credits
    // await PaymentService.deductCredits(session.user.id, 'ai', 1)

    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error: any) {
    console.error('AI generate error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
