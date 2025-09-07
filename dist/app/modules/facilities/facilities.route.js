"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const facilities__controller_1 = require("./facilities .controller");
// import { createFacilitiesZodSchema, updateFacilitiesZodSchema } from "./facilities.validation";
const router = (0, express_1.Router)();
router.post("/create-facilities", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(createFacilitiesZodSchema),
facilities__controller_1.FacilitiesControllers.createFacilities);
router.get("/get-single-facilities/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), facilities__controller_1.FacilitiesControllers.getSingleFacilities);
router.get("/get-all-facilities", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), facilities__controller_1.FacilitiesControllers.getAllFacilities);
router.patch("/update-facilities/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(updateFacilitiesZodSchema),
facilities__controller_1.FacilitiesControllers.updateFacilities);
router.delete("/delete-facilities/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), facilities__controller_1.FacilitiesControllers.deleteFacilities);
exports.FacilitiesRoutes = router;
