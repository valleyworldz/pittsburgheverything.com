import { NextRequest, NextResponse } from 'next/server'
import { pittsburghRestaurants } from '@/data/pittsburghRestaurants'
import { pittsburghEvents, getEventsToday, getEventsThisWeekend } from '@/data/pittsburghEvents'
import { getAllNeighborhoods, searchNeighborhoods } from '@/data/pittsburghNeighborhoods'
import { getAllApartments } from '@/data/pittsburghHousing'
import { getAllJobs } from '@/data/pittsburghJobs'
import { getAllKidsActivities } from '@/data/pittsburghFamily'
import { pittsburghAttractions } from '@/data/pittsburghAttractions'

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Intelligent AI Guide that uses real data to provide accurate recommendations
 * Falls back to rule-based responses if AI API is not available
 */
export async function POST(req: NextRequest) {
  try {
    const { question, conversationHistory = [] } = await req.json()

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Invalid question' },
        { status: 400 }
      )
    }

    const lowerQuestion = question.toLowerCase()
    let answer = ''
    let suggestions: string[] = []

    // Load relevant data
    const restaurants = pittsburghRestaurants
    const events = pittsburghEvents
    const neighborhoods = getAllNeighborhoods()
    const apartments = getAllApartments()
    const jobs = getAllJobs()
    const activities = getAllKidsActivities()
    const attractions = pittsburghAttractions

    // Context-aware response generation using real data
    if (lowerQuestion.includes('restaurant') || lowerQuestion.includes('eat') || lowerQuestion.includes('dining') || lowerQuestion.includes('food')) {
      answer = generateRestaurantRecommendation(lowerQuestion, restaurants, neighborhoods)
      suggestions = [
        "Best brunch spots in Shadyside",
        "Cheap eats under $20",
        "Date night restaurants",
        "Family-friendly dining"
      ]
    } else if (lowerQuestion.includes('event') || lowerQuestion.includes('weekend') || lowerQuestion.includes('today') || lowerQuestion.includes('happening')) {
      answer = generateEventRecommendation(lowerQuestion, events)
      suggestions = [
        "Events this weekend",
        "Free events today",
        "Family-friendly events",
        "Concerts this month"
      ]
    } else if (lowerQuestion.includes('neighborhood') || lowerQuestion.includes('area') || lowerQuestion.includes('live') || lowerQuestion.includes('move')) {
      answer = generateNeighborhoodRecommendation(lowerQuestion, neighborhoods)
      suggestions = [
        "Best neighborhoods for families",
        "Affordable neighborhoods",
        "Neighborhoods near downtown",
        "Walkable neighborhoods"
      ]
    } else if (lowerQuestion.includes('apartment') || lowerQuestion.includes('rent') || lowerQuestion.includes('housing') || lowerQuestion.includes('live')) {
      answer = generateHousingRecommendation(lowerQuestion, apartments, neighborhoods)
      suggestions = [
        "Affordable apartments",
        "Pet-friendly apartments",
        "Apartments near universities",
        "Studio apartments"
      ]
    } else if (lowerQuestion.includes('job') || lowerQuestion.includes('hire') || lowerQuestion.includes('career') || lowerQuestion.includes('work')) {
      answer = generateJobRecommendation(lowerQuestion, jobs)
      suggestions = [
        "Jobs hiring now",
        "Remote jobs",
        "Entry-level jobs",
        "Full-time positions"
      ]
    } else if (lowerQuestion.includes('activity') || lowerQuestion.includes('do') || lowerQuestion.includes('kids') || lowerQuestion.includes('family')) {
      answer = generateActivityRecommendation(lowerQuestion, activities, attractions)
      suggestions = [
        "Free things to do",
        "Family activities",
        "Outdoor activities",
        "Museums and galleries"
      ]
    } else if (lowerQuestion.includes('best') || lowerQuestion.includes('top') || lowerQuestion.includes('recommend')) {
      answer = generateGeneralRecommendation(lowerQuestion, restaurants, events, neighborhoods, attractions)
      suggestions = [
        "Best restaurants",
        "Top attractions",
        "Must-see places",
        "Hidden gems"
      ]
    } else {
      // General fallback with helpful context
      answer = `I can help you with restaurants, events, neighborhoods, housing, jobs, and activities in Pittsburgh. ` +
        `For example, I can recommend the best date-night restaurants in Lawrenceville, ` +
        `events happening this weekend, family-friendly neighborhoods, or affordable apartments. ` +
        `What specific aspect of Pittsburgh would you like to know about?`
      suggestions = [
        "Best restaurants for date night",
        "Events this weekend",
        "Family-friendly neighborhoods",
        "Things to do today"
      ]
    }

    // Try to enhance with AI if available (optional - uses free tier)
    if (process.env.OPENAI_API_KEY) {
      try {
        const enhancedAnswer = await enhanceWithAI(question, answer, conversationHistory)
        if (enhancedAnswer) {
          answer = enhancedAnswer
        }
      } catch (error) {
        console.log('AI enhancement failed, using rule-based response:', error)
        // Continue with rule-based answer
      }
    }

    return NextResponse.json({ answer, suggestions })
  } catch (error) {
    console.error('AI Guide error:', error)
    return NextResponse.json(
      { error: 'Server error', answer: 'I apologize, but I encountered an error. Please try rephrasing your question.' },
      { status: 500 }
    )
  }
}

