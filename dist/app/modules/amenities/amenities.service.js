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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const amenities_model_1 = require("./amenities.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const project_model_1 = require("../projects/project.model");
const createAmenity = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload;
    // optional duplicate check
    const exist = yield amenities_model_1.AmenitiesModel.findOne({ name });
    if (exist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Amenity already exists.");
    }
    const amenity = yield amenities_model_1.AmenitiesModel.create(payload);
    return amenity;
});
const updateAmenity = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const amenity = yield amenities_model_1.AmenitiesModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!amenity) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Amenity not found");
    }
    return amenity;
});
const deleteAmenity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // remove amenity
    const amenity = yield amenities_model_1.AmenitiesModel.findByIdAndDelete(id);
    if (!amenity) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Amenity not found");
    }
    // remove references from projects if project stores amenities array
    yield project_model_1.ProjectModel.updateMany({ amenities: id }, { $pull: { amenities: id } });
    return amenity;
});
const getAllAmenities = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = amenities_model_1.AmenitiesModel.find();
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["name", "nameBn"])
        .filter()
        .sort()
        .fields()
        .paginate();
    const amenities = yield userQuery.build();
    const meta = yield queryBuilder.getMeta();
    // attach projects referencing each amenity (convenience)
    const amenitiesWithProjects = yield Promise.all(amenities.map((amenity) => __awaiter(void 0, void 0, void 0, function* () {
        const projects = yield project_model_1.ProjectModel.find({ amenities: amenity._id })
            .select("name nameBn division district upazila housing totalPrice ratePerSqr")
            .populate("division", "name")
            .populate("district", "name")
            .populate("upazila", "name")
            .populate("housing", "name")
            .lean();
        return Object.assign(Object.assign({}, amenity.toObject()), { projects });
    })));
    return { data: amenitiesWithProjects, meta };
});
const getSingleAmenity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const amenity = yield amenities_model_1.AmenitiesModel.findById(id);
    if (!amenity) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Amenity not found");
    }
    const projects = yield project_model_1.ProjectModel.find({ amenities: amenity._id })
        .select("name nameBn division district upazila housing totalPrice ratePerSqr")
        .populate("division", "name")
        .populate("district", "name")
        .populate("upazila", "name")
        .populate("housing", "name")
        .lean();
    return Object.assign(Object.assign({}, amenity.toObject()), { projects });
});
exports.AmenitiesService = {
    createAmenity,
    updateAmenity,
    deleteAmenity,
    getAllAmenities,
    getSingleAmenity,
};
