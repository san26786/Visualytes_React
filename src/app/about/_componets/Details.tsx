import type { AboutContent } from "@/src/lib/page-content/types";

const PALETTE = ["#A0CE4E", "#00bea3", "#F57C00", "#784191", "#3B82C4", "#E85D12"];

export default function Details({ content }: { content: AboutContent["details"] }) {
  const items = content.items.map((item, index) => ({
    ...item,
    color: "#fff",
    bg: PALETTE[index % PALETTE.length],
    content: <p>{item.text}</p>,
  }));

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