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
// import Config
const i18n_1 = __importDefault(require("../../../config/i18n"));
// Import Static
// Import Middleware
// Import Helper
const auth_helper_1 = __importDefault(require("../helper/auth.helper"));
// Import Library
// Import Helpers
const response_helper_1 = __importDefault(require("../../../helpers/response.helper"));
const authorization_1 = __importDefault(require("../../../middleware/authorization"));
const passportAuth_1 = __importDefault(require("../../../middleware/passportAuth"));
// import Services
const signUp_service_1 = __importDefault(require("../services/signUp.service"));
const http_status_codes_1 = require("http-status-codes");
const saveContact_service_1 = __importDefault(require("../services/saveContact.service"));
const saveSecuredData_service_1 = __importDefault(require("../services/saveSecuredData.service"));
class AuthController {
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : for signUp
    * 🗓 Created : 12/02/2024
    */
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = {
                    input: {
                        body: req.body,
                    },
                    derived: {},
                    output: {
                        result: {},
                        message: '',
                    },
                };
                //
                // save user data
                //
                yield (0, signUp_service_1.default)(container);
                //
                //  send the response
                //
                container.output.message = i18n_1.default.__('auth.signup_success');
                res.status(http_status_codes_1.StatusCodes.OK).json(yield response_helper_1.default.successResponse(container.output));
            }
            catch (error) {
                res.status(yield response_helper_1.default.getStatusCode(error)).json(yield response_helper_1.default.validationErrorResponse(error));
            }
        });
    }
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : for simple signIn
    * 🗓 Created : 12/02/2024
    */
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = {
                    input: {
                        body: req.body,
                    },
                    derived: {},
                    output: {
                        result: {},
                    },
                };
                //
                // login the user based on passport Auth
                //
                yield passportAuth_1.default.loginUser(req, container);
                //
                // validate the login
                //
                yield authorization_1.default.validateLogin(container);
                //
                // Prepare the Payload for accessToken
                //
                container.output.result.accessToken = yield auth_helper_1.default.generateAccessToken(container);
                //
                // send the response
                //
                res.status(http_status_codes_1.StatusCodes.OK).json(yield response_helper_1.default.successResponse(container.output));
            }
            catch (error) {
                res.status(yield response_helper_1.default.getStatusCode(error)).json(yield response_helper_1.default.validationErrorResponse(error));
            }
        });
    }
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : save contact details
    * 🗓 Created : 12/02/2024
    */
    saveContactData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = {
                    input: {
                        body: req.body,
                    },
                    derived: {},
                    output: {
                        result: {},
                        message: '',
                    },
                };
                //
                // save user's contact data
                //
                yield (0, saveContact_service_1.default)(container);
                //
                //  send the response
                //
                container.output.message = i18n_1.default.__('auth.signup_success');
                res.status(http_status_codes_1.StatusCodes.OK).json(yield response_helper_1.default.successResponse(container.output));
            }
            catch (error) {
                res.status(yield response_helper_1.default.getStatusCode(error)).json(yield response_helper_1.default.validationErrorResponse(error));
            }
        });
    }
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : save contact details
    * 🗓 Created : 12/02/2024
    */
    saveSecuredData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = {
                    input: {
                        body: req.body,
                    },
                    derived: {},
                    output: {
                        result: {},
                        message: '',
                    },
                };
                //
                // save user's secure data
                //
                yield (0, saveSecuredData_service_1.default)(container);
                //
                //  send the response
                //
                container.output.message = i18n_1.default.__('auth.signup_success');
                res.status(http_status_codes_1.StatusCodes.OK).json(yield response_helper_1.default.successResponse(container.output));
            }
            catch (error) {
                res.status(yield response_helper_1.default.getStatusCode(error)).json(yield response_helper_1.default.validationErrorResponse(error));
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map