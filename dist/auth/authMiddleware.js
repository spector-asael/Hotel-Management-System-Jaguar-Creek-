"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = requireLogin;
exports.requireRole = requireRole;
// Public paths anyone can access
const publicPaths = ['/visitor', '/global-styles', '/assets'];
function requireLogin(req, res, next) {
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
function requireRole(minRole) {
    return function (req, res, next) {
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
