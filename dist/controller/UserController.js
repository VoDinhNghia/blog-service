"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
const data_source_1 = require("../data-source");
class UserController {
}
_a = UserController;
UserController.listAll = async (req, res) => {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const users = await userRepository.find({
        select: ['id', 'email', 'role'],
    });
    res.send(users);
};
UserController.getOneById = async (req, res) => {
    const id = req.params.id;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    let user;
    try {
        user = await userRepository.findOneBy({ id });
    }
    catch (error) {
        res.status(404).send('User not found');
    }
    res.status(200).send(user);
};
UserController.newUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log('usernam', req.body);
        const user = new User_1.User();
        user.email = email;
        user.password = password;
        user.role = role;
        const errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        user.hashPassword();
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        try {
            await userRepository.save(user);
        }
        catch (e) {
            res.status(409).send('username already in use');
            return;
        }
        res.status(201).send('User created');
    }
    catch (error) {
        res.status(500).send('error');
    }
};
UserController.editUser = async (req, res) => {
    const id = req.params.id;
    const { username, role } = req.body;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    let user;
    try {
        user = await userRepository.findOneBy({ id });
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    user.username = username;
    user.role = role;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    try {
        await userRepository.save(user);
    }
    catch (e) {
        res.status(409).send('username already in use');
        return;
    }
    res.status(204).send();
};
UserController.deleteUser = async (req, res) => {
    const id = req.params.id;
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    let user;
    try {
        user = await userRepository.findOneBy({ id });
    }
    catch (error) {
        res.status(404).send('User not found');
        return;
    }
    await userRepository.delete(id);
    res.status(204).send(user);
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map