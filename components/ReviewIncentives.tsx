'use client'

import { useState, useEffect } from 'react'
import { Gift, Plus, Edit, Trash2, Eye, EyeOff, TrendingUp, Users, Clock } from 'lucide-react'
import type { ReviewIncentive } from '@/utils/incentiveService'

interface ReviewIncentivesProps {
  businessId: string
}

export default function ReviewIncentives({ businessId }: ReviewIncentivesProps) {
  const [incentives, setIncentives] = useState<ReviewIncentive[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingIncentive, setEditingIncentive] = useState<ReviewIncentive | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - in production, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIncentives([
        {
          id: 'inc-001',
          businessId,
          businessName: 'Sample Business',
          type: 'discount',
          title: '10% Off Your Next Visit',
          description: 'Thank you for your review! Get 10% off your next purchase.',
          value: '10% off',
          conditions: 'Valid for 30 days after redemption. One use per customer. Cannot be combined with other offers.',
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          redemptions: 12,
          maxRedemptions: 100,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'inc-002',
          businessId,
          businessName: 'Sample Business',
          type: 'free_item',
          title: 'Free Coffee with Purchase',
          description: 'Enjoy a free coffee with any purchase over $10.',
          value: 'Free coffee',
          conditions: 'Valid for 14 days. One free coffee per customer.',
          validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: false,
          redemptions: 25,
          maxRedemptions: 50,
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ])
      setLoading(false)
    }, 1000)
  }, [businessId])

  const handleCreateIncentive = () => {
    setShowCreateForm(true)
    setEditingIncentive(null)
  }

  const handleEditIncentive = (incentive: ReviewIncentive) => {
    setEditingIncentive(incentive)
    setShowCreateForm(true)
  }

  const handleDeleteIncentive = (incentiveId: string) => {
    if (confirm('Are you sure you want to delete this incentive? This action cannot be undone.')) {
      setIncentives(prev => prev.filter(inc => inc.id !== incentiveId))
    }
  }

  const handleToggleActive = (incentiveId: string) => {
    setIncentives(prev => prev.map(inc =>
      inc.id === incentiveId
        ? { ...inc, isActive: !inc.isActive, updatedAt: new Date().toISOString() }
        : inc
    ))
  }

  const getIncentiveIcon = (type: ReviewIncentive['type']) => {
    switch (type) {
      case 'discount':
        return '💰'
      case 'free_item':
        return '🎁'
      case 'loyalty_points':
        return '⭐'
      case 'custom':
        return '🎯'
      default:
        return '🎁'
    }
  }

  const getIncentiveStats = () => {
    const activeIncentives = incentives.filter(inc => inc.isActive).length
    const totalRedemptions = incentives.reduce((sum, inc) => sum + inc.redemptions, 0)
    const totalReviews = 50 // Mock data - would come from API
    const redemptionRate = totalReviews > 0 ? Math.round((totalRedemptions / totalReviews) * 100) : 0

    return { activeIncentives, totalRedemptions, redemptionRate }
  }

  const stats = getIncentiveStats()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-pittsburgh-black flex items-center gap-2">
              <Gift className="w-6 h-6 text-pittsburgh-gold" />
              Review Incentives
            </h2>
            <p className="text-steel-gray mt-1">
              Reward customers for leaving reviews and boost your review volume
            </p>
          </div>
          <button
            onClick={handleCreateIncentive}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Incentive
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">{stats.activeIncentives}</div>
                <div className="text-sm text-green-600">Active Incentives</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">{stats.totalRedemptions}</div>
                <div className="text-sm text-blue-600">Redemptions</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-700">{stats.redemptionRate}%</div>
                <div className="text-sm text-purple-600">Redemption Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Incentives List */}
        {incentives.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-steel-gray mb-2">No Incentives Yet</h3>
            <p className="text-steel-gray mb-6">
              Create your first review incentive to reward customers and boost review volume.
            </p>
            <button
              onClick={handleCreateIncentive}
              className="btn-primary"
            >
              Create Your First Incentive
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {incentives.map((incentive) => (
              <div
                key={incentive.id}
                className={`p-4 border rounded-lg ${
                  incentive.isActive
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{getIncentiveIcon(incentive.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-pittsburgh-black">{incentive.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          incentive.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {incentive.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <p className="text-steel-gray mb-3">{incentive.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-pittsburgh-black">Value:</span>
                          <span className="ml-1 text-steel-gray">{incentive.value}</span>
                        </div>
                        <div>
                          <span className="font-medium text-pittsburgh-black">Redemptions:</span>
                          <span className="ml-1 text-steel-gray">
                            {incentive.redemptions}
                            {incentive.maxRedemptions && `/${incentive.maxRedemptions}`}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-pittsburgh-black">Created:</span>
                          <span className="ml-1 text-steel-gray">
                            {new Date(incentive.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {incentive.validUntil && (
                          <div>
                            <span className="font-medium text-pittsburgh-black">Expires:</span>
                            <span className="ml-1 text-steel-gray">
                              {new Date(incentive.validUntil).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {incentive.conditions && (
                        <div className="mt-3 p-3 bg-white rounded border-l-4 border-yellow-400">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Conditions:</span>
                          </div>
                          <p className="text-sm text-yellow-700">{incentive.conditions}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(incentive.id)}
                      className={`p-2 rounded ${
                        incentive.isActive
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title={incentive.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {incentive.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEditIncentive(incentive)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteIncentive(incentive.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <IncentiveForm
            incentive={editingIncentive}
            onSave={(incentive) => {
              if (editingIncentive) {
                setIncentives(prev => prev.map(inc =>
                  inc.id === editingIncentive.id ? { ...inc, ...incentive, updatedAt: new Date().toISOString() } : inc
                ))
              } else {
                const newIncentive: ReviewIncentive = {
                  ...incentive,
                  id: `inc-${Date.now()}`,
                  businessId,
                  businessName: 'Sample Business', // Would come from business data
                  redemptions: 0,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
                setIncentives(prev => [...prev, newIncentive])
              }
              setShowCreateForm(false)
              setEditingIncentive(null)
            }}
            onCancel={() => {
              setShowCreateForm(false)
              setEditingIncentive(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Incentive Form Component
interface IncentiveFormProps {
  incentive?: ReviewIncentive | null
  onSave: (incentive: Omit<ReviewIncentive, 'id' | 'businessId' | 'businessName' | 'redemptions' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

function IncentiveForm({ incentive, onSave, onCancel }: IncentiveFormProps) {
  const [formData, setFormData] = useState({
    type: incentive?.type || 'discount',
    title: incentive?.title || '',
    description: incentive?.description || '',
    value: incentive?.value || '',
    conditions: incentive?.conditions || '',
    validUntil: incentive?.validUntil ? new Date(incentive.validUntil).toISOString().split('T')[0] : '',
    isActive: incentive?.isActive ?? true,
    maxRedemptions: incentive?.maxRedemptions || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const incentiveData = {
      type: formData.type as ReviewIncentive['type'],
      title: formData.title,
      description: formData.description,
      value: formData.value,
      conditions: formData.conditions,
      validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : undefined,
      isActive: formData.isActive,
      maxRedemptions: formData.maxRedemptions ? parseInt(String(formData.maxRedemptions)) : undefined,
    }

    onSave(incentiveData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-pittsburgh-black">
              {incentive ? 'Edit Incentive' : 'Create Review Incentive'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                  Incentive Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  required
                >
                  <option value="discount">Discount</option>
                  <option value="free_item">Free Item</option>
                  <option value="loyalty_points">Loyalty Points</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                  Value *
                </label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  placeholder="e.g., 10% off, Free coffee"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                placeholder="e.g., 10% Off Your Next Visit"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent h-20 resize-none"
                placeholder="Describe the incentive for customers"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                Conditions *
              </label>
              <textarea
                value={formData.conditions}
                onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent h-16 resize-none"
                placeholder="Valid for 30 days. One use per customer. Cannot be combined with other offers."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pittsburgh-black mb-1">
                  Max Redemptions
                </label>
                <input
                  type="number"
                  value={formData.maxRedemptions}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxRedemptions: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pittsburgh-gold focus:border-transparent"
                  placeholder="Unlimited if empty"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-pittsburgh-gold border-gray-300 rounded focus:ring-pittsburgh-gold"
              />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-pittsburgh-black">
                Active (customers can redeem this incentive)
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 bg-pittsburgh-gold text-pittsburgh-black py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
              >
                {incentive ? 'Update Incentive' : 'Create Incentive'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
