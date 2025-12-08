import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grace International School – Quality Education in Sierra Leone",
  description:
    "Grace International School provides excellent education, character formation, and modern learning for pupils in Sierra Leone. Enroll today for quality academic growth.",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },

  keywords: [
    "Grace International School",
    "School in Sierra Leone",
    "Private Schools in Sierra Leone",
    "Best Schools in Sierra Leone",
    "Primary School Freetown",
    "Secondary School Freetown",
    "Education Sierra Leone",
    "International Schools Sierra Leone",
    "School Portal Sierra Leone",
    "Grace International Learning",
  ],

  authors: [{ name: "Grace International School" }],
  creator: "Grace International School",
  publisher: "Grace International School",

  metadataBase: new URL("https://www.graceinternationalschool.sl"),
  applicationName: "Grace International School Portal",
  classification: "Educational Institution",

  robots: { index: true, follow: true },
  referrer: "strict-origin-when-cross-origin",

  alternates: {
    canonical: "https://www.graceinternationalschool.sl",
  },

  openGraph: {
    title: "Grace International School – Excellence in Education",
    description:
      "Leading private school in Sierra Leone offering the best learning experience with modern facilities, trained teachers, and digital school services.",
    url: "https://www.graceinternationalschool.sl",
    siteName: "Grace International School",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/grace.jpg",
        width: 1200,
        height: 630,
        alt: "Grace International School Campus",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Grace International School – Sierra Leone",
    description:
      "A top private school providing excellent academic learning and digital access for pupils and parents.",
    images: ["/images/grace.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003366",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="manifest" href="/manifest.webmanifest" />
           <meta name="theme-color" content="#0a1a3a" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
