import { revalidatePath } from "next/cache";

export const fetchHotels = async () => {
  const response = await fetch("http://localhost:3000/api/hotels/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const res = await response.json();
  revalidatePath("/");
  return res;
};

export const fetchHotel = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/hotels/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const res = await response.json();
  return res;
};

export const fetchOwnerHotels = async (email: string) => {
  const response = await fetch(
    `http://localhost:3000/api/hotels/owner-hotels?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const res = await response.json();
  return res;
};

export const fetchPayment = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/hotels/payment/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const res = await response.json();
  return res;
};

export const fetchBookings = async (email: string | null) => {
  const response = await fetch(
    `http://localhost:3000/api/hotels/payment/owned-payment?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const res = await response.json();
  return res;
};

export const fetchReviews = async (id: string | undefined) => {
  const response = await fetch(
    `http://localhost:3000/api/hotels/review/get?hotelId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const res = await response.json();
  return res;
};