function generateRestaurantRecommendation(query: string, restaurants: any[], neighborhoods: any[]): string {
  let filtered = [...restaurants]
  let context = ''

  // Filter by neighborhood
  const neighborhoodMatch = neighborhoods.find(n => 
    query.includes(n.name.toLowerCase()) || query.includes(n.slug.toLowerCase())
  )
  if (neighborhoodMatch) {
    filtered = filtered.filter(r => r.neighborhood === neighborhoodMatch.name)
    context = ` in ${neighborhoodMatch.name}`
  }

  // Filter by cuisine/type
  if (query.includes('brunch') || query.includes('breakfast')) {
    filtered = filtered.filter(r => r.tags?.includes('brunch') || r.cuisine?.some((c: string) => c.toLowerCase().includes('breakfast')))
    const top = filtered.slice(0, 3)
    return `For brunch${context}, I recommend:\n\n` +
      top.map((r, i) => `${i + 1}. **${r.name}** - ${r.description?.substring(0, 100)}... Located in ${r.neighborhood}. Rating: ${r.rating}/5`).join('\n\n') +
      `\n\nCheck out our brunch page for more options!`
  }

  if (query.includes('date') || query.includes('romantic')) {
    filtered = filtered.filter(r => r.tags?.includes('date-night') || r.priceRange === '$$$' || r.priceRange === '$$$$')
    const top = filtered.slice(0, 3)
    return `For a romantic date night${context}, I recommend:\n\n` +
      top.map((r, i) => `${i + 1}. **${r.name}** - ${r.description?.substring(0, 100)}... Perfect for special occasions. Rating: ${r.rating}/5`).join('\n\n') +
      `\n\nThese restaurants offer great ambiance and excellent service!`
  }

  if (query.includes('cheap') || query.includes('budget') || query.includes('affordable')) {
    filtered = filtered.filter(r => r.priceRange === '$' || r.priceRange === '$$')
    const top = filtered.slice(0, 5)
    return `For budget-friendly dining${context}, here are great options:\n\n` +
      top.map((r, i) => `${i + 1}. **${r.name}** - ${r.cuisine?.join(', ')} in ${r.neighborhood}. Price: ${r.priceRange}`).join('\n\n') +
      `\n\nAll of these offer great value!`
  }

  // Default: top-rated restaurants
  const top = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5)
  return `Here are some top-rated restaurants${context}:\n\n` +
    top.map((r, i) => `${i + 1}. **${r.name}** - ${r.cuisine?.join(', ')} in ${r.neighborhood}. Rating: ${r.rating}/5`).join('\n\n') +
    `\n\nBrowse our restaurants page for more options and detailed information!`
}

