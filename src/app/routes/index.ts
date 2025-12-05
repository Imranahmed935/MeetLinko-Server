import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { travelPlanRoutes } from "../modules/travelPlan/travelPlan.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/plan",
    route: travelPlanRoutes,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
