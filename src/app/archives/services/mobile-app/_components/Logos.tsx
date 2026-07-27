"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Logos() {
  const clientLogos = [
    {
      name: "Disney",
      image: "/assets/legacy/waltdisney-1.png",
    },
    {
      name: "NCC",
      image:
        "/assets/legacy/ncc-p5znruak1us6b0syw92tdosydqjwgezavkwaz7zw1s-ri0x92xpadypr5edt81y3akw9k13vvxfeyt8ilvmdc.png",
    },
    {
      name: "Safesize",
      image:
        "/assets/legacy/safesize-p5zns8e4wdbh568hlx67x38vaimenvj9xiol6dezgg-ri0x9120wpw53xh4478oyb1z2sadghpyqpi9k1yeps.png",
    },
    {
      name: "GiphyCam",
      image:
        "/assets/legacy/giphycam-p5znss4qvw2hwzftenpdvg9jrlx45ipn08ds96lpts-ri0x9046pvuusbih9ou2dtaihef08sm8ekus2rzsw0.png",
    },
    {
      name: "Knorr Bremse",
      image:
        "/assets/legacy/knorr-bremse-p5znt766j610ng8p09arrtz3liqp9lzm1gd7ztyk0o-ri0x8y8iy567pszxm3461b9rmdjzic11dh3h6g1q6w.png",
    },
    {
      name: "Medivation",
      image:
        "/assets/legacy/medivation1-p5zntyfhffoeffqdjnzlhnlahy4mrwdk61qmumv01s-ri0x8wctyjpphvnxvn7k3u8o3uxje07b228u5o5dkw.png",
    },
    {
      name: "LiveChat",
      image:
        "/assets/legacy/livechat-p5znueeqnma9wt35ycw961k4lhxver4zw8tw0c7b40-ri0x8uh5kvn4unqo6meayupqx36sylzudsxv7485xc.png",
    },
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="mx-auto max-w-[1620px]">
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ["-50%", "0%"] }} // left → right
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex h-28 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={150}
                height={70}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
