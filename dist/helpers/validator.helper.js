"use strict";
// Import Libraries
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
exports.getErrors = exports.validator = void 0;
// Import Thirdparty
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const validator = function (schema) {
    return (req, res, next) => {
        const errors = {};
        const rules = schema.validate(req);
        if (rules.error) {
            const error = rules.error.details;
            const firstError = error[0].context.key;
            for (const e of error) {
                const key = e.context.key;
                errors[key] = e.message.replace(/['"]+/g, '').replace('body.', '');
            }
            return res.status(http_status_codes_1.default.BAD_REQUEST).send({
                status: 'error',
                message: errors[firstError],
                errors,
            });
        }
        else {
            next();
        }
    };
};
exports.validator = validator;
//
// get the errors
//
const getErrors = (rules) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    if (rules.error) {
        for (const e of rules.error.details) {
            const key = e.context.label;
            errors[key] = e.message.replace(/['"]+/g, '');
        }
    }
    return errors;
});
exports.getErrors = getErrors;
//# sourceMappingURL=validator.helper.js.map