import { TypeSend } from "@/presentation/apps";
import { IConversation } from "@/presentation/conversations";
import { UserSession } from "../session";
import { Repository } from "../repositories/repository";
import { Feedback } from "../repositories/models";
import { FeedbackFields } from "../repositories/fields";

export class InformFeedbackConversation implements IConversation {
  aiAgentConversation: IConversation

  constructor(
    private readonly send: TypeSend,
    private readonly feedbackRepository: Repository<Feedback, FeedbackFields>,
  ) { }

  async ask(
    session: UserSession,
    { complement } = { complement: undefined }
  ): Promise<void> {
    if(complement)
      await this.send(session.id, { text: complement });

    await this.send(session.id, { text: "Se puder escrever aqui sugestões, críticas ou elogios, me ajudaria ainda mais. Até logo ☺️" });

    session.setConversation(this);
  }

  async answer(session: UserSession, { clean_text, text }): Promise<void> {
    await this.feedbackRepository.insert({ phone: session.id, message: text });

    session.last_feedback = new Date();

    await this.send(session.id, { text: "Muito obrigado!" });
    await this.aiAgentConversation.ask(session);
  }
}