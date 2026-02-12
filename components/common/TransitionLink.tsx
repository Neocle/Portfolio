"use client";

import { useT } from "@/hooks/useT";
import { useTransition } from "@/hooks/useTransition";
import React from "react";

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { currentLanguage } = useT();
  const { navigateWithTransition } = useTransition();

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;

  const alreadyLocalized = normalizedHref.startsWith(`/${currentLanguage}/`)
    || normalizedHref === `/${currentLanguage}`;

  const localizedHref = alreadyLocalized
    ? normalizedHref
    : `/${currentLanguage}${normalizedHref}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigateWithTransition(localizedHref);
  };

  return (
    <a href={localizedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}