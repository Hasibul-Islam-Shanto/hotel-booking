import Hotel from "./hotel";

export type Payment = {
  _id?: string;
  checkInDate: Date;
  checkoutDate: Date;
  guests: number;
  cardNumber?: string;
  totalCosts?: number;
  user: string;
  hotel: string | Hotel;
  status: "pending" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
};
