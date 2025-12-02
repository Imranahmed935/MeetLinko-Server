import express from "express";
import { travelPlanController } from "./travelPlan.controller";


const router = express.Router();

router.get("/", travelPlanController.getAllTravelPlan)
router.get("/:id", travelPlanController.getTravelPlanById)
router.post("/create", travelPlanController.createPlan)
router.patch("/:id", travelPlanController.updatePlan)
router.delete("/:id", travelPlanController.deletePlan)


export const travelPlanRoutes = router;
