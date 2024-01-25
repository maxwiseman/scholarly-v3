import { StreamingTextResponse, type Message } from "ai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { BytesOutputParser } from "@langchain/core/output_parsers";

export const runtime = "edge";

export async function POST(req: Request): Promise<StreamingTextResponse> {
  const { messages } = (await req.json()) as { messages: Message[] };

  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "mistral",
  });

  const parser = new BytesOutputParser();

  const stream = await model
    .pipe(parser)
    .stream(
      messages.map((m) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
    );

  return new StreamingTextResponse(stream);
}
