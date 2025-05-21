"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const renderingVisitorRoutes_1 = __importDefault(require("./routes/renderingVisitorRoutes"));
const rendinergEmployeeRoutes_1 = __importDefault(require("./routes/rendinergEmployeeRoutes"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.set('view engine', 'ejs'); // tells Express to use EJS
console.log("DIRNAME:", __dirname);
app.set('views', path_1.default.join(process.cwd(), './dist/views')); // set the views directory to the dist folder
console.log('Express views directory after set:', app.get('views'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "./dist/public")));
app.use(express_1.default.json());
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});
app.use((0, express_session_1.default)({
    secret: 'keyboard cat', // used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something is stored
    cookie: { secure: false }
}));
app.use(authMiddleware_1.authGuard);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.get('/', (req, res) => {
    res.redirect('/visitor/homepage');
});
app.use('/employee', (rendinergEmployeeRoutes_1.default));
app.use('/visitor', (renderingVisitorRoutes_1.default));
app.use('/api/', (apiRoutes_1.default));
app.use((req, res) => {
    res.status(404).send("Error");
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
