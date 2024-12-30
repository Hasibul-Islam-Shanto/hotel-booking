import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
        <div className="col-span-2 row-span-2">
          <Image
            src={images[0]}
            height={500}
            width={500}
            alt="Main Room"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <Image
            src={images[1]}
            height={250}
            width={250}
            alt="Room 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <Image
            src={images[2]}
            alt="Room 2"
            height={250}
            width={250}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <Image
            src={images[3]}
            alt="Room 3"
            height={250}
            width={250}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <Image
            src={images[4]}
            alt="Room 4"
            height={250}
            width={250}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
