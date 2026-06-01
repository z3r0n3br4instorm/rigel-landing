import type { Metadata } from "next";
import DocsPage from "./DocsPage";

export const metadata: Metadata = {
  title: "RIGEL Documentation — API, D-Bus, MCP, Voice Reference",
  description: "Comprehensive documentation for the RIGEL AI engine: REST API endpoints, D-Bus interface, MCP tools, voice synthesis and recognition, installation, and usage examples.",
};

export default function Page() {
  return <DocsPage />;
}
