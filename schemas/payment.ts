import z from "zod";

export const paymentSchema = z.object({
  checkInDate: z.date(),
  checkoutDate: z.date(),
  guests: z.number(),
  cardNumber: z.string().min(5, "Card number is too short"),
  totalCosts: z.number().optional(),
  user: z.string(),
  hotel: z.string(),
  status: z.enum(["pending", "completed"]),
  expiration: z.string().min(1, "Expiration is required!"),
  cvv: z.string().min(3, "CVV is required!"),
  streetAddress: z.string().min(5, "Street address is required!"),
  createdAt: z.date().optional(),
  apt: z.string().min(1, "Apt is required!"),
  city: z.string().min(1, "City is required!"),
  state: z.string().min(1, "State is required!"),
  zipCode: z.string().min(1, "ZIP code is required!"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
