// AI Utility Functions for Content Generation and Analysis

import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIContentRequest {
  type: 'summary' | 'description' | 'seo' | 'recommendation' | 'review'
  content: string
  context?: any
  length?: 'short' | 'medium' | 'long'
}

export interface AIResponse {
  content: string
  metadata?: {
    tokens: number
    model: string
    processingTime: number
  }
}

/**
 * Generate AI-powered content
 */
export async function generateContent(request: AIContentRequest): Promise<AIResponse> {
  const startTime = Date.now()

  try {
    let prompt = ''

    switch (request.type) {
      case 'summary':
        prompt = `Summarize the following content about Pittsburgh in a ${request.length || 'medium'} paragraph. Make it engaging and highlight key points:\n\n${request.content}`
        break

      case 'description':
        prompt = `Write an engaging description for a Pittsburgh business or attraction. Make it ${request.length || 'medium'} length and highlight what makes it special:\n\n${request.content}`
        break

      case 'seo':
        prompt = `Generate SEO-optimized content for Pittsburgh. Focus on local keywords and make it engaging:\n\n${request.content}`
        break

      case 'recommendation':
        prompt = `Based on the following information, provide personalized recommendations for Pittsburgh visitors or residents:\n\n${request.content}`
        break

      case 'review':
        prompt = `Generate an authentic-sounding review based on the following details:\n\n${request.content}`
        break

      default:
        prompt = request.content
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert on Pittsburgh, Pennsylvania. Provide accurate, engaging content about Pittsburgh\'s attractions, restaurants, events, and culture.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: request.length === 'short' ? 100 : request.length === 'long' ? 500 : 250,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''

    return {
      content,
      metadata: {
        tokens: completion.usage?.total_tokens || 0,
        model: completion.model,
        processingTime: Date.now() - startTime,
      }
    }

  } catch (error) {
    console.error('AI content generation error:', error)

    // Fallback content if AI fails
    return {
      content: generateFallbackContent(request),
      metadata: {
        tokens: 0,
        model: 'fallback',
        processingTime: Date.now() - startTime,
      }
    }
  }
}

/**
 * Generate fallback content when AI is unavailable
 */
function generateFallbackContent(request: AIContentRequest): string {
  switch (request.type) {
    case 'summary':
      return `This Pittsburgh location offers unique experiences and local charm. Located in the heart of the city, it provides authentic Pittsburgh culture and community atmosphere.`

    case 'description':
      return `A wonderful Pittsburgh destination offering quality service and local character. This establishment embodies the spirit of Pittsburgh with its commitment to community and excellence.`

    case 'seo':
      return `Discover Pittsburgh's best local attractions, restaurants, and events. Experience authentic Pittsburgh culture with our comprehensive guide to the city's hidden gems and popular destinations.`

    case 'recommendation':
      return `For the best Pittsburgh experience, consider visiting local favorites and exploring neighborhood gems. Each area offers unique character and authentic local culture.`

    case 'review':
      return `Great local spot with authentic Pittsburgh charm. The atmosphere is welcoming and the service is friendly. Definitely worth a visit for anyone exploring Pittsburgh.`

    default:
      return request.content
  }
}

/**
 * Analyze sentiment of text content
 */
export async function analyzeSentiment(text: string): Promise<{
  sentiment: 'positive' | 'negative' | 'neutral'
  score: number
  confidence: number
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Analyze the sentiment of the following text. Return only a JSON object with sentiment (positive/negative/neutral), score (-1 to 1), and confidence (0-1).'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
    })

    const response = completion.choices[0]?.message?.content || '{}'
    const result = JSON.parse(response)

    return {
      sentiment: result.sentiment || 'neutral',
      score: result.score || 0,
      confidence: result.confidence || 0.5,
    }

  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return {
      sentiment: 'neutral',
      score: 0,
      confidence: 0.5,
    }
  }
}

/**
 * Generate personalized recommendations
 */
export async function generateRecommendations(userPreferences: {
  interests: string[]
  budget: string
  groupSize: string
  timeOfDay: string
}): Promise<string[]> {
  try {
    const prompt = `Based on these preferences, recommend 5 specific Pittsburgh activities or locations:

Interests: ${userPreferences.interests.join(', ')}
Budget: ${userPreferences.budget}
Group Size: ${userPreferences.groupSize}
Time of Day: ${userPreferences.timeOfDay}

Provide specific recommendations with brief explanations.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a Pittsburgh tourism expert. Provide specific, accurate recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''
    return content.split('\n').filter(line => line.trim().length > 0)

  } catch (error) {
    console.error('Recommendation generation error:', error)
    return [
      'Visit the Strip District for local food shopping',
      'Explore Oakland for museums and universities',
      'Check out South Side for nightlife and dining',
      'Take the Duquesne Incline for city views',
      'Walk across the Roberto Clemente Bridge'
    ]
  }
}

/**
 * Extract keywords from text
 */
export async function extractKeywords(text: string, maxKeywords = 10): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Extract the most relevant keywords from the following text. Return a JSON array of ${maxKeywords} keywords, focusing on location, activities, and Pittsburgh-specific terms.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
    })

    const response = completion.choices[0]?.message?.content || '[]'
    return JSON.parse(response)

  } catch (error) {
    console.error('Keyword extraction error:', error)
    // Fallback keyword extraction
    return text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .slice(0, maxKeywords)
  }
}

/**
 * Check if content needs AI enhancement
 */
export function needsEnhancement(content: string): boolean {
  const minLength = 100
  const hasLocalKeywords = /\b(Pittsburgh|Oakland|Strip District|South Side|Schenley|Carnegie|Heinz|Phipps)\b/i.test(content)
  const hasActionWords = /\b(visit|explore|experience|discover|enjoy|try|see)\b/i.test(content)

  return content.length < minLength || !hasLocalKeywords || !hasActionWords
}
