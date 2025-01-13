import Hotel from "@/types/hotel";
import { Pagination } from "@/types/pagination";
import { Payment } from "@/types/payment";
import Review from "@/types/reviews";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
interface HotelsResponse {
  status: number;
  hotels: Hotel[];
  pagination: Pagination;
}
export const fetchHotels = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<HotelsResponse> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/hotels/get?page=${page}&limit=${limit}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    if (res.status !== 200) {
      throw new Error(res.message || "Failed to fetch hotels!");
    }
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch hotels!"
    );
  }
};

interface HotelResponse {
  status: number;
  hotel: Hotel;
}
export const fetchHotel = async (id: string): Promise<HotelResponse> => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/hotels/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    if (res.status !== 200) {
      throw new Error(res.message || "Failed to fetch hotel!");
    }
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch hotel!"
    );
  }
};

export const fetchOwnerHotels = async (
  email: string,
  page: number,
  limit: number
): Promise<HotelsResponse> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/hotels/owner-hotels?email=${email}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();

    if (res.status !== 200) {
      throw new Error(res.message || "Failed to fetch owner hotels!");
    }
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch owner hotels!"
    );
  }
};

export const fetchPayment = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/api/hotels/payment/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const res = await response.json();
  return res;
};

interface BookingsResponse {
  status: number;
  bookings: Payment[];
  pagination: Pagination;
}
export const fetchBookings = async (
  email: string | null,
  page: number,
  limit: number
): Promise<BookingsResponse> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/hotels/payment/owned-payment?email=${email}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    if (res.status !== 200) {
      throw new Error(res.message || "Failed to fetch bookings!");
    }
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch bookings!"
    );
  }
};

interface ReviewsResponse {
  status: number;
  reviews: Review[];
}
export const fetchReviews = async (
  id: string | undefined
): Promise<ReviewsResponse> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/hotels/review/get?hotelId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const res = await response.json();
    if (res.status !== 200) {
      throw new Error(res.message || "Failed to fetch reviews!");
    }
    return res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch reviews!"
    );
  }
};
