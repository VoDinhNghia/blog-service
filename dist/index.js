"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const data_source_1 = require("./data-source");
const cors = require("cors");
const routes_1 = require("./routes");
const helmet_1 = require("helmet");
const dotenv = require("dotenv");
data_source_1.AppDataSource.initialize()
    .then(() => {
    const app = express();
    app.use(cors());
    app.use((0, helmet_1.default)());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', routes_1.default);
    dotenv.config({ path: '../.env' });
    console.log('__dirname', __dirname);
    const port = process.env['PORT'];
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
    .catch(error => console.log(error));
//# sourceMappingURL=index.js.map