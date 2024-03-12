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
const i18n_1 = __importDefault(require("../../../config/i18n"));
// Import Interface
//  Import Repo
const auth_repo_1 = __importDefault(require("../repo/auth.repo"));
/*
* 😎 @author : Akash Thakkar
* 🚩 @uses : to save user contact data
* 🗓 Created : 14/02/2024
*/
const saveSecuredDetails = (container) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (container.derived.user.length === 0) {
            const err = new Error(i18n_1.default.__('auth.user_not_found'));
            err.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            throw err;
        }
        if (container.derived.user[0].profile_completed) {
            const err = new Error(i18n_1.default.__('auth.profile_already_completed'));
            err.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
            throw err;
        }
        //
        // update data
        //
        yield saveUserData(container);
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
        const { input: { body }, derived: { user }, } = container;
        const userData = Object.assign(Object.assign({}, user[0]), { sin_number: body.sin_number, building: body.building ? body.building : null, town: body.town ? body.town : null, profile_completed: false });
        container.output.result = yield auth_repo_1.default.updateUserData(userData, user[0].id);
        delete (container.output.result.password);
    }
    catch (error) {
        throw error;
    }
});
exports.default = saveSecuredDetails;
//# sourceMappingURL=saveSecuredData.service.js.map