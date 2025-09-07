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
exports.DistrictServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const district_model_1 = require("./district.model");
const user_interface_1 = require("../user/user.interface");
const createDistrict = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, nameBn, code } = payload, rest = __rest(payload, ["name", "nameBn", "code"]);
    const isDistrictExist = yield district_model_1.DistrictModel.findOne({ code });
    if (isDistrictExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "District already exists.");
    }
    const district = yield district_model_1.DistrictModel.create(Object.assign({ name,
        nameBn,
        code }, rest));
    return district;
});
const updateDistrict = (code, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifDistrictExist = yield district_model_1.DistrictModel.findOne({ code });
    if (!ifDistrictExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "District Not Found");
    }
    if (decodedToken.role !== user_interface_1.Role.ADMIN) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Only Admin Can update district");
    }
    const updatedDistrict = yield district_model_1.DistrictModel.findOneAndUpdate({ code }, payload, { new: true, runValidators: true });
    return updatedDistrict;
});
const getAllDistrict = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = district_model_1.DistrictModel.find()
        .populate({
        path: "division",
        select: "name nameBn code",
    });
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["name", "nameBn", "code"])
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        userQuery.build(),
        queryBuilder.getMeta(),
    ]);
    return { data, meta };
});
const getSingleDistrict = (districtCode) => __awaiter(void 0, void 0, void 0, function* () {
    const district = yield district_model_1.DistrictModel.findOne({ code: districtCode });
    if (!district) {
        throw new Error("District not found");
    }
    return district;
});
exports.DistrictServices = {
    createDistrict,
    updateDistrict,
    getAllDistrict,
    getSingleDistrict,
};
