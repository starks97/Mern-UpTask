"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
var mongoose_1 = require("mongoose");
;
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
var UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
function findOne(arg0) {
    throw new Error("Function not implemented.");
}
exports.findOne = findOne;
//# sourceMappingURL=User.js.map