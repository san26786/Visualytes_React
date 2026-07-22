import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins ,Roboto} from "next/font/google";
import "./globals.css";

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
  title: "Web Designing & Digital Marketing Company London-Visualytes",
  description: "Visualytes",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "36x346", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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

        <main className="">        {children}
        <ScrollToTop />
        </main>

        <Footer />
      </body>
    </html>
  );
}