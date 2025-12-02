import express, { NextFunction, Request, Response } from "express";
import { travelPlanController } from "./travelPlan.controller";


const router = express.Router();

router.post("/create", travelPlanController.createPlan)

export const travelPlanRoutes = router;
