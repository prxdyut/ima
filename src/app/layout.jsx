import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import Head from "next/head";
export const metadata = {
  title: "Institution Management App",
};

export default function RootLayout(props) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="application-name" content="Institution Management App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Institution Management App"
          />
          <meta
            name="description"
            content="An all-in-one educational institution management app with a comprehensive set of features"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#00796b" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

          <link
            rel="apple-touch-icon"
            href="/apple-touch-icons/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-touch-icons/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-touch-icons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-touch-icons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-touch-icons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-touch-icons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icons/apple-touch-icon-180x180.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Institution Management App" />
          <meta
            property="og:description"
            content="Best Institution Management App in the world"
          />
          <meta property="og:site_name" content="Institution Management App" />
          <meta property="og:url" content="https://ima-testing.vercel.app" />
          <meta
            property="og:image"
            content="https://ima-testing.vercel.app/apple-touch-icons/apple-touch-icon.png"
          />
        </head>
        <body>
          {props.children}
        </body>
      </html>
    </ClerkProvider>
  );
}
