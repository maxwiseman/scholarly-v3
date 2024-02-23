/* eslint-disable @typescript-eslint/no-unsafe-call -- its fine */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- it will be fine */
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request): Promise<StreamingTextResponse> {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its fine
  const response = await openai.createChatCompletion({
    model: "gpt-4-turbo-preview",
    stream: true,
    messages,
    max_tokens: 1000,
  });
  // Convert the response into a friendly text-stream
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- its fine
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
