import { auth } from "@/auth";
import Image from "next/image";

const Profile = async () => {
  const session = await auth();
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center ">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              height={300}
              width={300}
              alt="Profile-Pic"
            />
          ) : (
            <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">
                {session?.user?.name?.slice(0, 2)}
              </h1>
            </div>
          )}
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-zinc-800">
              {session?.user?.name}
            </h1>
            <p className="text-zinc-600">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
