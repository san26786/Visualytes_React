
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
    <section className="relative overflow-visible py-16">
      <div className="mx-auto max-w-[1270px] px-[15px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/40"
                      >
                        <div
                          className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl p-[4px]"
                          style={{
                            border: `1px solid ${item.bg}`,
                            backgroundColor: `${item.bg}20`,
                          }}
                        >
                          <div
                            className="flex h-full w-full items-center justify-center rounded-2xl"
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

                        <h3 className="mb-[17px] mt-[29px] text-[24px] font-medium leading-[24px] text-white">
                          {item.title}
                        </h3>

                        <div className="px-3 text-[16px] font-light leading-[30px] text-slate-300">
                          {item.content}
                        </div>
                      </div>
                    ))}
        </div>
      </div>
    </section>
  );
}