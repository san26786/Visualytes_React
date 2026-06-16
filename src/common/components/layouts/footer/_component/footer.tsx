import React from 'react'

const footer = () => {
  return (
<footer
  className="relative z-[5] w-full bg-[#191f28] bg-cover bg-center bg-no-repeat text-[#a4a9b9]"
  style={{
    backgroundImage:
      "url('https://www.visualytes.com/wp-content/uploads/2020/10/footer_bg.png')",
    backgroundAttachment: "fixed",
  }}
>
  {/* Left Skew */}
  <div
    className="absolute left-0 top-[-35px] h-[150px] w-1/2 bg-[#191f28]"
    style={{
      backgroundImage:
        "url('https://www.visualytes.com/wp-content/uploads/2020/10/footer_bg.png')",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      transform: "skewY(3deg)",
    }}
  />

  {/* Right Skew */}
  <div
    className="absolute right-0 top-[-35px] h-[150px] w-1/2 bg-[#191f28]"
    style={{
      backgroundImage:
        "url('https://www.visualytes.com/wp-content/uploads/2020/10/footer_bg.png')",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      transform: "skewY(-3deg)",
    }}
  />

  <div className="relative z-[4] container mx-auto px-4 pt-[50px] pb-[65px]">
    {/* content */}
  </div>
  <div className="bg-[#ee2c82] w-full">
      <div className="mx-auto py-[15px] px-[65px] text-center">
        <h2 className="
          text-white
          text-[12px]
          font-semibold
          uppercase
          tracking-[2.4px]
          leading-[30px]
          m-0
        ">
          © Copyright 2026 All Rights Reserved By Visualytes Limited
        </h2>
      </div>
    </div>
</footer>  )
}

export default footer