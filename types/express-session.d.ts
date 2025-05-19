// types/express-session.d.ts or your session override file
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      role?: number;
    };
  }
}
