import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialProps {
  id: number;
  image: string;
  name: string;
  designation: string;
  company?: string;
  content: string;
}

export default function TestimonialCard({
  image,
  name,
  designation,
  company,
  content,
}: TestimonialProps) {
  return (
    <article className="flex flex-col items-center text-center px-4">
      {/* Avatar */}
      <div className="relative mb-6">
        <div className="w-[92px] h-[92px] rounded-full border-[3px] border-[#d9d9d9] overflow-hidden bg-[#efefef]">
          <Image
            src={image}
            alt={name}
            width={92}
            height={92}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quote */}
        <Quote
          fill="#ff4d84"
          className="absolute -bottom-2 right-0 text-[#ff4d84] w-9 h-9 rotate-180"
        />
      </div>

      {/* Name */}

      <h3 className="text-[24px] font-medium text-[#222]">
        {name}
      </h3>

      {/* Job */}

      <p className="mt-3 uppercase leading-[2.4px] text-[12px] font-bold text-[#ff497c]">
        {designation}
        {company && (
          <>
            {" "}
            , {company}
          </>
        )}
      </p>

      {/* Content */}

      <p className="mt-4 max-w-md italic leading-9 text-[#8d8d8d] text-[18px]">
        {content}
      </p>
    </article>
  );
}