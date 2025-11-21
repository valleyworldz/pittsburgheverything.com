#!/usr/bin/env tsx

/**
 * Stub to auto-generate a weekly "Pittsburgh Pulse" newsletter
 * from recent events, articles, and deals.
 */

import fs from "fs";
import path from "path";

async function main() {
  console.log('📧 Generating Pittsburgh Pulse newsletter...');

  try {
    const eventsPath = path.join(process.cwd(), "data", "events.json");
    const dealsPath = path.join(process.cwd(), "data", "deals.json");

    const events = fs.existsSync(eventsPath)
      ? JSON.parse(fs.readFileSync(eventsPath, "utf8"))
      : [];

    const deals = fs.existsSync(dealsPath)
      ? JSON.parse(fs.readFileSync(dealsPath, "utf8"))
      : [];

    const topEvents = events.slice(0, 5);
    const topDeals = deals.slice(0, 3);

    const lines: string[] = [];
    lines.push("# Pittsburgh Pulse Weekly");
    lines.push("");
    lines.push("## This Week's Standout Events");
    lines.push("");

    for (const e of topEvents) {
      lines.push(`- **${e.title}** — ${e.date} at ${e.venue} (${e.neighborhood})`);
    }

    lines.push("");
    lines.push("## Local Deals & Specials");
    lines.push("");

    for (const d of topDeals) {
      lines.push(`- **${d.title}** at ${d.businessName} (${d.neighborhood})`);
    }

    const newsletterMarkdown = lines.join("\n");

    const outDir = path.join(process.cwd(), "content", "newsletters");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const filePath = path.join(outDir, `pittsburgh-pulse-${Date.now()}.md`);
    fs.writeFileSync(filePath, newsletterMarkdown);

    console.log(`Generated newsletter draft: ${filePath}`);

    // Later: send via email provider.
  } catch (error) {
    console.error('❌ Newsletter generation failed:', error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});