import HotelManageHeader from "@/components/hotel-manage/HotelManageHeader";
import HotManageCard from "@/components/hotel-manage/HotManageCard";

const HotelManage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <HotelManageHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HotManageCard />
          <HotManageCard />
          <HotManageCard />
        </div>
      </div>
    </>
  );
};

export default HotelManage;
