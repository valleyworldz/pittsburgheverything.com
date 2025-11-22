# Google Indexing & SEO Setup Guide

Complete guide to setting up Google Search Console, indexing, and SEO optimization for PittsburghEverything.com.

## 🎯 Quick Start Checklist

- [ ] Google Search Console Setup
- [ ] Google Analytics Setup
- [ ] Sitemap Submission
- [ ] Robots.txt Configuration
- [ ] Structured Data Verification
- [ ] Google My Business Setup
- [ ] Indexing API Configuration

---

## 1. Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://pittsburgheverything.com`
4. Choose verification method (recommended: HTML tag)

### Step 2: Verify Ownership

**Option A: HTML Tag (Recommended)**

1. Copy the verification meta tag from Search Console
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code-here
   ```
3. The `GoogleSearchConsole` component will automatically add it to your site

**Option B: HTML File Upload**

1. Download the HTML verification file
2. Upload to `public/google-site-verification.html`
3. Verify in Search Console

**Option C: DNS Verification**

1. Add TXT record to your DNS:
   ```
   google-site-verification=your-verification-code
   ```
2. Verify in Search Console

### Step 3: Submit Sitemap

1. In Search Console, go to **Sitemaps**
2. Enter: `https://pittsburgheverything.com/sitemap.xml`
3. Click **Submit**

Or use the API endpoint:
```bash
curl -X POST https://pittsburgheverything.com/api/google/sitemap \
  -H "Content-Type: application/json" \
  -d '{"sitemapUrl": "https://pittsburgheverything.com/sitemap.xml"}'
```

---

## 2. Google Analytics Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Configure Environment Variable

Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The `GoogleAnalytics` component will automatically initialize tracking.

### Step 3: Verify Installation

1. Visit your website
2. Open Google Analytics → Realtime
3. You should see your visit appear

---

## 3. Google Indexing API (Advanced)

### Step 1: Enable Indexing API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable **Indexing API**
4. Create **Service Account** credentials
5. Download JSON key file

### Step 2: Configure OAuth 2.0

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Create **OAuth 2.0 Client ID**
3. Add authorized redirect URIs
4. Download credentials

### Step 3: Set Environment Variables

Add to `.env.local`:
```bash
GOOGLE_INDEXING_API_KEY=your-api-key
GOOGLE_INDEXING_ACCESS_TOKEN=your-access-token
```

### Step 4: Submit URLs for Indexing

```bash
curl -X POST https://pittsburgheverything.com/api/google/index \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://pittsburgheverything.com/restaurants",
      "https://pittsburgheverything.com/events"
    ]
  }'
```

---

## 4. Robots.txt Configuration

✅ **Already Configured!**

Your `robots.txt` is automatically generated from `app/robots.ts` and includes:
- Allow rules for all public content
- Disallow rules for admin/dashboard areas
- Sitemap location
- Crawl delays for major search engines

View at: `https://pittsburgheverything.com/robots.txt`

---

## 5. Sitemap Configuration

✅ **Already Configured!**

Your sitemap is automatically generated from `app/sitemap.ts` and includes:
- All static pages with priorities
- Location pages for local SEO
- Restaurant pages
- Event pages
- Service category pages

View at: `https://pittsburgheverything.com/sitemap.xml`

---

## 6. Structured Data (Schema.org)

✅ **Already Configured!**

Your site includes structured data for:
- **WebSite** - Site-wide information
- **Organization** - Business details
- **LocalBusiness** - Local SEO optimization
- **BreadcrumbList** - Navigation structure (per page)
- **Article** - Blog posts
- **Event** - Event listings
- **Restaurant** - Restaurant pages

Verify with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 7. Google My Business Setup

### Step 1: Create Business Profile

