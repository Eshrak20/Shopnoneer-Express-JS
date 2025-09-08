import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { HousingControllers } from "./housing.controller";
// import { createHousingZodSchema, updateHousingZodSchema } from "./housing.validation";

const router = Router();

router.post(
  "/create-housing",
  checkAuth(Role.ADMIN),
  // validateRequest(createHousingZodSchema),
  HousingControllers.createHousingWithFacilities
);

router.get(
  "/get-single-housing/:id",
  checkAuth(Role.ADMIN),
  HousingControllers.getSingleHousing
);

router.get(
  "/get-all-housing",
  checkAuth(Role.ADMIN,Role.USER),
  HousingControllers.getAllHousing
);

router.patch(
  "/update-housing/:id",
  checkAuth(Role.ADMIN),
  // validateRequest(updateHousingZodSchema),
  HousingControllers.updateHousing
);

router.delete(
  "/delete-housing/:id",
  checkAuth(Role.ADMIN),
  HousingControllers.deleteHousing
);

export const HousingRoutes = router;
