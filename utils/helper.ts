import { Hotel } from "@/schemas/hotel";

export const formattedDataForHotel = (data: Hotel) => {
  const images = [
    data.images1,
    data.images2,
    data.images3,
    data.images4,
    data.images5,
  ];
  const facilities = Object.keys(data.facilities).filter(
    (key) => data.facilities[key]
  );
  const formattedData = {
    propertyName: data.propertyName,
    propertyLocation: data.propertyLocation,
    images: images,
    pricePerNight: Number(data.pricePerNight),
    rooms: Number(data.rooms),
    guests: Number(data.guests),
    bedrooms: Number(data.bedrooms),
    beds: Number(data.beds),
    description: data.description,
    facilities: facilities,
  };
  return formattedData;
};
