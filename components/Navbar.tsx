import Image from "next/image";
import Link from "next/link";
import SearchInput from "./utils/SearchInput";
import UserInteraction from "./utils/UserInteraction";

const Navbar = () => {
  return (
    <>
      <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              height={50}
              width={50}
              alt="Hotel Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <SearchInput />
        <UserInteraction />
      </nav>
    </>
  );
};

export default Navbar;
