import { Router } from "express";
import * as domesticController from "../controllers/domestic";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router
  .route("/")
  .post(checkRole, domesticController.addDomestic)
  .get(checkRole, domesticController.getAllDomestic);
router.route("/getDomestic/:id").get(checkRole, domesticController.getDomestic);
router
  .route("/updateDomestic/:id")
  .patch(checkRole, domesticController.updateDomestic);
router
  .route("/deleteDomestic/:id")
  .delete(checkRole, domesticController.deleteDomestic);

export default router;
