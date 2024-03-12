"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Config
const i18n_1 = __importDefault(require("../config/i18n"));
// Import Thirdparty
const express_1 = __importDefault(require("express"));
// Import Routes
const auth_route_1 = __importDefault(require("../app/auth/route/auth.route"));
const app = express_1.default.Router();
app.get('/v1/ping', function (req, res) {
    res.send(i18n_1.default.__('welcome_msg'));
});
const path = '/v1';
// path v1 routes
app.use(path + '/auth', auth_route_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map