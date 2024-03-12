"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Config
const i18n_1 = __importDefault(require("../config/i18n"));
// Import Static
// Import Middleware
// Import Controllers
// Import Interface
// Import Validators
// Import Helpers
// Import Transformers
// Import Libraries
// Import Models
// Import Thirdparty
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const response_helper_1 = __importDefault(require("../helpers/response.helper"));
class Authorization {
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                if (!req.logged_in_user) {
                    if (!req.secretKey) {
                        const err = new Error(i18n_1.default.__('un_authorized'));
                        err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                        throw err;
                    }
                }
                next();
            }
            catch (error) {
                res.status(yield response_helper_1.default.getStatusCode(error))
                    .json(yield response_helper_1.default.validationErrorResponse(error));
            }
        });
    }
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : to validate the login
    * 🗓 Created : 21/4/2022
    */
    validateLogin(container) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (container.output && container.output.error && Object.keys(container.output.error).length) {
                    const err = new Error(container.output.error.message);
                    err.statusCode = container.output.error.code;
                    throw err;
                }
                else {
                    if (!container.derived.user) {
                        const err = new Error(i18n_1.default.__('auth.wrong_credentials'));
                        err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                        throw err;
                    }
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Authorization();
//# sourceMappingURL=authorization.js.map