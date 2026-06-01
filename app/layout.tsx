import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIGEL — Open-Source Multi-Agentic AI Engine",
  description:
    "A powerful open-source multi-agentic AI engine and virtual assistant framework. Multi-LLM backend support, MCP tools, D-Bus integration, voice interface, and RAG — built by Zerone Laboratories.",
  keywords: [
    "RIGEL",
    "AI engine",
    "multi-agentic",
    "virtual assistant",
    "Ollama",
    "Groq",
    "MCP",
    "D-Bus",
    "open source",
    "Zerone Laboratories",
  ],
  authors: [{ name: "Zerone Laboratories" }],
  openGraph: {
    title: "RIGEL — Open-Source Multi-Agentic AI Engine",
    description:
      "Multi-LLM backend support, agentic AI, MCP tools, D-Bus integration, voice interface — open-source by Zerone Laboratories.",
    type: "website",
  },
};

import AbstractBackground from "./components/AbstractBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="_xF_TYwAYPheqtTpD2mgX-GvrvnXpyZ6ROURvJqqZNE" />
      </head>
      <body>
        <AbstractBackground />
        {children}
      </body>
    </html>
  );
}
