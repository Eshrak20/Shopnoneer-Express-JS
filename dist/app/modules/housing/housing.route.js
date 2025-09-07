"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const housing_controller_1 = require("./housing.controller");
// import { createHousingZodSchema, updateHousingZodSchema } from "./housing.validation";
const router = (0, express_1.Router)();
router.post("/create-housing", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(createHousingZodSchema),
housing_controller_1.HousingControllers.createHousingWithFacilities);
router.get("/get-single-housing/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), housing_controller_1.HousingControllers.getSingleHousing);
router.get("/get-all-housing", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), housing_controller_1.HousingControllers.getAllHousing);
router.patch("/update-housing/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(updateHousingZodSchema),
housing_controller_1.HousingControllers.updateHousing);
router.delete("/delete-housing/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), housing_controller_1.HousingControllers.deleteHousing);
exports.HousingRoutes = router;
