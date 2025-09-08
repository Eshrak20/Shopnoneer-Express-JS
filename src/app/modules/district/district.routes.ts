import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DistrictControllers } from "./district.controller";
import { createDistrictZodSchema, updateDistrictZodSchema } from "./district.validation";

const router = Router();

router.post(
  "/create-district",
  checkAuth(Role.ADMIN),
  validateRequest(createDistrictZodSchema),
  DistrictControllers.createDistrict
);

router.get(
  "/get-district",
  checkAuth(Role.ADMIN),
  DistrictControllers.getSingleDistrict
);

router.get(
  "/get-all-district",
  checkAuth(Role.ADMIN, Role.USER),
  DistrictControllers.getAllDistrict
);

router.patch(
  "/",
  validateRequest(updateDistrictZodSchema),
  checkAuth(Role.ADMIN),
  DistrictControllers.updateDistrict
);

export const DistrictRoutes = router;
