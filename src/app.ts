import * as express from "express";
import * as config from "config";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import Db from "./db";

import router from "./routes";
import { FileDB } from "./db/fileDB";

const app = express();
const port = config.get("server.port");

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.set("port", port);

const server = http.createServer(app);

const startServer = async () => {
  await Db.use(new FileDB(`${__dirname}/db/fileDB/tables/`)).createTable("users");

  server.listen(port);

  server.on("error", (error) => {
    // eslint-disable-next-line no-console
    console.error("Server error: ", error);
  });

  server.on("listening", () => {
    const address = server.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${address.port}`;
    // eslint-disable-next-line no-console
    console.log(`Server listening on ${bind}`);
  });
};

startServer();
