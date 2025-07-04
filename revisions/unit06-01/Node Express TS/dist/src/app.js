"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/test", (req, res) => {
    try {
        res.status(200).json({ message: "This is test route" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
app.use('/api/auth', auth_routes_1.default);
exports.default = app;
