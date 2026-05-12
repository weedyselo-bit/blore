import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BLORE",
  description: "Modern software and game hub",

  verification: {
    google: "oTKMunfBEnGbUW8wCCt2C_bEeWteosErILyvyFFd7zM",
  },

 other: {
    "google-adsense-account": "ca-pub-9117187560795997",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-1B0S2PXT2S"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1B0S2PXT25');
    `}
  </Script>

  {children}

</body>
    </html>
  );
}
