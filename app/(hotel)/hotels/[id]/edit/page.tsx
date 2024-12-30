import HotelEditForm from "@/components/hotel-manage/HotelEditForm";
import { fetchHotel } from "@/lib/api/fetch-api";

const EditHotelDetails = async ({ params }: { params: { id: string } }) => {
  const response = await fetchHotel(params.id);
  const hotel = response?.hotel;
  return (
    <>
      <HotelEditForm hotel={hotel} />
    </>
  );
};

export default EditHotelDetails;
