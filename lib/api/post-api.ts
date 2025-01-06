import { HotelWithoutUser } from "@/types/hotel";
import { FormattedPayment } from "@/types/payment";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const createHotel = async (data: HotelWithoutUser) => {
  const response = await fetch(`${apiBaseUrl}/api/hotels/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};

export const updateHotelDetails = async (
  id: string | undefined,
  data: HotelWithoutUser
) => {
  const response = await fetch(`${apiBaseUrl}/api/hotels/${id}/edit`, {
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
  const response = await fetch(`${apiBaseUrl}/api/hotels/payment/initiate`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};

export const updatePayment = async (
  id: string | undefined,
  data: FormattedPayment
) => {
  const response = await fetch(
    `${apiBaseUrl}/api/hotels/payment/complete/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res;
};

export const postReview = async (data: {
  rating: number;
  description: string;
  hotelId: string | undefined;
}) => {
  const response = await fetch(`${apiBaseUrl}/api/hotels/review/post`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};

export const deleteReview = async (id: string | undefined) => {
  const response = await fetch(
    `${apiBaseUrl}/api/hotels/review/delete?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  return res;
};

export const deleteHotel = async (id: string | undefined) => {
  const response = await fetch(`${apiBaseUrl}/api/hotels/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};
