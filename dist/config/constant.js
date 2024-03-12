"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    app: {
        PORT: process.env.PORT,
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
};
//# sourceMappingURL=constant.js.map