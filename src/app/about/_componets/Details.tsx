
  const items = [
    {
      title: "Who We Are",
      icon: "rt-icon2-user",
      color: "#fff",
      bg: "#A0CE4E",
      content: (
        <>
          <p>
            We are a team of San Diego web design and development professionals who love partnering with good people and businesses to help them achieve online success.
          </p>
  
        </>
      ),
    },
    {
      title: "What We Do",
      icon: "rt-icon2-diamond2",
      color: "#fff",
      bg: "#00bea3",
  
      content: (
        <>
          <p>
            We’re focused on honing our crafts and bringing everything we have to the table for our clients. We create custom, functional websites focused on converting your users into customers.
          </p>
  
  
        </>
      ),
    },
    {
      title: "Why We Do It",
      icon: "rt-icon2-like",
      color: "#fff",
      bg: "#F57C00",
      content: (
        <>
          <p>
            Each of us loves what we do and we feel that spirit helps translate into the quality of our work. Working with clients who love their work combines into a fun, wonderful partnership for everyone involved.
          </p>
  
  
        </>
      ),
    },
  ];
  
export default function Details() {
    return (
        <>
         <section
                className="relative overflow-visible"
        
              >
        
        
                <div className="mx-auto max-w-[1270px] px-[15px] py-[85px]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-31">
                    {items.map((item) => (
                      <div key={item.title} className="teaser-card text-center">
                        {/* Icon Circle */}
                        <div
                          className="teaser-icon mx-auto flex h-[163px] w-[163px] items-center justify-center rounded-full p-[4px]"
                          style={{
                            border: `4px solid ${item.bg}`,
                          }}
                        >
                          <div
                            className="flex h-full w-full items-center justify-center rounded-full"
                            style={{
                              backgroundColor: item.bg,
                            }}
                          >
                            <i
                              className={item.icon}
                              style={{
                                fontSize: "65px",
                                color: item.color,
                                lineHeight: 1,
                              }}
                            />
                          </div>
                        </div>
        
                        {/* Title */}
                        <h3 className="mt-[29px] mb-[17px] text-[24px] font-medium leading-[24px] text-[#1f2732]">
                          {item.title}
                        </h3>
        
                        {/* Content */}
                        <div className="text-[16px] leading-[30px] font-light text-[#7f7f7f] px-9">
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
        
                  {/* Vertical Decoration */}
        
                </div>
              </section>
        </>
    );
}