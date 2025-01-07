"use client";
import { Pagination } from "@/types/pagination";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HotelPagination = ({ pagination }: { pagination: Pagination }) => {
  const router = useRouter();
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    router.push(`/?page=${nextPage}&limit=8`);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    router.push(`/?page=${prevPage}&limit=8`);
  };
  return (
    <div className="mt-8 flex justify-center">
      <nav>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              disabled={!hasPrevPage}
              onClick={handlePrevPage}
              className="flex items-center gap-2 py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <FaChevronLeft />
              <span className="">Previous</span>
            </button>
          </li>
          <li>
            <div className="flex items-center gap-2 py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white  border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700">
              <span>{currentPage}</span>
              <span>of</span>
              <span>{totalPages}</span>
            </div>
          </li>
          <li>
            <button
              disabled={!hasNextPage}
              onClick={handleNextPage}
              className="flex items-center gap-2 py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <span className="">Next</span>
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HotelPagination;
