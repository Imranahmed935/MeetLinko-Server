import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../helper/imageUpload";
import { UserValidation } from "./user.validation";
import { prisma } from "../../shared/prisma";

const router = express.Router();

router.post(
  "/register",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUserSchema.parse(JSON.parse(req.body.user));
    return userController.createUser(req, res, next);
  }
);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userGetById);
router.get("/top", userController.getTopTraveler);

router.patch(
  "/update/:id",
  fileUploader.upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      let payload: any = {};
      if (req.body.user) {
        payload = JSON.parse(req.body.user as string);
      }

      if (req.file) {
        const uploadResult = await fileUploader.uploadCloudinary(req.file);
        payload.profileImage = uploadResult?.secure_url;
      }

      // Set defaults to avoid Prisma errors
      if (!payload.fullName) payload.fullName = undefined;
      if (!payload.bio) payload.bio = undefined;
      if (!payload.currentLocation) payload.currentLocation = undefined;
      if (!Array.isArray(payload.travelInterests)) payload.travelInterests = [];
      if (!Array.isArray(payload.visitedCountries)) payload.visitedCountries = [];

      const updatedUser = await prisma.user.update({
        where: { id: req.params.id },
        data: payload,
      });

      return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully!",
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "Invalid form data or server error",
        error,
      });
    }
  }
);


export const userRoutes = router;
