import Hero from '@/components/Hero'
import EventGrid from '@/components/EventGrid'
import RestaurantList from '@/components/RestaurantList'
import DealsCarousel from '@/components/DealsCarousel'
import NewsletterSignup from '@/components/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />

      <section>
        <h2 className="text-3xl font-black mb-8 text-center">Featured Events</h2>
        <EventGrid limit={6} />
        <div className="text-center mt-8">
          <a href="/events" className="inline-block bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold/90 transition-colors">
            View All Events
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black mb-8 text-center">Top Restaurants</h2>
        <RestaurantList limit={8} />
        <div className="text-center mt-8">
          <a href="/restaurants" className="inline-block bg-pittsburgh-gold text-pittsburgh-black px-6 py-3 rounded-lg font-semibold hover:bg-pittsburgh-gold/90 transition-colors">
            View All Restaurants
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black mb-8 text-center">Hot Deals</h2>
        <DealsCarousel />
      </section>

      <NewsletterSignup />
    </div>
  )
}
