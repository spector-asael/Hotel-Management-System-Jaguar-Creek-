"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const renderingRoutes_1 = __importDefault(require("./routes/renderingRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "./dist/public")));
app.use(express_1.default.json());
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});
app.use('/', (renderingRoutes_1.default));
app.use((req, res) => {
    res.status(404).send("Error");
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
