import { Schema, model } from "mongoose";

interface IPivot {
  housingId: Schema.Types.ObjectId;
  facilitiesId: Schema.Types.ObjectId;
}

const pivotSchema = new Schema<IPivot>(
  {
    housingId: { type: Schema.Types.ObjectId, ref: "Housing", required: true },
    facilitiesId: { type: Schema.Types.ObjectId, ref: "Facilities", required: true },
  },
  { timestamps: true , versionKey: false }
);

// prevent duplicate links
pivotSchema.index({ housingId: 1, facilitiesId: 1 }, { unique: true });

export const PivotModel = model<IPivot>("Pivot", pivotSchema);
