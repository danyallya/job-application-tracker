"use client";
import { MantineProvider } from "@mantine/core";
import { createContext, useContext, useEffect, useState } from "react";
import { readFolioTheme, writeFolioTheme } from './theme-preference';
type ThemeContextValue = { dark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeContextValue>({ dark: false, toggle: () => undefined });
export const useFolioTheme = () => useContext(ThemeContext);
export function ThemeShell({ children }: { children: React.ReactNode }) {
 const [dark,setDark]=useState(false);
 const [ready,setReady]=useState(false);
 useEffect(()=>{let preferred=false; try { preferred=matchMedia('(prefers-color-scheme: dark)').matches; setDark(readFolioTheme(localStorage,preferred)); } catch { setDark(preferred); } setReady(true);},[]);
 useEffect(()=>{if(!ready)return; document.documentElement.dataset.theme=dark?"dark":"light";document.documentElement.style.colorScheme=dark?'dark':'light';try{writeFolioTheme(localStorage,dark)}catch{/* Storage access itself may be blocked. */}},[dark,ready]);
 return <ThemeContext.Provider value={{dark,toggle:()=>setDark(v=>!v)}}><MantineProvider forceColorScheme={dark?"dark":"light"} theme={{primaryColor:"teal",defaultRadius:"md"}}>{children}</MantineProvider></ThemeContext.Provider>;
}
