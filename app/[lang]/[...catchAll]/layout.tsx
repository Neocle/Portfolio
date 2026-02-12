import { LANGUAGES } from "@/lib/languages";

export function generateStaticParams() {
  return LANGUAGES.map((lang: string) => ({
    lang,
    catchAll: ["404"],
  }));
}

export default function CatchAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}