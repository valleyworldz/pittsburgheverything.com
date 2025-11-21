#!/usr/bin/env tsx

/**
 * Stub for seeding/refreshing restaurant data.
 * Later: use Yelp/Google Places CSV exports, local lists, or manual curation.
 */

import fs from "fs";
import path from "path";

async function fetchRestaurants(): Promise<any[]> {
  // TODO: Replace with real ingestion (CSV, API, etc.)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      id: "rest-auto-3",
      name: "Sample Steel City Bistro",
      cuisine: "American",
      neighborhood: "Downtown",
      priceLevel: "$$",
      rating: 4.3
    },
    {
      id: "rest-auto-4",
      name: "Riverside Modern",
      cuisine: "Contemporary American",
      neighborhood: "Lawrenceville",
      priceLevel: "$$$",
      rating: 4.6
    }
  ];
}

async function main() {
  console.log('🍽️ Starting restaurant scraping...');

  try {
    const restaurants = await fetchRestaurants();
    const filePath = path.join(process.cwd(), "data", "restaurants.json");

    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const merged = [...existing, ...restaurants];
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    console.log(`✅ Updated restaurants.json with ${restaurants.length} new items.`);
  } catch (error) {
    console.error('❌ Restaurant scraping failed:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
