import { NextRequest, NextResponse } from 'next/server'

/**
 * Google Indexing API endpoint
 * Submits URLs to Google for indexing
 * 
 * Usage:
 * POST /api/google/index
 * Body: { urls: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      )
    }

    // Google Indexing API requires service account credentials
    // This is a placeholder - you'll need to set up OAuth 2.0 credentials
    const GOOGLE_INDEXING_API_KEY = process.env.GOOGLE_INDEXING_API_KEY
    const GOOGLE_INDEXING_ACCESS_TOKEN = process.env.GOOGLE_INDEXING_ACCESS_TOKEN

    if (!GOOGLE_INDEXING_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          error: 'Google Indexing API not configured',
          message: 'Set GOOGLE_INDEXING_ACCESS_TOKEN environment variable',
          instructions: [
            '1. Go to Google Cloud Console',
            '2. Enable Indexing API',
            '3. Create OAuth 2.0 credentials',
            '4. Set GOOGLE_INDEXING_ACCESS_TOKEN in environment variables',
          ],
        },
        { status: 503 }
      )
    }

    const results = []

    for (const url of urls) {
      try {
        // Validate URL
        const urlObj = new URL(url)
        if (!urlObj.hostname.includes('pittsburgheverything.com')) {
          results.push({
            url,
            status: 'error',
            message: 'URL must be from pittsburgheverything.com domain',
          })
          continue
        }

        // Submit to Google Indexing API
        const response = await fetch(
          `https://indexing.googleapis.com/v3/urlNotifications:publish`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${GOOGLE_INDEXING_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              url,
              type: 'URL_UPDATED', // or 'URL_DELETED'
            }),
          }
        )

        if (!response.ok) {
          const errorData = await response.text()
          results.push({
            url,
            status: 'error',
            message: `HTTP ${response.status}: ${errorData}`,
          })
        } else {
          const data = await response.json()
          results.push({
            url,
            status: 'success',
            notificationId: data.urlNotificationMetadata?.latestUpdate?.notifyTime,
          })
        }
      } catch (error: any) {
        results.push({
          url,
          status: 'error',
          message: error.message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      submitted: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      results,
    })
  } catch (error: any) {
    console.error('Google indexing error:', error)
    return NextResponse.json(
      { error: 'Failed to submit URLs for indexing', message: error.message },
      { status: 500 }
    )
  }
}

/**
 * Get indexing status for URLs
 * GET /api/google/index?urls=url1,url2,url3
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const urlsParam = searchParams.get('urls')

    if (!urlsParam) {
      return NextResponse.json(
        { error: 'URLs parameter is required' },
        { status: 400 }
      )
    }

    const urls = urlsParam.split(',').map(url => url.trim())

    // This would query Google Search Console API
    // For now, return a placeholder response
    return NextResponse.json({
      message: 'Indexing status check requires Google Search Console API setup',
      urls: urls.map(url => ({
        url,
        indexed: 'unknown',
        lastCrawled: null,
      })),
      instructions: [
        '1. Set up Google Search Console API',
        '2. Configure OAuth 2.0 credentials',
        '3. Use Search Console API to check indexing status',
      ],
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to check indexing status', message: error.message },
      { status: 500 }
    )
  }
}
