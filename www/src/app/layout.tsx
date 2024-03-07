import "@/styles/globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/nav/ThemeProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";

// Sets the main font
const inter = Inter({ subsets: ["latin"] });

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