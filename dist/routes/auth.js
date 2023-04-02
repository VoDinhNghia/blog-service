"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const checkJwt_1 = require("../middlewares/checkJwt");
const router = (0, express_1.Router)();
router.post('/login', AuthController_1.default.login);
router.post('/change-password', [checkJwt_1.checkJwt], AuthController_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map