"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const user_1 = require("./user");
const routes = (0, express_1.Router)();
routes.use('/auth', auth_1.default);
routes.use('/user', user_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map