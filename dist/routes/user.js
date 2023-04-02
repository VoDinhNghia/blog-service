"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJwt_1 = require("../middlewares/checkJwt");
const checkRole_1 = require("../middlewares/checkRole");
const UserController_1 = require("../controller/UserController");
const router = (0, express_1.Router)();
router.get('/', [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(['ADMIN'])], UserController_1.default.listAll);
router.get('/:id', [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(['ADMIN'])], UserController_1.default.getOneById);
router.post('/', UserController_1.default.newUser);
router.patch('/:id', [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(['ADMIN'])], UserController_1.default.editUser);
router.delete('/:id', [checkJwt_1.checkJwt, (0, checkRole_1.checkRole)(['ADMIN'])], UserController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map