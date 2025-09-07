"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const project_controller_1 = require("./project.controller");
const multer_config_1 = require("../../config/multer.config");
// import { createProjectValidation } from "./project.validation";
// import validateRequest from "../../middlewares/validateRequest";
const router = (0, express_1.Router)();
// Create Project (with amenities)
router.post("/create-project", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(createProjectValidation),
project_controller_1.ProjectController.createProject);
// Upload Project Images (multiple files)
router.post("/:projectId/add-images", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), multer_config_1.multerUpload.array("files", 10), // 'files' key for multiple images
project_controller_1.ProjectController.addProjectImages);
// Get all Projects
router.get("/get-all-projects", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), project_controller_1.ProjectController.getAllProjects);
// Get single Project
router.get("/get-single-project/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), project_controller_1.ProjectController.getSingleProject);
// Update Project
router.patch("/update-project/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), 
// validateRequest(updateProjectValidation),
project_controller_1.ProjectController.updateProject);
// Delete Project
router.delete("/delete-project/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), project_controller_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;
