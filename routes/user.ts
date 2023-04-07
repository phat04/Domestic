import { Router } from "express";
import * as userController from "../controllers/user";
import { checkJwtToken } from "../middlewares/checkJwtToken";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.route("/").post(userController.register);
router.route("/login").post(userController.login);
router
  .route("/getAll")
  .get(checkJwtToken, checkRole, userController.getAllUser);
router
  .route("/deleteUser/:id")
  .delete(checkJwtToken, userController.deleteUser);
router
  .route("/changepassword")
  .patch(checkJwtToken, userController.changePassword);

export default router;
