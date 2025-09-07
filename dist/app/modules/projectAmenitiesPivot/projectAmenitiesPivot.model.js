"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAmenitiesPivotModel = void 0;
const mongoose_1 = require("mongoose");
const projectAmenitiesPivotSchema = new mongoose_1.Schema({
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Project", required: true },
    amenitiesId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Amenities", required: true },
}, { timestamps: true, versionKey: false });
// prevent duplicate project–amenity links
projectAmenitiesPivotSchema.index({ projectId: 1, amenitiesId: 1 }, { unique: true });
exports.ProjectAmenitiesPivotModel = (0, mongoose_1.model)("ProjectAmenitiesPivot", projectAmenitiesPivotSchema);
