import express from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/enums";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/me", authController.getMe);

router.post("/login", authController.login);

router.post(
  "/change-password",auth(Role.ADMIN, Role.USER), authController.changePassword
);

router.post("/logout", authController.logOut);

export const authRoutes = router;
