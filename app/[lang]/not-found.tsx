"use client"

import CustomCursor from "@/components/common/CustomCursor";
import StarsCanvas from "@/components/common/StarCanvas";
import TransitionLink from "@/components/common/TransitionLink";
import { useT } from "@/hooks/useT";
import { useTitle } from "@/hooks/useTitle";

import '@/styles/pages/errors/Error404.css'
import { FaCode } from "react-icons/fa";

export default function Page() {
  const { t } = useT();
  useTitle(`${t("404-error.title")} | Loïs Alirol`)

  return (
    <>
      <CustomCursor />
      <StarsCanvas />

      <main className="notfound-container">
        <div className="notfound-hero">
          <h1 className="notfound-code">404</h1>
          <p className="notfound-title">
            {t("404-error.title")}
          </p>
        </div>

        <p className="notfound-description">
          {t("404-error.description")}
        </p>

        <TransitionLink href="/" className="notfound-link">
          <FaCode/>
          {t("404-error.button")}
        </TransitionLink>
      </main>
    </>
  );
};