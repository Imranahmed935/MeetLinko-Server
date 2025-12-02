import express from "express";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post("/create", reviewController.createReview);

export const reviewRoutes = router;
