"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const class_transformer_1 = require("class-transformer");
class UserMap {
    static toDTO({ email, name, id, avatar, driver_license, avatar_url, }) {
        const user = (0, class_transformer_1.instanceToInstance)({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });
        return user;
    }
}
exports.UserMap = UserMap;
