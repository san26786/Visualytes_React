import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import ClientGrid from "./_components/ClientGrid";
import { getClients } from "./_components/getClients";

export default function ClientsPage() {
  const clients = getClients();

  return (
    <BrandSubPageShell
      title="Clients"
      eyebrow="Trusted By"
      subtitle="We're proud to partner with businesses across industries — from startups to established brands."
    >
      <ClientGrid clients={clients} />
    </BrandSubPageShell>
  );
}
