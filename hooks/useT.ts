"use client";

import { useContext } from "react";
import { TranslationContext } from "@/components/context/TranslationContext";

export const useT = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useT must be used within a TranslationProvider");
  }

  return context;
};