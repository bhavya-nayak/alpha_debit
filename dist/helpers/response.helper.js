'use strict';
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
class ResponseHelper {
    //
    // Success Format the response
    //
    successResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseFormat = {
                status: 'success',
                data: data.result,
            };
            if ('meta' in data) {
                responseFormat.meta = data.meta;
            }
            if ('message' in data) {
                responseFormat.message = data.message;
            }
            return responseFormat;
        });
    }
    //
    // Format Validation error response
    //
    validationErrorResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationErrorFormat = {
                status: 'error',
            };
            if ('validationErrors' in data) {
                validationErrorFormat.errors = data.validationErrors;
            }
            if ('message' in data) {
                validationErrorFormat.message = data.message;
            }
            return validationErrorFormat;
        });
    }
    //
    // create the chunks
    //
    splitToBulks(arr, bulkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const bulks = [];
            for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
                bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
            }
            return bulks;
        });
    }
    getStatusCode(error) {
        return __awaiter(this, void 0, void 0, function* () {
            return isNaN(error.statusCode) ? 400 : error.statusCode;
        });
    }
    //
    // get the firebase error response
    //
    getFirebaseError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorFormat = {
                status: 'error',
                message: error.message,
            };
            if ('response' in error && 'data' in error.response) {
                switch (error.response.data.error.message) {
                    case 'EMAIL_EXISTS':
                        errorFormat.message = i18n_1.default.__('firebase_auth.email_exist');
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorFormat.message = i18n_1.default.__('firebase_auth.email_not_found');
                        break;
                    case 'INVALID_PASSWORD':
                        errorFormat.message = i18n_1.default.__('firebase_auth.invalid_password');
                        break;
                    default:
                        errorFormat.message = error.response.data.error.message;
                        break;
                }
            }
            return errorFormat;
        });
    }
}
exports.default = new ResponseHelper();
//# sourceMappingURL=response.helper.js.map