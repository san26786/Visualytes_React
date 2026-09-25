import { getPublicPlans } from "@/src/lib/packages/queries";
import MarketingPlansClient from "./MarketingPlansClient";

export const metadata = { title: "End To End Digital Marketing Plans | Visualytes", description: "End To End Digital Marketing Plans from Visualytes." };

// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;

export default async function Page() { return <MarketingPlansClient plans={await getPublicPlans()} />; }
