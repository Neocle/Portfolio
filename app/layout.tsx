import "@/styles/App.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Loïs Alirol | Portfolio",
  description: "Learn more about me, check out my projects and don't hesitate to contact me.",
  keywords: ["portfolio", "lois", "alirol", "loïs", "projets", "contact", "experiences", "multilingue"],
  robots: "index, follow",
  themeColor: "#0E1525",
  openGraph: {
    title: "Loïs Alirol | Portfolio",
    description: "Learn more about me, check out my projects and don't hesitate to contact me.",
    url: "https://www.loisalirol.com",
    images: ["https://www.loisalirol.com/web-app-manifest-512x512.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Loïs Alirol | Portfolio",
    description: "Learn more about me, check out my projects and don't hesitate to contact me.",
    images: ["https://www.loisalirol.com/web-app-manifest-512x512.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}