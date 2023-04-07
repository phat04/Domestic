import { Router } from "express";
import { checkRole } from "../middlewares/checkRole";
import * as cartItemController from "../controllers/cartItem";

const router = Router();

router
  .route("/")
  .post(cartItemController.addCartItem)
  .get(checkRole, cartItemController.getAllCartItem);

router.route("/getCartItem/:id").get(cartItemController.getCartItem);
router.route("/updateCartItem/:id").patch(cartItemController.updateCartItem);

router.route("/deleteCartItem/:id").delete(cartItemController.deleteCartItem);

export default router;
