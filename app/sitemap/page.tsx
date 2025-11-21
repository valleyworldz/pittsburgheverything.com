import { redirect } from 'next/navigation'

export default function SitemapPage() {
  // Redirect to the XML sitemap
  redirect('/sitemap.xml')
}
