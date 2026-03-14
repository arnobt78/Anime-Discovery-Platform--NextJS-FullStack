"use client";

import { type ReactNode } from "react";

/**
 * App-level providers (e.g. theme, locale). Wrap layout children here
 * when adding context providers for scalability.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
