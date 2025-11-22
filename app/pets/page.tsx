import { Metadata } from 'next'
import Link from 'next/link'
import { Dog, MapPin, Stethoscope, ArrowRight } from 'lucide-react'
import { getAllDogParks, getAllPetFriendlySpots, getAllVetsGroomers } from '@/data/pittsburghPets'

export const metadata: Metadata = {
  title: 'Pet Services & Information in Pittsburgh | PittsburghEverything.com',
  description: 'Discover dog parks, pet-friendly spots, and veterinary services in Pittsburgh. Everything you need for your furry friends.',
  keywords: 'pets, dogs, Pittsburgh, dog parks, pet-friendly, vets, groomers',
  openGraph: {
    title: 'Pet Services & Information in Pittsburgh',
    description: 'Discover dog parks, pet-friendly spots, and veterinary services in Pittsburgh.',
    type: 'website'
  }
}

export default function PetsPage() {
  const parks = getAllDogParks()
  const spots = getAllPetFriendlySpots()
  const vets = getAllVetsGroomers()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Pet Services in Pittsburgh</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Everything you need for your furry friends. Discover dog parks, pet-friendly spots, and trusted veterinary services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/pets/parks"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Dog className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dog Parks</h2>
                <p className="text-sm text-gray-600">{parks.length} parks</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Find off-leash dog parks with fenced areas, amenities, and safe play spaces for your dogs.
            </p>
            <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
              Explore Parks
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/pets/friendly"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pet-Friendly Spots</h2>
                <p className="text-sm text-gray-600">{spots.length} spots</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Discover restaurants, hotels, cafes, and businesses where your pets are welcome.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
              Find Spots
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/pets/vets"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Vets & Groomers</h2>
                <p className="text-sm text-gray-600">{vets.length} services</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Find trusted veterinary clinics and professional grooming services for your pets.
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
              Find Services
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {parks.length + spots.length + vets.length}
            </div>
            <div className="text-gray-600">Total Pet Resources</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {vets.filter(v => v.emergency).length}
            </div>
            <div className="text-gray-600">Emergency Vets</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {parks.filter(p => p.featured).length + spots.filter(s => s.featured).length + vets.filter(v => v.featured).length}
            </div>
            <div className="text-gray-600">Featured Options</div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pet Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dog Park Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Always supervise your dog at dog parks</li>
                <li>• Ensure your dog is vaccinated and licensed</li>
                <li>• Clean up after your pet</li>
                <li>• Watch for signs of aggression or stress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pet-Friendly Etiquette</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Call ahead to confirm pet policies</li>
                <li>• Keep pets leashed unless in designated areas</li>
                <li>• Be respectful of other patrons</li>
                <li>• Bring waste bags and clean up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

