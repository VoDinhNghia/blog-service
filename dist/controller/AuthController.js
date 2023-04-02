"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
const config_1 = require("../config/config");
const data_source_1 = require("../data-source");
class AuthController {
}
_a = AuthController;
AuthController.login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send();
    }
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    let user;
    try {
        user = await userRepository.findOneOrFail({ where: { email } });
    }
    catch (error) {
        res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send();
        return;
    }
    const token = jwt.sign({ userId: user.id, username: user.email }, config_1.config.jwtSecret, { expiresIn: '1h' });
    res.send(token);
};
AuthController.changePassword = async (req, res) => {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    let user;
    try {
        user = await userRepository.findOneOrFail(id);
    }
    catch (id) {
        res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
    }
    user.password = newPassword;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    await userRepository.save(user);
    res.status(204).send();
};
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map