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

export const formattedDate = (date: Date | undefined) => {
  const givenDate = new Date(date!);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    givenDate
  );
  return formattedDate;
};

export const calculateDays = (date1: Date, date2: Date) => {
  const givenDate1 = new Date(date1);
  const givenDate2 = new Date(date2);
  const differenceInTime = givenDate2.getTime() - givenDate1.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};
