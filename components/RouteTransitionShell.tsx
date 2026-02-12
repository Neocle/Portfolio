"use client";

import React, { useEffect } from "react";

import { TransitionContextProvider } from "@/components/context/TransitionContext";
import PageTransition from "./common/PageTransition";
import StarsCanvas from "./common/StarCanvas";
import CustomCursor from "./common/CustomCursor";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { useTransition } from "@/hooks/useTransition";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { isTransitioning, navigateWithTransition } = useTransition();

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ href?: string }>;
      if (customEvent.detail?.href) {
        navigateWithTransition(customEvent.detail.href);
      }
    };
    window.addEventListener("trigger-page-transition", handler);
    return () => window.removeEventListener("trigger-page-transition", handler);
  }, [navigateWithTransition]);

  return (
    <>
      <PageTransition show={isTransitioning} />
      <StarsCanvas />
      <CustomCursor />
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default function RouteTransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransitionContextProvider>
      <ShellContent>{children}</ShellContent>
    </TransitionContextProvider>
  );
}