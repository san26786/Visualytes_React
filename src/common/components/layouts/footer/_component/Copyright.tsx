import React from 'react'

const Copyright = () => {
  return (
    <section
    className="text-[15px] text-center font-extrabold font-['Poppins'] tracking-[2.4px] leading-[12px]"
    style={{
      backgroundImage: "url(/assets/png/footer_bg.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#191f28",
    }}
  >
    <h3 className="hidden">Page Copyright</h3>
  
    <div className="p-9 bg-[var(--primaryPink)]">
      <div className="row">
        <div className="col-sm-12 text-center font-bold">
          <h2
            style={{
              color: "#fff",
              fontSize: "inherit",
              margin: 0,
              fontWeight: 300,
              textTransform: "uppercase",
              
            }}
          >
            © COPYRIGHT 2026 ALL RIGHTS RESERVED BY VISUALYTES LIMITED
          </h2>
        </div>
      </div>
    </div>
  </section>
 )
}

export default Copyright