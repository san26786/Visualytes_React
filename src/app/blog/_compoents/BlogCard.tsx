"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../_data/data";
import {
    FaEye,
    FaHeart,
    FaComment,
    FaShareAlt,
    FaCalendarAlt,
  } from "react-icons/fa";

export default function BlogCard({
  title,
  slug,
  formattedDate,
  author,
  images,
  categories,
  description,
  metrics,
}: BlogPost) {
  // const dateParts = formattedDate?.split(" ") || [];
  // const month = dateParts[0]?.substring(0, 3).toUpperCase() || "";
  // const day = dateParts[1]?.replace(",", "") || "";

  return (
    <article className="group overflow-hidden bg-[#f4f4f5] shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 ">
      {/* IMAGE */}
      <div className="relative h-[310px] overflow-hidden">
        {/* Date Badge */}
       

        <Link href={`/blog/${slug}`}>
          <Image
            src={images.main}
            alt={images.alt || title}
            fill
            className="absolute object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-10">
        {/* Category */}
        <div className="mb-6 flex flex-wrap gap-2">
  {categories.map((cat, index) => {
    const slug = cat.url.split("/").filter(Boolean).pop();

    return (
      <Link
        key={index}
        href={`/archives/category/blog/${slug}`}
        className="bg-[#ff497c] text-white hover:text-[#ff497c] hover:bg-white border-[4px] border-[#ff497c] text-[12px] uppercase tracking-[2.4px] leading-[12px] font-bold rounded-full px-[20px] py-[5px]"
      >
        {cat.name}
      </Link>
    );

})}
</div>

        {/* Title */}
        <h3 className="text-[32px] leading-tight text-[#337ab7]  hover:text-[#ff497c]  font-medium mb-5">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Heading */}
    

        {/* Description */}
        <p className="text-[16px] font-light leading-9 text-[#666] line-clamp-4">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="bg-[#1d2430] text-white">

  <div className="flex items-center justify-between px-5  pt-5  border-t border-gray-700">

    {/* Left */}

    <div className="flex items-center gap-5">

      <Image
        src={author.avatarUrl}
        alt={author.name}
        width={54}
        height={54}
        className="rounded-full border-4 border-gray-500"
      />

      <span className="uppercase tracking-[3px] text-[11px] font-semibold">
        BY {author.name}
      </span>

    </div>

    {/* Right */}

    <div className="flex items-center gap-2 text-[12px] uppercase tracking-[2px]">

      <FaCalendarAlt className="text-pink-500" />

      {formattedDate}

    </div>

    {/* Share */}

    <FaShareAlt className="cursor-pointer hover:text-pink-500 transition" />

  </div>

  <div className="flex justify-center gap-10 text-sm pb-5">

    <div className="flex items-center gap-2">
      <FaEye className="text-pink-500" />
      {metrics.views}
    </div>

    <div className="flex items-center gap-2">
      <FaComment className="text-pink-500" />
      0
    </div>

    <div className="flex items-center gap-2">
      <FaHeart className="text-pink-500" />
      {metrics.likes}
    </div>

  </div>

</div>
    </article>
  );
}