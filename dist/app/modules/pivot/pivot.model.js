"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotModel = void 0;
const mongoose_1 = require("mongoose");
const pivotSchema = new mongoose_1.Schema({
    housingId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Housing", required: true },
    facilitiesId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Facilities", required: true },
}, { timestamps: true, versionKey: false });
// prevent duplicate links
pivotSchema.index({ housingId: 1, facilitiesId: 1 }, { unique: true });
exports.PivotModel = (0, mongoose_1.model)("Pivot", pivotSchema);
