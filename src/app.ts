import * as express from "express";
import * as config from "config";

import router from "./routes";

config.util.loadFileConfigs(__dirname + "/src/config");

const app = express();
const port = config.get("server.port");

app.use(router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})