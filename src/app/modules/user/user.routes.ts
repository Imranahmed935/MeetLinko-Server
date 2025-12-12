import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../helper/imageUpload";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUserSchema.parse(JSON.parse(req.body.user));
    return userController.createUser(req, res, next);
  }
);

router.get("/", userController.getAllUsers)
// router.get("/:id", userController.getAllUsers)
router.get("/:id", userController.userGetById)

router.patch(
  "/:id",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUserSchema.parse(JSON.parse(req.body.user));
    return userController.updateUser(req, res, next);
  }
);

export const userRoutes = router;
