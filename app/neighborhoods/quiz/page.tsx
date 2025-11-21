'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Home, Users, Car, Bike, DollarSign, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    question: "What's your budget for housing?",
    options: [
      { text: "Under $200K", value: "budget", score: { downtown: 0, oakland: 1, lawrenceville: 0, 'south-side': 1, shadyside: 0, 'strip-district': 0 } },
      { text: "$200K - $350K", value: "moderate", score: { downtown: 1, oakland: 1, lawrenceville: 1, 'south-side': 1, shadyside: 0, 'strip-district': 1 } },
      { text: "$350K+", value: "premium", score: { downtown: 0, oakland: 0, lawrenceville: 0, 'south-side': 0, shadyside: 1, 'strip-district': 0 } }
    ]
  },
  {
    id: 2,
    question: "How important is walkability to you?",
    options: [
      { text: "Very important - I want everything nearby", value: "very", score: { downtown: 1, oakland: 1, lawrenceville: 1, 'south-side': 1, shadyside: 0, 'strip-district': 1 } },
      { text: "Somewhat important", value: "somewhat", score: { downtown: 1, oakland: 1, lawrenceville: 1, 'south-side': 0, shadyside: 0, 'strip-district': 1 } },
      { text: "Not very important - I drive everywhere", value: "not", score: { downtown: 0, oakland: 0, lawrenceville: 0, 'south-side': 0, shadyside: 1, 'strip-district': 0 } }
    ]
  },
  {
    id: 3,
    question: "What's your preferred transportation?",
    options: [
      { text: "Public transit and walking", value: "transit", score: { downtown: 1, oakland: 1, lawrenceville: 0, 'south-side': 0, shadyside: 0, 'strip-district': 0 } },
      { text: "Biking and walking", value: "bike", score: { downtown: 0, oakland: 0, lawrenceville: 1, 'south-side': 0, shadyside: 1, 'strip-district': 1 } },
      { text: "Driving is fine", value: "car", score: { downtown: 0, oakland: 0, lawrenceville: 0, 'south-side': 1, shadyside: 1, 'strip-district': 0 } }
    ]
  },
  {
    id: 4,
    question: "What type of atmosphere do you prefer?",
    options: [
      { text: "Urban and bustling", value: "urban", score: { downtown: 1, oakland: 1, lawrenceville: 0, 'south-side': 1, shadyside: 0, 'strip-district': 1 } },
      { text: "Artsy and cultural", value: "artsy", score: { downtown: 0, oakland: 1, lawrenceville: 1, 'south-side': 0, shadyside: 0, 'strip-district': 0 } },
      { text: "Upscale and quiet", value: "upscale", score: { downtown: 0, oakland: 0, lawrenceville: 0, 'south-side': 0, shadyside: 1, 'strip-district': 0 } }
    ]
  },
  {
    id: 5,
    question: "What's your age group?",
    options: [
      { text: "18-25 (student/young professional)", value: "young", score: { downtown: 0, oakland: 1, lawrenceville: 0, 'south-side': 0, shadyside: 0, 'strip-district': 0 } },
      { text: "26-40 (young family/established)", value: "adult", score: { downtown: 0, oakland: 0, lawrenceville: 1, 'south-side': 1, shadyside: 0, 'strip-district': 0 } },
      { text: "40+ (mature/established)", value: "mature", score: { downtown: 0, oakland: 0, lawrenceville: 0, 'south-side': 0, shadyside: 1, 'strip-district': 1 } }
    ]
  }
]

