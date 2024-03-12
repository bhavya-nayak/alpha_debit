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
// Import Libraries
const http_status_codes_1 = require("http-status-codes");
// import moment from 'moment-timezone'
const i18n_1 = __importDefault(require("../../../config/i18n"));
const auth_helper_1 = __importDefault(require("../helper/auth.helper"));
const moment_1 = __importDefault(require("moment"));
// Import Interface
//  Import Repo
const auth_repo_1 = __importDefault(require("../repo/auth.repo"));
/*
* 😎 @author : Akash Thakkar
* 🚩 @uses : For simple signUp
* 🗓 Created : 14/02/2024
*/
const signUpService = (container) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { input: { body }, } = container;
        if (body.email.includes('+')) {
            const err = new Error(i18n_1.default.__('auth.invalid_email'));
            err.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            throw err;
        }
        //
        // get user data by email
        //
        container.derived.user = yield auth_repo_1.default.getUserData(body.email);
        if (container.derived.user.length > 0) {
            const err = new Error(i18n_1.default.__('auth.user_exist'));
            err.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            throw err;
        }
        else {
            yield saveUserData(container);
        }
    }
    catch (error) {
        throw error;
    }
});
/*
* 😎 @author : Akash Thakkar
* 🚩 @uses : To save user data
* 🗓 Created : 14/02/2024
*/
const saveUserData = (container) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { input: { body }, derived: { user } } = container;
        const hasPass = yield auth_helper_1.default.generateHashPassword(body.password);
        const userData = {
            email: body.email,
            password: hasPass,
            first_name: body.first_name,
            last_name: body.last_name,
            is_email_verified: false,
            date_of_birth: body.date_of_birth ? body.date_of_birth : null,
            profile_completed: false,
            created_at: moment_1.default.utc().format('YYYY-MM-DD HH:mm:ss'),
        };
        container.output.result = yield auth_repo_1.default.saveUserData(userData);
        container.output.result.access_token = yield auth_helper_1.default.generateAccessToken(container);
        delete (container.output.result.password);
        //
        // TODO : Here we should introduce email verification
        //
    }
    catch (error) {
        throw error;
    }
});
/*
* 😎 @author : Akash Thakkar
* 🚩 @uses : To save user data
* 🗓 Created : 14/02/2024
*/
const updateUserData = (container) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { input: { body }, derived: { user }, } = container;
        const hasPass = yield auth_helper_1.default.generateHashPassword(body.password);
        const userData = {
            email: body.email,
            password: hasPass,
            first_name: body.first_name,
            last_name: body.last_name,
            is_email_verified: false,
            date_of_birth: body.date_of_birth ? body.date_of_birth : null,
            profile_completed: false,
            created_at: moment_1.default.utc().format('YYYY-MM-DD HH:mm:ss'),
        };
        container.output.result = yield auth_repo_1.default.updateUserData(userData, user[0].id);
        container.output.result.access_token = yield auth_helper_1.default.generateAccessToken(container);
        delete (container.output.result.password);
        return container;
    }
    catch (error) {
        throw error;
    }
});
exports.default = signUpService;
//# sourceMappingURL=signUp.service.js.map