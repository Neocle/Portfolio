"use client";

import React, { createContext, useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/hooks/useLang";

export interface TransitionContextValue {
  isTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
  triggerTransition: (callback?: () => void) => void;
}

export const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
  navigateWithTransition: () => {},
  triggerTransition: () => {},
});

export function TransitionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLang();

  const navigateWithTransition = useCallback(
    (href: string) => {
      const localizedHref = href.startsWith(`/${lang}/`) || href === `/${lang}`
        ? href
        : `/${lang}${href.startsWith("/") ? href : `/${href}`}`;

      if (localizedHref === pathname) return;

      setIsTransitioning(true);

      setTimeout(() => {
        router.push(localizedHref);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      }, 200);
    },
    [router, pathname, lang]
  );

  const triggerTransition = useCallback((callback?: () => void) => {
    setIsTransitioning(true);

    setTimeout(() => {
      callback?.();

      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 500);
  }, []);

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, navigateWithTransition, triggerTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}