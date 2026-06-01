import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: "0.82rem", letterSpacing: "0.1em", fontWeight: 500 }}>
                RIGEL ENGINE
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", maxWidth: 340, lineHeight: 1.7 }}>
              Open-source multi-agentic AI engine &amp; virtual assistant framework.
              Licensed under AGPL-3.0.
            </p>
          </div>

          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
                Project
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="https://github.com/Zerone-Laboratories/RIGEL" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: "0.8rem" }}>GitHub</a>
                <a href="https://github.com/Zerone-Laboratories/RIGEL/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: "0.8rem" }}>Changelog</a>
                <a href="https://github.com/Zerone-Laboratories/RIGEL/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: "0.8rem" }}>License</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
                Resources
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/docs" className="nav-link" style={{ fontSize: "0.8rem" }}>API Reference</Link>
                <a href="#install" className="nav-link" style={{ fontSize: "0.8rem" }}>Installation</a>
                <a href="https://github.com/Zerone-Laboratories/RIGEL/issues" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: "0.8rem" }}>Issues</a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Zerone Laboratories. All rights reserved.
          </span>
          <img src={`${basePath}/zrn-logo.png`} alt="Zerone Laboratories" width={100} height={20} style={{ height: 20, width: "auto" }} />
        </div>
      </div>
    </footer>
  );
}
