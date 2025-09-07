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
exports.FacilitiesServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const facilities_model_1 = require("./facilities.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const pivot_model_1 = require("../pivot/pivot.model"); // make sure path is correct
const createFacilities = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, upazila, district, division } = payload;
    // optional duplicate check
    const isExist = yield facilities_model_1.FacilitiesModel.findOne({ name, upazila, district, division });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Facility already exists.");
    }
    const facilities = yield facilities_model_1.FacilitiesModel.create(payload);
    return facilities;
});
const updateFacilities = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facilities_model_1.FacilitiesModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!facility) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Facility not found");
    }
    return facility;
});
const deleteFacilities = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facilities_model_1.FacilitiesModel.findByIdAndDelete(id);
    if (!facility) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Facility not found");
    }
    return facility;
});
const getAllFacilities = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = facilities_model_1.FacilitiesModel.find()
        .populate("upazila", "name nameBn")
        .populate("district", "name nameBn code")
        .populate("division", "name nameBn code");
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["name", "nameBn"])
        .filter()
        .sort()
        .fields()
        .paginate();
    const facilities = yield userQuery.build();
    const meta = yield queryBuilder.getMeta();
    // attach housings via pivot
    const facilitiesWithHousing = yield Promise.all(facilities.map((facility) => __awaiter(void 0, void 0, void 0, function* () {
        const pivots = yield pivot_model_1.PivotModel.find({ facilitiesId: facility._id }).populate("housingId", "name nameBn");
        const housings = pivots.map(p => p.housingId);
        return Object.assign(Object.assign({}, facility.toObject()), { housings });
    })));
    return { data: facilitiesWithHousing, meta };
});
const getSingleFacilities = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facilities_model_1.FacilitiesModel.findById(id)
        .populate("upazila", "name nameBn")
        .populate("district", "name nameBn code")
        .populate("division", "name nameBn code");
    if (!facility) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Facility not found");
    }
    const pivots = yield pivot_model_1.PivotModel.find({ facilitiesId: facility._id }).populate("housingId", "name nameBn");
    const housings = pivots.map(p => p.housingId);
    return Object.assign(Object.assign({}, facility.toObject()), { housings });
});
exports.FacilitiesServices = {
    createFacilities,
    updateFacilities,
    deleteFacilities,
    getAllFacilities,
    getSingleFacilities,
};
