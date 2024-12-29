import {Model, model, models, Schema, Document} from "mongoose";


export interface User extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profileImage: {type: String, required: false}
}, {timestamps: true});

const User = models.User as Model<User> || model<User>("User", userSchema);

export default User;