import Hotel from "@/types/hotel";

export const updateHotelDetails = async (
  id: string | undefined,
  data: Hotel
) => {
  const response = await fetch(`http://localhost:3000/api/hotels/${id}/edit`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};

export const initiatePayment = async (data: {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  hotel: string | undefined;
}) => {
  const response = await fetch("/api/hotels/payment/initiate", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};
