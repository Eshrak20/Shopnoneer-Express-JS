import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { UpazilaControllers } from "./upazila.controller";
import { createUpazilaZodSchema, updateUpazilaZodSchema } from "./upazila.validation";

const router = Router();

router.post(
  "/create-upazila",
  checkAuth(Role.ADMIN),
  validateRequest(createUpazilaZodSchema),
  UpazilaControllers.createUpazila
);

router.get(
  "/get-upazila",
  checkAuth(Role.ADMIN),
  UpazilaControllers.getSingleUpazila
);

router.get(
  "/get-all-upazila",
  checkAuth(Role.ADMIN),
  UpazilaControllers.getAllUpazila
);

router.patch(
  "/",
  validateRequest(updateUpazilaZodSchema),
  checkAuth(Role.ADMIN),
  UpazilaControllers.updateUpazila
);

export const UpazilaRoutes = router;
