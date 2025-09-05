"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionModel = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../user/user.interface");
const divisionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nameBn: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.DivisionModel = (0, mongoose_1.model)("Division", divisionSchema);
