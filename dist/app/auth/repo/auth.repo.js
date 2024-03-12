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
Object.defineProperty(exports, "__esModule", { value: true });
// import Config
const firebase_1 = require("../../../config/firebase");
// Import Thirdparty
class UserRepo {
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : to save user data
    * 🗓 Created : 14/02/2024
    */
    saveUserData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield firebase_1.db.collection('users').add(data);
                const doc = yield userData.get();
                return Object.assign({ id: doc.id }, doc.data());
            }
            catch (error) {
                throw error;
            }
        });
    }
    /*
    * 😎 @author : Akash Thakkar
    * 🚩 @uses : to update user data
    * 🗓 Created : 14/02/2024
    */
    updateUserData(data, docId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_1.db.collection('users').doc(docId).update(data);
                const [userData] = yield this.getUserData(data.email);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /*
      * 😎 @author : Akash Thakkar
      * 🚩 @uses : to get user data
      * 🗓 Created : 14/02/2024
      */
    getUserData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield firebase_1.db.collection('users').where('email', '==', email).get();
                return user.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserRepo();
//# sourceMappingURL=auth.repo.js.map