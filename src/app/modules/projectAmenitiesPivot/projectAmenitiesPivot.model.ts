import { Schema, model } from "mongoose";

interface IProjectAmenitiesPivot {
  projectId: Schema.Types.ObjectId;
  amenitiesId: Schema.Types.ObjectId;
}

const projectAmenitiesPivotSchema = new Schema<IProjectAmenitiesPivot>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    amenitiesId: { type: Schema.Types.ObjectId, ref: "Amenities", required: true },
  },
  { timestamps: true ,versionKey: false}
);

// prevent duplicate project–amenity links
projectAmenitiesPivotSchema.index({ projectId: 1, amenitiesId: 1 }, { unique: true });


export const ProjectAmenitiesPivotModel = model<IProjectAmenitiesPivot>(
  "ProjectAmenitiesPivot",
  projectAmenitiesPivotSchema
);
