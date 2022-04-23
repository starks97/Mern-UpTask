"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.setNewPassword = exports.AuthenticateToken = exports.ForgotPassword = exports.ConfirmUser = exports.AuthenticateUser = exports.RegisterUser = void 0;
var User_1 = __importDefault(require("../../models/User"));
var generateId_1 = __importStar(require("../../helpers/generateId"));
var generateJWT_1 = __importDefault(require("../../helpers/generateJWT"));
var message_1 = require("../../helpers/message");
var RegisterUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, currentUser, user, _a, setUserData, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                currentUser = _b.sent();
                if (currentUser) {
                    return [2 /*return*/, res.status(400).json({ msg: "the user its already registered" })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                user = new User_1.default(req.body);
                user.token = (0, generateId_1.default)();
                _a = user;
                return [4 /*yield*/, (0, generateId_1.setPassword)(user.password)];
            case 3:
                _a.password = _b.sent();
                return [4 /*yield*/, user.save()];
            case 4:
                setUserData = _b.sent();
                res.json(setUserData);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.RegisterUser = RegisterUser;
function AuthenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userExist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 1:
                    userExist = _b.sent();
                    if (!userExist) {
                        return [2 /*return*/, res.status(404).json({ msg: "the user not exits" })];
                    }
                    // check if the user its already confirmend
                    if (!userExist.confirm) {
                        return [2 /*return*/, res
                                .status(403)
                                .json({ msg: "Your account it hasn't been confirmed" })];
                    }
                    return [4 /*yield*/, (0, generateId_1.isValidPassword)(password, userExist)];
                case 2:
                    // check the password if its correct
                    if (_b.sent()) {
                        res.json({
                            _id: userExist._id,
                            name: userExist.name,
                            email: userExist.email,
                            token: (0, generateJWT_1.default)(userExist._id),
                        });
                    }
                    else {
                        return [2 /*return*/, res.status(405).json({ msg: "Your password its not correct" })];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.AuthenticateUser = AuthenticateUser;
// confirm user
function ConfirmUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var string, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    string = req.params.token;
                    return [4 /*yield*/, User_1.default.findOne({ token: string })];
                case 1:
                    token = _a.sent();
                    if (!token) {
                        return [2 /*return*/, res.status(403).json({ msg: message_1.ErrorMessage })];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    token.confirm = true;
                    token.token = " ";
                    return [4 /*yield*/, token.save()];
                case 3:
                    _a.sent();
                    res.status(200).json({ statusCode: 200, msg: "OK" });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.ConfirmUser = ConfirmUser;
// check if the user forgot their password
function ForgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ msg: "the user not exits" })];
                    }
                    try {
                        user.token = (0, generateId_1.default)();
                    }
                    catch (err) {
                        console.log(err);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.ForgotPassword = ForgotPassword;
function AuthenticateToken(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var string, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    string = req.params.token;
                    return [4 /*yield*/, User_1.default.findOne({ token: string })];
                case 1:
                    token = _a.sent();
                    if (token) {
                        res.status(200).json({ statusCode: 200, msg: "OK" });
                    }
                    else {
                        return [2 /*return*/, res.status(403).json({ msg: message_1.ErrorMessage })];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.AuthenticateToken = AuthenticateToken;
function setNewPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var IUser, password, user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    IUser = req.params.token;
                    password = req.body.password;
                    return [4 /*yield*/, User_1.default.findOne({ token: IUser })];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 3];
                    user.password = password;
                    _a = user;
                    return [4 /*yield*/, (0, generateId_1.setPassword)(user.password)];
                case 2:
                    _a.password = _b.sent();
                    user.token = " ";
                    user.save();
                    res.status(200).json({ statusCode: 200, msg: "OK" });
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(403).json({ msg: message_1.ErrorMessage })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.setNewPassword = setNewPassword;
// checking profile
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = req.user;
            res.status(200).json({ statusCode: 200, msg: "OK", user: user });
            return [2 /*return*/];
        });
    });
}
exports.profile = profile;
//# sourceMappingURL=AuthController.js.map