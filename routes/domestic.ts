import { Router } from "express";
import {
  addDomestic,
  deleteDomestic,
  getAllDomestic,
  getDomestic,
  updateDomestic,
} from "../controllers/domestic";

const router = Router();

router.route("/").post(addDomestic).get(getAllDomestic);
router.route("/getDomestic/:id").get(getDomestic);
router.route("/updateDomestic/:id").post(updateDomestic);
router.route("/deleteDomestic/:id").delete(deleteDomestic);
export default router;
