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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("./user.interface");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("./user.model");
const env_1 = require("../../config/env");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role = "USER" } = payload, rest = __rest(payload, ["email", "password", "role"]);
    if (!email || !password) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Email and password are required.");
    }
    const isUserExist = yield user_model_1.UserModel.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User already exists.");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND) || 10);
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.UserModel.create(Object.assign({ email, password: hashedPassword, role, auths: [authProvider], isActive: "ACTIVE", isVerified: true }, rest));
    return user;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.UserModel.findById(userId);
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.MODERATOR) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
        if (payload.role === user_interface_1.Role.ADMIN && decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are Already an Admin");
        }
    }
    if (payload.isActive || payload.isVerified) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.MODERATOR) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.password) {
        const salt = yield bcryptjs_1.default.genSalt(Number(env_1.envVars.BCRYPT_SALT_ROUND));
        payload.password = yield bcryptjs_1.default.hash(payload.password, salt);
    }
    const newUpdatedUser = yield user_model_1.UserModel.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const updateUserProfileImage = (userId, profilePhoto) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.UserModel.findById(userId);
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    const newUpdatedUser = yield user_model_1.UserModel.findByIdAndUpdate(userId, { profilePhoto }, {
        new: true,
        runValidators: true,
    });
    if (profilePhoto && ifUserExist.profilePhoto) {
        yield (0, cloudinary_config_1.deleteImageFromCLoudinary)(ifUserExist.profilePhoto);
    }
    return newUpdatedUser;
});
const updateUserRoleAndStatus = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield user_model_1.UserModel.findById(userId);
    if (!ifUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    if (ifUserExist.isActive === "BLOCKED") {
        const isOnlyStatusUpdate = Object.keys(payload).length === 1 && "isActive" in payload;
        if (!isOnlyStatusUpdate) {
            throw new AppError_1.default(403, "Blocked user can only be updated to change status.");
        }
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.MODERATOR) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
        if (payload.role === user_interface_1.Role.ADMIN && decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are Already an Admin");
        }
    }
    if (payload.password) {
        const salt = yield bcryptjs_1.default.genSalt(Number(env_1.envVars.BCRYPT_SALT_ROUND));
        payload.password = yield bcryptjs_1.default.hash(payload.password, salt);
    }
    const newUpdatedUser = yield user_model_1.UserModel.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return { data: user };
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = user_model_1.UserModel.find({ role: user_interface_1.Role.USER });
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["phone", "email", "address"]) // only string fields
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
const getAllAgents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = user_model_1.UserModel.find({ role: user_interface_1.Role.MODERATOR });
    const queryBuilder = new QueryBuilder_1.QueryBuilder(baseQuery, query);
    const userQuery = queryBuilder
        .search(["phone", "email", "_id", "address", "isActive", "isVerified"])
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
exports.UserServices = {
    createUser,
    updateUser,
    updateUserRoleAndStatus,
    updateUserProfileImage,
    getAllUsers,
    getAllAgents,
    myProfile,
};
