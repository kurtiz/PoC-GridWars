import {ThemeProvider} from "next-themes";
import "./globals.css";
import {ReactNode} from "react";
import QueryProvider from "@/components/data-provider/query-provider";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "OO Sec",
    description: "Hacker Corp",
};

// const poppins = Poppins({
//     subsets: ["latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//     style: ["normal", "italic"],
//     display: "swap"
// });

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            {/*<script
                crossOrigin="anonymous"
                src="//unpkg.com/react-scan/dist/auto.global.js"
            />*/}
        </head>
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
