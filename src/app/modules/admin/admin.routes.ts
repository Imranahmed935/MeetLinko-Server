import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated";

const router = express.Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUser)
router.get("/travelPlans", auth(Role.ADMIN), adminController.getAllTravelPlan)
router.get("/allReviews", auth(Role.ADMIN), adminController.getAllReview)



export const adminRoutes = router;