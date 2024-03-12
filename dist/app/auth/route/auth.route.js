"use strict";
// Import Config
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Static
// Import Middleware
// Import Controllers
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
// Import Interface
// Import Validators
const validator_helper_1 = require("../../../helpers/validator.helper");
const auth_validator_1 = __importDefault(require("../validation/auth.validator"));
// Import Helpers
// Import Transformers
// Import Libraries
// Import Models
// Import Thirdparty
const express_1 = __importDefault(require("express"));
const passportAuth_1 = __importDefault(require("../../../middleware/passportAuth"));
const authorization_1 = __importDefault(require("../../../middleware/authorization"));
const router = express_1.default.Router();
router.post('/sign_up', (0, validator_helper_1.validator)(auth_validator_1.default.signUp), auth_controller_1.default.signUp);
router.post('/sign_in', (0, validator_helper_1.validator)(auth_validator_1.default.signIn), auth_controller_1.default.signIn);
router.post('/user_contact', passportAuth_1.default.authenticateJwt, authorization_1.default.isAuthenticated, (0, validator_helper_1.validator)(auth_validator_1.default.userContact), auth_controller_1.default.saveContactData);
router.post('/secure_info', (0, validator_helper_1.validator)(auth_validator_1.default.userSecureInfo), auth_controller_1.default.saveSecuredData);
exports.default = router;
//# sourceMappingURL=auth.route.js.map