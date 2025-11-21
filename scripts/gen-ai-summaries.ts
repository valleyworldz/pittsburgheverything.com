#!/usr/bin/env tsx

/**
 * Stub to generate AI-written summaries/descriptions for restaurants, neighborhoods, etc.
 * Wire this to your AI provider and write results back into JSON or DB.
 */

import fs from "fs";
import path from "path";

async function summarize(text: string): Promise<string> {
  // TODO: Replace with actual AI call.
  // Example: call your OpenAI / other client here.

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return `AI summary: ${text.slice(0, 120)}...`;
}

async function main() {
  console.log('🤖 Generating AI summaries...');

  try {
    const restaurantsPath = path.join(process.cwd(), "data", "restaurants.json");
    const restaurants = JSON.parse(fs.readFileSync(restaurantsPath, "utf8"));

    for (const r of restaurants) {
      if (!r.description) {
        const baseText = `${r.name} is a ${r.cuisine} spot in ${r.neighborhood} with an average rating of ${r.rating}.`;
        r.description = await summarize(baseText);
        console.log(`Generated summary for ${r.name}`);
      }
    }

    fs.writeFileSync(restaurantsPath, JSON.stringify(restaurants, null, 2));
    console.log('✅ Updated restaurant descriptions with AI summaries.');
  } catch (error) {
    console.error('❌ AI summarization failed:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
