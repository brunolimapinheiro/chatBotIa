import { TypeConvesations } from "@/presentation/session";
import { UserSession } from "@/domain/session/user-session";
import { IConversation } from "@/presentation/conversations";
import { TypeSend } from "@/presentation/apps";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export class AiAgentConversation implements IConversation {
  conversations: TypeConvesations = {};

  constructor(
    private readonly send: TypeSend
  ) {}

  async ask(session: UserSession): Promise<void> {
    await this.send(session.id, { text: "Bem vindo! O que deseja?" })
    session.setConversation(this);
  }

  async answer(session: UserSession, { text }): Promise<void> {
    const result = await model.generateContent(text);
    const response = await result.response;

    await this.send(session.id, { text: response.text() })
  }
}
