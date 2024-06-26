import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${inter.className} flex  flex-col items-center p-8 sm:p-24`}
    >
      <Component {...pageProps} />
    </main>
  );
}
