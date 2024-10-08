try {
  require("dotenv").config();
} catch {}
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

export const WHATSAPP_ENABLED = process.env.WHATSAPP_ENABLED?.toLowerCase() in {"true": true, "1": true };

export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APIID
}

export const REQUESTRATING_PERIOD = Number(process.env.REQUESTRATING_PERIOD);
export const REQUESTFEEDBACK_PERIOD = Number(process.env.REQUESTFEEDBACK_PERIOD);
