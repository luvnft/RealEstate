import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import { i18n, type Locale } from '@/i18n-config';
import { LocaleProvider } from "@/contexts/localeContext";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real State AIpp",
  description: "Generated by GRK, this is a search engine for real state properties. It uses AI to search for properties with natural language.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}


export default function RootLayout({
  children,
  params,

}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };

}>) {

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProviderWrapper lang={params.lang}>
            <LocaleProvider initialLocale={params.lang}>
              <Navbar lang={params.lang} />
              <div className="flex flex-col fex-l1 overflow-y-auto min-h-screen pt-28">
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <Analytics />
            </LocaleProvider>

          </ClerkProviderWrapper>
        </ThemeProvider>

      </body>
    </html >
  );
}