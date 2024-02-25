// app/api/chat/route.ts
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

export async function POST(req: Request): Promise<StreamingTextResponse> {
  // Extract the `messages` from the body of the request
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- this is fine
  const { messages } = await req.json();

  // Request the OpenAI-compatible API for the response based on the prompt
  const response = await perplexity.chat.completions.create({
    model: "sonar-small-online",
    stream: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- its fine
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
