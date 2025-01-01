import z from "zod";

export const paymentSchema = z.object({
  checkInDate: z.date(),
  checkoutDate: z.date(),
  guests: z.number(),
  cardNumber: z.string(),
  totalCosts: z.number().optional(),
  user: z.string(),
  hotel: z.string(),
  status: z.enum(["pending", "completed"]),
  expiration: z.string(),
  cvv: z.string(),
  streetAddress: z.string(),
  createdAt: z.date().optional(),
  apt: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
