"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config_1.config.jwtSecret, {
        expiresIn: config_1.expireToken,
    });
    res.setHeader('token', newToken);
    next();
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=checkJwt.js.map