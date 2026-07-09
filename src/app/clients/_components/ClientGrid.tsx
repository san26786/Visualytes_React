"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface Client {
  name: string;
  image: string;
}

export default function ClientGrid({
  clients,
}: {
  clients: Client[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchBar value={search} onChange={setSearch} />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {filtered.map((client) => (
              <div
                key={client.image}
                className="
                  flex
                  items-center
                  justify-center
                  bg-[#f7f7f7]
                  h-[120px]
                  sm:h-[150px]
                  md:h-[170px]
                  lg:h-[180px]
                  p-4
                  transition-all
                  duration-300
                  hover:shadow-lg
                "
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={250}
                  height={150}
                  className="
                    w-auto
                    h-auto
                    max-w-full
                    max-h-full
                    object-contain
                  "
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 md:py-28">
            <div className="text-center px-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                No Client Found
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500 break-words">
                No results found for{" "}
                <span className="font-medium">&quot;{search}&quot;</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}