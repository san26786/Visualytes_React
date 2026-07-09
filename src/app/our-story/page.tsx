import Image from "next/image";
import Link from "next/link";
import Timeline from "./_componets/ Timeline";
import PageBanner from "@/src/common/components/layouts/PageBanner";

export default function Page() {
  return (
    <>
      <section>
            <PageBanner title="Our Story" />
            <section
      className="
        relative
        bg-[url('/assets/jpg/banner-nsir.jpg')]
        bg-cover
        bg-left
        bg-no-repeat
        lg:min-h-[760px]
        flex
        items-center
      "
    >
      {/* Optional white overlay */}
      <div className="absolute inset-0 bg-white/5"></div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Empty column because person is already inside background */}
          <div></div>

          {/* Right Content */}
          <div className="py-24 lg:py-32">
            <h2 className="text-[48px] md:text-[48px] font-medium text-[#ff497c] leading-tight">
              Welcome to Visualytes.
            </h2>

            <div className="mt-10 space-y-5 font-light text-[16px] leading-[2] text-[#8b8b8b]">
              <p>
                Visualytes brings perfection, high quality deliveries and
                premium level service to web-apps, computer software and digital
                marketing while helping clients to fulfill all their IT needs
                under one roof.
              </p>

              <p>
                We are a group of highly dynamic, creative and talented skill
                set of people, who are one hundred percent ready to go that
                extra mile in order to create premium value for our clients.
                It&apos;s this skill set of creativity that make Visualytes so great
                and one of the top reasons our clients choose to work with us on
                their required projects. This is the foundation on which our
                successful and innovative reputation is based.
              </p>
            </div>

            {/* Button + Signature */}
            <div className="mt-16 flex flex-wrap items-center justify-between max-w-6xl">
              <Link
                href="/about"
                className="
                  flex
                  h-[82px]
                  min-w-[255px]
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#ff497c]
                  bg-[#ff497c]
                  px-14
                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[3px]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                  hover:border-[#ff497c]
                "
              >
                READ MORE
              </Link>

              <Image
                src="/assets/png/signature_6.png"
                alt="Signature"
                width={160}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
            </section>
            <Timeline/>
    </>
  );
}

