import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      username: string;
      role?: number; // optional: e.g. 2 = 'admin' or 0 = 'guest'
      // Add any other fields you store in session
    };
  }
}
