import { getPublicPlans } from "@/src/lib/packages/queries";
import MarketingPlansClient from "./MarketingPlansClient";

export const metadata = { title: "End To End Digital Marketing Plans | Visualytes", description: "End To End Digital Marketing Plans from Visualytes." };

// Plans are managed in the admin dashboard, so always render fresh data.
export const dynamic = "force-dynamic";

export default async function Page() { return <MarketingPlansClient plans={await getPublicPlans()} />; }