function generateEventRecommendation(query: string, events: any[]): string {
  let filtered = [...events]
  let timeContext = ''

  if (query.includes('today') || query.includes('tonight')) {
    filtered = getEventsToday()
    timeContext = 'today'
  } else if (query.includes('weekend')) {
    filtered = getEventsThisWeekend()
    timeContext = 'this weekend'
  }

  if (filtered.length === 0) {
    return `I don't see any events ${timeContext || 'matching your criteria'}. ` +
      `Check our events page for the full calendar, or ask about events happening this weekend!`
  }

  const top = filtered.slice(0, 5)
  return `Here are ${timeContext ? `events ${timeContext}` : 'some great events'}:\n\n` +
    top.map((e, i) => `${i + 1}. **${e.title}** - ${e.description?.substring(0, 100)}... ` +
      `${e.location?.neighborhood ? `Located in ${e.location.neighborhood}. ` : ''}` +
      `${e.startDate ? `Date: ${new Date(e.startDate).toLocaleDateString()}` : ''}`).join('\n\n') +
    `\n\nVisit our events page for tickets and more details!`
}

function generateNeighborhoodRecommendation(query: string, neighborhoods: any[]): string {
  let filtered = [...neighborhoods]

  if (query.includes('family') || query.includes('kids')) {
    filtered = filtered.filter(n => 
      n.highlights?.some((h: string) => h.toLowerCase().includes('family')) ||
      n.walkScore && n.walkScore > 70
    )
    const top = filtered.slice(0, 3)
    return `For families, I recommend these neighborhoods:\n\n` +
      top.map((n, i) => `${i + 1}. **${n.name}** - ${n.description?.substring(0, 150)}... ` +
        `Walk Score: ${n.walkScore || 'N/A'}, Population: ${n.population?.toLocaleString() || 'N/A'}`).join('\n\n') +
      `\n\nThese areas offer great schools, parks, and family-friendly amenities!`
  }

  if (query.includes('affordable') || query.includes('cheap') || query.includes('budget')) {
    filtered = filtered.sort((a, b) => (a.medianHomePrice || 0) - (b.medianHomePrice || 0))
    const top = filtered.slice(0, 3)
    return `For affordable living, consider these neighborhoods:\n\n` +
      top.map((n, i) => `${i + 1}. **${n.name}** - Median home price: $${(n.medianHomePrice || 0).toLocaleString()}, ` +
        `Median rent: $${(n.medianRent || 0).toLocaleString()}/month. ${n.description?.substring(0, 100)}...`).join('\n\n') +
      `\n\nThese offer great value while still being close to the city!`
  }

  // Default: top neighborhoods
  const top = filtered.slice(0, 5)
  return `Here are some great Pittsburgh neighborhoods:\n\n` +
    top.map((n, i) => `${i + 1}. **${n.name}** - ${n.description?.substring(0, 150)}... ` +
      `Distance from downtown: ${n.distanceFromDowntown || 'N/A'} miles`).join('\n\n') +
    `\n\nExplore our neighborhoods page for detailed information and photos!`
}

function generateHousingRecommendation(query: string, apartments: any[], neighborhoods: any[]): string {
  let filtered = [...apartments]

  if (query.includes('affordable') || query.includes('cheap') || query.includes('budget')) {
    filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
    const top = filtered.slice(0, 3)
    return `For affordable apartments, here are some options:\n\n` +
      top.map((a, i) => `${i + 1}. **${a.name}** - $${(a.price || 0).toLocaleString()}/month, ` +
        `${a.bedrooms} bed, ${a.bathrooms} bath in ${a.neighborhood}`).join('\n\n') +
      `\n\nCheck our apartments page for more listings!`
  }

  if (query.includes('pet') || query.includes('dog') || query.includes('cat')) {
    filtered = filtered.filter(a => a.petPolicy?.allowed)
    const top = filtered.slice(0, 3)
    return `Pet-friendly apartments:\n\n` +
      top.map((a, i) => `${i + 1}. **${a.name}** - $${(a.price || 0).toLocaleString()}/month, ` +
        `${a.bedrooms} bed in ${a.neighborhood}. Pet policy: ${a.petPolicy?.details || 'Pets allowed'}`).join('\n\n') +
      `\n\nBrowse our housing page for more pet-friendly options!`
  }

  const top = filtered.slice(0, 5)
  return `Here are some apartment listings:\n\n` +
    top.map((a, i) => `${i + 1}. **${a.name}** - $${(a.price || 0).toLocaleString()}/month, ` +
      `${a.bedrooms} bed, ${a.bathrooms} bath in ${a.neighborhood}`).join('\n\n') +
    `\n\nVisit our housing page for more listings and details!`
}

