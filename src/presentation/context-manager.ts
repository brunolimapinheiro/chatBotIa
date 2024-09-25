import { slugify } from "@/common/helpers";
import { ISessionManager } from "@/presentation/session";
import { IConversation } from "@/presentation/conversations";
import { MessageApp } from "@/presentation/apps";
import { Logger } from "winston";
import { TypeRead, TypeSend } from "./apps/send-read";
import { MessageInfo } from "./apps/message-info";

export class ContextManager {
  send: TypeSend;

  constructor(
    private readonly app: MessageApp,
    private readonly sessionManager: ISessionManager,
    private readonly aiAgentConversation: IConversation,
    private readonly logger: Logger 
  ) {
    app.read = this.read;
    this.send = app.send;
  }

  read: TypeRead = async (id: string, content: MessageInfo) => {
    let session = this.sessionManager.get(id);
    try {
      content.text = content.text.trim();

      if (!session) {
          session = await this.sessionManager.create(id);
          session.setConversation(this.aiAgentConversation)
          this.aiAgentConversation.ask(session);
          return;
      }

      await session.getConversation().answer(session, { text: content.text, clean_text: slugify(content.text) });
    } catch (e) {
      this.logger.error(e.message);
      this.sessionManager.close(id);
      await this.send(id, { text: "Infelizmente estamos com probelmas técnicos, por favor tente novamente mais tarde." });
    }
  };

  async connect(): Promise<void> {
    await this.app.connect();
  }
}
