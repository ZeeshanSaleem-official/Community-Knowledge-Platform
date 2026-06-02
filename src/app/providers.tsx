"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProviderProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    )

}