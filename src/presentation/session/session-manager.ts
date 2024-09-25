import { UserSession } from "@/domain/session/user-session";

export interface ISessionManager {
  create(id: string): Promise<UserSession>;
  get(id: string): UserSession;
  close(id: string): void;
}
