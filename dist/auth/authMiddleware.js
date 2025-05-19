"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const accessControl = {
    '/guest': 0,
    '/employee': 1,
    '/admin': 2,
};
function authGuard(req, res, next) {
    const path = req.path.replace(/\/$/, ''); // normalize by removing trailing slash
    // Allow all users to access anything under /visitor
    if (path.startsWith('/visitor')) {
        return next();
    }
    // Check if the route matches a protected route
    for (const [prefix, minRole] of Object.entries(accessControl)) {
        if (path.startsWith(prefix)) {
            const user = req.session.user;
            if (!user) {
                return res.redirect('/visitor/login');
            }
            if (user.role < minRole) {
                return res.redirect('/visitor/login');
            }
            return next(); // Authorized
        }
    }
    // Default fallback if route doesn't match anything
    return next();
}
