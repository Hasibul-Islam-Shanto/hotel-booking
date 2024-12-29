import z from "zod";

export const hotelSchema = z.object({
  propertyName: z.string().min(3, "Property name is required!"),
  propertyLocation: z.string().min(3, "Property location is required!"),
  images1: z.string().min(3, "Image 1 is required!"),
  images2: z.string().min(3, "Image 2 is required!"),
  images3: z.string().min(3, "Image 3 is required!"),
  images4: z.string().min(3, "Image 4 is required!"),
  images5: z.string().min(3, "Image 5 is required!"),
  pricePerNight: z.string(),
  rooms: z.string(),
  guests: z.string(),
  bedrooms: z.string(),
  beds: z.string(),
  description: z.string().min(5, "Description is required!"),
  facilities: z.record(z.boolean()),
});

export type Hotel = z.infer<typeof hotelSchema>;
