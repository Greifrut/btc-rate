import {Router} from "express";
import {create, login} from "./user";
import btcRate from "./btcRate";

const router = Router();

router.get("/btcRate", btcRate);
router.get("/user/login", login);
router.post("/user/create", create);

export default router;