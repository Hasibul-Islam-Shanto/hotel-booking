import { revalidatePath } from "next/cache";

export const fetchHotels = async () => {
  const response = await fetch("http://localhost:3000/api/hotels/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
    }
  );
  const res = await response.json();
  return res;
};
