"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../src/config/db"));
var dotenv_1 = __importDefault(require("dotenv"));
var AuthRoute_1 = __importDefault(require("../src/routes/AuthRoute"));
var ProjectRoute_1 = __importDefault(require("../src/routes/ProjectRoute"));
dotenv_1.default.config();
(0, db_1.default)();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// routing
app.use('/api/user', AuthRoute_1.default);
app.use('/api/project', ProjectRoute_1.default);
app.listen(PORT, function () {
    console.log("all running good ".concat(PORT));
});
//# sourceMappingURL=index.js.map