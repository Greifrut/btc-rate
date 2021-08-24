import "joi-extract-type";
import {
  router,
  protectedMiddleware,
  validator,
  userController,
  btcController,
} from "./setup";
import userSchema from "../schemas/user";
import {Middleware} from "../middlewares/middleware";

router.get("/btcRate", new Middleware(protectedMiddleware).use, btcController.process);

router.post("/user/login", validator.body(userSchema), userController.login);

router.post(
  "/user/create",
  validator.body(userSchema),
  userController.register
);

export default router;
