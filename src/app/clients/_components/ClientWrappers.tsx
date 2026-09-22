"use client";

import { useEffect, useState } from "react";
import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import ClientGrid from "../_components/ClientGrid";

interface Client {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
}

export default function ClientWrappers() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/admin/clients",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch clients: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Clients API response:", data);

        setClients(data);
      } catch (error) {
        console.error(
          "Failed to fetch clients:",
          error
        );

        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <BrandSubPageShell
      title="Clients"
      eyebrow="Trusted By"
      subtitle="We're proud to partner with businesses across industries — from startups to established brands."
    >
      {loading ? (
        <section className="px-4 pb-24 pt-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-slate-400">
                Loading clients...
              </p>
            </div>
          </div>
        </section>
      ) : (
        <ClientGrid clients={clients} />
      )}
    </BrandSubPageShell>
  );
}