1. Go to [Google Business Profile](https://business.google.com)
2. Create or claim your business
3. Verify business information:
   - Name: PittsburghEverything
   - Address: [Your address]
   - Phone: [Your phone]
   - Category: Local Business Directory

### Step 2: Optimize Profile

- Add high-quality photos
- Write detailed business description
- Add services and products
- Collect and respond to reviews
- Post regular updates

### Step 3: Link to Website

- Add website URL: `https://pittsburgheverything.com`
- Verify connection in Search Console

---

## 8. SEO Best Practices Checklist

### On-Page SEO
- [x] Meta titles and descriptions on all pages
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Structured data (Schema.org)
- [x] Mobile-responsive design
- [x] Fast page load times
- [x] Accessible markup (WCAG 2.1 AA)

### Technical SEO
- [x] XML sitemap
- [x] Robots.txt
- [x] HTTPS enabled
- [x] Clean URL structure
- [x] 301 redirects for moved pages
- [x] No duplicate content
- [x] Proper heading hierarchy (H1-H6)

### Local SEO
- [x] Location pages for neighborhoods
- [x] Local business schema
- [x] Google My Business integration
- [x] Local keywords in content
- [x] NAP (Name, Address, Phone) consistency

### Content SEO
- [x] Keyword-optimized content
- [x] Internal linking structure
- [x] Image alt text
- [x] Regular content updates
- [x] Blog with local topics

---

## 9. Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Google Search Console for errors
- [ ] Review indexing status
- [ ] Monitor search performance
- [ ] Check for broken links

### Monthly Tasks
- [ ] Update sitemap if new pages added
- [ ] Review keyword rankings
- [ ] Analyze traffic sources
- [ ] Update structured data if needed

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Update content strategy
- [ ] Review and optimize slow pages
- [ ] Check mobile usability

---

## 10. API Endpoints

### Submit URLs for Indexing
```bash
POST /api/google/index
Content-Type: application/json

{
  "urls": [
    "https://pittsburgheverything.com/page1",
    "https://pittsburgheverything.com/page2"
  ]
}
```

### Submit Sitemap
```bash
POST /api/google/sitemap
Content-Type: application/json

{
  "sitemapUrl": "https://pittsburgheverything.com/sitemap.xml"
}
```

### Check Indexing Status
```bash
GET /api/google/index?urls=url1,url2,url3
```

---

## 11. Environment Variables

Add these to your `.env.local`:

```bash
# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Indexing API (Optional)
GOOGLE_INDEXING_API_KEY=your-api-key
GOOGLE_INDEXING_ACCESS_TOKEN=your-access-token

# Google Search Console API (Optional)
GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN=your-access-token
```

---

## 12. Verification Tools

Use these tools to verify your setup:

- **Google Search Console**: https://search.google.com/search-console
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Schema Markup Validator**: https://validator.schema.org

---

## 13. Troubleshooting

### Sitemap Not Found
- Check that `app/sitemap.ts` exists
- Verify sitemap is accessible at `/sitemap.xml`
- Check robots.txt includes sitemap location

### Pages Not Indexing
- Submit sitemap in Search Console
- Check for crawl errors
- Verify robots.txt allows crawling
- Use URL Inspection tool in Search Console

### Analytics Not Working
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check browser console for errors
- Use Google Tag Assistant extension
- Verify in GA4 Realtime reports

### Structured Data Errors
- Use Rich Results Test to validate
- Check JSON-LD syntax
- Verify required properties are present
- Fix any validation errors

---

## 14. Support & Resources

- **Google Search Central**: https://developers.google.com/search
- **Google Analytics Help**: https://support.google.com/analytics
- **Schema.org Documentation**: https://schema.org
- **Next.js SEO Guide**: https://nextjs.org/learn/seo/introduction-to-seo

---

## ✅ Setup Complete!

Once you've completed these steps, your site will be:
- ✅ Verified in Google Search Console
- ✅ Tracking visitors with Google Analytics
- ✅ Submitting sitemaps automatically
- ✅ Using structured data for rich results
- ✅ Optimized for local SEO
- ✅ Ready for Google indexing

**Next Steps:**
1. Complete Google Search Console verification
2. Submit your sitemap
3. Set up Google Analytics
4. Monitor indexing status
5. Track your search performance

🎉 **Your PittsburghEverything.com site is now optimized for Google!**
