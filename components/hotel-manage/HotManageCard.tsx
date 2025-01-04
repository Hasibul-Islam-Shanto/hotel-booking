import Hotel from "@/types/hotel";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaStar } from "react-icons/fa";
import HotelDeleteButton from "./HotelDeleteButton";

const HotManageCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <>
      <div className="overflow-hidden cursor-pointer">
        <div className="relative">
          <Image
            src={hotel?.images[0]}
            height={500}
            width={500}
            alt="Hotel Property"
            className="w-full h-48 object-cover rounded-md transition-all hover:scale-105"
          />
          <div className="absolute flex items-center gap-1 top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
            <FaStar className="text-yellow-500" />
            4.9
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            {hotel?.propertyName}
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-zinc-600">
              {hotel?.rooms} Rooms Available
            </span>
            <span className="text-rose-600 font-semibold">
              ${hotel?.pricePerNight}/night
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">{hotel?.propertyLocation}</span>
            <div className="flex items-center gap-4">
              <Link
                href={`/hotels/${hotel?._id}/edit`}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEdit />
              </Link>
              <HotelDeleteButton id={hotel?._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotManageCard;
