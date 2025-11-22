'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, Heart, Share2, Phone, Globe, Award, Mail, AlertCircle } from 'lucide-react'
import type { VetGroomer } from '@/data/pittsburghPets'
import { motion } from 'framer-motion'

interface VetGroomerCardProps {
  vet: VetGroomer
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function VetGroomerCard({ vet, onFavorite, isFavorite = false }: VetGroomerCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vet.name,
          text: vet.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const getTypeLabel = () => {
    switch (vet.type) {
      case 'veterinary': return 'Veterinary'
      case 'grooming': return 'Grooming'
      case 'both': return 'Vet & Grooming'
      default: return vet.type
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{vet.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {getTypeLabel()}
              </span>
              {vet.emergency && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Emergency
                </span>
              )}
            </div>
          </div>
          {vet.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">{vet.rating}</span>
              {vet.reviewCount && (
                <span className="text-xs text-gray-500">({vet.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vet.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{vet.location.neighborhood}</span>
        </div>

        {vet.featured && (
          <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mb-2">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
        {vet.verified && (
          <div className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 ml-2">
            Verified
          </div>
        )}
      </div>

      {/* Services */}
      <div className="p-4 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Services</h4>
        <div className="flex flex-wrap gap-1 mb-3">
          {vet.services.slice(0, 6).map((service, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
            >
              {service}
            </span>
          ))}
        </div>

        {vet.specialties && vet.specialties.length > 0 && (
          <div className="mt-2">
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Specialties:</h5>
            <div className="flex flex-wrap gap-1">
              {vet.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
          {vet.acceptsNewPatients && (
            <div className="flex items-center gap-1 text-green-700">
              <span>✓</span>
              <span>Accepts New Patients</span>
            </div>
          )}
          {vet.emergency && (
            <div className="flex items-center gap-1 text-red-700">
              <AlertCircle className="w-3 h-3" />
              <span>24/7 Emergency</span>
            </div>
          )}
        </div>

        {vet.paymentMethods && vet.paymentMethods.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-semibold text-gray-700 mb-1">Payment Methods:</h5>
            <div className="text-xs text-gray-600">
              {vet.paymentMethods.join(', ')}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onFavorite?.(vet.id)}
            className={`p-2 rounded transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <a
            href={`tel:${vet.phone}`}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors text-sm"
          >
            <Phone className="w-4 h-4 inline mr-1" />
            Call
          </a>
          {vet.website && (
            <a
              href={vet.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-center rounded hover:bg-gray-300 transition-colors text-sm"
            >
              <Globe className="w-4 h-4 inline mr-1" />
              Website
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

