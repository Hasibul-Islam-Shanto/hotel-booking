import User from "./user";

type Review = {
  _id: string;
  user: User;
  hotel: string;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Review;
