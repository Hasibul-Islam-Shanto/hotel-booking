import { auth } from "@/auth";
import HotelManageContainer from "@/components/hotel-manage/HotelManageContainer";
import HotelPagination from "@/components/ui/Pagination";
import ShowError from "@/components/ui/ShowError";
import { fetchOwnerHotels } from "@/lib/api/fetch-api";

type SearchParams = {
  page: string;
  limit: string;
};
const HotelManage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  try {
    const session = await auth();
    const page = Number(searchParams?.page || 1);
    const limit = Number(searchParams?.limit || 8);
    const response = await fetchOwnerHotels(
      session?.user?.email ?? "",
      page,
      limit
    );
    const { hotels, pagination } = response;
    return (
      <>
        <HotelManageContainer hotels={hotels} />
        {hotels?.length > 0 && (
          <HotelPagination
            pagination={pagination}
            path="/hotels/hotel-manage"
          />
        )}
      </>
    );
  } catch (error) {
    return <ShowError error={error as Error} />;
  }
};

export default HotelManage;
