import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Software Development Company London | Visualytes",
  description:
    "Bespoke Software Development and Digital Transformation from Conception to Delivery. 250+ expert developers across UK and nearshore centres.",
};

export default function BespokeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
