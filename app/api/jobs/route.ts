import { NextRequest, NextResponse } from 'next/server'
import { getLocalJobs } from '@/utils/apiIntegrations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const location = searchParams.get('location') || 'Pittsburgh, PA'

    const jobs = await getLocalJobs(query || undefined, location)

    return NextResponse.json({
      success: true,
      data: jobs,
      count: jobs.length,
      search: { query, location }
    })
  } catch (error) {
    console.error('Jobs API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}
