import { Types, Document, Schema, models, Model, model } from "mongoose";
import { Hotel } from "@/model/hotelModel";
import { IUser } from "./userModel";

export interface Payment extends Document {
  checkInDate: Date;
  checkoutDate: Date;
  guests: number;
  cardNumber?: string;
  totalCosts?: number;
  address?: string;
  city?: string;
  zipCode?: string;
  user: Types.ObjectId | IUser;
  hotel: Types.ObjectId | Hotel;
  status: "pending" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<Payment>(
  {
    checkInDate: { type: Date, required: true },
    checkoutDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    cardNumber: { type: String, required: false },
    totalCosts: { type: Number, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    zipCode: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment =
  (models.Payment as Model<Payment>) ||
  model<Payment>("Payment", paymentSchema);

export default Payment;
