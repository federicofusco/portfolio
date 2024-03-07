"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
 
const ThemeProvider = ({ children, ...props }: ThemeProviderProps): React.ReactNode => <NextThemesProvider {...props}>{children}</NextThemesProvider>;

export default ThemeProvider;