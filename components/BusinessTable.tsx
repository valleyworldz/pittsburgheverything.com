type Business = {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  plan: "free" | "featured" | "premium";
  contactEmail: string;
  status: "active" | "inactive" | "trial";
  joinedAt: string;
  notes?: string;
};

const PLAN_LABELS: Record<Business["plan"], string> = {
  free: "Free",
  featured: "Featured",
  premium: "Premium"
};

const PLAN_BADGE_CLASSES: Record<Business["plan"], string> = {
  free: "bg-gray-100 text-gray-700 border-gray-200",
  featured: "bg-yellow-50 text-yellow-800 border-yellow-300",
  premium: "bg-black text-yellow-400 border-gray-700"
};

const STATUS_BADGE_CLASSES: Record<Business["status"], string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
  trial: "bg-blue-50 text-blue-700 border-blue-200"
};

export function BusinessTable({ businesses }: { businesses: Business[] }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-2 text-left">Business</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Neighborhood</th>
            <th className="px-4 py-2 text-left">Plan</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Joined</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((b) => (
            <tr key={b.id} className="border-t border-gray-100">
              <td className="px-4 py-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{b.name}</span>
                  <span className="text-[11px] text-gray-500">
                    {b.contactEmail}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 capitalize">{b.category}</td>
              <td className="px-4 py-2">{b.neighborhood}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex items-center px-2 py-1 text-[11px] rounded-full border ${PLAN_BADGE_CLASSES[b.plan]}`}
                >
                  {PLAN_LABELS[b.plan]}
                </span>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex items-center px-2 py-1 text-[11px] rounded-full border ${STATUS_BADGE_CLASSES[b.status]}`}
                >
                  {b.status === "trial" ? "Trial" : b.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-2 text-xs text-gray-500">{b.joinedAt}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 hover:border-yellow-400">
                    View
                  </button>
                  <button className="px-2 py-1 text-[11px] rounded-lg border border-gray-200 hover:border-blue-400">
                    Upgrade
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
