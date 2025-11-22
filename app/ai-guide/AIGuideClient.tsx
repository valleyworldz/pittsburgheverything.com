'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, MapPin, Utensils, Calendar, Star, Home, Users, Heart, X, Copy, CheckCircle, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface QuickPrompt {
  icon: React.ReactNode
  text: string
  category: string
  description: string
}

const quickPrompts: QuickPrompt[] = [
  {
    icon: <Utensils className="w-5 h-5" />,
    text: "Best date-night restaurant in Lawrenceville",
    category: "Dining",
    description: "Romantic spots for couples"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    text: "What events are happening this weekend?",
    category: "Events",
    description: "Weekend activities and entertainment"
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    text: "Family-friendly neighborhoods near downtown",
    category: "Neighborhoods",
    description: "Best areas for families"
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "Top-rated brunch spots in Shadyside",
    category: "Dining",
    description: "Best breakfast and brunch"
  },
  {
    icon: <Home className="w-5 h-5" />,
    text: "Affordable apartments in Squirrel Hill",
    category: "Housing",
    description: "Rental options and prices"
  },
  {
    icon: <Users className="w-5 h-5" />,
    text: "Free things to do with kids today",
    category: "Activities",
    description: "Family-friendly free activities"
  }
]

export default function AIGuideClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI Pittsburgh guide. I can help you discover the best restaurants, events, neighborhoods, and hidden gems in Pittsburgh. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Best restaurants for date night",
        "Events happening this weekend",
        "Family-friendly neighborhoods",
        "Free things to do today"
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

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

    try {
      const res = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: userMessage,
          conversationHistory: messages.slice(-4).map(m => ({
            role: m.type === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        })
      })

      const data = await res.json()
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.answer || "I'm sorry, I couldn't generate a response. Please try rephrasing your question.",
        timestamp: new Date(),
        suggestions: data.suggestions || []
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Bot className="w-12 h-12 text-blue-600 relative" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI Pittsburgh Guide</h1>
          </motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ask me anything about Pittsburgh — restaurants, events, neighborhoods, housing, jobs, and more. 
            I'll give you personalized, accurate recommendations based on real data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-gray-500">AI Guide</span>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button
                              onClick={() => handleCopy(message.content, message.id)}
                              className={`ml-2 p-1 rounded hover:bg-opacity-20 ${message.type === 'user' ? 'hover:bg-white' : 'hover:bg-gray-200'}`}
                              title="Copy message"
                            >
                              {copiedId === message.id ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSendMessage(suggestion)}
                                className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value)
                        adjustTextareaHeight()
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Pittsburgh restaurants, events, neighborhoods..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={1}
                      disabled={isTyping}
                    />
                    <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    title="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Prompts */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Quick Prompts</h3>
              </div>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="w-full flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group"
                    disabled={isTyping}
                  >
                    <div className="text-blue-600 group-hover:scale-110 transition-transform mt-0.5">
                      {prompt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{prompt.text}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{prompt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be specific about neighborhoods, cuisine, or budget</li>
                <li>• Ask about events by date or type</li>
                <li>• Request recommendations based on your preferences</li>
                <li>• Ask follow-up questions for more details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

