import "@/styles/App.css";

import Head from "next/head";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <Head>
        <title>Loïs Alirol | Portfolio</title>
        <meta name="description" content="Learn more about me, check out my projects and don't hesitate to contact me." />
        <meta name="keywords" content="portfolio, lois, alirol, loïs, loïs alirol, moi, projets, contact, experiences, multilingue" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Loïs Alirol | Portfolio" />
        <meta property="og:description" content="Learn more about me, check out my projects and don't hesitate to contact me." />
        <meta property="og:url" content="https://www.loisalirol.com" />
        <meta property="og:image" content="https://www.loisalirol.com/web-app-manifest-512x512.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loïs Alirol | Portfolio" />
        <meta name="twitter:description" content="Learn more about me, check out my projects and don't hesitate to contact me." />
        <meta name="twitter:image" content="https://www.loisalirol.com/web-app-manifest-512x512.png" />

        <meta name="theme-color" content="#0E1525" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
