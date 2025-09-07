import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { FacilitiesControllers } from "./facilities .controller";
// import { createFacilitiesZodSchema, updateFacilitiesZodSchema } from "./facilities.validation";

const router = Router();

router.post(
  "/create-facilities",
  checkAuth(Role.ADMIN),
  // validateRequest(createFacilitiesZodSchema),
  FacilitiesControllers.createFacilities
);

router.get(
  "/get-single-facilities/:id",
  checkAuth(Role.ADMIN),
  FacilitiesControllers.getSingleFacilities
);

router.get(
  "/get-all-facilities",
  checkAuth(Role.ADMIN),
  FacilitiesControllers.getAllFacilities
);

router.patch(
  "/update-facilities/:id",
  checkAuth(Role.ADMIN),
  // validateRequest(updateFacilitiesZodSchema),
  FacilitiesControllers.updateFacilities
);

router.delete(
  "/delete-facilities/:id",
  checkAuth(Role.ADMIN),
  FacilitiesControllers.deleteFacilities
);

export const FacilitiesRoutes = router;
