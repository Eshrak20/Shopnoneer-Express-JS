"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const project_model_1 = require("./project.model");
const amenities_model_1 = require("../amenities/amenities.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const projectAmenitiesPivot_model_1 = require("../projectAmenitiesPivot/projectAmenitiesPivot.model");
const createProjectWithAmenities = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amenities } = payload, projectData = __rest(payload, ["amenities"]);
    // Filter out null/invalid IDs
    const validAmenityIds = (amenities === null || amenities === void 0 ? void 0 : amenities.filter(aid => aid != null)) || [];
    if (validAmenityIds.length > 0) {
        const count = yield amenities_model_1.AmenitiesModel.countDocuments({ _id: { $in: validAmenityIds } });
        if (count !== validAmenityIds.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Some amenities not found");
        }
    }
    // Create project
    const project = yield project_model_1.ProjectModel.create(projectData);
    // Create pivot records
    if (validAmenityIds.length > 0) {
        const pivotDocs = validAmenityIds.map(aid => ({
            projectId: project._id,
            amenitiesId: aid,
        }));
        console.log("Pivot docs:", pivotDocs); // <--- DEBUG
        yield projectAmenitiesPivot_model_1.ProjectAmenitiesPivotModel.insertMany(pivotDocs, { ordered: false });
    }
    // Fetch all linked amenities via pivot
    const pivotRecords = yield projectAmenitiesPivot_model_1.ProjectAmenitiesPivotModel.find({ projectId: project._id });
    const amenityIds = pivotRecords.map(p => p.amenitiesId);
    const linkedAmenities = yield amenities_model_1.AmenitiesModel.find({ _id: { $in: amenityIds } })
        .select("name nameBn iconWeb iconAndroid iconIos");
    return Object.assign(Object.assign({}, project.toObject()), { amenities: linkedAmenities });
});
const addProjectImages = (projectId, newImages // array of image URLs/paths
) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.ProjectModel.findById(projectId);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found");
    }
    // Append new images to existing ones
    project.projectImages = [...(project.projectImages || []), ...newImages];
    yield project.save();
    return project;
});
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return project_model_1.ProjectModel.find()
        .populate("division", "name nameBn")
        .populate("district", "name nameBn")
        .populate("upazila", "name nameBn")
        .populate("housing", "name")
        .populate("amenities", "name nameBn iconWeb");
});
const getSingleProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get the project
    const project = yield project_model_1.ProjectModel.findById(projectId)
        .populate("division", "name nameBn")
        .populate("district", "name nameBn")
        .populate("upazila", "name nameBn")
        .populate("housing", "name");
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found");
    }
    // 2. Get amenities via pivot
    const pivotRecords = yield projectAmenitiesPivot_model_1.ProjectAmenitiesPivotModel.find({ projectId });
    const amenityIds = pivotRecords.map(p => p.amenitiesId);
    const amenities = yield amenities_model_1.AmenitiesModel.find({ _id: { $in: amenityIds } })
        .select("name nameBn iconWeb iconAndroid iconIos");
    // 3. Attach amenities to project object
    return Object.assign(Object.assign({}, project.toObject()), { amenities });
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // optional: validate amenities if provided
    if (payload.amenities && payload.amenities.length > 0) {
        const count = yield amenities_model_1.AmenitiesModel.countDocuments({
            _id: { $in: payload.amenities },
        });
        if (count !== payload.amenities.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Some amenities not found");
        }
    }
    const project = yield project_model_1.ProjectModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("division", "name nameBn")
        .populate("district", "name nameBn")
        .populate("upazila", "name nameBn")
        .populate("housing", "name")
        .populate("amenities", "name nameBn iconWeb");
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found");
    }
    return project;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.ProjectModel.findByIdAndDelete(id);
    if (!project) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found");
    }
    return project;
});
exports.ProjectService = {
    createProjectWithAmenities,
    addProjectImages,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
