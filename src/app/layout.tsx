import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ConditionalSiteChrome from "../common/components/layouts/ConditionalSiteChrome";
import { SiteDataProvider } from "../common/components/layouts/SiteDataProvider";
import { getSiteData } from "../lib/site/server";
// import LenisProvider from "../common/animations/LenisProvider";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700","900"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  // Title, description and the Search Console code are edited in Admin > Settings.
  const { settings } = await getSiteData();
  const { siteName, defaultTitle, defaultDescription } = settings.general;
  const verification = settings.analytics.searchConsoleVerification;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

    title: defaultTitle,
    description: defaultDescription,

    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: "/apple-touch-icon.png",
    },

    ...(verification ? { verification: { google: verification } } : {}),

    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: "/",
      siteName,
      locale: "en_GB",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteData();
  const analyticsId = site.settings.analytics.googleAnalyticsId;

  return (
    <html
      lang="en"
      className={poppins.variable}
    >
      <body className={poppins.className}>
        {analyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${analyticsId}');`}
            </Script>
          </>
        )}
        <SiteDataProvider value={site}>
        <ConditionalSiteChrome>
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
        </ConditionalSiteChrome>
        </SiteDataProvider>
      </body>
    </html>
  );
}
