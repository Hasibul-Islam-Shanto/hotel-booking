"use client";
import { FaBed, FaDoorOpen, FaPerson } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSave } from "react-icons/fa";
import { Hotel, hotelSchema } from "@/schemas/hotel";
import hotelType from "@/types/hotel";
import Image from "next/image";
import CustomInput from "../hotel-create/CustomInput";
import CustomTextarea from "../hotel-create/CustomTextarea";
import { facilitiesData } from "@/utils/facilitiesData";

const HotelEditForm = ({ hotel }: { hotel: hotelType }) => {
  const { register, watch, handleSubmit } = useForm<Hotel>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      propertyName: hotel?.propertyName,
      propertyLocation: hotel?.propertyLocation,
      images1: hotel?.images[0],
      images2: hotel?.images[1],
      images3: hotel?.images[2],
      images4: hotel?.images[3],
      images5: hotel?.images[4],
      pricePerNight: hotel?.pricePerNight.toString(),
      rooms: hotel?.rooms.toString(),
      guests: hotel?.guests.toString(),
      bedrooms: hotel?.bedrooms.toString(),
      beds: hotel?.beds.toString(),
      description: hotel?.description,
    },
  });

  const {
    propertyName,
    propertyLocation,
    images1,
    images2,
    images3,
    images4,
    images5,
    pricePerNight,
    rooms,
    guests,
    bedrooms,
    beds,
    description,
  } = watch();
  const onSubmit = async (data: Hotel) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto px-6 py-8 relative"
      >
        <button
          type="submit"
          className="px-4 py-2 flex items-center gap-x-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4"
        >
          <FaSave />
          Publish
        </button>
        {/* <!-- Property Title and Rating --> */}
        <div className="mb-6">
          <CustomInput
            {...register("propertyName")}
            value={propertyName || "Property Name"}
            type={"text"}
            inputValueClassName={"text-3xl font-bold mb-2 text-zinc-400"}
          />
          <CustomInput
            {...register("propertyLocation")}
            value={propertyLocation || "Property Location"}
            type={"text"}
            inputValueClassName={"text-gray-600"}
          />
        </div>

        {/* <!-- Image Gallery --> */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
          <div className="col-span-2 row-span-2 relative">
            <Image
              src={images1 || "https://placehold.co/600x400"}
              height={400}
              width={600}
              alt="Main Room"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              {...register("images1")}
              type="text"
              placeholder="https://placehold.co/600x400"
              className="w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
            />
          </div>
          <div className="relative">
            <Image
              src={images2 || "https://placehold.co/600x400"}
              height={400}
              width={600}
              alt="Room 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              {...register("images2")}
              type="text"
              placeholder="https://placehold.co/600x400"
              className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
            />
          </div>
          <div className="relative">
            <Image
              src={images3 || "https://placehold.co/600x400"}
              height={400}
              width={600}
              alt="Room 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              {...register("images3")}
              type="text"
              placeholder="https://placehold.co/600x400"
              className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
            />
          </div>
          <div className="relative">
            <Image
              src={images4 || "https://placehold.co/600x400"}
              height={400}
              width={600}
              alt="Room 3"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              {...register("images4")}
              type="text"
              placeholder="https://placehold.co/600x400"
              className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
            />
          </div>
          <div className="relative">
            <Image
              src={images5 || "https://placehold.co/600x400"}
              height={400}
              width={600}
              alt="Room 4"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              {...register("images5")}
              type="text"
              placeholder="https://placehold.co/600x400"
              className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <CustomInput
            {...register("pricePerNight")}
            value={`Price in ${pricePerNight || 0}USD`}
            type={"number"}
            inputValueClassName={"text-gray-800 text-xl"}
          />
          <span className="text-gray-600 ml-1">per night</span>
        </div>

        <div className="mb-4">
          <CustomInput
            {...register("rooms")}
            value={`Available ${rooms || "X"} rooms`}
            type={"number"}
            inputValueClassName={"text-gray-800"}
          />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="border-b pb-6 mb-6">
              <div className="grid grid-cols-1 gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaPerson />
                  <CustomInput
                    {...register("guests")}
                    value={guests || `How many Guest can Stay?`}
                    type={"number"}
                    inputValueClassName={"text-gray-800"}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FaDoorOpen />
                  <CustomInput
                    {...register("bedrooms")}
                    value={bedrooms || `How many Bedrooms ?`}
                    type={"number"}
                    inputValueClassName={"text-gray-800"}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FaBed />
                  <CustomInput
                    {...register("beds")}
                    value={beds || `How many beds available ?`}
                    type={"number"}
                    inputValueClassName={"text-gray-800"}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <CustomTextarea
                {...register("description")}
                value={
                  description || `Write a short description about this place`
                }
                inputValueClassName={"text-gray-700 leading-relaxed"}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4" id="amenities">
                {facilitiesData.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <facility.icon />
                    <span>{facility.name}</span>
                    <input
                      type="checkbox"
                      checked={hotel?.facilities?.includes(facility.name)}
                      {...register(`facilities.${facility.name}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HotelEditForm;
