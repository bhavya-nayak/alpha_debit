"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Thirdparty
const joi_1 = __importDefault(require("joi"));
// import Config
const i18n_1 = __importDefault(require("../../../config/i18n"));
/*
 * 😎 @author : Akash Thakkar
 * 🚩 @uses : to validate the inputs
 * 🗓 Created : 12/02/2024
 */
const authSchema = {
    //
    //  body validation for sign up API
    //
    signUp: joi_1.default
        .object()
        .options({ abortEarly: false, stripUnknown: true })
        .keys({
        body: joi_1.default.object().keys({
            email: joi_1.default.string().required().email().trim(),
            password: joi_1.default.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])/).required()
                .messages({ 'string.pattern.base': `${i18n_1.default.__('auth.password_regex_validation')}` }),
            first_name: joi_1.default.string().required(),
            last_name: joi_1.default.string().required(),
            date_of_birth: joi_1.default.date().allow(null).optional(),
        }),
    }),
    //
    //  body validation for sign in API
    //
    signIn: joi_1.default
        .object()
        .options({ abortEarly: false, stripUnknown: true })
        .keys({
        body: joi_1.default.object().keys({
            email: joi_1.default.string().required().email().trim(),
            password: joi_1.default.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])/).required()
                .messages({ 'string.pattern.base': `${i18n_1.default.__('auth.password_regex_validation')}` }),
        }),
    }),
    userContact: joi_1.default
        .object()
        .options({ abortEarly: false, stripUnknown: true })
        .keys({
        body: joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            street_address: joi_1.default.string().required(),
            building: joi_1.default.string().optional().allow(null),
            country_id: joi_1.default.string().required(),
            state: joi_1.default.string().optional().allow(null),
            town: joi_1.default.string().optional().allow(null),
            phone_number: joi_1.default.string().required(),
            zipcode: joi_1.default.string().required(),
        }),
    }),
    userSecureInfo: joi_1.default
        .object()
        .options({ abortEarly: false, stripUnknown: true })
        .keys({
        body: joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            sin_number: joi_1.default.string().required(),
            passport_number: joi_1.default.string(),
            license_number: joi_1.default.string(),
        }).xor('passport_number', 'license_number')
            .when(joi_1.default.object({
            passport_number: joi_1.default.exist(),
            license_number: joi_1.default.exist(),
        }), {
            then: joi_1.default.object({
                passport_number: joi_1.default.optional(),
                license_number: joi_1.default.optional(),
            }).or('passport_number', 'license_number'),
        }),
    }),
};
exports.default = authSchema;
//# sourceMappingURL=auth.validator.js.map