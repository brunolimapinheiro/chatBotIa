import { ISessionManager } from "@/presentation/session";
import { UserSession } from "@/domain/session/user-session";
import { Logger } from "winston";
import { UserFields } from "../repositories/fields";
import { User } from "../repositories/models";
import { Repository } from "../repositories/repository";

export class SessionManager implements ISessionManager {
	private sessions: { [id: string]: UserSession } = {};

	constructor(private readonly logger: Logger, private readonly userRepository: Repository<User, UserFields>
	) { }

	async create(id: string): Promise<UserSession> {
		let user = await this.userRepository.findById(id);

		if(user) {
			user.last_interaction = new Date();
			this.userRepository.update(user);
		} else {
			user = { id: id, last_interaction: new Date() } as User;
			await this.userRepository.insert(user);
		}

		const userSession = new Proxy(new UserSession(user, this.logger.child({ user_id: id })), { set: this.updateUserProxy })

		this.sessions[id] = userSession;
		return userSession;
	}

	updateUserProxy = (target, prop, val): boolean => {
		if(prop == "last_interaction")
			this.userRepository.update({ id: target.id, last_interaction: val} as User)
		else if(prop == "last_rating")
				this.userRepository.update({ id: target.id, last_rating: val} as User)
		else if(prop == "last_feedback")
				this.userRepository.update({ id: target.id, last_feedback: val} as User)
		else if(prop == "name")
			this.userRepository.update({ id: target.id, name: val} as User)

		target[prop] = val;
		return true;
	}

	get(id: string): UserSession {
		return this.sessions[id];
	}

	close(id: string): void {
		delete this.sessions[id];
	}
}
