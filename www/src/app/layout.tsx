import "@/styles/globals.css";
import ThemeProvider from "@/components/nav/ThemeProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio - Federico Fusco",
    description: "Come check out my portfolio",
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/favicon-light.png',
                href: '/favicon-light.png',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/favimages/icon.png',
                href: '/favimages/icon-dark.png',
            },
        ],
    },
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className="overflow-x-hidden bg-background h-screen">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Navbar />
                        <main>
                            { children }
                        </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

export default RootLayout;