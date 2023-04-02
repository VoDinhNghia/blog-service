"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const User_1 = require("../entity/User");
const data_source_1 = require("../data-source");
const checkRole = (roles) => {
    return async (req, res, next) => {
        const id = res.locals.jwtPayload.userId;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (id) {
            res.status(401).send();
        }
        if (roles.includes(user.role))
            next();
        else
            res.status(401).send();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map