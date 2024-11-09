"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component that enables theme switching functionality
 * This should wrap your application (usually in layout.tsx or root component)
 * to enable dark/light mode switching across your entire app
 * 
 * @param children - Child components that will have access to theme context
 * @param props - Additional theme configuration options (e.g., defaultTheme, themes)
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}