function generateJobRecommendation(query: string, jobs: any[]): string {
  let filtered = [...jobs]

  if (query.includes('urgent') || query.includes('hiring') || query.includes('now')) {
    filtered = filtered.filter(j => j.urgent)
  }

  if (query.includes('remote')) {
    filtered = filtered.filter(j => j.type === 'Remote' || j.location?.toLowerCase().includes('remote'))
  }

  const top = filtered.slice(0, 5)
  if (top.length === 0) {
    return `I don't see any jobs matching your criteria right now. ` +
      `Check our jobs page for the latest listings, or try searching for different keywords!`
  }

  return `Here are some job opportunities:\n\n` +
    top.map((j, i) => `${i + 1}. **${j.title}** at ${j.company} - ` +
      `${j.type} position${j.salary ? `, Salary: ${j.salary}` : ''} in ${j.location}`).join('\n\n') +
    `\n\nVisit our jobs page to apply and see more opportunities!`
}

function generateActivityRecommendation(query: string, activities: any[], attractions: any[]): string {
  let filtered = [...activities, ...attractions]

  if (query.includes('free')) {
    filtered = filtered.filter(a => a.priceRange === 'Free' || a.price === 0)
    const top = filtered.slice(0, 5)
    return `Free things to do in Pittsburgh:\n\n` +
      top.map((a, i) => `${i + 1}. **${a.name}** - ${a.description?.substring(0, 120)}...`).join('\n\n') +
      `\n\nCheck our "Things to Do" page for more free activities!`
  }

  if (query.includes('family') || query.includes('kids')) {
    filtered = filtered.filter(a => 
      a.ageRange?.toLowerCase().includes('all') || 
      a.bestFor?.some((b: string) => b.toLowerCase().includes('family'))
    )
    const top = filtered.slice(0, 5)
    return `Family-friendly activities:\n\n` +
      top.map((a, i) => `${i + 1}. **${a.name}** - ${a.description?.substring(0, 120)}... ` +
        `${a.ageRange ? `Age range: ${a.ageRange}` : ''}`).join('\n\n') +
      `\n\nVisit our family activities page for more options!`
  }

  const top = filtered.slice(0, 5)
  return `Here are some great things to do:\n\n` +
    top.map((a, i) => `${i + 1}. **${a.name}** - ${a.description?.substring(0, 120)}...`).join('\n\n') +
    `\n\nExplore our "Things to Do" page for more activities and attractions!`
}

function generateGeneralRecommendation(query: string, restaurants: any[], events: any[], neighborhoods: any[], attractions: any[]): string {
  const topRestaurants = restaurants.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)
  const topAttractions = attractions.slice(0, 3)
  const topNeighborhoods = neighborhoods.slice(0, 2)

  return `Here are some top recommendations for Pittsburgh:\n\n` +
    `**Top Restaurants:**\n` +
    topRestaurants.map((r, i) => `${i + 1}. ${r.name} - ${r.cuisine?.join(', ')} in ${r.neighborhood} (${r.rating}/5)`).join('\n') +
    `\n\n**Must-See Attractions:**\n` +
    topAttractions.map((a, i) => `${i + 1}. ${a.name} - ${a.description?.substring(0, 80)}...`).join('\n') +
    `\n\n**Great Neighborhoods:**\n` +
    topNeighborhoods.map((n, i) => `${i + 1}. ${n.name} - ${n.description?.substring(0, 80)}...`).join('\n') +
    `\n\nExplore our site for detailed information on restaurants, events, neighborhoods, and more!`
}

/**
 * Optional: Enhance response with AI (uses free tier if available)
 */
async function enhanceWithAI(question: string, baseAnswer: string, history: ConversationMessage[]): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }

  try {
    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const systemPrompt = `You are a helpful AI guide for Pittsburgh, Pennsylvania. ` +
      `You have access to real data about restaurants, events, neighborhoods, housing, and jobs. ` +
      `Provide accurate, concise, and friendly recommendations. Be specific and mention actual places when possible. ` +
      `Keep responses under 300 words and use markdown formatting for lists.`

    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-3),
      { role: 'user', content: question }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || null
  } catch (error) {
    console.error('AI enhancement error:', error)
    return null
  }
}
