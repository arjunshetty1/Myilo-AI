import Image from "next/image";
import {  MoveRight } from "lucide-react";

const PostPageCard = ({ image, title, date, status }) => {
  return (
    <>
      <div className="w-full my-4 flex pl-3 md:pl-10 items-center gap-4 p-3 rounded-md group hover:cursor-pointer">
        <div>
          <Image
            src={image}
            className="rounded-md min-w-[4.5rem] h-[4.5rem] min-h-[4.5rem] object-cover"
            width={70}
            height={70}
            unoptimized
            alt={`Thumbnail for ${title}`}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-base group-hover:text-[#4a4a4a] font-medium text-black w-full line-clamp-2">
            {title}
          </p>
          <p className="text-[#4D4D4D] text-sm group-hover:text-[black]">
            {status === "published"
              ? `Created on ${date}`
              : `Created on ${date} (Draft)`}
          </p>
        </div>

        <div className="ml-auto border-[1px] hidden md:block border-[#D8D8D8] rounded-md p-2 group-hover:border-[var(--red)]">
          <MoveRight
            size={30}
            className="text-[#808080]  group-hover:text-[var(--red)] transition group-hover:duration-150 ease-in-out"
          />
        </div>
      </div>

      <div className="bg-[#D8D8D8] h-[1px] w-full mt-0"></div>
    </>
  );
};

export default PostPageCard;
