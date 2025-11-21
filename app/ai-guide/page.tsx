"use client";

import { useState } from "react";

export default function AIGuidePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/ai-guide", {
        method: "POST",
        body: JSON.stringify({ question }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setAnswer(data.answer ?? "Sorry, no answer yet.");
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold mb-3">Ask Pittsburgh (AI Guide)</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Ask anything about Pittsburgh — where to eat, what to do this weekend,
        which neighborhoods fit your vibe, and more.
      </p>

      <form onSubmit={handleAsk} className="mb-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-2xl text-sm mb-3"
          placeholder="Example: Best date-night restaurant in Lawrenceville this Friday?"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-400 hover:bg-yellow-500"
        >
          {loading ? "Thinking..." : "Ask Pittsburgh"}
        </button>
      </form>

      {answer && (
        <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 text-sm">
          <h2 className="font-semibold mb-2">Answer</h2>
          <p className="text-gray-800 whitespace-pre-line">{answer}</p>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Connect this to your preferred AI provider using the API route below.
      </p>
    </section>
  );
}
