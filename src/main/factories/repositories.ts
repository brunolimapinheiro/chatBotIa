import RatingRepository from "@/data/repositories/rating-repository";
import UserRepository from "@/data/repositories/user-repository";
import { FirebaseDatabase } from "@/infra/database/firebase-database";
import config from "@/common/config";
import FeedbackRepository from "@/data/repositories/feedback-repository";
import { LocalDatabase } from "@/infra/database/local-database";

const database = config.FIREBASE_CONFIG.apiKey ? new FirebaseDatabase(config.FIREBASE_CONFIG) : new LocalDatabase();

export const ratingRepository = new RatingRepository(database);
export const feedbackRepository = new FeedbackRepository(database);
export const userRepository = new UserRepository(database);