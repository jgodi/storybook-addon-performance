import {
  invariant
} from "./chunk-FLQHF53G.mjs";

// src/use-required-context.ts
import { useContext } from "react";
function useRequiredContext(Context2) {
  const value = useContext(Context2);
  invariant(value, "Could not find context value");
  return value;
}

export {
  useRequiredContext
};
