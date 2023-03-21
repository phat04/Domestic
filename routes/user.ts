import { Router } from "express";
import { deleteUser, getAllUser, login, register } from "../controllers/user";
import { checkJwtToken } from "../middlewares/checkJwtToken";

const router = Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/getAll").get(checkJwtToken, getAllUser);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;
