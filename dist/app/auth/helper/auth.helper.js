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
const constant_1 = __importDefault(require("../../../config/constant"));
// Import Library
const bcrypt_1 = __importDefault(require("bcrypt"));
// Tmport Thirdparty
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthHelper {
    /*
     * 😎 @author : Akash Thakkar
     * 🚩 @uses : to comapre hash-passwords
     * 🗓 Created : 02/02/2023
     */
    comparePassword(password, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return bcrypt_1.default.compare(password, userPassword).then((response) => {
                    if (response !== true) {
                        return false;
                    }
                    return true;
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    /*
     * 😎 @author : Akash Thakkar
     * 🚩 @uses : to generate hash-passwords
     * 🗓 Created : 02/02/2023
     */
    generateHashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    bcrypt_1.default.hash(password, 10, function (err, hash) {
                        if (err) {
                            reject(err);
                        }
                        resolve(hash);
                    });
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateAccessToken(container) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //
                // generate accessToken
                //
                const payload = {
                    email: container.derived.user.email,
                    id: container.derived.user.id,
                };
                const secretKey = constant_1.default.app.JWT_SECRET_KEY;
                const accessToken = (0, jsonwebtoken_1.sign)(payload, secretKey, { expiresIn: '24h' });
                return accessToken;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new AuthHelper();
//# sourceMappingURL=auth.helper.js.map