import { Router } from "express";
import { checkRole } from "../middlewares/checkRole";
import * as orderController from "../controllers/order";

const router = Router();

router
  .route("/")
  .post(checkRole, orderController.addOrder)
  .get(checkRole, orderController.getAllOrder);
router.route("/getOrder/:id").get(orderController.getOrder);
router.route("/updateOrder/:id").patch(orderController.updateOrder);
router.route("/deleteOrder/:id").delete(orderController.deleteOrder);

export default router;
