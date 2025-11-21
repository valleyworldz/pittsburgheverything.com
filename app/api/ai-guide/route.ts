import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Invalid question" },
        { status: 400 }
      );
    }

    // TODO: replace this with your AI client (OpenAI, etc.)
    // Example pseudo-call:
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4.1-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are a helpful local guide for Pittsburgh. Be concise, practical, and specific."
    //     },
    //     { role: "user", content: question }
    //   ]
    // });

    // const answer = completion.choices[0]?.message?.content ?? "No answer generated.";

    const answer =
      "This is a placeholder answer. Connect this API route to your AI provider " +
      "and tailor the system prompt so it specializes in Pittsburgh recommendations.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
