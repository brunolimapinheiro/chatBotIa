import "@/common/prototype";
import "@/common/logging";

import { SessionManager } from "@/domain/session";
import { Whatsapp, Telegram } from "@/domain/apps";
import { ContextManager } from "@/presentation";
import config from "@/common/config";
import { buildConversations, userRepository } from "./factories";

import { LocalAppDataStorage } from "@/data/app-data-storage";


async function main(): Promise<void> {
  const apps = [];

  if (config.WHATSAPP_ENABLED)
    apps.push(whatsapp());

  if (config.TELEGRAM_TOKEN)
    apps.push(telegram());

  await Promise.all(apps);
}

async function whatsapp() {
  const logger = log.child({ app: "whatsapp" })
  const app = new Whatsapp(logger);
  const session = new SessionManager(logger, userRepository);

  const { aiAgentConversation } = buildConversations(app.send);

  const context = new ContextManager(app, session, aiAgentConversation, logger);

  await context.connect();
}

async function telegram() {
  const appDataStorage = new LocalAppDataStorage();
  const logger = log.child({ app: "telegram" });

  const app = new Telegram(config.TELEGRAM_TOKEN, appDataStorage, logger);
  const session = new SessionManager(logger, userRepository);

  const { aiAgentConversation } = buildConversations(app.send);

  const context = new ContextManager(app, session, aiAgentConversation, logger);

  await context.connect();
}

main();
