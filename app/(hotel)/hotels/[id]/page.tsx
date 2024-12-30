import Reviews from "@/components/hotel/Reviews";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { fetchHotel } from "@/lib/api/fetch-api";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/hotel/ImageGallery";

const HotelDetails = async ({ params }: { params: { id: string } }) => {
  const response = await fetchHotel(params.id);
  console.log(response);
  const hotel = response.hotel;
  //   console.log(hotel);
  if (!hotel) {
    return notFound();
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* <!-- Property Title and Rating --> */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{hotel?.propertyName}</h1>
          <div className="flex items-center text-gray-600">
            <FaStar className="text-yellow-500 mr-1" />
            <span>5 · </span>
            <span className="ml-2">2 reviews</span>
            <span className="mx-2">·</span>
            <span className="">{hotel?.propertyLocation}</span>
          </div>
        </div>

        {/* <!-- Image Gallery --> */}
        <ImageGallery images={hotel?.images} />

        {/* <!-- Property Details --> */}
        <div className="grid grid-cols-3 gap-8">
          {/* <!-- Left Column: Property Description --> */}
          <div className="col-span-2">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Entire villa hosted by {hotel?.user?.name}
              </h2>
              <div className="grid grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="fas fa-person"></i>
                  <span>{hotel?.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-door-open"></i>
                  <span>{hotel?.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-bed"></i>
                  <span>{hotel?.beds} beds</span>
                </div>
              </div>
            </div>

            {/* <!-- Description --> */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">
                {hotel?.description}
              </p>
            </div>

            {/* <!-- Amenities --> */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {hotel?.facilities.map((facility: string) => (
                  <div key={facility} className="flex items-center gap-2">
                    {/* <i className="fa-solid fa-umbrella-beach"></i> */}
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <!-- Right Column: Booking Card --> */}
          <div>
            <div className="bg-white shadow-lg rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xl font-bold">
                    ${hotel?.pricePerNight}
                  </span>
                  <span className="text-gray-600 ml-1">per night</span>
                </div>
                <div className="flex items-center">
                  {/* todo add rating */}
                  {/* <i className="fas fa-star text-yellow-500 mr-1"></i>
                  <span>5</span> */}
                </div>
              </div>

              <div className="border rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b">
                  <input
                    type="text"
                    placeholder="Check in"
                    className="p-3 border-r"
                  />
                  <input type="text" placeholder="Check out" className="p-3" />
                </div>
                <input
                  type="number"
                  placeholder="Guests"
                  className="w-full p-3"
                />
              </div>

              <Link
                href="/hotels/payment/123"
                className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
              >
                Reserve
              </Link>

              <div className="text-center mt-4 text-gray-600">
                <p>You won&apos;t be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Reviews Section --> */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        {/* <!-- Reviews Header with Average Rating --> */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-500 mr-2"></i>
              <span className="text-xl font-semibold">4.9</span>
              <span className="mx-2">·</span>
              <span className="text-gray-600">2 reviews</span>
            </div>
          </div>

          <button className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100">
            Write a Review
          </button>
        </div>

        <Reviews />
      </div>
    </>
  );
};

export default HotelDetails;
