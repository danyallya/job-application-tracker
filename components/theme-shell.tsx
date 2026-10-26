"use client";
import { MantineProvider } from "@mantine/core";
import { createContext, useContext, useEffect, useState } from "react";
type ThemeContextValue = { dark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeContextValue>({ dark: false, toggle: () => undefined });
export const useFolioTheme = () => useContext(ThemeContext);
export function ThemeShell({ children }: { children: React.ReactNode }) {
 const [dark,setDark]=useState(false);
 useEffect(()=>{const saved=localStorage.getItem("folio-theme");setDark(saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("folio-theme",dark?"dark":"light")},[dark]);
 return <ThemeContext.Provider value={{dark,toggle:()=>setDark(v=>!v)}}><MantineProvider forceColorScheme={dark?"dark":"light"} theme={{primaryColor:"teal",defaultRadius:"md"}}>{children}</MantineProvider></ThemeContext.Provider>;
}