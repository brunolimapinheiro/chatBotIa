import { TypeConvesations } from "@/presentation/session";
import {
  AiAgentConversation,
  InformFeedbackConversation
} from "@/domain/conversations";
import { TypeSend } from "@/presentation/apps";
import { feedbackRepository } from "./repositories";

export const buildConversations = (
  send: TypeSend
): TypeConvesations => {
  
  const informFeedbackConversation = new InformFeedbackConversation(
    send,
    feedbackRepository
  );

  const aiAgentConversation = new AiAgentConversation(send);

  informFeedbackConversation.aiAgentConversation = aiAgentConversation;

  return {aiAgentConversation} 

};
