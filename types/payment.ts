import Hotel from "./hotel";
import User from "./user";

export type Payment = {
  _id?: string;
  checkInDate: Date;
  checkoutDate: Date;
  guests: number;
  cardNumber?: string;
  totalCosts?: number;
  user: User;
  hotel: Hotel;
  status: "pending" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
  address?: string;
  city?: string;
  zipCode?: string;
};

export type FormattedPayment = {
  _id?: string;
  checkInDate: Date;
  checkoutDate: Date;
  guests: number;
  cardNumber?: string;
  totalCosts?: number;
  user: string;
  hotel: string;
  status: string;
  address?: string;
  city?: string;
  zipCode?: string;
};
