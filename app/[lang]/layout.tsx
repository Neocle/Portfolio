import { notFound } from "next/navigation";
import { isValidLanguage, LANGUAGES, type Language } from "@/lib/languages";
import { getTranslations } from "@/lib/translations";
import { TranslationProvider } from "@/components/provider/TranslationProvider";
import RouteTransitionShell from "@/components/RouteTransitionShell";

export function generateStaticParams() {
  return LANGUAGES.map((lang: Language) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const translations = getTranslations(lang as Language);

  return (
    <html lang={lang}>
      <body>
        <TranslationProvider language={lang} translations={translations}>
          <div className="page">
            <RouteTransitionShell>{children}</RouteTransitionShell>
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}