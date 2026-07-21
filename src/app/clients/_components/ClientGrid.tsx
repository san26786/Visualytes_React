"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

interface Client {
  name: string;
  image: string;
}

export default function ClientGrid({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  return (
    <section className="px-4 pb-24 pt-4">
      <div className="mx-auto max-w-7xl">
        <SearchBar value={search} onChange={setSearch} />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filtered.map((client, index) => (
              <motion.div
                key={client.image}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
                className={`group flex h-[110px] items-center justify-center p-4 sm:h-[140px] md:h-[160px] lg:h-[170px] ${BRAND_SURFACE.mutedGlassCard} ${BRAND_MOTION.softTransition} hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.1)]`}
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={250}
                  height={150}
                  className="h-auto max-h-full w-auto max-w-full object-contain brightness-90 transition-all duration-300 group-hover:brightness-110"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 md:py-28">
            <div className={`px-8 py-10 text-center ${BRAND_SURFACE.glassCard}`}>
              <h3 className={BRAND_TEXT.cardTitle}>No Client Found</h3>
              <p className={`mt-3 ${BRAND_TEXT.cardBody}`}>
                No results found for{" "}
                <span className="font-medium text-cyan-300">&quot;{search}&quot;</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
