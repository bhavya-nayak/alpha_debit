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
const constant_1 = __importDefault(require("../config/constant"));
// Import Static
// Import Helpers
const auth_helper_1 = __importDefault(require("../app/auth/helper/auth.helper"));
// Import Transformers
// Import Libraries
// Import Models
const auth_repo_1 = __importDefault(require("../app/auth/repo/auth.repo"));
// Import Thirdparty
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const response_helper_1 = __importDefault(require("../helpers/response.helper"));
class PassportAuth {
    constructor() {
        const jwtOptions = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: constant_1.default.app.JWT_SECRET_KEY,
        };
        passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, this.verifyJwt));
        passport_1.default.use('login', new passport_local_1.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        }, this.login));
    }
    verifyJwt(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_repo_1.default.getUserData(payload.email);
                console.log(user);
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            }
            catch (error) {
                const err = new Error(i18n_1.default.__('auth.un_authorized'));
                err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                return done(err, false);
            }
        });
    }
    login(email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield auth_repo_1.default.getUserData(email);
                if (!user) {
                    const err = new Error(i18n_1.default.__('auth.wrong_credentials'));
                    err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                    throw err;
                }
                //
                // Compare the password
                //
                const pass = yield auth_helper_1.default.comparePassword(password, user.password);
                if (pass) {
                    return done(null, user);
                }
                else {
                    const err = new Error(i18n_1.default.__('auth.wrong_credentials'));
                    err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                    throw err;
                }
            }
            catch (error) {
                return done(error, false);
            }
        });
    }
    /*
      * 😎 @author : Raj Jagani
      * 🚩 @uses : authenticate Jwt
      * 🗓 Created : 13/4/2022
      */
    authenticateJwt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield passport_1.default.authenticate('jwt', { session: false }, (error, data, info) => __awaiter(this, void 0, void 0, function* () {
                if (info) {
                    if (info.message === 'jwt expired') {
                        const err = new Error(i18n_1.default.__('auth.un_authorized'));
                        err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                        res.status(yield response_helper_1.default.getStatusCode(err))
                            .json(yield response_helper_1.default.validationErrorResponse(err));
                    }
                }
                else {
                    console.log("data");
                    console.log(data);
                    if (data) {
                        req.logged_in_user = data;
                        // req.token_type = data.token_type
                        next();
                    }
                    else {
                        const err = new Error(i18n_1.default.__('auth.un_authorized'));
                        err.statusCode = http_status_codes_1.default.UNAUTHORIZED;
                        res.status(yield response_helper_1.default.getStatusCode(err))
                            .json(yield response_helper_1.default.validationErrorResponse(err));
                    }
                }
            }))(req, res, next);
        });
    }
    /*
      * 😎 @author : Raj Jagani
      * 🚩 @uses : Login the user
      * 🗓 Created : 21/4/2022
      */
    loginUser(req, container) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                return yield passport_1.default.authenticate('login', (err, user, info) => {
                    if (err) {
                        container.output.error = {
                            message: err.message,
                            code: err.statusCode,
                        };
                        // res.status(err.statusCode).send(err.message);
                    }
                    if (info !== undefined) {
                        container.output.error = {
                            message: info.message,
                            code: http_status_codes_1.default.UNAUTHORIZED,
                        };
                    }
                    else {
                        container.derived.user = {};
                        container.derived.user = user;
                    }
                    resolve(container);
                })(req, container);
            }));
        });
    }
}
exports.default = new PassportAuth();
//# sourceMappingURL=passportAuth.js.map