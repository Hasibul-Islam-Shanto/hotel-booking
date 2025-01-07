"use client";

import { FaFacebook, FaTwitter } from "react-icons/fa";

const ShareHotel = ({
  url,
  title,
}: //   description,
{
  url: string;
  title: string;
  description: string;
}) => {
  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h3 className="text-gray-600 mb-2">Share on social media</h3>
        <div className="flex gap-4">
          <button
            onClick={handleFacebookShare}
            className="text-center cursor-pointer"
          >
            <FaFacebook className="text-2xl text-blue-500" />
          </button>

          <button
            onClick={handleTwitterShare}
            className="text-center cursor-pointer"
          >
            <FaTwitter className="text-2xl text-blue-400" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ShareHotel;
