import PageBanner from "@/src/common/components/layouts/PageBanner";

export default function Page() {
    return (
        <>
        <PageBanner title="View Case Study"/>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6  max-w-6xl mx-auto pt-9 mb-18">            {/* LEFT */}
    <a
  href="https://www.visualytes.com/projects/studio-creatives-2/"
  target="_blank"
  className="group relative h-[550px] overflow-hidden border-[0.2px] border-black"
>
  <div
    className="absolute inset-0 bg-cover bg-top transition-all duration-[30000ms] ease-linear group-hover:bg-bottom"
    style={{
      backgroundImage:
        "url('/assets/png/image_2024_01_24T07_52_55_180Z.png')",
    }}
  />

  {/* overlay */}
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

  {/* icon */}
  {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
    ⬆
  </div> */}
</a>


  {/* overlay */}

  {/* icon */}
  {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
    ⬆
  </div> */}
    <a
  href="https://www.visualytes.com/projects/studio-creatives-2/"
  target="_blank"
  className="group relative h-[500px] overflow-hidden border-[0.2px] border-black"
>
  <div
    className="absolute inset-0 bg-cover bg-top transition-all duration-[30000ms] ease-linear group-hover:bg-bottom"
    style={{
      backgroundImage:
        "url('/assets/webp/scfullpagess.png.bv.webp')",
    }}
  />

  {/* overlay */}
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

  {/* icon */}
  {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
    ⬆
  </div> */}
</a>


{/* RIGHT */}
<a
  href="https://www.visualytes.com/projects/thorney-park-golf-club/"
  target="_blank"
  className="group relative h-[500px] overflow-hidden border-[0.2px] border-black"
>
  <div
    className="absolute inset-0 bg-cover bg-top transition-all duration-[30000ms] ease-linear group-hover:bg-bottom"
    style={{
      backgroundImage:
        "url('/assets/webp/tparksshome.png.bv.webp')",
    }}
  />

  {/* overlay */}
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

  {/* icon */}
  {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
    ⬆
  </div> */}
</a>

</div>
</>
   )
}