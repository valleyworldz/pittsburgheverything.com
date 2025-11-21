import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const businessSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  neighborhood: z.string().min(1),
  contactEmail: z.string().email(),
  website: z.string().optional(),
  description: z.string().min(10),
  interestFree: z.string().optional(),
  interestFeatured: z.string().optional(),
  interestPremium: z.string().optional()
});

// TODO: replace with DB + email notification

async function storeBusinessSubmission(data: any) {
  console.log("New business submission:", data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = businessSchema.parse(body);
    await storeBusinessSubmission(parsed);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Invalid submission" },
      { status: 400 }
    );
  }
}
