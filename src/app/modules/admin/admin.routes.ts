import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/enums";

const router = express.Router();

router.get("/users", auth(Role.ADMIN, Role.USER), adminController.getAllUser);
router.get(
  "/travelPlans",
  auth(Role.ADMIN, Role.USER),
  adminController.getAllTravelPlan
);
router.get(
  "/allReviews",
  auth(Role.ADMIN, Role.USER),
  adminController.getAllReview
);
router.get("/:id", auth(Role.ADMIN, Role.USER), adminController.getUserById);

router.delete("/:id", auth(Role.ADMIN), adminController.deleteUserById);
router.delete("/soft/:id", auth(Role.ADMIN), adminController.softDelete);

router.get("/plan/:id", auth(Role.ADMIN), adminController.getPlanById);
router.delete("/plan/:id", auth(Role.ADMIN), adminController.deletePlanById);

export const adminRoutes = router;
