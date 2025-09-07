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
exports.HousingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const housing_model_1 = require("./housing.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const pivot_model_1 = require("../pivot/pivot.model");
const createHousingWithFacilities = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Create housing
    const housing = yield housing_model_1.HousingModel.create({
        name: payload.name,
        nameBn: payload.nameBn,
        upazila: payload.upazila,
        district: payload.district,
        division: payload.division,
        latitude: payload.latitude,
        longitude: payload.longitude,
        location: payload.location,
    });
    // 2. Insert pivot records for selected facilities
    if (payload.facilityIds && payload.facilityIds.length > 0) {
        const pivotDocs = payload.facilityIds.map((fid) => ({
            housingId: housing._id,
            facilitiesId: fid,
        }));
        yield pivot_model_1.PivotModel.insertMany(pivotDocs);
    }
    return housing;
});
const updateHousing = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const housing = yield housing_model_1.HousingModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!housing) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Housing not found");
    }
    return housing;
});
const deleteHousing = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const housing = yield housing_model_1.HousingModel.findByIdAndDelete(id);
    if (!housing) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Housing not found");
    }
    // also delete pivot relations
    yield pivot_model_1.PivotModel.deleteMany({ housingId: id });
    return housing;
});
const getAllHousing = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Base query for housings
    const baseQuery = housing_model_1.HousingModel.find()
        .populate("upazila", "name nameBn")
        .populate("district", "name nameBn code")
        .populate("division", "name nameBn code");
    // 2. Apply search, filter, sort, paginate
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["name", "nameBn"])
        .filter()
        .sort()
        .fields()
        .paginate();
    // 3. Execute query
    const housings = yield userQuery.build();
    const meta = yield queryBuilder.getMeta();
    // 4. Fetch facilities for each housing via pivot
    const housingWithFacilities = yield Promise.all(housings.map((housing) => __awaiter(void 0, void 0, void 0, function* () {
        const pivots = yield pivot_model_1.PivotModel.find({ housingId: housing._id }).populate("facilitiesId", "name type");
        const facilities = pivots.map(p => p.facilitiesId);
        return Object.assign(Object.assign({}, housing.toObject()), { facilities });
    })));
    return { data: housingWithFacilities, meta };
});
const getSingleHousing = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get housing info
    const housing = yield housing_model_1.HousingModel.findById(id)
        .populate("upazila", "name nameBn")
        .populate("district", "name nameBn code")
        .populate("division", "name nameBn code");
    if (!housing) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Housing not found");
    }
    // 2. Get facilities via pivot table
    const pivots = yield pivot_model_1.PivotModel.find({ housingId: id }).populate("facilitiesId", "name type");
    // 3. Extract facilities
    const facilities = pivots.map(p => p.facilitiesId);
    return Object.assign(Object.assign({}, housing.toObject()), { facilities });
});
exports.HousingServices = {
    createHousingWithFacilities,
    updateHousing,
    deleteHousing,
    getAllHousing,
    getSingleHousing,
};
