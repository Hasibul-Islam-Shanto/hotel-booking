import {Types, Document, Schema, models, Model, model} from "mongoose";
import {User} from "@/model/userModel";
import {Hotel} from "@/model/hotelModel";

export interface Payment extends Document {
    checkInDate: Date;
    checkoutDate: Date;
    guests: number;
    cardNumber: string;
    totalCosts: number;
    user: Types.ObjectId | User;
    hotel: Types.ObjectId | Hotel;
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema = new Schema<Payment>({
    checkInDate: {type: Date, required: true},
    checkoutDate: {type: Date, required: true},
    guests: {type: Number, required: true},
    cardNumber: {type: String, required: true},
    totalCosts: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    hotel: {type: Schema.Types.ObjectId, ref: "Hotel", required: true}
}, {timestamps: true});

const Payment = models.Payment as Model<Payment> || model<Payment>("Payment", paymentSchema);