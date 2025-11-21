'use client'

import { useState } from 'react'
import { Bot, Send, Sparkles, MapPin, Utensils, Calendar, Star } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface Suggestion {
  icon: React.ReactNode
  text: string
  category: string
}

const suggestions: Suggestion[] = [
  {
    icon: <Utensils className="w-5 h-5" />,
    text: "Best pizza places in Pittsburgh",
    category: "Food"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    text: "Weekend events this month",
    category: "Events"
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    text: "Family-friendly neighborhoods",
    category: "Neighborhoods"
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "Romantic date night spots",
    category: "Dining"
  }
]

export default function AIGuideWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI Pittsburgh guide. Ask me anything about Pittsburgh - restaurants, events, neighborhoods, or hidden gems. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (message?: string) => {
    const userMessage = message || input.trim()
    if (!userMessage) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage)
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, newAIMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('pizza') || lowerQuery.includes('italian')) {
      return "For authentic Pittsburgh pizza, you can't beat DiNapoli's Firehouse (multiple locations) or Aiello's in Oakland. For something more unique, try Fat Head's Saloon in the South Side - they make amazing artisanal pizzas with local craft beers. Both are highly rated by locals!"
    }

    if (lowerQuery.includes('event') || lowerQuery.includes('weekend')) {
      return "This weekend in Pittsburgh: The Pittsburgh Food Festival is happening at Point State Park (Friday-Sunday), there's a craft beer festival in Lawrenceville on Saturday, and don't miss the free outdoor concert at Hartwood Acres on Sunday. Check the events page for full details and tickets!"
    }

    if (lowerQuery.includes('neighborhood') || lowerQuery.includes('family')) {
      return "For families, I'd recommend Shadyside or Lawrenceville. Shadyside has great parks, excellent schools, and family-friendly restaurants. Lawrenceville has a cool arts scene, playgrounds, and is very walkable. Both neighborhoods have that small-town feel within the city!"
    }

    if (lowerQuery.includes('romantic') || lowerQuery.includes('date')) {
      return "For a romantic date night in Pittsburgh, try The Porch at Schenley for farm-to-table dining with city views, or Monterey Bay Fish Grotto in the Strip District for seafood and ambiance. Both are perfect for special occasions!"
    }

    if (lowerQuery.includes('steelers') || lowerQuery.includes('football')) {
      return "Steelers season is here! Catch a game at Acrisure Stadium (formerly Heinz Field) in Oakland. Tickets usually start around $50. If you can't make a game, the Steelers Experience at the stadium is a great way to experience the team's history and get autographed memorabilia."
    }

    if (lowerQuery.includes('museum') || lowerQuery.includes('art')) {
      return "Pittsburgh has world-class museums! Start with the Carnegie Museum of Art (free admission) in Oakland, then visit the Andy Warhol Museum downtown. Both are incredible and offer something unique to Pittsburgh's artistic heritage."
    }

    return "That's a great question! Pittsburgh has so much to offer. I'd recommend checking out our events page for current happenings, the restaurants section for dining options, or the neighborhoods guide to find your perfect area. What specific aspect of Pittsburgh interests you most?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-400 text-pittsburgh-black p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-black text-lg">AI Pittsburgh Guide</h3>
            <p className="text-sm opacity-90">Ask me anything about Pittsburgh!</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-pittsburgh-gold text-pittsburgh-black'
                  : 'bg-gray-100 text-pittsburgh-black'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-pittsburgh-black px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-steel-gray rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-steel-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-steel-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-steel-gray">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-steel-gray mb-3 font-medium">Try asking about:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion.text)}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group"
              >
                <div className="text-pittsburgh-gold group-hover:scale-110 transition-transform">
                  {suggestion.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-pittsburgh-black">{suggestion.text}</div>
                  <div className="text-xs text-steel-gray">{suggestion.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Pittsburgh restaurants, events, neighborhoods..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
              rows={1}
              disabled={isTyping}
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-steel-gray" />
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isTyping}
            className="bg-pittsburgh-gold text-pittsburgh-black p-3 rounded-lg hover:bg-pittsburgh-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
