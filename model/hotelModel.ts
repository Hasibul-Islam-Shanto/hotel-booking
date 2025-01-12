import { Model, model, models, Schema, Types, Document } from "mongoose";

export interface Hotel extends Document {
  propertyName: string;
  propertyLocation: string;
  images: string[];
  pricePerNight: number;
  rooms: number;
  guests: number;
  bedrooms: number;
  beds: number;
  description: string;
  facilities: string[];
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const hotelSchema = new Schema<Hotel>({
  propertyName: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  images: [{ type: String }],
  pricePerNight: { type: Number, required: true },
  rooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  description: { type: String, required: true },
  facilities: [{ type: String }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Hotel =
  (models.Hotel as Model<Hotel>) || model<Hotel>("Hotel", hotelSchema);

export default Hotel;
