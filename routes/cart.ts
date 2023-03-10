import { Router } from "express";
import {
  addCart,
  deleteCart,
  getAllCart,
  getCart,
  updateCart,
} from "../controllers/cart";

const router = Router();

router.route("/").post(addCart).get(getAllCart);
router.route("/getCart/:id").get(getCart);
router.route("/updateCart/:id").post(updateCart);
router.route("/deleteCart/:id").delete(deleteCart);
export default router;
