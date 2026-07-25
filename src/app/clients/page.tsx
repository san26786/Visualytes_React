
import { getClients } from "./_components/getClients";
import ClientWrappers from "./_components/ClientWrappers";
export const metadata = {
  title: "Our Clients & Customers | Visualytes Limited",
  description:
    "Discover why businesses worldwide trust Visualytes to enhance their digital solutions and optimize marketing strategies.",
  keywords: [
    "Visualytes clients",
    "Visualytes customers",
    "digital solutions company",
    "web development clients",
    "digital marketing services",
    "software development company",
  ],
  openGraph: {
    title: "Our Clients & Customers | Visualytes Limited",
    description:
      "Discover why businesses worldwide trust Visualytes to enhance their digital solutions and optimize marketing strategies.",
    url: "https://www.visualytes.com/clients",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clients & Customers | Visualytes Limited",
    description:
      "Discover why businesses worldwide trust Visualytes to enhance their digital solutions and optimize marketing strategies.",
  },
};
export default function ClientsPage() {
  

  return (
   <ClientWrappers/>
  );
}
