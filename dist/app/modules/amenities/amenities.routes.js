"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const amenities_controller_1 = require("./amenities.controller");
// import { createAmenitiesValidation } from "./amenities.validation";
// import validateRequest from "../../middlewares/validateRequest";
const router = (0, express_1.Router)();
// Create Amenity
router.post("/create-amenity", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(createAmenitiesValidation),
amenities_controller_1.AmenitiesController.createAmenity);
// Get all Amenities
router.get("/get-all-amenities", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), amenities_controller_1.AmenitiesController.getAllAmenities);
// Get single Amenity
router.get("/get-single-amenity/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), amenities_controller_1.AmenitiesController.getSingleAmenity);
// Update Amenity
router.patch("/update-amenity/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(updateAmenitiesValidation),
amenities_controller_1.AmenitiesController.updateAmenity);
// Delete Amenity
router.delete("/delete-amenity/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), amenities_controller_1.AmenitiesController.deleteAmenity);
exports.AmenitiesRoutes = router;
