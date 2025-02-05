"use client";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (pathName === "/") {
      const params = new URLSearchParams(searchParams);
      if (debouncedValue) {
        params.set("search", debouncedValue);
        params.set("page", "1");
        params.set("limit", "8");
      } else {
        params.delete("search");
      }
      router.push(`/?${params.toString()}`);
    }
  }, [debouncedValue, pathName, router, searchParams]);
  return (
    <>
      <div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
        <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
          <input
            type="text"
            placeholder="Where to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
          />
        </div>

        <button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
          <FaSearch className="text-white" />
        </button>
      </div>
    </>
  );
};

export default SearchInput;
