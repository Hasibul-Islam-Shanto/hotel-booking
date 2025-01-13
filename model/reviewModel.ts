import mongoose, { Schema, Types, Document } from "mongoose";
import { IUser } from "@/model/userModel";
import { IHotel } from "@/model/hotelModel";

export interface IReview extends Document {
  user: Types.ObjectId | IUser;
  hotel: Types.ObjectId | IHotel;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
