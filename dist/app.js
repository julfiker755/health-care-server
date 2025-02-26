"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHander_1 = __importDefault(require("./app/errors/globalErrorHander"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const fileUploader_1 = require("./shared/fileUploader");
// { origin: "*" }
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://doctors-next14.vercel.app"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(fileUploader_1.fileUploader.uploadsDir));
app.get("/", (req, res) => {
    res.send({
        message: "😍Server is Running 😍",
    });
});
app.use("/api/v1", routes_1.default);
app.use(globalErrorHander_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND",
        error: {
            path: req.originalUrl,
            message: "Your Requested path is not found",
        },
    });
});
exports.default = app;
