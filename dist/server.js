"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const constant_1 = __importDefault(require("./config/constant"));
app_1.default.get('/', (req, res) => {
    res.send('Hello World!');
});
const port = constant_1.default.app.PORT;
app_1.default.listen(port, function () {
    return console.log(`Server is running on ${port}`);
});
//# sourceMappingURL=server.js.map