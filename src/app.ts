import * as express from "express";
import * as config from "config";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as logger from "morgan";
import Db from "./db/db";

import router from "./routes";

const app = express();
const port = config.get("server.port");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.set("port", port);

const server = http.createServer(app);

const startServer = async () => {
    await Db.createDB("users");

    const server = http.createServer(app);
    server.listen(port);

    server.on("error", (error) => {
        console.error("Server error: ", error);
    });

    server.on("listening", () => {
        const address = server.address();
        const bind = typeof address === "string" ?
            `pipe ${address}` : `port ${address.port}`;
        console.log(`Server listening on ${bind}`)
    });
};

startServer();

