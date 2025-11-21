'use client'

import { useState, useEffect } from 'react'
import { Mail, Users, TrendingUp, CheckCircle, Clock, XCircle, Send, FileText, Target } from 'lucide-react'
import type { BusinessOutreach } from '@/types'

interface OutreachStats {
  total: number
  contacted: number
  responded: number
  signed_up: number
  declined: number
  pending_followup: number
  conversion_rate: number
}

export default function OutreachDashboard() {
  const [businesses, setBusinesses] = useState<BusinessOutreach[]>([])
  const [stats, setStats] = useState<OutreachStats | null>(null)
  const [nextActions, setNextActions] = useState<BusinessOutreach[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessOutreach | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchOutreachData()
  }, [])

  const fetchOutreachData = async () => {
    try {
      const response = await fetch('/api/outreach')
      const result = await response.json()

      if (result.success) {
        setBusinesses(result.data.businesses)
        setStats(result.data.stats)
        setNextActions(result.data.next_actions)
      }
    } catch (error) {
      console.error('Error fetching outreach data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async (businessId: string, action: string) => {
    setActionLoading(businessId)

    try {
      const response = await fetch('/api/outreach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId,
          action,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state
        setBusinesses(prev => prev.map(b =>
          b.id === businessId ? result.data : b
        ))

        // Refresh stats
        await fetchOutreachData()
      } else {
        alert('Failed to send email: ' + result.message)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('An error occurred while sending the email')
    } finally {
      setActionLoading(null)
    }
  }

  const handleStatusUpdate = async (businessId: string, status: BusinessOutreach['outreachStatus'], response?: string) => {
    try {
      const response_data = await fetch('/api/outreach', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId,
          status,
          response,
        }),
      })

      const result = await response_data.json()

      if (result.success) {
        setBusinesses(prev => prev.map(b =>
          b.id === businessId ? result.data : b
        ))
        setSelectedBusiness(null)
        await fetchOutreachData()
      } else {
        alert('Failed to update status: ' + result.message)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('An error occurred while updating the status')
    }
  }

  const getStatusBadge = (status: BusinessOutreach['outreachStatus']) => {
    const badges = {
      not_contacted: { label: 'Not Contacted', color: 'bg-gray-100 text-gray-800', icon: Clock },
      contacted: { label: 'Contacted', color: 'bg-blue-100 text-blue-800', icon: Mail },
      responded: { label: 'Responded', color: 'bg-yellow-100 text-yellow-800', icon: FileText },
      signed_up: { label: 'Signed Up', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      declined: { label: 'Declined', color: 'bg-red-100 text-red-800', icon: XCircle },
    }

    const badge = badges[status]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    )
  }

  const getPriorityBadge = (priority: BusinessOutreach['priority']) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pittsburgh-black mb-2 flex items-center gap-3">
          <Target className="w-8 h-8 text-pittsburgh-gold" />
          Lawrenceville Outreach Campaign
        </h1>
        <p className="text-steel-gray">Building Pittsburgh's most comprehensive local review platform</p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.total}</div>
                <div className="text-sm text-steel-gray">Total Businesses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.contacted}</div>
                <div className="text-sm text-steel-gray">Contacted</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.signed_up}</div>
                <div className="text-sm text-steel-gray">Signed Up</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.conversion_rate}%</div>
                <div className="text-sm text-steel-gray">Conversion Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-pittsburgh-black">{stats.pending_followup}</div>
                <div className="text-sm text-steel-gray">Pending Follow-up</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Actions */}
      {nextActions.length > 0 && (
        <div className="bg-gradient-to-r from-pittsburgh-gold/10 to-yellow-50 rounded-lg border border-pittsburgh-gold/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-pittsburgh-black mb-4 flex items-center gap-2">
            <Send className="w-6 h-6 text-pittsburgh-gold" />
            Next Actions
          </h2>
          <div className="space-y-3">
            {nextActions.map((business) => (
              <div key={business.id} className="flex items-center justify-between bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-pittsburgh-black">{business.businessName}</h3>
                    <p className="text-sm text-steel-gray">{business.category} • {business.contactPerson}</p>
                  </div>
                  {getPriorityBadge(business.priority)}
                  {getStatusBadge(business.outreachStatus)}
                </div>
                <div className="flex gap-2">
                  {business.outreachStatus === 'not_contacted' && (
                    <button
                      onClick={() => handleSendEmail(business.id, 'initial_contact')}
                      disabled={actionLoading === business.id}
                      className="px-4 py-2 bg-pittsburgh-gold text-pittsburgh-black rounded hover:bg-yellow-400 disabled:opacity-50 text-sm font-medium"
                    >
                      {actionLoading === business.id ? 'Sending...' : 'Send Invite'}
                    </button>
                  )}
                  {(business.outreachStatus === 'contacted' || business.outreachStatus === 'responded') && (
                    <button
                      onClick={() => handleSendEmail(business.id, 'followup')}
                      disabled={actionLoading === business.id}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm font-medium"
                    >
                      {actionLoading === business.id ? 'Sending...' : 'Send Follow-up'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Businesses Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-pittsburgh-black">All Lawrenceville Businesses</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-pittsburgh-black">{business.businessName}</div>
                      <div className="text-sm text-steel-gray">{business.contactPerson}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-steel-gray capitalize">{business.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(business.outreachStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(business.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-steel-gray">
                    {business.lastContactDate
                      ? new Date(business.lastContactDate).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      {business.outreachStatus === 'not_contacted' && (
                        <button
                          onClick={() => handleSendEmail(business.id, 'initial_contact')}
                          disabled={actionLoading === business.id}
                          className="text-pittsburgh-gold hover:text-pittsburgh-black text-sm"
                        >
                          {actionLoading === business.id ? 'Sending...' : 'Contact'}
                        </button>
                      )}
                      {business.outreachStatus === 'responded' && (
                        <button
                          onClick={() => handleSendEmail(business.id, 'welcome')}
                          disabled={actionLoading === business.id}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          {actionLoading === business.id ? 'Sending...' : 'Welcome'}
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedBusiness(business)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Business Details Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-pittsburgh-black">{selectedBusiness.businessName}</h2>
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <span className="text-sm text-steel-gray capitalize">{selectedBusiness.category}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    {getPriorityBadge(selectedBusiness.priority)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    {getStatusBadge(selectedBusiness.outreachStatus)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <span className="text-sm text-steel-gray">{selectedBusiness.contactPerson}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <span className="text-sm text-steel-gray">{selectedBusiness.email}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <span className="text-sm text-steel-gray">{selectedBusiness.phone}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <span className="text-sm text-steel-gray">{selectedBusiness.address}</span>
                </div>

                {selectedBusiness.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <span className="text-sm text-steel-gray">{selectedBusiness.notes}</span>
                  </div>
                )}

                {selectedBusiness.response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
                    <span className="text-sm text-steel-gray">{selectedBusiness.response}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t">
                  {selectedBusiness.outreachStatus === 'responded' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedBusiness.id, 'signed_up')}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
                    >
                      Mark as Signed Up
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusUpdate(selectedBusiness.id, 'declined')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
                  >
                    Mark as Declined
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
