import { fetchHotel } from "@/lib/api/fetch-api";
import HotelDetailsContainer from "@/components/hotel/HotelDetailsContainer";
import ShowError from "@/components/ui/ShowError";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const response = await fetchHotel(params.id);
  const hotel = response.hotel;
  const imageUrl = hotel?.images[0];
  const title = hotel?.propertyName;
  const description = hotel?.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: `${SITE_URL}/hotels/${hotel?._id}`,
      siteName: "Hotel Booking",
    },
    twitter: {
      card: "summary_large_image",
      title: hotel?.propertyName,
      description: hotel?.description,
      images: [imageUrl],
      creator: "@hasibulislamshanto",
    },
  };
}

const HotelDetails = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await fetchHotel(params.id);
    const hotel = response.hotel;
    return <HotelDetailsContainer hotel={hotel} />;
  } catch (error) {
    return <ShowError error={error as Error} />;
  }
};

export default HotelDetails;
