import { Router } from "express";
import * as cartController from "../controllers/cart";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router
  .route("/")
  .post(checkRole, cartController.addCart)
  .get(checkRole, cartController.getAllCart);
router.route("/getCart/:id").get(cartController.getCart);
router.route("/updateCart/:id").patch(cartController.updateCart);
router.route("/deleteCart/:id").delete(cartController.deleteCart);
router.route("/addItemToCart/:id").patch(cartController.addItemsToCart);
export default router;
