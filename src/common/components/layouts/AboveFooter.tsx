import Image from "next/image";

export const items = [
    {
      title: "Call Us",
      icon: "rt-icon2-phone5",
      color: "#A0CE4E",
      content: (
        <>
          <p>
            <strong>Enquiry:</strong> 023 8097 0305
          </p>
          <p>
            <strong>Support:</strong> 023 8097 0305
          </p>
        </>
      ),
    },
    {
      title: "Write Us",
      icon: "rt-icon2-pen",
      color: "#00bea3",
      content: (
        <>
<p>
  <a
    href="mailto:hello@visualytes.com"
    className="text-[#7f7f7f] hover:text-[var(--primaryPink)] transition-colors duration-300"
  >
    hello@visualytes.com
  </a>
</p>

<p>
  <a
    href="mailto:support@visualytes.com"
    className="text-[#7f7f7f] hover:text-[var(--primaryPink)] transition-colors duration-300"
  >
    support@visualytes.com
  </a>
</p>
        </>
      ),
    },
    {
      title: "Visit Us",
      icon: "rt-icon2-location2",
      color: "#F57C00",
      content: (
        <>
          <p>
            Cumberland House, Southampton,
            SO15 2BG
          </p>
  
          <p>
            12 Shirley Road, Southampton,
            SO15 3EU
          </p>
        </>
      ),
    },
  ];
  
  export default function AboveFooter() {
    return (
      <section
        className="relative overflow-visible"
        style={{
          backgroundImage: "url('/assets/png/texture_2.png')",
          backgroundColor: "#f4f4f5",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% -98px",
        }}
      >
        <div className="flex justify-center">
            
        <Image
  src="/assets/png/vertical_line3.png"
  alt=""
  width={20}      // Use the actual image width
  height={120}    // Use the actual image height
  className="h-auto h-[94px] w-[4px]"
/>
        </div>
        
        <div className="mx-auto max-w-[1170px] px-[15px] py-[85px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
            {items.map((item) => (
              <div key={item.title} className="teaser-card text-center">
                {/* Icon Circle */}
                <div className="teaser-icon mx-auto flex h-[163px] w-[163px] items-center justify-center rounded-full border-[4px] border-white bg-transparent p-[4px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white transition-all duration-500 ease-in-out">
                    
                    <i
                      className={item.icon}
                      style={{
                        fontSize: "65px",
                        color: item.color,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
  
                  </div>
                </div>
  
                {/* Title */}
                <h3 className="mt-[29px] mb-[17px] text-[24px] font-medium leading-[24px] text-[#1f2732]">
                  {item.title}
                </h3>
  
                {/* Content */}
                <div className="text-[15px] leading-[30px] font-light text-[#7f7f7f]">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
  
          {/* Vertical Decoration */}
          <div className="mt-[60px] flex justify-center">
          <Image
  src="/assets/png/vertical_line3.png"
  alt=""
  width={20}      // Use the actual image width
  height={120}    // Use the actual image height
  className="h-auto h-[94px] w-[4px]"
/>
          </div>
        </div>
      </section>
    );
  }
  
