import type { Metadata, Viewport } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { ThemeShell } from "@/components/theme-shell";
import { PwaRegister } from "@/components/pwa-register";
export const metadata: Metadata = { title: "Folio — a considered career search", description: "A private workspace for tracking applications, conversations and next steps.", applicationName: "Folio", manifest: "/manifest.webmanifest", appleWebApp: { capable: true, title: "Folio", statusBarStyle: "default" } };
export const viewport: Viewport = { themeColor: "#f5f3ee", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><ThemeShell>{children}<PwaRegister /></ThemeShell></body></html>; }