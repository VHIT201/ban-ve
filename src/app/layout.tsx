import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Fragment, ReactNode, Suspense } from "react";

// Styles
import "@/index.css";
import "@/main.css";
import "@/styles/theme.css";

// App
import { Providers } from "./providers";
import { AuthGate } from "@/components/modules/auth";

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "BanVe - Nền tảng mua bán nội dung số",
    template: "%s | BanVe",
  },
  description:
    "Khám phá và tải xuống nội dung số chất lượng cao. BanVe - Nền tảng mua bán tài nguyên thiết kế hàng đầu Việt Nam.",
  keywords: [
    "digital content",
    "marketplace",
    "design resources",
    "templates",
    "graphics",
    "vector",
  ],
  authors: [{ name: "BanVe Team" }],
  creator: "BanVe",
  publisher: "BanVe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "BanVe",
    title: "BanVe - Nền tảng mua bán nội dung số",
    description: "Khám phá và tải xuống nội dung số chất lượng cao",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BanVe - Nền tảng mua bán nội dung số",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BanVe - Nền tảng mua bán nội dung số",
    description: "Khám phá và tải xuống nội dung số chất lượng cao",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <Fragment>
          <Toaster richColors position="bottom-right" />
          <Providers>
            <AuthGate>
              <div className="min-h-screen bg-background">
                <Suspense fallback={null}>
                  <main>{children}</main>
                </Suspense>
              </div>
            </AuthGate>
          </Providers>
        </Fragment>
      </body>
    </html>
  );
}
