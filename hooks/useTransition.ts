import { useContext } from "react";
import { TransitionContext, type TransitionContextValue } from "@/components/context/TransitionContext";

export function useTransition(): TransitionContextValue {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("useTransition must be used within a <TransitionContextProvider />");
  }

  return context;
}