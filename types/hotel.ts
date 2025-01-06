import User from "./user";

type Hotel = {
  _id?: string;
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
  user: User;
  averageRating?: number;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
};
export default Hotel;

export type HotelWithoutUser = Omit<Hotel, "user">;
