import { Request, Response, NextFunction } from 'express';

// Public paths anyone can access
const publicPaths = ['/visitor', '/global-styles', '/assets'];

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  const cleanPath = req.path.replace(/\/$/, ''); // remove trailing slash

  console.log('Session:', req.session);
  console.log('Path:', req.path);

  const isPublic = publicPaths.some((publicPath) => cleanPath.startsWith(publicPath));

  if (isPublic) {
    return next();
  }
  
  if (!req.session.user) {
    return res.redirect('/visitor/login');
  }
  
  next();
}

// Role-based access middleware
export function requireRole(minRole: number) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      return res.redirect('/visitor/login');
    }

    const userRole = req.session.user.role;
    if (userRole === undefined) {
      return res.status(403).send('Forbidden: role not defined');
    }
    if (userRole < minRole) {
      return res.status(403).send('Forbidden: insufficient permissions');
    }

    next();
  };
}
