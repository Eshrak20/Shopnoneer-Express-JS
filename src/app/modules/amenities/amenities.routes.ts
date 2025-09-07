import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AmenitiesController } from "./amenities.controller";
// import { createAmenitiesValidation } from "./amenities.validation";
// import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// Create Amenity
router.post(
  "/create-amenity",
  checkAuth(Role.ADMIN),
  // validateRequest(createAmenitiesValidation),
  AmenitiesController.createAmenity
);

// Get all Amenities
router.get(
  "/get-all-amenities",
  checkAuth(Role.ADMIN),
  AmenitiesController.getAllAmenities
);

// Get single Amenity
router.get(
  "/get-single-amenity/:id",
  checkAuth(Role.ADMIN),
  AmenitiesController.getSingleAmenity
);

// Update Amenity
router.patch(
  "/update-amenity/:id",
  checkAuth(Role.ADMIN),
  // validateRequest(updateAmenitiesValidation),
  AmenitiesController.updateAmenity
);

// Delete Amenity
router.delete(
  "/delete-amenity/:id",
  checkAuth(Role.ADMIN),
  AmenitiesController.deleteAmenity
);

export const AmenitiesRoutes = router;
