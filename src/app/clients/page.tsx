import ClientGrid from "./_components/ClientGrid";
import { getClients } from "./_components/getClients";
import PageBanner from "@/src/common/components/layouts/PageBanner";


export default function ClientsPage() {
  const clients = getClients();

  return (
    <>
  

                <PageBanner title="Clients" />
    
  <ClientGrid clients={clients} />
  </>
)

}