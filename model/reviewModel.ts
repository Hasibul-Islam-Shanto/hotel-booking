import { Schema, Types, models, Model, model, Document } from "mongoose";
import { User } from "@/model/userModel";
import { Hotel } from "@/model/hotelModel";

export interface Review extends Document {
  user: Types.ObjectId | User;
  hotel: Types.ObjectId | Hotel;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<Review>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Review =
  (models.Review as Model<Review>) || model<Review>("Review", reviewSchema);

export default Review;
