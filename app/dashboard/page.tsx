import businesses from "../../data/businesses.json";
import { BusinessTable } from "../../components/BusinessTable";

export default function DashboardPage() {
  const bizList = businesses as any[];
  const activeCount = bizList.filter((b) => b.status === "active").length;
  const trialCount = bizList.filter((b) => b.status === "trial").length;
  const premiumCount = bizList.filter((b) => b.plan === "premium").length;

  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-3">PittsburghEverything Dashboard</h1>

      <p className="text-gray-600 mb-6 max-w-2xl">
        Internal overview of current partner businesses, plans, and a simple
        springboard for future monetization features (billing, upgrades, etc.).
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-2xl p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Active Businesses
          </h2>
          <p className="text-2xl font-bold">{activeCount}</p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Trial / Free Listings
          </h2>
          <p className="text-2xl font-bold">{trialCount}</p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Premium / High-Value
          </h2>
          <p className="text-2xl font-bold">{premiumCount}</p>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Business Listings</h2>
        <a
          href="/submit-business"
          className="text-xs px-3 py-2 rounded-xl bg-black text-white hover:bg-gray-900"
        >
          Add / Review New Listing
        </a>
      </div>

      <BusinessTable businesses={bizList as any[]} />
    </section>
  );
}
