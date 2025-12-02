import express from "express";
import { travelPlanController } from "./travelPlan.controller";


const router = express.Router();

router.get("/", travelPlanController.getAllTravelPlan)
router.post("/create", travelPlanController.createPlan)

export const travelPlanRoutes = router;