const neighborhoodDescriptions = {
  downtown: {
    name: "Downtown Pittsburgh",
    match: "Perfect for urban dwellers who love city energy and convenient transit.",
    highlights: ["High walk score", "Public transit hub", "Cultural attractions", "Business district"],
    link: "/neighborhoods/downtown"
  },
  oakland: {
    name: "Oakland",
    match: "Ideal for students and young professionals near universities and hospitals.",
    highlights: ["University district", "Medical facilities", "Museums", "Student housing"],
    link: "/neighborhoods/oakland"
  },
  lawrenceville: {
    name: "Lawrenceville",
    match: "Great for creative types who enjoy arts, culture, and community events.",
    highlights: ["Arts district", "Boutiques & galleries", "Craft beer scene", "Historic architecture"],
    link: "/neighborhoods/lawrenceville"
  },
  'south-side': {
    name: "South Side",
    match: "Excellent for families and those seeking historic charm with modern amenities.",
    highlights: ["Historic architecture", "Entertainment complex", "River views", "Family-friendly"],
    link: "/neighborhoods/south-side"
  },
  shadyside: {
    name: "Shadyside",
    match: "Perfect for established professionals seeking upscale living and fine dining.",
    highlights: ["High-end shopping", "Fine dining", "Parks & recreation", "Upscale homes"],
    link: "/neighborhoods/shadyside"
  },
  'strip-district': {
    name: "Strip District",
    match: "Ideal for foodies and those who appreciate historic character and specialty markets.",
    highlights: ["Food markets", "Specialty shopping", "Historic warehouses", "Ethnic cuisine"],
    link: "/neighborhoods/strip-district"
  }
}

export default function NeighborhoodQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))

    // Calculate scores
    const newScores = { ...scores }
    Object.entries(answer.score).forEach(([neighborhood, score]) => {
      newScores[neighborhood] = (newScores[neighborhood] || 0) + score
    })
    setScores(newScores)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScores({})
  }

  const getTopNeighborhoods = () => {
    const sorted = Object.entries(scores).sort(([,a], [,b]) => b - a)
    return sorted.slice(0, 3).map(([id, score]) => ({
      ...neighborhoodDescriptions[id as keyof typeof neighborhoodDescriptions],
      score
    }))
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const topNeighborhoods = getTopNeighborhoods()

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
            <h1 className="text-4xl font-black text-pittsburgh-black mb-4">
              Your Perfect Pittsburgh Neighborhoods
            </h1>
            <p className="text-xl text-gray-600">
              Based on your preferences, here are the neighborhoods that match you best:
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {topNeighborhoods.map((neighborhood, index) => (
              <div key={neighborhood.link} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-pittsburgh-gold to-yellow-400 p-4">
                  <div className="flex items-center justify-between text-pittsburgh-black">
                    <span className="text-lg font-bold">#{index + 1} Match</span>
                    <span className="text-sm font-medium">Compatibility: {Math.round((neighborhood.score / questions.length) * 100)}%</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pittsburgh-black mb-2">{neighborhood.name}</h3>
                  <p className="text-gray-700 mb-4">{neighborhood.match}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-pittsburgh-black mb-2">Why it matches you:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {neighborhood.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-pittsburgh-gold rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={neighborhood.link}
                    className="inline-flex items-center gap-2 bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Explore {neighborhood.name}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={restartQuiz}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors mr-4"
            >
              Take Quiz Again
            </button>
            <Link
              href="/neighborhoods"
              className="bg-pittsburgh-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Neighborhoods
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== undefined

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <Home className="w-16 h-16 text-pittsburgh-gold mx-auto mb-4" />
          <h1 className="text-4xl font-black text-pittsburgh-black mb-4">
            Find Your Perfect Pittsburgh Neighborhood
          </h1>
          <p className="text-xl text-gray-600">
            Answer a few questions and we'll recommend neighborhoods that match your lifestyle.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pittsburgh-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-pittsburgh-black mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  answers[currentQ.id]?.value === option.value
                    ? 'border-pittsburgh-gold bg-pittsburgh-gold/10 text-pittsburgh-black'
                    : 'border-gray-200 hover:border-pittsburgh-gold/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    answers[currentQ.id]?.value === option.value
                      ? 'border-pittsburgh-gold bg-pittsburgh-gold'
                      : 'border-gray-300'
                  }`}></div>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              !isAnswered
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-pittsburgh-gold text-pittsburgh-black hover:bg-yellow-400'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skip Link */}
        <div className="text-center mt-8">
          <Link href="/neighborhoods" className="text-pittsburgh-gold hover:underline">
            Skip quiz and browse all neighborhoods
          </Link>
        </div>
      </div>
    </div>
  )
}
