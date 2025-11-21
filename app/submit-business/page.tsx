"use client";

import { useState } from "react";

export default function SubmitBusinessPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("done");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-3">Submit Your Business</h1>

      <p className="text-gray-600 mb-6 max-w-2xl">
        Get your Pittsburgh business listed on PittsburghEverything. We start
        with a free basic listing, and you can upgrade later to featured or
        premium placement for more visibility and leads.
      </p>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 rounded-2xl p-6 bg-gray-50 max-w-xl"
      >
        <div className="mb-3">
          <label className="block text-xs font-semibold mb-1">
            Business Name
          </label>
          <input
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="mb-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Category
            </label>
            <input
              name="category"
              required
              placeholder="e.g. restaurant, home-services, tattoo"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Neighborhood / Area
            </label>
            <input
              name="neighborhood"
              required
              placeholder="e.g. Lawrenceville, South Side"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="mb-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Contact Email
            </label>
            <input
              name="contactEmail"
              type="email"
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Website / Social Link
            </label>
            <input
              name="website"
              placeholder="https://..."
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-xs font-semibold mb-1">
            Short Description
          </label>
          <textarea
            name="description"
            rows={3}
            required
            placeholder="Tell Pittsburgh what you do in 2–3 sentences."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1">
            Interested in:
          </label>
          <div className="flex flex-col gap-1 text-xs text-gray-700">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="interestFree" /> Free basic listing
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="interestFeatured" /> Featured placement
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="interestPremium" /> Premium lead-gen plan
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-400 hover:bg-yellow-500"
        >
          {status === "submitting" ? "Submitting..." : "Submit business"}
        </button>

        {status === "done" && (
          <p className="text-xs text-green-600 mt-2">
            Thanks! We'll review your submission and follow up by email.
          </p>
        )}

        {status === "error" && (
          <p className="text-xs text-red-600 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
