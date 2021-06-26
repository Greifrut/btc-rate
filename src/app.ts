import * as express from "express";
import * as config from "config";
import * as bodyParser from "body-parser";
import Db from "./db/db";

import router from "./routes";

config.util.loadFileConfigs(__dirname + "/src/config");

const app = express();
const port = config.get("server.port");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const startServer = async () => {
    await Db.createDB("users");

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

startServer();

