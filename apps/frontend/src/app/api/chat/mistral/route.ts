import { StreamingTextResponse, type Message } from "ai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
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

  const stream = await model.pipe(parser).stream(
    messages.map((m) =>
      // eslint-disable-next-line no-nested-ternary -- its ok just this once
      m.role === "user"
        ? new HumanMessage(m.content)
        : m.role === "system"
          ? new SystemMessage(m.content)
          : new AIMessage(m.content),
    ),
  );

  return new StreamingTextResponse(stream);
}
