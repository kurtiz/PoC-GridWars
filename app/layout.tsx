import {ThemeProvider} from "next-themes";
import "./globals.css";
import {ReactNode} from "react";
import QueryProvider from "@/components/data-provider/query-provider";
import {ReactScan} from "@/components/dev/react-scan";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "OO Sec",
    description: "Hacker Corp",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <ReactScan/>
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryProvider>
                <main>
                    {children}
                </main>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
