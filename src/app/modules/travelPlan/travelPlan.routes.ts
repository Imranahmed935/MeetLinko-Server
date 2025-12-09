import express from "express";
import { travelPlanController } from "./travelPlan.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/enums";

const router = express.Router();

router.get("/", travelPlanController.getAllTravelPlan);
router.get("/my-plan/:id", travelPlanController.getMyTravelPlan);
router.get("/:id", travelPlanController.getTravelPlanById);
router.post("/create", auth(Role.USER), travelPlanController.createPlan);
router.patch("/:id", auth(Role.USER), travelPlanController.updatePlan);
router.delete("/:id", auth(Role.USER), travelPlanController.deletePlan);

export const travelPlanRoutes = router;
