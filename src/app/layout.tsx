import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Mainheader from "../common/components/layouts/header/_component/Mainheader";
import Footer from "../common/components/layouts/footer/_component/footer";
import ScrollToTop from "../common/components/layouts/footer/_component/ScrollToTop";
// import LenisProvider from "../common/animations/LenisProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700","900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: "Web Designing & Digital Marketing Company London-Visualytes",
  description: "Visualytes",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Web Designing & Digital Marketing Company London-Visualytes",
    description: "Visualytes",
    url: "/",
    siteName: "Visualytes",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web Designing & Digital Marketing Company London-Visualytes",
    description: "Visualytes",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body className={poppins.className}>
        <Mainheader />

        <main>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#111827",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "14px 18px",
                minWidth: "min(430px, calc(100vw - 2rem))",
              },
              success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
              error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
            }}
          />
          <ScrollToTop />
        </main>

        <Footer />
      </body>
    </html>
  );
}
